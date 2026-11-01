import { Student, HifzLog, AdmissionApplication, DonationPledge } from '../types';

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'st-1',
    code: 'MF-2018-01',
    name: 'Abdulmalik Ahmed Mohammed',
    age: 14,
    guardianName: 'Ahmed Mohammed Kaso',
    guardianPhone: '0911 22 33 44',
    juzLevel: 28,
    currentSurah: 'Surah Al-Mulk (Ayah 1-30)',
    status: 'KHATM_TRACK',
    enrollmentDate: '2023-09-12',
    track: 'HIFZ',
    dailyAttendance: 98,
    notes: 'Exceptional retention. Preparing for complete Khatm exam next month.'
  },
  {
    id: 'st-2',
    code: 'MF-2018-02',
    name: 'Sumayya Bilal Siyum',
    age: 13,
    guardianName: 'Bilal Siyum Hamza',
    guardianPhone: '0922 33 44 55',
    juzLevel: 30,
    currentSurah: 'Surah Al-Baqarah (Revision)',
    status: 'GRADUATED',
    enrollmentDate: '2022-10-05',
    track: 'HIFZ',
    dailyAttendance: 100,
    notes: 'Completed full 30 Juz memorization. Currently enrolled in Sanad recitation track.'
  },
  {
    id: 'st-3',
    code: 'MF-2018-03',
    name: 'Hamza Kadir Ibrahim',
    age: 12,
    guardianName: 'Kadir Ibrahim Tura',
    guardianPhone: '0933 44 55 66',
    juzLevel: 14,
    currentSurah: 'Surah Al-Hijr (Ayah 1-40)',
    status: 'ACTIVE',
    enrollmentDate: '2024-01-15',
    track: 'HIFZ',
    dailyAttendance: 95,
    notes: 'Consistent daily Sabaq progress of 1.5 pages per day.'
  },
  {
    id: 'st-4',
    code: 'MF-2018-04',
    name: 'Zubayr Usman Ali',
    age: 11,
    guardianName: 'Usman Ali Roba',
    guardianPhone: '0944 55 66 77',
    juzLevel: 7,
    currentSurah: 'Surah Al-A\'raf (Ayah 50-80)',
    status: 'ACTIVE',
    enrollmentDate: '2024-03-01',
    track: 'HIFZ',
    dailyAttendance: 92,
    notes: 'Makharij pronunciation improving noticeably under Mu\'allim guidance.'
  },
  {
    id: 'st-5',
    code: 'MF-2018-05',
    name: 'Fathima Jibril Omar',
    age: 15,
    guardianName: 'Jibril Omar Dadi',
    guardianPhone: '0955 66 77 88',
    juzLevel: 22,
    currentSurah: 'Surah Al-Ahzab (Ayah 1-35)',
    status: 'ACTIVE',
    enrollmentDate: '2023-04-10',
    track: 'HIFZ',
    dailyAttendance: 96,
    notes: 'Strong in Sabqi consolidation; excellent Tajweed precision.'
  },
  {
    id: 'st-6',
    code: 'MF-2018-06',
    name: 'Bilal Mustafa Hassan',
    age: 16,
    guardianName: 'Mustafa Hassan Beker',
    guardianPhone: '0966 77 88 99',
    juzLevel: 19,
    currentSurah: 'Surah An-Naml (Ayah 1-50)',
    status: 'ACTIVE',
    enrollmentDate: '2023-08-20',
    track: 'HIFZ',
    dailyAttendance: 94,
    notes: 'Solid understanding of Waqf and Ibtida rules.'
  },
  {
    id: 'st-7',
    code: 'MF-2018-07',
    name: 'Ruqayyah Dawud Ware',
    age: 10,
    guardianName: 'Dawud Ware Jarso',
    guardianPhone: '0977 88 99 00',
    juzLevel: 4,
    currentSurah: 'Surah An-Nisa (Ayah 1-25)',
    status: 'ACTIVE',
    enrollmentDate: '2024-06-01',
    track: 'HIFZ',
    dailyAttendance: 97,
    notes: 'Youngest aspirant in cohort; demonstrates extraordinary memory retention.'
  }
];

