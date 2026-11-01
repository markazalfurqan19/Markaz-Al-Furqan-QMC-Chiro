import { getOAuthAccessToken, signInWithGoogle } from './firebase';

async function getValidToken(): Promise<string> {
  let token = getOAuthAccessToken() || localStorage.getItem('mf_oauth_token');
  if (!token) {
    const user = await signInWithGoogle();
    token = getOAuthAccessToken() || localStorage.getItem('mf_oauth_token');
  }
  if (!token) {
    throw new Error('Google OAuth token not available. Please sign in with Google.');
  }
  return token;
}

/**
 * 1. GOOGLE SHEETS: Export Student Roster & Hifz Logs into a new Google Spreadsheet
 */
export async function exportToGoogleSheets(
  title: string, 
  students: any[], 
  hifzLogs: any[]
): Promise<{ spreadsheetId: string; spreadsheetUrl: string }> {
  const token = await getValidToken();

  // Create new Spreadsheet
  const createRes = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      properties: {
        title: `Markazul Furqan - ${title} (${new Date().toLocaleDateString('en-GB')})`
      },
      sheets: [
        { properties: { title: 'Students Roster' } },
        { properties: { title: 'Daily Hifz Logs' } }
      ]
    })
  });

  if (!createRes.ok) {
    const err = await createRes.json();
    throw new Error(err.error?.message || 'Failed to create Google Spreadsheet');
  }

  const spreadsheet = await createRes.json();
  const spreadsheetId = spreadsheet.spreadsheetId;

  // Prepare Students Table Data
  const studentRows = [
    ['Student Code', 'Full Name', 'Age', 'Current Juz', 'Current Surah', 'Track', 'Guardian Name', 'Guardian Phone', 'Status', 'Attendance %'],
    ...students.map(s => [
      s.code, s.name, s.age, s.juzLevel, s.currentSurah, s.track, s.guardianName, s.guardianPhone, s.status, `${s.dailyAttendance}%`
    ])
  ];

  // Prepare Hifz Logs Table Data
  const logRows = [
    ['Date', 'Student Code', 'Student Name', 'Sabaq (New Lesson)', 'Sabqi (Recent Juz)', 'Manzil (Cycle Juz)', 'Grade', 'Muallim Name', 'Notes'],
    ...hifzLogs.map(l => [
      l.date, l.studentCode, l.studentName, l.sabaqRange, l.sabqiJuz, l.manzilJuz, l.grade, l.muallimName, l.notes
    ])
  ];

  // Populate data into spreadsheet
  await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchUpdate`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      valueInputOption: 'USER_ENTERED',
      data: [
        {
          range: 'Students Roster!A1',
          values: studentRows
        },
        {
          range: 'Daily Hifz Logs!A1',
          values: logRows
        }
      ]
    })
  });

  return {
    spreadsheetId,
    spreadsheetUrl: `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`
  };
}

/**
 * 2. GOOGLE DRIVE: Save Transcript / Certificate Document to Google Drive
 */
export async function saveDocumentToGoogleDrive(
  fileName: string, 
  content: string, 
  mimeType = 'text/html'
): Promise<{ fileId: string; webViewLink?: string }> {
  const token = await getValidToken();

  const metadata = {
    name: fileName,
    mimeType: mimeType,
    description: 'Markazul Furqan Quran Memorization Center official document'
  };

  const form = new FormData();
  form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
  form.append('file', new Blob([content], { type: mimeType }));

  const res = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,webViewLink', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: form
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error?.message || 'Failed to upload document to Google Drive');
  }

  const data = await res.json();
  return {
    fileId: data.id,
    webViewLink: data.webViewLink
  };
}

/**
 * 3. GMAIL: Send Official Transcript / Certificate via Gmail
 */
export async function sendEmailViaGmail(
  to: string, 
  subject: string, 
  bodyHtml: string
): Promise<{ messageId: string }> {
  const token = await getValidToken();

  // Construct RFC 2822 email format
  const emailLines = [
    `To: ${to}`,
    `Subject: =?utf-8?B?${btoa(unescape(encodeURIComponent(subject)))}?=`,
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=utf-8',
    '',
    bodyHtml
  ];

  const rawMessage = emailLines.join('\r\n');
  const encodedMessage = btoa(unescape(encodeURIComponent(rawMessage)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      raw: encodedMessage
    })
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error?.message || 'Failed to send email via Gmail');
  }

  const data = await res.json();
  return { messageId: data.id };
}
