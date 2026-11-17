import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import KpiTile from '../../components/ui/KpiTile';
import PageHeader from '../../components/ui/PageHeader';
import SectionHeader from '../../components/ui/SectionHeader';
import Segmented from '../../components/ui/Segmented';
import StatusBadge from '../../components/ui/StatusBadge';
import { Download, Bell, FileText, ArrowRight } from 'lucide-react';

const RECEIVABLES = [
  { company: 'Acme Corp',     amount: '₹2,50,000', due: 'Dec 20', status: 'onhold',  statusLabel: 'On Hold' },
  { company: 'TechStart Ltd', amount: '₹1,75,000', due: 'Dec 25', status: 'pending', statusLabel: 'Pending' },
  { company: 'XYZ Ltd',       amount: '₹1,75,000', due: 'Dec 21', status: 'success', statusLabel: 'Paid' },
];

const PAYABLES = [
  { company: 'Cloudnine Hosting', amount: '₹84,000',   due: 'Dec 18', status: 'pending', statusLabel: 'Scheduled' },
  { company: 'Orbit Logistics',   amount: '₹1,12,500', due: 'Dec 22', status: 'due',     statusLabel: 'Due' },
  { company: 'Paperline Supplies',amount: '₹22,300',   due: 'Dec 12', status: 'paid',    statusLabel: 'Paid' },
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


export default function CashCredits() {
  const [tab, setTab] = useState('Receivables');

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Cash & Credits" subtitle="Liquidity, credit lines and money owed to and by you." />

      {/* KPI tiles */}
      <div className="grid grid-cols-4 gap-4">
        <KpiTile label="Liquid Cash" value="₹12,45,600"
          delta="+5.2% MoM" deltaType="positive" sub="+2.6% this week" />
        <KpiTile label="Credit Utilization" value="75%"
          delta="High" deltaType="negative" sub="of total credit line" />
        <KpiTile label="Loan Repayments" value="₹3,25,000"
          delta="Due Dec 15" deltaType="warning" sub="HDFC term loan + SBI OD" />
        <KpiTile label="Working Capital" value="₹8,75,400"
          delta="Healthy" deltaType="positive" sub="Current ratio 2.3x" />
      </div>

      {/* Receivables/Payables + Reports */}
      <div className="grid grid-cols-[1fr_320px] gap-4">
        <div className="card">
          <SectionHeader
            title="Receivables & Payables"
            subtitle={tab === 'Receivables' ? '₹6,00,000 outstanding from 3 clients' : '₹2,18,800 due to 3 vendors'}
            actions={<Segmented options={['Receivables', 'Payables']} value={tab} onChange={setTab} />}
          />
          <div className="flex flex-col gap-2.5">
            {(tab === 'Receivables' ? RECEIVABLES : PAYABLES).map((r) => (
              <div key={r.company} className="list-row">
                <div className="w-9 h-9 rounded-lg bg-white border border-border flex items-center justify-center shrink-0 text-[13px] font-bold text-navy">
                  {r.company[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-navy">{r.company}</p>
                  <p className="text-[12px] text-muted">Due {r.due}</p>
                </div>
                <p className="text-[14px] font-semibold text-navy tabular-nums w-24 text-right">{r.amount}</p>
                <div className="w-24 flex justify-end">
                  <StatusBadge status={r.status} label={r.statusLabel} />
                </div>
                <div className="w-36 flex justify-end">
                  {tab === 'Receivables' && r.status !== 'success' && (
                    <button className="flex items-center gap-1.5 text-[12px] font-semibold text-primary bg-white border border-border px-3 py-1.5 rounded-lg hover:border-primary/40 transition whitespace-nowrap">
                      <Bell size={13} /> Send reminder
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reports */}
        <div className="card flex flex-col">
          <SectionHeader title="Reports" subtitle="Auto-generated daily" />
          <div className="flex flex-col">
            {REPORTS.map((r) => (
              <div key={r.label} className="flex items-center gap-3 py-3 border-b border-[#EEF1F5] last:border-0">
                <FileText size={16} className="text-muted shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-navy truncate">{r.label}</p>
                  <p className="text-[12px] text-muted">{r.sub}</p>
                </div>
                <button className="icon-btn" title="Download"><Download size={14} /></button>
              </div>
            ))}
          </div>
          <button className="link-action mt-auto pt-3">View all reports <ArrowRight size={14} /></button>
        </div>
      </div>

      {/* Cashflow tracker */}
      <div className="card">
        <SectionHeader
          title="Cashflow Tracker"
          subtitle="Closing cash balance, December"
          actions={
            <select className="input-base py-1.5 text-muted">
              <option>Last 30 days</option>
              <option>Last 7 days</option>
              <option>Last 90 days</option>
            </select>
          }
        />
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={CASHFLOW_DATA}>
              <defs>
                <linearGradient id="cashGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#0B6E6E" stopOpacity={0.18} />
                  <stop offset="95%" stopColor="#0B6E6E" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF1F5" vertical={false} />
              <XAxis dataKey="d" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} dy={6} />
              <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} width={48}
                domain={[1800000, 3000000]} ticks={[1800000, 2200000, 2600000, 3000000]}
                tickFormatter={(v) => `₹${v / 100000}L`} />
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }}
                formatter={(v) => `₹${(v / 100000).toFixed(1)}L`} />
              <Area type="monotone" dataKey="val" stroke="#0B6E6E" strokeWidth={2}
                fill="url(#cashGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
