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
  {
    id: 'log-1',
    studentId: 'st-1',
    studentCode: 'MF-2018-01',
    studentName: 'Abdulmalik Ahmed Mohammed',
    date: '2026-10-31',
    sabaqRange: 'Surah Al-Mulk (Ayah 1-30)',
    sabqiJuz: 27,
    manzilJuz: 12,
    grade: 'MUMTAZ',
    notes: 'Flawless recitation with outstanding rhythm and tajweed rules.',
    muallimName: 'Mu\'allim Ziyad Abdullahi'
  },
  {
    id: 'log-2',
    studentId: 'st-3',
    studentCode: 'MF-2018-03',
    studentName: 'Hamza Kadir Ibrahim',
    date: '2026-10-31',
    sabaqRange: 'Surah Al-Hijr (Ayah 1-40)',
    sabqiJuz: 13,
    manzilJuz: 5,
    grade: 'JAYYID_JIDDAN',
    notes: 'Minor stop error on Ayah 23 corrected immediately.',
    muallimName: 'Mu\'allim Idris Shenkute'
  },
  {
    id: 'log-3',
    studentId: 'st-4',
    studentCode: 'MF-2018-04',
    studentName: 'Zubayr Usman Ali',
    date: '2026-10-30',
    sabaqRange: 'Surah Al-A\'raf (Ayah 50-80)',
    sabqiJuz: 6,
    manzilJuz: 2,
    grade: 'JAYYID',
    notes: 'Reinforced Ghunnah in Noon Mushaddadah during revision.',
    muallimName: 'Mu\'allim Ziyad Abdullahi'
  },
  {
    id: 'log-4',
    studentId: 'st-5',
    studentCode: 'MF-2018-05',
    studentName: 'Fathima Jibril Omar',
    date: '2026-10-30',
    sabaqRange: 'Surah Al-Ahzab (Ayah 1-35)',
    sabqiJuz: 21,
    manzilJuz: 9,
    grade: 'MUMTAZ',
    notes: 'Perfect pitch, beautiful Tarteel, exemplary discipline.',
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
