import React from 'react';
import KpiTile from '../../components/ui/KpiTile';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowRight, Users, Check, Landmark, Receipt, BarChart2, FileText, CreditCard, TrendingUp, AlertTriangle, CheckCircle2, Info } from 'lucide-react';

// 3-col alert row — single light-blue, professional & unified
const AlertRow = ({ type, title, sub }) => (
  <div className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0"
        style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
        {type === 'error'   && <AlertTriangle size={15} style={{ color: '#0d2b45' }} />}
        {type === 'warning' && <AlertTriangle size={15} style={{ color: '#0d2b45' }} />}
        {type === 'success' && <CheckCircle2  size={15} style={{ color: '#0d2b45' }} />}
        {type === 'info'    && <Info          size={15} style={{ color: '#0d2b45' }} />}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-semibold text-navy leading-tight">{title}</p>
        <p className="text-[12px] text-muted mt-0.5 leading-tight truncate">{sub}</p>
      </div>
      <span className="text-[11px] font-semibold text-[#0d2b45] bg-white border border-slate-200
                       px-2.5 py-1 rounded-lg shrink-0 whitespace-nowrap capitalize"
        style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.06)' }}>
        {type === 'success' ? 'Done' : type === 'error' ? 'Action needed' : 'Pending'}
      </span>
    </div>
  </div>
);

const TAX_ALERTS = [
  { type: 'error',   title: 'GST filing due in 7 days',        sub: 'Amount: ₹2,34,567'      },
  { type: 'success', title: 'Corporate tax filed successfully', sub: 'Filed on Sep 1, 2025'   },
  { type: 'warning', title: 'TDS return pending',              sub: 'Due: Sep 15, 2025'       },
  { type: 'success', title: 'Advance Tax Paid Successfully',   sub: 'Filed on Sep 24, 2025'  },
];

const EXPENSE_DIST = [
  { name: 'Payroll',    value: 45, color: '#0B6E6E' },
  { name: 'Operations', value: 25, color: '#0E9090' },
  { name: 'Marketing',  value: 15, color: '#A78BFA' },
  { name: 'Other',      value: 15, color: '#E2E8F0' },
];

const AI_SUGGESTIONS = [
  { title: 'Optimize Working Capital', sub: '₹12L tied in outstanding receivables. Automate reminders to improve cash inflow.' },
];

