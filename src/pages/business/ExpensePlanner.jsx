import React, { useState } from 'react';
import KpiTile from '../../components/ui/KpiTile';
import StatusBadge from '../../components/ui/StatusBadge';
import PageHeader from '../../components/ui/PageHeader';
import SectionHeader from '../../components/ui/SectionHeader';
import { AlertTriangle, Clock, Check, X, HelpCircle, Download, Plus, ArrowRight } from 'lucide-react';

const EXPENSES = [
  { date: 'Jan 15, 2025', name: 'Tejas Sharma',  sub: '+91 98765 43210', amount: '₹2,500',  status: 'pending' },
  { date: 'Jan 14, 2025', name: 'Kapil Sharma',  sub: 'Electricity Bill', amount: '₹12,545', status: 'failed' },
  { date: 'Jan 13, 2025', name: 'Ajit Pandey',   sub: 'Salary Credit',   amount: '₹45,000', status: 'success' },
];

const POLICY_ALERTS = [
  { type: 'error',   msg: 'Travel exceeded daily cap for 4 employees' },
  { type: 'warning', msg: '3 expenses missing receipts' },
];

const PENDING_APPROVALS = [
  { name: 'Naman Singh', id: 'EXP-2025-001', amount: '₹12,500' },
  { name: 'Shyam Singh', id: 'EXP-2025-002', amount: '₹5,200' },
];

const alertConfig = {
  error:   { bg: 'bg-red-50 border-red-200',   icon: AlertTriangle, iconColor: 'text-red-500',   text: 'text-red-700' },
  warning: { bg: 'bg-amber-50 border-amber-200', icon: Clock,        iconColor: 'text-amber-500', text: 'text-amber-700' },
};

export default function ExpensePlanner() {
  const [approvals, setApprovals] = useState(PENDING_APPROVALS);

  function handleAction(id, action) {
    setApprovals((prev) => prev.filter((a) => a.id !== id || action === 'ask'));
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Expense Planner"
        subtitle="Track team spend, approvals and policy exceptions."
        actions={<button className="btn-primary"><Plus size={15} /> Add Expense</button>}
      />

      {/* KPI tiles */}
      <div className="grid grid-cols-4 gap-4">
        <KpiTile label="Total Expenses" sub="This month" value="₹24,85,670" delta="+12.5%" deltaType="negative" />
        <KpiTile label="Approval Rate" sub="7 approved · 3 pending" value="70%" delta="On track" deltaType="neutral" />
        <KpiTile label="Reimbursements" sub="Awaiting payout" value="₹3,40,000" delta="15 claims" deltaType="warning" />
        <KpiTile label="Budget Used" sub="₹42,850 left" value="68%" delta="+15% MoM" deltaType="warning" />
      </div>

      {/* Recent expenses */}
      <div className="card">
        <SectionHeader
          title="Recent Expenses"
          subtitle="Latest submissions across all departments"
          actions={['All Departments', 'All Categories', 'All Status'].map((f) => (
            <select key={f} className="input-base py-1.5 text-muted">
              <option>{f}</option>
            </select>
          ))}
        />
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="th">Employee / Payee</th>
              <th className="th">Date</th>
              <th className="th">Status</th>
              <th className="th text-right">Amount</th>
              <th className="th text-right w-20">Receipt</th>
            </tr>
          </thead>
          <tbody>
            {EXPENSES.map((e, i) => (
              <tr key={i} className="tr">
                <td className="py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-[12px] font-bold text-primary">
                      {e.name[0]}
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-navy">{e.name}</p>
                      <p className="text-[12px] text-muted">{e.sub}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 text-[13px] text-muted">{e.date}</td>
                <td className="py-3.5"><StatusBadge status={e.status} /></td>
                <td className="py-3.5 text-[14px] font-semibold text-navy text-right tabular-nums">{e.amount}</td>
                <td className="py-3.5">
                  <button className="icon-btn ml-auto" title="Download PDF"><Download size={14} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="link-action mt-4">Show all expenses <ArrowRight size={14} /></button>
      </div>

      {/* Policy alerts + Pending approvals */}
      <div className="grid grid-cols-2 gap-4">
        <div className="card">
          <SectionHeader title="Policy Alerts" subtitle="Expenses that break company policy" />
          <div className="flex flex-col gap-2">
            {POLICY_ALERTS.map((a, i) => {
              const cfg = alertConfig[a.type];
              return (
                <div key={i} className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl border ${cfg.bg}`}>
                  <div className="flex items-center gap-2.5 min-w-0">
                    <cfg.icon size={16} className={`${cfg.iconColor} shrink-0`} />
                    <span className={`text-[13px] font-medium ${cfg.text} truncate`}>{a.msg}</span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <button className="text-[12px] font-semibold text-navy hover:underline">View details</button>
                    <X size={15} className="text-muted cursor-pointer hover:text-navy transition" />
                  </div>
                </div>
              );
            })}
          </div>
          <button className="link-action mt-4">Show all alerts <ArrowRight size={14} /></button>
        </div>

        <div className="card">
          <SectionHeader title="Pending Approvals" subtitle={`${approvals.length} requests waiting on you`} />
          <div className="flex flex-col gap-2.5">
            {approvals.map((a) => (
              <div key={a.id} className="list-row justify-between">
                <div className="min-w-0">
                  <p className="text-[13px] font-semibold text-navy">{a.name}</p>
                  <p className="text-[12px] text-muted">{a.id} · <span className="font-semibold text-navy tabular-nums">{a.amount}</span></p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button onClick={() => handleAction(a.id, 'approve')}
                    className="flex items-center gap-1 text-[12px] font-semibold bg-primary text-white px-3 py-1.5 rounded-lg hover:bg-primary-dark transition">
                    <Check size={13} /> Approve
                  </button>
                  <button onClick={() => handleAction(a.id, 'reject')}
                    className="flex items-center gap-1 text-[12px] font-semibold bg-white border border-border text-red-600 px-3 py-1.5 rounded-lg hover:border-red-300 hover:bg-red-50 transition">
                    <X size={13} /> Reject
                  </button>
                  <button className="icon-btn" title="Ask a question">
                    <HelpCircle size={14} />
                  </button>
                </div>
              </div>
            ))}
            {approvals.length === 0 && (
              <div className="text-center py-8 text-muted text-sm">All caught up! No pending approvals.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
