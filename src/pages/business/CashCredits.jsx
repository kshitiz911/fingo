import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import KpiTile from '../../components/ui/KpiTile';
import { Download, Bell } from 'lucide-react';

const RECEIVABLES = [
  { company: 'Acme Corp',    amount: '₹2,50,000', due: 'Dec 20', status: 'onhold',  statusLabel: 'On Hold' },
  { company: 'TechStart Ltd', amount: '₹1,75,000', due: 'Dec 25', status: 'pending', statusLabel: 'Pending' },
  { company: 'XYZ Ltd',      amount: '₹1,75,000', due: 'Dec 21', status: 'success', statusLabel: 'Paid' },
];

const CASHFLOW_DATA = [
  { d: 'Dec 1', val: 2000000 }, { d: 'Dec 5', val: 2200000 },
  { d: 'Dec 10', val: 2100000 }, { d: 'Dec 15', val: 2400000 },
  { d: 'Dec 20', val: 2300000 }, { d: 'Dec 25', val: 2600000 },
  { d: 'Dec 30', val: 2800000 },
];

const REPORTS = [
  { label: 'Daily Cash Balance Report',  sub: 'Generated: Today, 9:00 AM' },
  { label: 'Credit Utilization Report',  sub: 'Generated: Yesterday, 6:00 PM' },
  { label: 'Loan Repayment Schedule',    sub: 'Updated: 2 hours ago' },
];

const statusConfig = {
  onhold:  { bg: 'bg-slate-100',  text: 'text-slate-600' },
  pending: { bg: 'bg-amber-50',   text: 'text-amber-700' },
  success: { bg: 'bg-green-50',   text: 'text-green-700' },
};

export default function CashCredits() {
  const [tab, setTab] = useState('Receivables');

  return (
    <div className="flex flex-col gap-6">
      {/* KPI tiles */}
      <div className="grid grid-cols-4 gap-4">
        <KpiTile label="Available Liquid Cash" value="₹12,45,600"
          delta="+5.2% vs last month" deltaType="positive" sub="+2.6% vs last week" accent="text-primary" />
        <KpiTile label="Credit Utilization" value="75%"
          delta="High Utilization" deltaType="negative" sub="% of total credit line" accent="text-negative" />
        <KpiTile label="Loan Repayments Due" value="₹3,25,000"
          delta="HDFC Term Loan: Dec 15" deltaType="warning" sub="SBI Overdraft: Dec 28" accent="text-navy" />
        <KpiTile label="Working Capital" value="₹8,75,400"
          delta="Healthy — ratio 2.3x" deltaType="positive" sub="Current assets – liabilities" accent="text-positive" />
      </div>

      {/* Receivables/Payables + Reports */}
      <div className="flex gap-4">
        <div className="card flex-1">
          <div className="flex items-center justify-between mb-4">
            <p className="text-base font-bold text-navy">Receivables & Payables</p>
          </div>
          <div className="flex gap-1 mb-4">
            {['Receivables', 'Payables'].map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all
                  ${tab === t ? 'bg-primary text-white' : 'text-muted hover:bg-slate-100'}`}>
                {t}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            {RECEIVABLES.map((r) => {
              const cfg = statusConfig[r.status];
              return (
                <div key={r.company} className="flex items-center justify-between bg-surface rounded-xl px-3 py-3">
                  <div>
                    <p className="text-sm font-semibold text-navy">{r.company}</p>
                    <p className="text-xs text-muted">{r.amount} • Due {r.due}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${cfg.bg} ${cfg.text}`}>
                      {r.statusLabel}
                    </span>
                    {r.status !== 'success' && (
                      <button className="flex items-center gap-1 text-xs bg-primary text-white px-2.5 py-1 rounded-lg hover:opacity-90 transition font-medium">
                        <Bell size={11} /> Send Reminder
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Reports */}
        <div className="card w-72 shrink-0">
          <p className="text-sm font-bold text-navy mb-4">Benefits Overview</p>
          <div className="flex flex-col gap-3">
            {REPORTS.map((r) => (
              <div key={r.label} className="flex items-center justify-between bg-surface rounded-xl px-3 py-3">
                <div>
                  <p className="text-xs font-semibold text-navy">{r.label}</p>
                  <p className="text-[10px] text-muted mt-0.5">{r.sub}</p>
                </div>
                <button className="btn-primary text-xs py-1 px-2.5 flex items-center gap-1">
                  <Download size={11} /> Download
                </button>
              </div>
            ))}
            <button className="text-xs text-primary font-medium hover:underline mt-1">Show all →</button>
          </div>
        </div>
      </div>

      {/* Cashflow tracker */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <p className="text-base font-bold text-navy">Cashflow Tracker</p>
          <select className="text-xs border border-border rounded-lg px-2 py-1.5 text-muted focus:outline-none focus:border-primary">
            <option>Last 30 days</option>
            <option>Last 7 days</option>
            <option>Last 90 days</option>
          </select>
        </div>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={CASHFLOW_DATA}>
              <defs>
                <linearGradient id="cashGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#0B6E6E" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#0B6E6E" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="d" tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }}
                formatter={(v) => `₹${(v / 100000).toFixed(1)}L`} />
              <Area type="monotone" dataKey="val" stroke="#0B6E6E" strokeWidth={2}
                fill="url(#cashGrad)" strokeDasharray="5 3" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