export const INITIAL_LOGS: HifzLog[] = [
  // Student 1: Abdulmalik Ahmed (Progressed from Juz 22 to 28 over 6 months)
  {
    id: 'log-1-may',
    studentId: 'st-1',
    studentCode: 'MF-2018-01',
    studentName: 'Abdulmalik Ahmed Mohammed',
    date: '2026-05-18',
    sabaqRange: 'Surah Al-Furqan (Ayah 1-40)',
    sabqiJuz: 22,
    manzilJuz: 5,
    grade: 'MUMTAZ',
    notes: 'Completed Juz 22 evaluation with distinction.',
    muallimName: 'Mu\'allim Ziyad Abdullahi'
  },
  {
    id: 'log-1-jun',
    studentId: 'st-1',
    studentCode: 'MF-2018-01',
    studentName: 'Abdulmalik Ahmed Mohammed',
    date: '2026-06-20',
    sabaqRange: 'Surah Ash-Shu\'ara (Ayah 1-80)',
    sabqiJuz: 23,
    manzilJuz: 8,
    grade: 'MUMTAZ',
    notes: 'Cleared Juz 23 milestone.',
    muallimName: 'Mu\'allim Ziyad Abdullahi'
  },
  {
    id: 'log-1-jul',
    studentId: 'st-1',
    studentCode: 'MF-2018-01',
    studentName: 'Abdulmalik Ahmed Mohammed',
    date: '2026-07-22',
    sabaqRange: 'Surah Al-Qasas (Ayah 1-50)',
    sabqiJuz: 25,
    manzilJuz: 10,
    grade: 'MUMTAZ',
    notes: 'Reached Juz 25 Quarter 2.',
    muallimName: 'Mu\'allim Ziyad Abdullahi'
  },
  {
    id: 'log-1-aug',
    studentId: 'st-1',
    studentCode: 'MF-2018-01',
    studentName: 'Abdulmalik Ahmed Mohammed',
    date: '2026-08-25',
    sabaqRange: 'Surah Luqman (Ayah 1-34)',
    sabqiJuz: 26,
    manzilJuz: 11,
    grade: 'MUMTAZ',
    notes: 'Passed oral exam for Juz 26.',
    muallimName: 'Mu\'allim Ziyad Abdullahi'
  },
  {
    id: 'log-1-sep',
    studentId: 'st-1',
    studentCode: 'MF-2018-01',
    studentName: 'Abdulmalik Ahmed Mohammed',
    date: '2026-09-24',
    sabaqRange: 'Surah As-Sajdah (Full Surah)',
    sabqiJuz: 27,
    manzilJuz: 12,
    grade: 'MUMTAZ',
    notes: 'Flawless Tarteel in Juz 27.',
    muallimName: 'Mu\'allim Ziyad Abdullahi'
  },
  {
    id: 'log-1-oct',
    studentId: 'st-1',
    studentCode: 'MF-2018-01',
    studentName: 'Abdulmalik Ahmed Mohammed',
    date: '2026-10-31',
    sabaqRange: 'Surah Al-Mulk (Ayah 1-30)',
    sabqiJuz: 28,
    manzilJuz: 14,
    grade: 'MUMTAZ',
    notes: 'Reached Juz 28. Entering final Khatm track.',
    muallimName: 'Mu\'allim Ziyad Abdullahi'
  },

  // Student 2: Sumayya Bilal (Full 30 Juz Graduate)
  {
    id: 'log-2-may',
    studentId: 'st-2',
    studentCode: 'MF-2018-02',
    studentName: 'Sumayya Bilal Siyum',
    date: '2026-05-15',
    sabaqRange: 'Surah Al-Qiyamah',
    sabqiJuz: 26,
    manzilJuz: 15,
    grade: 'MUMTAZ',
    notes: 'Consolidating Juz 26.',
    muallimName: 'Ustazah Amina Kemal'
  },
  {
    id: 'log-2-jun',
    studentId: 'st-2',
    studentCode: 'MF-2018-02',
    studentName: 'Sumayya Bilal Siyum',
    date: '2026-06-18',
    sabaqRange: 'Surah An-Naba',
    sabqiJuz: 28,
    manzilJuz: 20,
    grade: 'MUMTAZ',
    notes: 'Exemplary speed and Tajweed.',
    muallimName: 'Ustazah Amina Kemal'
  },
  {
    id: 'log-2-jul',
    studentId: 'st-2',
    studentCode: 'MF-2018-02',
    studentName: 'Sumayya Bilal Siyum',
    date: '2026-07-20',
    sabaqRange: 'Surah Al-Inshiqaq',
    sabqiJuz: 29,
    manzilJuz: 25,
    grade: 'MUMTAZ',
    notes: 'Completed Juz 29.',
    muallimName: 'Ustazah Amina Kemal'
  },
  {
    id: 'log-2-aug',
    studentId: 'st-2',
    studentCode: 'MF-2018-02',
    studentName: 'Sumayya Bilal Siyum',
    date: '2026-08-28',
    sabaqRange: 'Surah An-Nas & Khatm Dua',
    sabqiJuz: 30,
    manzilJuz: 30,
    grade: 'MUMTAZ',
    notes: 'Full Khatm al-Qur\'an achieved! All 30 Juz memorized.',
    muallimName: 'Ustaz Kadir Hamza Siyum'
  },
  {
    id: 'log-2-sep',
    studentId: 'st-2',
    studentCode: 'MF-2018-02',
    studentName: 'Sumayya Bilal Siyum',
    date: '2026-09-20',
    sabaqRange: 'Full 30 Juz Sanad Revision',
    sabqiJuz: 30,
    manzilJuz: 30,
    grade: 'MUMTAZ',
    notes: 'Sanad testing round 1.',
    muallimName: 'Ustaz Kadir Hamza Siyum'
  },
  {
    id: 'log-2-oct',
    studentId: 'st-2',
    studentCode: 'MF-2018-02',
    studentName: 'Sumayya Bilal Siyum',
    date: '2026-10-25',
    sabaqRange: 'Surah Al-Baqarah (Revision)',
    sabqiJuz: 30,
    manzilJuz: 30,
    grade: 'MUMTAZ',
    notes: 'Graduated Hafiza. Certified with Sanad.',
    muallimName: 'Ustaz Kadir Hamza Siyum'
  },

  // Student 3: Hamza Kadir (Progressed from Juz 8 to 14)
  {
    id: 'log-3-may',
    studentId: 'st-3',
    studentCode: 'MF-2018-03',
    studentName: 'Hamza Kadir Ibrahim',
    date: '2026-05-12',
    sabaqRange: 'Surah Al-An\'am (Ayah 1-50)',
    sabqiJuz: 8,
    manzilJuz: 2,
    grade: 'JAYYID',
    notes: 'Juz 8 review.',
    muallimName: 'Mu\'allim Idris Shenkute'
  },
  {
    id: 'log-3-jun',
    studentId: 'st-3',
    studentCode: 'MF-2018-03',
    studentName: 'Hamza Kadir Ibrahim',
    date: '2026-06-15',
    sabaqRange: 'Surah Al-A\'raf (Ayah 1-60)',
    sabqiJuz: 9,
    manzilJuz: 3,
    grade: 'JAYYID_JIDDAN',
    notes: 'Juz 9 cleared.',
    muallimName: 'Mu\'allim Idris Shenkute'
  },
  {
    id: 'log-3-jul',
    studentId: 'st-3',
    studentCode: 'MF-2018-03',
    studentName: 'Hamza Kadir Ibrahim',
    date: '2026-07-16',
    sabaqRange: 'Surah At-Tawbah (Ayah 1-50)',
    sabqiJuz: 10,
    manzilJuz: 4,
    grade: 'JAYYID_JIDDAN',
    notes: 'Reached Juz 10 milestone.',
    muallimName: 'Mu\'allim Idris Shenkute'
  },
  {
    id: 'log-3-aug',
    studentId: 'st-3',
    studentCode: 'MF-2018-03',
    studentName: 'Hamza Kadir Ibrahim',
    date: '2026-08-18',
    sabaqRange: 'Surah Hud (Ayah 1-70)',
    sabqiJuz: 11,
    manzilJuz: 4,
    grade: 'MUMTAZ',
    notes: 'Passed Juz 11 evaluation.',
    muallimName: 'Mu\'allim Idris Shenkute'
  },
  {
    id: 'log-3-sep',
    studentId: 'st-3',
    studentCode: 'MF-2018-03',
    studentName: 'Hamza Kadir Ibrahim',
    date: '2026-09-20',
    sabaqRange: 'Surah Yusuf (Ayah 1-80)',
    sabqiJuz: 12,
    manzilJuz: 5,
    grade: 'MUMTAZ',
    notes: 'Solidified Juz 12.',
    muallimName: 'Mu\'allim Idris Shenkute'
  },
  {
    id: 'log-3-oct',
    studentId: 'st-3',
    studentCode: 'MF-2018-03',
    studentName: 'Hamza Kadir Ibrahim',
    date: '2026-10-31',
    sabaqRange: 'Surah Al-Hijr (Ayah 1-40)',
    sabqiJuz: 14,
    manzilJuz: 6,
    grade: 'JAYYID_JIDDAN',
    notes: 'Reaching Juz 14. Excellent progression.',
    muallimName: 'Mu\'allim Idris Shenkute'
  },

  // Student 4: Zubayr Usman (Progressed from Juz 2 to 7)
  {
    id: 'log-4-may',
    studentId: 'st-4',
    studentCode: 'MF-2018-04',
    studentName: 'Zubayr Usman Ali',
    date: '2026-05-10',
    sabaqRange: 'Surah Al-Baqarah 150-180',
    sabqiJuz: 2,
    manzilJuz: 1,
    grade: 'JAYYID',
    notes: 'Consolidating Juz 2.',
    muallimName: 'Mu\'allim Ziyad Abdullahi'
  },
  {
    id: 'log-4-jun',
    studentId: 'st-4',
    studentCode: 'MF-2018-04',
    studentName: 'Zubayr Usman Ali',
    date: '2026-06-12',
    sabaqRange: 'Surah Al-Baqarah 250-286',
    sabqiJuz: 3,
    manzilJuz: 1,
    grade: 'JAYYID_JIDDAN',
    notes: 'Completed Juz 3.',
    muallimName: 'Mu\'allim Ziyad Abdullahi'
  },
  {
    id: 'log-4-jul',
    studentId: 'st-4',
    studentCode: 'MF-2018-04',
    studentName: 'Zubayr Usman Ali',
    date: '2026-07-14',
    sabaqRange: 'Surah Ali \'Imran 93-140',
    sabqiJuz: 4,
    manzilJuz: 2,
    grade: 'JAYYID',
    notes: 'Passed Juz 4.',
    muallimName: 'Mu\'allim Ziyad Abdullahi'
  },
  {
    id: 'log-4-aug',
    studentId: 'st-4',
    studentCode: 'MF-2018-04',
    studentName: 'Zubayr Usman Ali',
    date: '2026-08-16',
    sabaqRange: 'Surah An-Nisa 24-80',
    sabqiJuz: 5,
    manzilJuz: 2,
    grade: 'JAYYID_JIDDAN',
    notes: 'Juz 5 cleared.',
    muallimName: 'Mu\'allim Ziyad Abdullahi'
  },
  {
    id: 'log-4-sep',
    studentId: 'st-4',
    studentCode: 'MF-2018-04',
    studentName: 'Zubayr Usman Ali',
    date: '2026-09-18',
    sabaqRange: 'Surah Al-Ma\'idah 1-50',
    sabqiJuz: 6,
    manzilJuz: 2,
    grade: 'JAYYID_JIDDAN',
    notes: 'Passed Juz 6.',
    muallimName: 'Mu\'allim Ziyad Abdullahi'
  },
  {
    id: 'log-4-oct',
    studentId: 'st-4',
    studentCode: 'MF-2018-04',
    studentName: 'Zubayr Usman Ali',
    date: '2026-10-30',
    sabaqRange: 'Surah Al-A\'raf (Ayah 50-80)',
    sabqiJuz: 7,
    manzilJuz: 3,
    grade: 'JAYYID',
    notes: 'Now on Juz 7.',
    muallimName: 'Mu\'allim Ziyad Abdullahi'
  },

  // Student 5: Fathima Jibril (Progressed from Juz 16 to 22)
  {
    id: 'log-5-may',
    studentId: 'st-5',
    studentCode: 'MF-2018-05',
    studentName: 'Fathima Jibril Omar',
    date: '2026-05-14',
    sabaqRange: 'Surah Al-Kahf 75-110',
    sabqiJuz: 16,
    manzilJuz: 8,
    grade: 'MUMTAZ',
    notes: 'Juz 16 completed.',
    muallimName: 'Ustazah Amina Kemal'
  },
  {
    id: 'log-5-jun',
    studentId: 'st-5',
    studentCode: 'MF-2018-05',
    studentName: 'Fathima Jibril Omar',
    date: '2026-06-15',
    sabaqRange: 'Surah Al-Anbiya 1-70',
    sabqiJuz: 17,
    manzilJuz: 9,
    grade: 'MUMTAZ',
    notes: 'Passed Juz 17.',
    muallimName: 'Ustazah Amina Kemal'
  },
  {
    id: 'log-5-jul',
    studentId: 'st-5',
    studentCode: 'MF-2018-05',
    studentName: 'Fathima Jibril Omar',
    date: '2026-07-17',
    sabaqRange: 'Surah Al-Mu\'minoon 1-60',
    sabqiJuz: 18,
    manzilJuz: 10,
    grade: 'MUMTAZ',
    notes: 'Passed Juz 18.',
    muallimName: 'Ustazah Amina Kemal'
  },
  {
    id: 'log-5-aug',
    studentId: 'st-5',
    studentCode: 'MF-2018-05',
    studentName: 'Fathima Jibril Omar',
    date: '2026-08-19',
    sabaqRange: 'Surah Al-Furqan 21-77',
    sabqiJuz: 19,
    manzilJuz: 11,
    grade: 'MUMTAZ',
    notes: 'Passed Juz 19.',
    muallimName: 'Ustazah Amina Kemal'
  },
  {
    id: 'log-5-sep',
    studentId: 'st-5',
    studentCode: 'MF-2018-05',
    studentName: 'Fathima Jibril Omar',
    date: '2026-09-22',
    sabaqRange: 'Surah Al-Ankaboot 1-45',
    sabqiJuz: 20,
    manzilJuz: 12,
    grade: 'MUMTAZ',
    notes: 'Completed Juz 20.',
    muallimName: 'Ustazah Amina Kemal'
  },
  {
    id: 'log-5-oct',
    studentId: 'st-5',
    studentCode: 'MF-2018-05',
    studentName: 'Fathima Jibril Omar',
    date: '2026-10-30',
    sabaqRange: 'Surah Al-Ahzab (Ayah 1-35)',
    sabqiJuz: 22,
    manzilJuz: 13,
    grade: 'MUMTAZ',
    notes: 'Advanced to Juz 22 with honors.',
    muallimName: 'Ustazah Amina Kemal'
  }
];