export default function BusinessHome() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-[32px] font-bold text-navy">Good evening, Harsh!</h1>

      {/* ── KPI tiles — fixed props ── */}
      <div className="grid grid-cols-3 gap-4">
        <KpiTile
          icon={<Landmark size={24} />}
          iconBg="bg-blue-100"       iconColor="text-blue-600"
          label="Cash Balance"       sub="Across all accounts"
          value="₹23,15,950"        delta="+2.8% this month"   deltaType="positive"
          footer="Last updated: Today" footerCta="View Details"  footerCtaColor="primary"
        />
        <KpiTile
          icon={<Receipt size={24} />}
          iconBg="bg-green-100"      iconColor="text-green-600"
          label="Monthly Expenses"   sub="This month"
          value="₹93,224"           delta="68% of Budget"       deltaType="warning"
          footer="Budget: ₹1,37,000"  footerCta="View Expenses"  footerCtaColor="primary"
        />
        <KpiTile
          icon={<BarChart2 size={24} />}
          iconBg="bg-purple-100"     iconColor="text-purple-600"
          label="CAGR"               sub="3 Year"
          value="16.4%"             delta="of last 3 years"     deltaType="positive"
          footer="FY 2022–2025"       footerCta="View Report"    footerCtaColor="primary"
        />
        <KpiTile
          icon={<FileText size={24} />}
          iconBg="bg-orange-100"     iconColor="text-orange-600"
          label="Tax Summary"        sub="FY 2024-25"
          value="₹8,12,350"         delta="Due in 7 Days"       deltaType="negative"
          footer="GST + TDS pending"  footerCta="File Now"       footerCtaColor="red"
        />
        <KpiTile
          icon={<CreditCard size={24} />}
          iconBg="bg-amber-100"      iconColor="text-amber-600"
          label="Credit Utilization" sub="of 84L Limit"
          value="60%"               delta="High utilization"    deltaType="warning"
          footer="Limit: ₹84,00,000"  footerCta="Manage"         footerCtaColor="amber"
        />
        <KpiTile
          icon={<TrendingUp size={24} />}
          iconBg="bg-teal-100"       iconColor="text-teal-600"
          label="Revenue Growth"     sub="vs last month"
          value="+18%"              delta="vs last month"       deltaType="positive"
          footer="Target: +20% by Q4"  footerCta="View Intel"   footerCtaColor="primary"
        />
      </div>

      {/* ── Tax alerts + Payroll ── */}
      <div className="flex gap-4">
        <div className="card flex-1">
          <p className="text-base font-bold text-navy mb-4">Tax & Compliance Alerts</p>
          <div className="flex flex-col gap-2">
            {TAX_ALERTS.map((a, i) => <AlertRow key={i} {...a} />)}
          </div>
          <button className="mt-4 btn-primary w-full flex items-center justify-center gap-2 text-sm">
            Go to Tax & Compliance <ArrowRight size={15} />
          </button>
        </div>

        <div className="card flex-1">
          <p className="text-base font-bold text-navy mb-4">Payroll & Benefits</p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Next Payroll',           value: '₹12,00,000', sub: 'Due: 10th September', color: 'bg-blue-50 border-blue-200'   },
              { label: 'Next Payroll',           value: '₹12,00,000', sub: 'Due: 10th September', color: 'bg-blue-50 border-blue-200'   },
              { label: 'Next Payroll',           value: '₹12,00,000', sub: 'Due: 10th September', color: 'bg-red-50 border-red-200'     },
              { label: 'Last Payroll Processed', value: '₹13,23,000', sub: 'Paid: 16th August',   color: 'bg-green-50 border-green-200' },
            ].map((p, i) => (
              <div key={i} className={`rounded-xl border p-3 ${p.color}`}>
                <p className="text-xs text-muted">{p.label}</p>
                <p className="text-lg font-bold text-navy">{p.value}</p>
                <p className="text-xs text-muted">{p.sub}</p>
              </div>
            ))}
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-3">
              <p className="text-xs text-muted">Pending Claims</p>
              <p className="text-lg font-bold text-navy">24 claims</p>
              <p className="text-xs text-warning font-medium">Awaiting approval</p>
            </div>
            <div className="rounded-xl border border-green-200 bg-green-50 p-3">
              <p className="text-xs text-muted">Approved Claims</p>
              <p className="text-lg font-bold text-navy">24 claims</p>
              <p className="text-xs text-positive font-medium">Processed this month</p>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button className="btn-primary flex-1 flex items-center justify-center gap-1.5 text-xs py-2">
              <Users size={13} /> Process Payroll
            </button>
            <button className="btn-outline flex-1 flex items-center justify-center gap-1.5 text-xs py-2">
              <Check size={13} /> Approve Claims
            </button>
          </div>
        </div>
      </div>

      {/* ── AI Suggestions + Expense dist ── */}
      <div className="flex gap-4">
        <div className="card flex-1">
          <p className="text-base font-display font-bold text-navy mb-4">AI Suggestions</p>
          {AI_SUGGESTIONS.map((s, i) => (
            <div key={i} className="bg-blue-50 border border-blue-100 rounded-xl p-3">
              <p className="text-sm font-semibold text-navy">{s.title}</p>
              <p className="text-xs text-muted mt-1">{s.sub}</p>
            </div>
          ))}
        </div>

        <div className="card flex-1">
          <p className="text-base font-bold text-navy mb-4">Expense Distribution</p>
          <div className="flex items-center gap-4">
            <div className="w-36 h-36 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={EXPENSE_DIST} cx="50%" cy="50%"
                    innerRadius={38} outerRadius={62}
                    dataKey="value" stroke="none" paddingAngle={2}
                  >
                    {EXPENSE_DIST.map((d, i) => <Cell key={i} fill={d.color} />)}
                  </Pie>
                  <Tooltip formatter={(v) => `${v}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              {EXPENSE_DIST.map((d) => (
                <div key={d.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                    <span className="text-xs text-muted">{d.name}</span>
                  </div>
                  <span className="text-xs font-semibold text-navy">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
