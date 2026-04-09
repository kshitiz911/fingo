import React, { useState } from 'react';
import {
  Settings as SettingsIcon, User, CreditCard, Shield, BarChart2,
  TrendingUp, Palette, Link2, MessageSquarePlus, HelpCircle,
  RefreshCw, Mail, Slack, Monitor, Bell, AlertTriangle, Info, Plus
} from 'lucide-react';

// ── Settings sidebar nav
const SETTINGS_NAV = [
  { label: 'General',            icon: SettingsIcon },
  { label: 'Account',            icon: User },
  { label: 'Payments & Cards',   icon: CreditCard },
  { label: 'Privacy & Security', icon: Shield },
  { label: 'Fin Preferences',    icon: BarChart2 },
  { label: 'Insc & Investments', icon: TrendingUp },
  { label: 'Personalisation',    icon: Palette },
  { label: 'Integrations',       icon: Link2 },
];

// ── Toggle switch
const Toggle = ({ on, onChange }) => (
  <button onClick={() => onChange(!on)}
    className={`w-11 h-6 rounded-full relative transition-colors duration-200 shrink-0 ${on ? 'bg-primary' : 'bg-slate-200'}`}>
    <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all duration-200 shadow-sm ${on ? 'left-5' : 'left-0.5'}`} />
  </button>
);

// ── Checkbox
const Checkbox = ({ checked, onChange, label }) => (
  <label className="flex items-center gap-2.5 cursor-pointer select-none">
    <div onClick={() => onChange(!checked)}
      className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors shrink-0
        ${checked ? 'bg-primary border-primary' : 'border-slate-300 bg-white'}`}>
      {checked && (
        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
          <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </div>
    <span className="text-sm text-navy">{label}</span>
  </label>
);

// ── Connected badge
const ConnectedBadge = () => (
  <span className="text-[11px] font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">Connected</span>
);

// ── Section wrapper
const Section = ({ title, sub, children }) => (
  <div className="bg-white rounded-2xl p-6" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
    <h2 className="text-lg font-bold text-navy">{title}</h2>
    {sub && <p className="text-sm text-muted mt-0.5 mb-5">{sub}</p>}
    {!sub && <div className="mb-5" />}
    {children}
  </div>
);

// ── Main
export default function Settings() {
  const [activeNav,   setActiveNav]   = useState('General');
  const [layout,      setLayout]      = useState('compact');
  const [refreshRate, setRefreshRate] = useState('Real-time (auto-sync)');

  const [sources, setSources] = useState({
    sap: true, oracle: false, tally: true, quickbooks: true, zoho: false,
    hdfc: true, razorpay: true, stripe: false, bamboo: false, adp: false,
  });

  const [reportFmt, setReportFmt] = useState({ text: true, charts: true, pivot: false });
  const [exportFmt, setExportFmt] = useState({ excel: true, csv: false, pdf: true, ppt: true });
  const [alerts,    setAlerts]    = useState({ email: true, slack: true, teams: false, push: true });
  const [emailFreq, setEmailFreq] = useState('Instant');

  const toggleSource = (k) => setSources((s) => ({ ...s, [k]: !s[k] }));
  const toggleReport = (k) => setReportFmt((s) => ({ ...s, [k]: !s[k] }));
  const toggleExport = (k) => setExportFmt((s) => ({ ...s, [k]: !s[k] }));
  const toggleAlert  = (k) => setAlerts((s)  => ({ ...s, [k]: !s[k] }));

  const LAYOUTS = [
    {
      id: 'compact', label: 'Compact View', sub: 'KPI snapshots, minimal details',
      preview: (
        <div className="flex flex-col gap-1.5 items-center">
          <div className="flex gap-1">
            {['bg-red-400','bg-yellow-400','bg-green-400'].map((c,i) => (
              <div key={i} className={`w-5 h-3 rounded-sm ${c}`} />
            ))}
          </div>
          <div className="flex gap-1">
            {['bg-blue-400','bg-purple-400','bg-pink-400'].map((c,i) => (
              <div key={i} className={`w-5 h-3 rounded-sm ${c}`} />
            ))}
          </div>
          <p className="text-[9px] text-muted mt-1">KPI Cards</p>
        </div>
      ),
    },
    {
      id: 'detailed', label: 'Detailed View', sub: 'Transaction-level insights',
      preview: (
        <div className="flex flex-col gap-1 items-center">
          {[1,2,3].map((i) => <div key={i} className="w-16 h-1.5 bg-slate-300 rounded-full" />)}
          <p className="text-[9px] text-muted mt-1">Detailed Tables</p>
        </div>
      ),
    },
    {
      id: 'executive', label: 'Executive Summary', sub: 'High-level financial health',
      preview: (
        <div className="flex flex-col gap-1 items-center">
          <div className="w-8 h-8 rounded-full border-4 border-purple-300 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-purple-400" />
          </div>
          <p className="text-[9px] text-muted mt-1">Executive</p>
        </div>
      ),
    },
  ];

  return (
    <div className="flex gap-0 -m-6 min-h-[calc(100vh-64px)]">

      {/* Settings sidebar */}
      <aside className="w-48 shrink-0 bg-white border-r border-slate-100 flex flex-col py-4 px-2">
        <nav className="flex flex-col gap-0.5 flex-1">
          {SETTINGS_NAV.map(({ label, icon: Icon }) => (
            <button key={label} onClick={() => setActiveNav(label)}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-medium
                          transition-all w-full text-left
                ${activeNav === label ? 'bg-navy text-white' : 'text-navy hover:bg-slate-50'}`}>
              <Icon size={15} className={activeNav === label ? 'text-white' : 'text-muted'} />
              {label}
            </button>
          ))}
        </nav>
        <div className="flex flex-col gap-0.5 border-t border-slate-100 pt-3 mt-2">
          <button className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-medium text-navy hover:bg-slate-50 transition w-full text-left">
            <MessageSquarePlus size={15} className="text-muted" /> Feature Request
          </button>
          <button className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-medium text-navy hover:bg-slate-50 transition w-full text-left">
            <HelpCircle size={15} className="text-muted" /> Help & Support
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 p-6 flex flex-col gap-5 overflow-auto">

        {/* 1. Dashboard Layout Options */}
        <Section title="Dashboard Layout Options" sub="Choose your preferred view mode for the main dashboard">
          <div className="grid grid-cols-3 gap-4">
            {LAYOUTS.map((l) => (
              <button key={l.id} onClick={() => setLayout(l.id)}
                className={`rounded-2xl border-2 p-4 text-left transition-all
                  ${layout === l.id ? 'border-primary bg-blue-50/40' : 'border-slate-200 bg-white hover:border-slate-300'}`}>
                <div className="h-28 bg-slate-50 rounded-xl mb-4 flex items-center justify-center">
                  {l.preview}
                </div>
                <div className="flex items-start gap-2">
                  <div className={`w-4 h-4 rounded-full border-2 mt-0.5 shrink-0 flex items-center justify-center
                    ${layout === l.id ? 'border-primary' : 'border-slate-300'}`}>
                    {layout === l.id && <div className="w-2 h-2 rounded-full bg-primary" />}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-navy">{l.label}</p>
                    <p className="text-xs text-muted mt-0.5">{l.sub}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </Section>

        {/* 2. Default Data Sources */}
        <Section title="Default Data Sources" sub="Select which systems to sync with your dashboard">
          <div className="grid grid-cols-2 gap-8">
            {/* Left */}
            <div className="flex flex-col gap-5">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Monitor size={15} className="text-primary" />
                  <p className="text-sm font-bold text-navy">ERP Systems</p>
                </div>
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center justify-between">
                    <Checkbox checked={sources.sap} onChange={() => toggleSource('sap')} label="SAP ERP" />
                    {sources.sap && <ConnectedBadge />}
                  </div>
                  <Checkbox checked={sources.oracle} onChange={() => toggleSource('oracle')} label="Oracle NetSuite" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <BarChart2 size={15} className="text-green-600" />
                  <p className="text-sm font-bold text-navy">Accounting Software</p>
                </div>
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center justify-between">
                    <Checkbox checked={sources.tally} onChange={() => toggleSource('tally')} label="Tally Prime" />
                    {sources.tally && <ConnectedBadge />}
                  </div>
                  <div className="flex items-center justify-between">
                    <Checkbox checked={sources.quickbooks} onChange={() => toggleSource('quickbooks')} label="QuickBooks" />
                    {sources.quickbooks && <ConnectedBadge />}
                  </div>
                  <Checkbox checked={sources.zoho} onChange={() => toggleSource('zoho')} label="Zoho Books" />
                </div>
              </div>
            </div>
            {/* Right */}
            <div className="flex flex-col gap-5">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <CreditCard size={15} className="text-blue-600" />
                  <p className="text-sm font-bold text-navy">Banking & Payments</p>
                </div>
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center justify-between">
                    <Checkbox checked={sources.hdfc} onChange={() => toggleSource('hdfc')} label="HDFC Bank API" />
                    {sources.hdfc && <ConnectedBadge />}
                  </div>
                  <div className="flex items-center justify-between">
                    <Checkbox checked={sources.razorpay} onChange={() => toggleSource('razorpay')} label="Razorpay" />
                    {sources.razorpay && <ConnectedBadge />}
                  </div>
                  <Checkbox checked={sources.stripe} onChange={() => toggleSource('stripe')} label="Stripe" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <User size={15} className="text-orange-500" />
                  <p className="text-sm font-bold text-navy">HR & Payroll</p>
                </div>
                <div className="flex flex-col gap-2.5">
                  <Checkbox checked={sources.bamboo} onChange={() => toggleSource('bamboo')} label="BambooHR" />
                  <Checkbox checked={sources.adp} onChange={() => toggleSource('adp')} label="ADP Payroll" />
                </div>
              </div>
            </div>
          </div>
          <button className="flex items-center gap-1.5 text-sm font-semibold text-primary mt-5 hover:underline">
            <Plus size={14} /> Add Custom Source
          </button>
        </Section>

        {/* 3. Report Format + Data Refresh */}
        <div className="grid grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl p-6" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            <h2 className="text-lg font-bold text-navy">Preferred Report Format</h2>
            <p className="text-sm text-muted mt-0.5 mb-5">How AI should present insights</p>
            <div className="flex flex-col gap-2.5 mb-5">
              <Checkbox checked={reportFmt.text}   onChange={() => toggleReport('text')}   label="Text Summary" />
              <Checkbox checked={reportFmt.charts} onChange={() => toggleReport('charts')} label="Interactive Charts" />
              <Checkbox checked={reportFmt.pivot}  onChange={() => toggleReport('pivot')}  label="Pivot Tables" />
            </div>
            <p className="text-sm font-semibold text-navy mb-3">Export Options</p>
            <div className="grid grid-cols-2 gap-2">
              <Checkbox checked={exportFmt.excel} onChange={() => toggleExport('excel')} label="Excel" />
              <Checkbox checked={exportFmt.pdf}   onChange={() => toggleExport('pdf')}   label="PDF" />
              <Checkbox checked={exportFmt.csv}   onChange={() => toggleExport('csv')}   label="CSV" />
              <Checkbox checked={exportFmt.ppt}   onChange={() => toggleExport('ppt')}   label="PowerPoint" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            <h2 className="text-lg font-bold text-navy">Default Data Sources</h2>
            <p className="text-sm text-muted mt-0.5 mb-5">Data refresh intervals</p>
            <p className="text-sm font-semibold text-navy mb-2">Data Refresh Rate</p>
            <select value={refreshRate} onChange={(e) => setRefreshRate(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-navy
                         focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 mb-4">
              <option>Real-time (auto-sync)</option>
              <option>Every 15 minutes</option>
              <option>Every hour</option>
              <option>Daily</option>
            </select>
            <button className="w-full flex items-center justify-center gap-2 border border-primary
                               text-primary text-sm font-semibold py-2.5 rounded-xl hover:bg-teal-50 transition mb-5">
              <RefreshCw size={14} /> Force Refresh Now
            </button>
            <div className="flex flex-col gap-1.5 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted">Last sync:</span>
                <span className="text-navy font-medium">2 minutes ago</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted">Next sync:</span>
                <span className="text-navy font-medium">58 minutes</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Alert Channels + Alert Priorities */}
        <Section title="Alert Settings" sub="Select which systems to sync with your dashboard">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-sm font-bold text-navy mb-4">Alert Channels</p>
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Mail size={15} className="text-muted" />
                    <span className="text-sm text-navy font-medium">Email</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <select value={emailFreq} onChange={(e) => setEmailFreq(e.target.value)}
                      className="text-xs border border-slate-200 rounded-lg px-2 py-1 text-muted focus:outline-none focus:border-primary">
                      <option>Instant</option>
                      <option>Daily digest</option>
                      <option>Weekly digest</option>
                    </select>
                    <Toggle on={alerts.email} onChange={() => toggleAlert('email')} />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Slack size={15} className="text-muted" />
                    <span className="text-sm text-navy font-medium">Slack</span>
                  </div>
                  <Toggle on={alerts.slack} onChange={() => toggleAlert('slack')} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Monitor size={15} className="text-muted" />
                    <span className="text-sm text-navy font-medium">Microsoft Teams</span>
                  </div>
                  <Toggle on={alerts.teams} onChange={() => toggleAlert('teams')} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Bell size={15} className="text-muted" />
                    <span className="text-sm text-navy font-medium">In-app Push</span>
                  </div>
                  <Toggle on={alerts.push} onChange={() => toggleAlert('push')} />
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-navy mb-4">Alert Priorities</p>
              <div className="flex flex-col gap-3">
                <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <AlertTriangle size={13} className="text-red-500" />
                      <span className="text-sm font-semibold text-red-700">Critical Alerts</span>
                    </div>
                    <span className="text-[11px] font-semibold text-red-600 bg-red-100 px-2 py-0.5 rounded-full">Always send</span>
                  </div>
                  <p className="text-xs text-red-600">Cash flow dips, regulatory breaches, budget overruns</p>
                </div>
                <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <Info size={13} className="text-amber-500" />
                      <span className="text-sm font-semibold text-amber-700">Informational</span>
                    </div>
                    <span className="text-[11px] font-semibold text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">Weekly digest</span>
                  </div>
                  <p className="text-xs text-amber-600">Trend insights, monthly summaries, performance updates</p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* 5. Regional Settings */}
        <Section title="Regional Settings" sub="Configure your regional and language preferences">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <p className="text-sm font-semibold text-navy mb-2">Currency</p>
              <select className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-navy
                                 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20">
                <option>INR (₹) - Indian Rupee</option>
                <option>USD ($) - US Dollar</option>
                <option>EUR (€) - Euro</option>
              </select>
            </div>
            <div>
              <p className="text-sm font-semibold text-navy mb-2">Tax Region</p>
              <select className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-navy
                                 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20">
                <option>India GST</option>
                <option>US Federal</option>
                <option>EU VAT</option>
              </select>
            </div>
            <div>
              <p className="text-sm font-semibold text-navy mb-2">Fiscal Year Start</p>
              <select className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-navy
                                 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20">
                <option>April 1 (India Standard)</option>
                <option>January 1</option>
                <option>July 1</option>
              </select>
            </div>
            <div>
              <p className="text-sm font-semibold text-navy mb-2">Language Preference</p>
              <select className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-navy
                                 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20">
                <option>English</option>
                <option>Hindi</option>
                <option>Tamil</option>
              </select>
            </div>
          </div>
        </Section>

      </div>
    </div>
  );
}