export const INITIAL_ADMISSIONS: AdmissionApplication[] = [
  {
    id: 'adm-1',
    fullName: 'Anwar Jamal Tahir',
    phone: '0912 88 44 22',
    guardianName: 'Jamal Tahir Geda',
    track: 'HIFZ',
    priorJuz: 3,
    paymentChannel: 'TELEBIRR',
    submissionDate: '2026-10-28',
    status: 'PENDING',
    notes: 'Candidate completed Amma Juz at home madrasa with father.'
  },
  {
    id: 'adm-2',
    fullName: 'Khadija Muktar Bedru',
    phone: '0923 11 99 77',
    guardianName: 'Muktar Bedru Ali',
    track: 'TAJWEED',
    priorJuz: 10,
    paymentChannel: 'CBE',
    submissionDate: '2026-10-29',
    status: 'APPROVED',
    notes: 'Looking to master Hafs & Warsh Qira\'at.'
  }
];

export const INITIAL_PLEDGES: DonationPledge[] = [
  {
    id: 'pl-1',
    donorName: 'Hajj Nurhussen Abdi',
    phoneOrEmail: '0911 55 44 33',
    amountETB: 50000,
    tier: 'Classroom Infrastructure Block',
    channel: 'Commercial Bank of Ethiopia (CBE)',
    referenceNumber: 'CBE-TX-99847291',
    date: '2026-10-25',
    isConfirmed: true
  },
  {
    id: 'pl-2',
    donorName: 'Dr. Munir Seid (Diaspora Supporter)',
    phoneOrEmail: 'munir.seid@outlook.com',
    amountETB: 24000,
    tier: 'Full Year Student Sponsorship (2 Haffaz)',
    channel: 'Telebirr',
    referenceNumber: 'TB-982736412',
    date: '2026-10-27',
    isConfirmed: true
  }
];

