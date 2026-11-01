export type Grade = 'MUMTAZ' | 'JAYYID_JIDDAN' | 'JAYYID' | 'MAQBUL';

export type AcademicTrack = 'HIFZ' | 'TAJWEED' | 'ARABIC' | 'WEEKEND';

export type StudentStatus = 'ACTIVE' | 'REVISION' | 'KHATM_TRACK' | 'GRADUATED';

export interface Student {
  id: string;
  code: string;
  name: string;
  age: number;
  guardianName: string;
  guardianPhone: string;
  juzLevel: number; // 0 to 30
  currentSurah: string;
  status: StudentStatus;
  enrollmentDate: string;
  track: AcademicTrack;
  notes?: string;
  dailyAttendance: number; // percentage
}

export interface HifzLog {
  id: string;
  studentId: string;
  studentCode: string;
  studentName: string;
  date: string;
  sabaqRange: string; // e.g. "Surah Al-Baqarah 1-25"
  sabqiJuz: number;   // e.g. 2
  manzilJuz: number;  // e.g. 28
  grade: Grade;
  notes: string;
  muallimName: string;
}

export interface AdmissionApplication {
  id: string;
  fullName: string;
  phone: string;
  guardianName: string;
  track: AcademicTrack;
  priorJuz: number;
  paymentChannel: 'TELEBIRR' | 'CBE' | 'AWASH' | 'CASH';
  submissionDate: string;
  status: 'PENDING' | 'APPROVED' | 'CONTACTED';
  notes?: string;
}

export interface DonationPledge {
  id: string;
  donorName: string;
  phoneOrEmail: string;
  amountETB: number;
  tier: string;
  channel: string;
  referenceNumber?: string;
  date: string;
  isConfirmed: boolean;
}

export interface CloudConfig {
  googleScriptUrl: string;
  supabaseUrl: string;
  supabaseKey: string;
  lastSynced?: string;
}

export interface UserSession {
  name: string;
  email: string;
  role: 'DIRECTOR' | 'MUALLIM' | 'ADMIN';
  isGoogleAuth?: boolean;
}

export interface SiteContentConfig {
  heroBadge: string;
  heroTitle: string;
  heroSub: string;
  quranAyahArabic: string;
  quranAyahTranslation: string;
  targetAmountETB: number;
  baseCollectedETB: number;
  studentSponsorshipETB: number;
  classroomEndowmentETB: number;
  telebirrNumber: string;
  cbeAccount: string;
  awashAccount: string;
  directorName: string;
  directorTitle: string;
  directorQuote: string;
  contactPhone: string;
  contactEmail: string;
  campusLocation: string;
  visitingHours: string;
}
