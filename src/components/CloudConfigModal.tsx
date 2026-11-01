import React, { useState } from 'react';
import { X, Cloud, CheckCircle2, Copy, Check, ExternalLink, RefreshCw } from 'lucide-react';
import { CloudConfig } from '../types';

interface CloudConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: CloudConfig;
  onSave: (config: CloudConfig) => void;
}

export const CloudConfigModal: React.FC<CloudConfigModalProps> = ({
  isOpen,
  onClose,
  config,
  onSave
}) => {
  const [formData, setFormData] = useState<CloudConfig>({ ...config });
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);
  const [showScriptHelper, setShowScriptHelper] = useState(false);
  const [copiedScript, setCopiedScript] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const handleTestPing = async () => {
    if (!formData.googleScriptUrl) {
      setTestResult('Please enter a Google Apps Script Webhook URL first.');
      return;
    }
    setTesting(true);
    setTestResult(null);
    try {
      // Send a test ping payload
      await fetch(formData.googleScriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'TEST_PING',
          center: 'Markazul Furqan Chiro',
          timestamp: new Date().toISOString()
        })
      });
      setTestResult('Connection ping dispatched! In no-cors mode, the request was transmitted to your Apps Script endpoint.');
    } catch (err: any) {
      setTestResult('Error reaching endpoint: ' + (err.message || 'Network error'));
    } finally {
      setTesting(false);
    }
  };

  const sampleAppsScriptCode = `// Google Apps Script for Markazul Furqan Google Sheets Sync
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    if (data.action === "NEW_ADMISSION") {
      sheet.appendRow([new Date(), "ADMISSION", data.fullName, data.phone, data.guardianName, data.track, data.priorJuz, data.paymentChannel]);
    } else if (data.action === "LOG_HIFZ") {
      sheet.appendRow([new Date(), "HIFZ_LOG", data.studentCode, data.studentName, data.sabaqRange, data.sabqiJuz, data.manzilJuz, data.grade, data.notes]);
    }
    
    return ContentService.createTextOutput(JSON.stringify({ status: "SUCCESS" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "ERROR", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`;

  const copyScript = () => {
    navigator.clipboard.writeText(sampleAppsScriptCode);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-gray-100 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b border-gray-100 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-[#0F5132] flex items-center justify-center">
              <Cloud className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-gray-900 leading-tight">
                Cloud & Google Integration
              </h3>
              <p className="text-[11px] text-gray-500">Live sync admissions & Hifz logs to Google Sheets</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-gray-600 mb-4 leading-relaxed">
          Provide your deployed Google Apps Script Web App URL below. When configured, new student admissions and daily Sabaq logs will automatically synchronize to your Google Sheet in the cloud.
        </p>

        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-gray-700 mb-1">
              Google Apps Script Webhook URL
            </label>
            <input
              type="url"
              value={formData.googleScriptUrl}
              onChange={(e) => setFormData({ ...formData, googleScriptUrl: e.target.value })}
              placeholder="https://script.google.com/macros/s/AKfycb.../exec"
              className="w-full border border-gray-300 rounded-xl p-2.5 focus:outline-none focus:border-[#0F5132] font-mono text-[11px]"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handleTestPing}
              disabled={testing || !formData.googleScriptUrl}
              className="text-xs font-bold text-[#0F5132] bg-emerald-50 hover:bg-emerald-100 px-3.5 py-2 rounded-xl border border-emerald-200 transition flex items-center gap-1.5 disabled:opacity-40"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${testing ? 'animate-spin' : ''}`} />
              <span>{testing ? 'Testing...' : 'Test Endpoint Connection'}</span>
            </button>

            <button
              type="button"
              onClick={() => setShowScriptHelper(!showScriptHelper)}
              className="text-xs font-bold text-gray-600 hover:text-gray-900 flex items-center gap-1"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>{showScriptHelper ? 'Hide Script Code' : 'View Apps Script Code'}</span>
            </button>
          </div>

          {testResult && (
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-[11px] text-gray-700">
              {testResult}
            </div>
          )}

          {showScriptHelper && (
            <div className="bg-slate-900 text-slate-100 p-4 rounded-2xl relative text-[11px] font-mono">
              <div className="flex justify-between items-center pb-2 mb-2 border-b border-slate-700">
                <span className="text-slate-400">Google Apps Script snippet:</span>
                <button
                  onClick={copyScript}
                  className="text-xs bg-slate-800 hover:bg-slate-700 text-white px-2.5 py-1 rounded-lg flex items-center gap-1"
                >
                  {copiedScript ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedScript ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="overflow-x-auto text-[10px] max-h-40 leading-relaxed custom-scrollbar">
                {sampleAppsScriptCode}
              </pre>
            </div>
          )}

          <div className="border-t border-gray-200 pt-3">
            <label className="block font-bold text-gray-700 mb-1">
              Optional Supabase Database URL
            </label>
            <input
              type="text"
              value={formData.supabaseUrl}
              onChange={(e) => setFormData({ ...formData, supabaseUrl: e.target.value })}
              placeholder="https://xyz.supabase.co"
              className="w-full border border-gray-300 rounded-xl p-2.5 focus:outline-none focus:border-[#0F5132] font-mono text-[11px]"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">
              Optional Supabase Anon Public Key
            </label>
            <input
              type="password"
              value={formData.supabaseKey}
              onChange={(e) => setFormData({ ...formData, supabaseKey: e.target.value })}
              placeholder="eyJhbGciOi..."
              className="w-full border border-gray-300 rounded-xl p-2.5 focus:outline-none focus:border-[#0F5132] font-mono text-[11px]"
            />
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={handleSave}
              className="w-full bg-[#0F5132] hover:bg-[#0A3622] text-white font-extrabold py-3 rounded-xl transition shadow flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
              <span>Save Cloud Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