export const QURAN_JUZ_LIST = [
  { juz: 1, name: 'Alif Lam Meem', arabic: 'آلم', startSurah: 'Al-Fatiha 1', endSurah: 'Al-Baqarah 141' },
  { juz: 2, name: 'Sayaqool', arabic: 'سَيَقُولُ', startSurah: 'Al-Baqarah 142', endSurah: 'Al-Baqarah 252' },
  { juz: 3, name: 'Tilkar Rusul', arabic: 'تِلْكَ الرُّسُلُ', startSurah: 'Al-Baqarah 253', endSurah: 'Ali \'Imran 92' },
  { juz: 4, name: 'Lan Tanaaloo', arabic: 'لَنْ تَنَالُوا', startSurah: 'Ali \'Imran 93', endSurah: 'An-Nisa 23' },
  { juz: 5, name: 'Wal Muhsanat', arabic: 'وَالْمُحْصَنَاتُ', startSurah: 'An-Nisa 24', endSurah: 'An-Nisa 147' },
  { juz: 6, name: 'La Yuhibbullah', arabic: 'لَا يُحِبُّ اللَّهُ', startSurah: 'An-Nisa 148', endSurah: 'Al-Ma\'idah 81' },
  { juz: 7, name: 'Wa Iza Sami\'oo', arabic: 'وَإِذَا سَمِعُوا', startSurah: 'Al-Ma\'idah 82', endSurah: 'Al-An\'am 110' },
  { juz: 8, name: 'Wa Law Annana', arabic: 'وَلَوْ أَنَّنَا', startSurah: 'Al-An\'am 111', endSurah: 'Al-A\'raf 87' },
  { juz: 9, name: 'Qalal Mala\'o', arabic: 'قَالَ الْمَلَأُ', startSurah: 'Al-A\'raf 88', endSurah: 'Al-Anfal 40' },
  { juz: 10, name: 'Wa A\'lamoo', arabic: 'وَاعْلَمُوا', startSurah: 'Al-Anfal 41', endSurah: 'At-Tawbah 92' },
  { juz: 11, name: 'Ya\'taziroona', arabic: 'يَعْتَذِرُونَ', startSurah: 'At-Tawbah 93', endSurah: 'Hud 5' },
  { juz: 12, name: 'Wa Mamin Da\'abbah', arabic: 'وَمَا مِنْ دَابَّةٍ', startSurah: 'Hud 6', endSurah: 'Yusuf 52' },
  { juz: 13, name: 'Wa Ma Ubarri\'u', arabic: 'وَمَا أُبَرِّئُ', startSurah: 'Yusuf 53', endSurah: 'Ibrahim 52' },
  { juz: 14, name: 'Rubama', arabic: 'رُبَمَا', startSurah: 'Al-Hijr 1', endSurah: 'An-Nahl 128' },
  { juz: 15, name: 'Subhanallazi', arabic: 'سُبْحَانَ الَّذِي', startSurah: 'Al-Isra 1', endSurah: 'Al-Kahf 74' },
  { juz: 16, name: 'Qala Alam', arabic: 'قَالَ أَلَمْ', startSurah: 'Al-Kahf 75', endSurah: 'Ta-Ha 135' },
  { juz: 17, name: 'Iqtaraba', arabic: 'اقْتَرَبَ', startSurah: 'Al-Anbiya 1', endSurah: 'Al-Hajj 78' },
  { juz: 18, name: 'Qad Aflaha', arabic: 'قَدْ أَفْلَحَ', startSurah: 'Al-Mu\'minoon 1', endSurah: 'Al-Furqan 20' },
  { juz: 19, name: 'Wa Qalallazina', arabic: 'وَقَالَ الَّذِينَ', startSurah: 'Al-Furqan 21', endSurah: 'An-Naml 55' },
  { juz: 20, name: 'Amman Khalaq', arabic: 'أَمَّنْ خَلَقَ', startSurah: 'An-Naml 56', endSurah: 'Al-Ankaboot 45' },
  { juz: 21, name: 'Utlu Ma Oohiya', arabic: 'اتْلُ مَا أُوحِيَ', startSurah: 'Al-Ankaboot 46', endSurah: 'Al-Ahzab 30' },
  { juz: 22, name: 'Wa Manyaqnut', arabic: 'وَمَنْ يَقْنُتْ', startSurah: 'Al-Ahzab 31', endSurah: 'Ya-Seen 27' },
  { juz: 23, name: 'Wa Maliya', arabic: 'وَمَا لِيَ', startSurah: 'Ya-Seen 28', endSurah: 'Az-Zumar 31' },
  { juz: 24, name: 'Faman Azlamu', arabic: 'فَمَنْ أَظْلَمُ', startSurah: 'Az-Zumar 32', endSurah: 'Fussilat 46' },
  { juz: 25, name: 'Ilayhi Yuraddu', arabic: 'إِلَيْهِ يُرَدُّ', startSurah: 'Fussilat 47', endSurah: 'Al-Jathiyah 37' },
  { juz: 26, name: 'Ha\'a Meem', arabic: 'حم', startSurah: 'Al-Ahqaf 1', endSurah: 'Az-Zariyat 30' },
  { juz: 27, name: 'Qala Fama Khatbukum', arabic: 'قَالَ فَمَا خَطْبُكُمْ', startSurah: 'Az-Zariyat 31', endSurah: 'Al-Hadid 29' },
  { juz: 28, name: 'Qad Sami\'allah', arabic: 'قَدْ سَمِعَ اللَّهُ', startSurah: 'Al-Mujadila 1', endSurah: 'At-Tahrim 12' },
  { juz: 29, name: 'Tabarakallazi', arabic: 'تَبَارَكَ الَّذِي', startSurah: 'Al-Mulk 1', endSurah: 'Al-Mursalat 50' },
  { juz: 30, name: '\'Amma Yatasa\'aloon', arabic: 'عَمَّ يَتَسَاءَلُونَ', startSurah: 'An-Naba 1', endSurah: 'An-Nas 6' }
];

