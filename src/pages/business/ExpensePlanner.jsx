import React, { useState } from 'react';
import KpiTile from '../../components/ui/KpiTile';
import StatusBadge from '../../components/ui/StatusBadge';
import { AlertTriangle, Clock, CheckCircle, Check, X, HelpCircle } from 'lucide-react';

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
      {/* KPI tiles */}
      <div className="grid grid-cols-4 gap-4">
        <KpiTile label="Total Expenses (This Month)" value="₹24,85,670" delta="+12.5% vs last month" deltaType="negative" accent="text-primary" />
        <KpiTile label="Approved vs Pending" value="7:3" delta="70% Approved, 30% Pending" deltaType="neutral" accent="text-navy" />
        <KpiTile label="Insurance Coverage"  value="₹75,00,000" delta="4 Active Policies" deltaType="positive" accent="text-navy" />
        <KpiTile label="Budget Utilization"  value="₹42,850" delta="+15% vs last month" deltaType="warning" accent="text-warning" />
      </div>

      {/* Recent expenses */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <p className="text-base font-bold text-navy">Recent Expenses</p>
          <div className="flex gap-2">
            {['All Departments', 'All Categories', 'All Status'].map((f) => (
              <select key={f} className="text-xs border border-border rounded-lg px-2 py-1.5 text-muted focus:outline-none focus:border-primary">
                <option>{f}</option>
              </select>
            ))}
          </div>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-muted border-b border-border">
              <th className="text-left pb-2 font-medium">Date</th>
              <th className="text-left pb-2 font-medium">Employee/Payee</th>
              <th className="text-left pb-2 font-medium">Amount</th>
              <th className="text-left pb-2 font-medium">Status</th>
              <th className="text-left pb-2 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {EXPENSES.map((e, i) => (
              <tr key={i} className="border-b border-border last:border-0">
                <td className="py-3 text-xs text-muted">{e.date}</td>
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                      {e.name[0]}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-navy">{e.name}</p>
                      <p className="text-[10px] text-muted">{e.sub}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 text-sm font-bold text-navy">{e.amount}</td>
                <td className="py-3"><StatusBadge status={e.status} /></td>
                <td className="py-3">
                  <div className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center cursor-pointer hover:bg-red-100 transition">
                    <span className="text-red-500 text-xs font-bold">PDF</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="text-xs text-primary font-medium mt-3 hover:underline">Show all transactions →</button>
      </div>

      {/* Policy alerts + Pending approvals */}
      <div className="flex gap-4">
        <div className="card flex-1">
          <p className="text-sm font-bold text-navy mb-4">Policy Alerts</p>
          <div className="flex flex-col gap-2">
            {POLICY_ALERTS.map((a, i) => {
              const cfg = alertConfig[a.type];
              return (
                <div key={i} className={`flex items-center justify-between p-3 rounded-xl border ${cfg.bg}`}>
                  <div className="flex items-center gap-2">
                    <cfg.icon size={14} className={cfg.iconColor} />
                    <span className={`text-xs font-medium ${cfg.text}`}>{a.msg}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="text-xs text-primary font-medium hover:underline">View Details</button>
                    <X size={14} className="text-muted cursor-pointer hover:text-navy transition" />
                  </div>
                </div>
              );
            })}
          </div>
          <button className="text-xs text-primary font-medium mt-3 hover:underline">Show all Alerts →</button>
        </div>

        <div className="card flex-1">
          <p className="text-sm font-bold text-navy mb-4">Pending Approvals</p>
          <div className="flex flex-col gap-3">
            {approvals.map((a) => (
              <div key={a.id} className="bg-surface rounded-xl p-3">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-sm font-semibold text-navy">{a.name}</p>
                    <p className="text-xs text-muted">{a.id}</p>
                  </div>
                  <p className="text-base font-bold text-navy">{a.amount}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleAction(a.id, 'approve')}
                    className="flex items-center gap-1 text-xs bg-green-50 border border-green-200 text-green-700 px-2.5 py-1 rounded-lg hover:bg-green-100 transition font-medium">
                    <Check size={12} /> Approve
                  </button>
                  <button onClick={() => handleAction(a.id, 'reject')}
                    className="flex items-center gap-1 text-xs bg-red-50 border border-red-200 text-red-600 px-2.5 py-1 rounded-lg hover:bg-red-100 transition font-medium">
                    <X size={12} /> Reject
                  </button>
                  <button className="flex items-center gap-1 text-xs bg-slate-100 border border-slate-200 text-slate-600 px-2.5 py-1 rounded-lg hover:bg-slate-200 transition font-medium">
                    <HelpCircle size={12} /> Ask
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
