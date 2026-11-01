/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Student, 
  HifzLog, 
  AdmissionApplication, 
  DonationPledge, 
  CloudConfig, 
  UserSession,
  SiteContentConfig
} from './types';
import { 
  INITIAL_STUDENTS, 
  INITIAL_LOGS, 
  INITIAL_ADMISSIONS, 
  INITIAL_PLEDGES,
  DEFAULT_SITE_CONTENT
} from './data/initialData';

import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { StatsBanner } from './components/StatsBanner';
import { Vision2030 } from './components/Vision2030';
import { Curriculum } from './components/Curriculum';
import { QuranReference } from './components/QuranReference';
import { Leadership } from './components/Leadership';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

import { AdmissionModal } from './components/AdmissionModal';
import { PledgeModal } from './components/PledgeModal';
import { CloudConfigModal } from './components/CloudConfigModal';
import { AuthModal } from './components/AuthModal';
import { OwnerEditModal } from './components/OwnerEditModal';
import { AcademicPortal } from './components/portal/AcademicPortal';
import { db, testFirestoreConnection } from './lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Edit3 } from 'lucide-react';

export default function App() {
  // Navigation tab: 'home' | 'portal'
  const [currentTab, setCurrentTab] = useState<'home' | 'portal'>('home');

  // Owner live editing mode state
  const [isOwnerMode, setIsOwnerMode] = useState<boolean>(() => {
    return localStorage.getItem('mf_owner_mode') === 'true';
  });

  const [showOwnerEditModal, setShowOwnerEditModal] = useState(false);
  const [ownerEditInitialTab, setOwnerEditInitialTab] = useState<'HERO' | 'CAMPAIGN' | 'DIRECTOR' | 'CONTACT'>('HERO');

  // Live Website Content state
  const [siteContent, setSiteContent] = useState<SiteContentConfig>(() => {
    const saved = localStorage.getItem('mf_site_content');
    return saved ? JSON.parse(saved) : DEFAULT_SITE_CONTENT;
  });

  // Data states with localStorage persistence
  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem('mf_students');
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  const [hifzLogs, setHifzLogs] = useState<HifzLog[]>(() => {
    const saved = localStorage.getItem('mf_hifz_logs');
    return saved ? JSON.parse(saved) : INITIAL_LOGS;
  });

  const [admissions, setAdmissions] = useState<AdmissionApplication[]>(() => {
    const saved = localStorage.getItem('mf_admissions');
    return saved ? JSON.parse(saved) : INITIAL_ADMISSIONS;
  });

  const [pledges, setPledges] = useState<DonationPledge[]>(() => {
    const saved = localStorage.getItem('mf_pledges');
    return saved ? JSON.parse(saved) : INITIAL_PLEDGES;
  });

  const [cloudConfig, setCloudConfig] = useState<CloudConfig>(() => {
    const saved = localStorage.getItem('mf_cloud_config');
    return saved ? JSON.parse(saved) : {
      googleScriptUrl: localStorage.getItem('mf_script_url') || '',
      supabaseUrl: localStorage.getItem('mf_sp_url') || '',
      supabaseKey: localStorage.getItem('mf_sp_key') || ''
    };
  });

  const [currentUser, setCurrentUser] = useState<UserSession | null>(() => {
    const saved = localStorage.getItem('mf_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Modal triggers
  const [showAdmissionModal, setShowAdmissionModal] = useState(false);
  const [showPledgeModal, setShowPledgeModal] = useState(false);
  const [showCloudConfigModal, setShowCloudConfigModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('mf_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('mf_hifz_logs', JSON.stringify(hifzLogs));
  }, [hifzLogs]);

  useEffect(() => {
    localStorage.setItem('mf_admissions', JSON.stringify(admissions));
  }, [admissions]);

  useEffect(() => {
    localStorage.setItem('mf_pledges', JSON.stringify(pledges));
  }, [pledges]);

  useEffect(() => {
    localStorage.setItem('mf_cloud_config', JSON.stringify(cloudConfig));
  }, [cloudConfig]);

  useEffect(() => {
    localStorage.setItem('mf_owner_mode', String(isOwnerMode));
  }, [isOwnerMode]);

  useEffect(() => {
    localStorage.setItem('mf_site_content', JSON.stringify(siteContent));
  }, [siteContent]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('mf_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('mf_user');
    }
  }, [currentUser]);

  // Check Firestore connection and load any remote site configuration
  useEffect(() => {
    testFirestoreConnection();

    // Attempt to load live site config from Firestore if available
    const loadRemoteConfig = async () => {
      try {
        const docRef = doc(db, 'site_config', 'main');
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          setSiteContent(snap.data() as SiteContentConfig);
        }
      } catch (err) {
        // Fallback gracefully to local storage
      }
    };
    loadRemoteConfig();
  }, []);

  // Save Site Content
  const handleSaveSiteContent = async (newContent: SiteContentConfig) => {
    setSiteContent(newContent);
    try {
      // Persist to Firestore
      const docRef = doc(db, 'site_config', 'main');
      await setDoc(docRef, newContent, { merge: true });
    } catch (err) {
      console.warn('Firestore sync note:', err);
    }
    showToast('Website content updated and published live!');
  };

  // Reset Site Content
  const handleResetSiteContent = () => {
    setSiteContent(DEFAULT_SITE_CONTENT);
    localStorage.removeItem('mf_site_content');
    showToast('Website content restored to default!');
    setShowOwnerEditModal(false);
  };

  const openEditorAtTab = (tab: 'HERO' | 'CAMPAIGN' | 'DIRECTOR' | 'CONTACT') => {
    setOwnerEditInitialTab(tab);
    setShowOwnerEditModal(true);
  };

  // Background Webhook Dispatch
  const dispatchToCloudWebhook = async (payload: any) => {
    if (!cloudConfig.googleScriptUrl) return;
    try {
      await fetch(cloudConfig.googleScriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      console.warn('Cloud webhook dispatch notice:', err);
    }
  };

  // Add new student
  const handleAddStudent = async (studentData: Omit<Student, 'id' | 'dailyAttendance'>) => {
    const newStudent: Student = {
      ...studentData,
      id: 'st-' + Date.now(),
      dailyAttendance: 96
    };
    setStudents(prev => [newStudent, ...prev]);

    // Save to Firestore
    try {
      await setDoc(doc(db, 'students', newStudent.id), newStudent);
    } catch (e) {
      console.warn('Firestore write note:', e);
    }

    await dispatchToCloudWebhook({
      action: 'NEW_STUDENT_ENROLLED',
      student: newStudent,
      timestamp: new Date().toISOString()
    });
    showToast(`Student ${newStudent.name} registered successfully!`);
  };

  // Delete student
  const handleDeleteStudent = (id: string) => {
    setStudents(prev => prev.filter(s => s.id !== id));
    showToast('Student removed from active roster.');
  };

  // Update Student Attendance
  const handleUpdateAttendance = async (updatedStudents: Student[]) => {
    setStudents(updatedStudents);
    localStorage.setItem('mf_students', JSON.stringify(updatedStudents));

    try {
      for (const st of updatedStudents) {
        await setDoc(doc(db, 'students', st.id), st);
      }
    } catch (e) {
      console.warn('Firestore attendance write note:', e);
    }
  };

  // Add Hifz Log
  const handleAddHifzLog = async (logData: Omit<HifzLog, 'id' | 'date'>) => {
    const newLog: HifzLog = {
      ...logData,
      id: 'log-' + Date.now(),
      date: new Date().toISOString().slice(0, 10)
    };

    setHifzLogs(prev => [newLog, ...prev]);

    // Update current student's focus
    setStudents(prev => prev.map(st => {
      if (st.code === logData.studentCode) {
        return {
          ...st,
          currentSurah: logData.sabaqRange
        };
      }
      return st;
    }));

    // Save to Firestore
    try {
      await setDoc(doc(db, 'hifz_logs', newLog.id), newLog);
    } catch (e) {
      console.warn('Firestore write note:', e);
    }

    await dispatchToCloudWebhook({
      action: 'LOG_HIFZ',
      ...newLog
    });
    showToast(`Sabaq logged for ${newLog.studentName}!`);
  };

  // Handle Admission Submission
  const handleAdmissionSubmit = async (formData: Omit<AdmissionApplication, 'id' | 'submissionDate' | 'status'>) => {
    const newAdm: AdmissionApplication = {
      ...formData,
      id: 'adm-' + Date.now(),
      submissionDate: new Date().toISOString().slice(0, 10),
      status: 'PENDING'
    };

    setAdmissions(prev => [newAdm, ...prev]);

    // Also enroll as candidate student into the roster
    const candidateCode = `MF-2018-${String(students.length + 1).padStart(2, '0')}`;
    const newStudent: Student = {
      id: 'st-' + Date.now(),
      code: candidateCode,
      name: formData.fullName,
      age: 12,
      guardianName: formData.guardianName,
      guardianPhone: formData.phone,
      juzLevel: Number(formData.priorJuz) || 0,
      currentSurah: 'Assessment Pending',
      status: 'ACTIVE',
      enrollmentDate: new Date().toISOString().slice(0, 10),
      track: formData.track,
      dailyAttendance: 95,
      notes: formData.notes
    };
    setStudents(prev => [newStudent, ...prev]);

    // Save to Firestore
    try {
      await setDoc(doc(db, 'admissions', newAdm.id), newAdm);
      await setDoc(doc(db, 'students', newStudent.id), newStudent);
    } catch (e) {
      console.warn('Firestore write note:', e);
    }

    await dispatchToCloudWebhook({
      action: 'NEW_ADMISSION',
      ...newAdm,
      assignedCode: candidateCode
    });
    showToast(`Application submitted for ${formData.fullName}!`);
  };

  // Approve Admission Application
  const handleApproveAdmission = (admissionId: string) => {
    setAdmissions(prev => prev.map(a => a.id === admissionId ? { ...a, status: 'APPROVED' } : a));
    showToast('Application approved and enrolled!');
  };

  // Handle Donation Pledge
  const handlePledgeSubmit = async (pledgeData: Omit<DonationPledge, 'id' | 'date' | 'isConfirmed'>) => {
    const newPledge: DonationPledge = {
      ...pledgeData,
      id: 'pl-' + Date.now(),
      date: new Date().toISOString().slice(0, 10),
      isConfirmed: true
    };
    setPledges(prev => [newPledge, ...prev]);

    // Save to Firestore
    try {
      await setDoc(doc(db, 'pledges', newPledge.id), newPledge);
    } catch (e) {
      console.warn('Firestore write note:', e);
    }

    await dispatchToCloudWebhook({
      action: 'DONATION_PLEDGE',
      ...newPledge
    });
    showToast(`Pledge of ETB ${newPledge.amountETB.toLocaleString()} recorded!`);
  };

  // Export CSV
  const handleExportCSV = () => {
    let csv = 'Student ID,Full Name,Age,Track,Current Juz,Guardian Name,Guardian Phone,Status,Attendance\n';
    students.forEach(s => {
      csv += `"${s.code}","${s.name}",${s.age},"${s.track}",${s.juzLevel},"${s.guardianName}","${s.guardianPhone}","${s.status}",${s.dailyAttendance}%\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Markazul_Furqan_Students_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('CSV export downloaded!');
  };

  // Export JSON Full Backup
  const handleExportJSON = () => {
    const backupData = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      institution: 'Markazul Furqan Quran Memorization Center - Chiro, Ethiopia',
      siteContent,
      students,
      hifzLogs,
      admissions,
      pledges,
      cloudConfig
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Markazul_Furqan_Backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('JSON backup archive downloaded!');
  };

  // Import JSON Backup
  const handleImportJSON = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target?.result as string);
        if (parsed.siteContent) setSiteContent(parsed.siteContent);
        if (parsed.students && Array.isArray(parsed.students)) setStudents(parsed.students);
        if (parsed.hifzLogs && Array.isArray(parsed.hifzLogs)) setHifzLogs(parsed.hifzLogs);
        if (parsed.admissions && Array.isArray(parsed.admissions)) setAdmissions(parsed.admissions);
        if (parsed.pledges && Array.isArray(parsed.pledges)) setPledges(parsed.pledges);
        showToast('Data successfully restored from backup file!');
      } catch (err) {
        showToast('Invalid JSON file format. Please check the file.');
      }
    };
    reader.readAsText(file);
  };

  // Reset demo records
  const handleResetData = () => {
    setStudents(INITIAL_STUDENTS);
    setHifzLogs(INITIAL_LOGS);
    setAdmissions(INITIAL_ADMISSIONS);
    setPledges(INITIAL_PLEDGES);
    setSiteContent(DEFAULT_SITE_CONTENT);
    localStorage.removeItem('mf_students');
    localStorage.removeItem('mf_hifz_logs');
    localStorage.removeItem('mf_admissions');
    localStorage.removeItem('mf_pledges');
    localStorage.removeItem('mf_site_content');
    showToast('Reset to demo records.');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] text-[#212529]">
      {/* 1. HEADER */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        currentUser={currentUser}
        onOpenAuth={() => setShowAuthModal(true)}
        onLogout={() => setCurrentUser(null)}
        onOpenCloudConfig={() => setShowCloudConfigModal(true)}
        onOpenAdmission={() => setShowAdmissionModal(true)}
        isOwnerMode={isOwnerMode}
        onToggleOwnerMode={() => {
          setIsOwnerMode(!isOwnerMode);
          showToast(!isOwnerMode ? 'Owner Editing Mode Enabled! Edit buttons are active.' : 'Owner Editing Mode Disabled.');
        }}
        onOpenOwnerEdit={() => openEditorAtTab('HERO')}
      />

      {/* 2. BODY CONTENT (PUBLIC OR PORTAL) */}
      <main className="flex-1">
        {currentTab === 'home' ? (
          <>
            <Hero
              onOpenAdmission={() => setShowAdmissionModal(true)}
              onGoToPortal={() => setCurrentTab('portal')}
              onGoToCampaign={() => {
                const el = document.getElementById('campaign');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              siteContent={siteContent}
              isOwnerMode={isOwnerMode}
              onEditHero={() => openEditorAtTab('HERO')}
            />

            <StatsBanner totalStudents={students.length} />

            <Vision2030
              onOpenPledgeModal={() => setShowPledgeModal(true)}
              pledges={pledges}
              siteContent={siteContent}
              isOwnerMode={isOwnerMode}
              onEditCampaign={() => openEditorAtTab('CAMPAIGN')}
            />

            <Curriculum
              onOpenAdmission={() => setShowAdmissionModal(true)}
            />

            <QuranReference />

            <Leadership
              siteContent={siteContent}
              isOwnerMode={isOwnerMode}
              onEditLeadership={() => openEditorAtTab('DIRECTOR')}
            />

            <ContactSection
              siteContent={siteContent}
              isOwnerMode={isOwnerMode}
              onEditContact={() => openEditorAtTab('CONTACT')}
            />
          </>
        ) : (
          <AcademicPortal
            students={students}
            onAddStudent={handleAddStudent}
            onDeleteStudent={handleDeleteStudent}
            hifzLogs={hifzLogs}
            onAddHifzLog={handleAddHifzLog}
            admissions={admissions}
            onApproveAdmission={handleApproveAdmission}
            pledges={pledges}
            cloudConfig={cloudConfig}
            onOpenCloudConfig={() => setShowCloudConfigModal(true)}
            onExitPortal={() => setCurrentTab('home')}
            currentUser={currentUser}
            onExportCSV={handleExportCSV}
            onExportJSON={handleExportJSON}
            onImportJSON={handleImportJSON}
            onResetData={handleResetData}
            onShowToast={showToast}
            onUpdateAttendance={handleUpdateAttendance}
          />
        )}
      </main>

      {/* 3. FOOTER */}
      <Footer
        onGoToPortal={() => setCurrentTab('portal')}
        onOpenAdmission={() => setShowAdmissionModal(true)}
        onOpenCloudConfig={() => setShowCloudConfigModal(true)}
      />

      {/* 4. MODALS */}
      <AdmissionModal
        isOpen={showAdmissionModal}
        onClose={() => setShowAdmissionModal(false)}
        onSubmit={handleAdmissionSubmit}
      />

      <PledgeModal
        isOpen={showPledgeModal}
        onClose={() => setShowPledgeModal(false)}
        onSubmit={handlePledgeSubmit}
      />

      <CloudConfigModal
        isOpen={showCloudConfigModal}
        onClose={() => setShowCloudConfigModal(false)}
        config={cloudConfig}
        onSave={(cfg) => setCloudConfig(cfg)}
      />

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLogin={(user) => {
          setCurrentUser(user);
          setCurrentTab('portal');
          showToast(`Welcome, ${user.name}!`);
        }}
      />

      <OwnerEditModal
        isOpen={showOwnerEditModal}
        onClose={() => setShowOwnerEditModal(false)}
        siteContent={siteContent}
        onSave={handleSaveSiteContent}
        onReset={handleResetSiteContent}
        initialTab={ownerEditInitialTab}
      />

      {/* Persistent Floating Owner Controls (no-print) */}
      <div className="fixed bottom-6 left-6 z-40 no-print flex flex-col sm:flex-row items-start sm:items-center gap-2">
        <button
          onClick={() => {
            const next = !isOwnerMode;
            setIsOwnerMode(next);
            localStorage.setItem('mf_owner_mode', String(next));
            showToast(next ? 'Owner Editing Mode Enabled! Edit buttons now visible.' : 'Owner Editing Mode Disabled');
          }}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-full text-xs font-black shadow-2xl transition border cursor-pointer ${
            isOwnerMode
              ? 'bg-[#D4AF37] text-gray-950 border-amber-300 ring-2 ring-amber-300 ring-offset-2'
              : 'bg-[#0A3622] hover:bg-[#0F5132] text-[#D4AF37] border-[#D4AF37]/50'
          }`}
          title="Toggle Owner Website Editing Mode"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>{isOwnerMode ? 'Owner Editing: ACTIVE' : 'Owner Edit Mode'}</span>
        </button>

        {isOwnerMode && (
          <button
            onClick={() => {
              setOwnerEditInitialTab('HERO');
              setShowOwnerEditModal(true);
            }}
            className="flex items-center gap-1 px-3.5 py-2 rounded-full text-xs font-black bg-white text-emerald-900 border border-emerald-300 shadow-xl hover:bg-emerald-50 transition cursor-pointer"
            title="Open Complete Website Content Editor"
          >
            <span>Edit Site Content</span>
          </button>
        )}
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0A3622] text-[#D4AF37] border-2 border-[#D4AF37] px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
          <span className="text-xs font-bold text-white">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