export const TAJWEED_RULES = [
  {
    title: 'Noon Sakinah & Tanween',
    arabic: 'أحكام النون الساكنة والتنوين',
    types: ['Izhar (Clear)', 'Idgham (Merging)', 'Iqlab (Conversion to Meem)', 'Ikhfa (Concealment)'],
    description: 'Fundamental phonetic transitions when Noon with Sukun or Nunation meets the letters of the alphabet.'
  },
  {
    title: 'Meem Sakinah Rules',
    arabic: 'أحكام الميم الساكنة',
    types: ['Ikhfa Shafawi', 'Idgham Shafawi', 'Izhar Shafawi'],
    description: 'Labial articulation rules determining nasalization and clarity.'
  },
  {
    title: 'Ahkam Al-Madd (Elongation)',
    arabic: 'أحكام المد',
    types: ['Madd Asli / Tabee\'i (2 Harakah)', 'Madd Wajib Muttasil (4-5)', 'Madd Ja\'iz Munfasil (2-5)', 'Madd Lazim (6 Harakah)'],
    description: 'Rhythmic stretching of vowel sounds crucial for canonical recitation meter.'
  },
  {
    title: 'Makharij & Sifat',
    arabic: 'مخارج الحروف وصفاتها',
    types: ['Halq (Throat)', 'Lisan (Tongue)', 'Shafatayn (Lips)', 'Khayshoom (Nasal)', 'Jawf (Oral Cavity)'],
    description: 'Exact biological articulation points and acoustic qualities (Qalqalah, Hams, Jahr, Isti\'la).'
  }
];

