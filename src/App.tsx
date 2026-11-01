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
  UserSession 
} from './types';
import { 
  INITIAL_STUDENTS, 
  INITIAL_LOGS, 
  INITIAL_ADMISSIONS, 
  INITIAL_PLEDGES 
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
import { AcademicPortal } from './components/portal/AcademicPortal';

export default function App() {
  // Navigation tab: 'home' | 'portal'
  const [currentTab, setCurrentTab] = useState<'home' | 'portal'>('home');

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
    if (currentUser) {
      localStorage.setItem('mf_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('mf_user');
    }
  }, [currentUser]);

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
    await dispatchToCloudWebhook({
      action: 'NEW_STUDENT_ENROLLED',
      student: newStudent,
      timestamp: new Date().toISOString()
    });
  };

  // Delete student
  const handleDeleteStudent = (id: string) => {
    setStudents(prev => prev.filter(s => s.id !== id));
  };

  // Add Hifz Log
  const handleAddHifzLog = async (logData: Omit<HifzLog, 'id' | 'date'>) => {
    const newLog: HifzLog = {
      ...logData,
      id: 'log-' + Date.now(),
      date: new Date().toISOString().slice(0, 10)
    };

    setHifzLogs(prev => [newLog, ...prev]);

    // Update current student's focus if needed
    setStudents(prev => prev.map(st => {
      if (st.code === logData.studentCode) {
        return {
          ...st,
          currentSurah: logData.sabaqRange
        };
      }
      return st;
    }));

    await dispatchToCloudWebhook({
      action: 'LOG_HIFZ',
      ...newLog
    });
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

    // Also optimistically enroll as candidate student into the roster
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

    await dispatchToCloudWebhook({
      action: 'NEW_ADMISSION',
      ...newAdm,
      assignedCode: candidateCode
    });
  };

  // Approve Admission Application
  const handleApproveAdmission = (admissionId: string) => {
    setAdmissions(prev => prev.map(a => a.id === admissionId ? { ...a, status: 'APPROVED' } : a));
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

    await dispatchToCloudWebhook({
      action: 'DONATION_PLEDGE',
      ...newPledge
    });
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
  };

  // Export JSON Full Backup
  const handleExportJSON = () => {
    const backupData = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      institution: 'Markazul Furqan Quran Memorization Center - Chiro, Ethiopia',
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
  };

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Import JSON Backup
  const handleImportJSON = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target?.result as string);
        if (parsed.students && Array.isArray(parsed.students)) {
          setStudents(parsed.students);
        }
        if (parsed.hifzLogs && Array.isArray(parsed.hifzLogs)) {
          setHifzLogs(parsed.hifzLogs);
        }
        if (parsed.admissions && Array.isArray(parsed.admissions)) {
          setAdmissions(parsed.admissions);
        }
        if (parsed.pledges && Array.isArray(parsed.pledges)) {
          setPledges(parsed.pledges);
        }
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
    localStorage.removeItem('mf_students');
    localStorage.removeItem('mf_hifz_logs');
    localStorage.removeItem('mf_admissions');
    localStorage.removeItem('mf_pledges');
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
            />

            <StatsBanner totalStudents={students.length} />

            <Vision2030
              onOpenPledgeModal={() => setShowPledgeModal(true)}
              pledges={pledges}
            />

            <Curriculum
              onOpenAdmission={() => setShowAdmissionModal(true)}
            />

            <QuranReference />

            <Leadership />

            <ContactSection />
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
        }}
      />

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