export const DEFAULT_SITE_CONTENT = {
  heroBadge: 'Vision 2030 Regional Excellence • Chiro, Ethiopia',
  heroTitle: 'Preserving the Divine Words with Precision & Character',
  heroSub: 'Markazul Furqan in Chiro provides rigorous Sabaq, Sabqi, and Manzil instruction, authentic Tajweed, and comprehensive Arabic language under the direct leadership of Ustaz Kadir Hamza Siyum.',
  quranAyahArabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ • وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا',
  quranAyahTranslation: '"And recite the Qur\'an with measured, rhythmic recitation." — Surah Al-Muzzammil (73:4)',
  targetAmountETB: 4500000,
  baseCollectedETB: 1890000,
  studentSponsorshipETB: 12000,
  classroomEndowmentETB: 150000,
  telebirrNumber: '+251935097339',
  cbeAccount: '1000123456789',
  awashAccount: '01320495830200',
  directorName: 'Ustaz Kadir Hamza Siyum',
  directorTitle: 'Founder & Directorate Chair',
  directorQuote: 'Our mission is to produce individuals who do not merely memorize the letter of the text, but embody the character, ethics, and mercy of the Holy Qur\'an with academic excellence.',
  contactPhone: '+251935097339',
  contactEmail: 'markazalfurqan19@gmail.com',
  campusLocation: 'Adjacent to Grand Jame\'a Mosque, Central Chiro, West Hararghe, Oromia, Ethiopia',
  visitingHours: 'Saturday – Thursday: 8:00 AM – 6:00 PM (Friday: After Jum\'ah prayer)'
};

export const OFFICIAL_LOGO_URL = '/assets/aistudio/loog_6003b99d.jpg';

