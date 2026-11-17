import React from 'react';
import KpiTile from '../../components/ui/KpiTile';
import PageHeader from '../../components/ui/PageHeader';
import SectionHeader from '../../components/ui/SectionHeader';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowRight, Users, Check, Landmark, Receipt, BarChart2, FileText, CreditCard, TrendingUp, AlertTriangle, CheckCircle2, Info, Clock, Wallet, BellRing, PiggyBank } from 'lucide-react';

// Alert row — neutral row, status carried by the icon tile + pill
const ALERT_STYLES = {
  error:   { icon: AlertTriangle, tile: 'bg-red-50 text-red-600',     pill: 'bg-red-50 text-red-700',     label: 'Action needed' },
  warning: { icon: Clock,         tile: 'bg-amber-50 text-amber-600', pill: 'bg-amber-50 text-amber-700', label: 'Pending' },
  success: { icon: CheckCircle2,  tile: 'bg-green-50 text-green-600', pill: 'bg-green-50 text-green-700', label: 'Done' },
  info:    { icon: Info,          tile: 'bg-blue-50 text-blue-600',   pill: 'bg-blue-50 text-blue-700',   label: 'Info' },
};

const AlertRow = ({ type, title, sub }) => {
  const st = ALERT_STYLES[type] || ALERT_STYLES.info;
  const Icon = st.icon;
  return (
    <div className="list-row">
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${st.tile}`}>
        <Icon size={16} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-semibold text-navy leading-snug">{title}</p>
        <p className="text-[12px] text-muted mt-0.5 leading-snug truncate">{sub}</p>
      </div>
      <span className={`text-[11px] font-semibold px-2 py-1 rounded-md shrink-0 whitespace-nowrap ${st.pill}`}>
        {st.label}
      </span>
    </div>
  );
};

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
  { name: 'Other',      value: 15, color: '#CBD5E1' },
];

const AI_SUGGESTIONS = [
  { icon: Wallet,    title: 'Optimise working capital', sub: '₹12L tied up in receivables — automate reminders', cta: 'Set up' },
  { icon: BellRing,  title: 'Reduce credit utilisation', sub: '60% of limit used — repay ₹8L to drop below 50%',  cta: 'Review' },
  { icon: PiggyBank, title: 'Park idle cash',            sub: '₹4.5L idle for 30+ days could earn 6.8% in a sweep FD', cta: 'Explore' },
];

const PAYROLL_TILES = [
  { label: 'Next payroll',   value: '₹12,00,000', sub: 'Due 10 Sep',        subTone: 'text-muted' },
  { label: 'Last processed', value: '₹13,23,000', sub: 'Paid 16 Aug',       subTone: 'text-muted' },
  { label: 'Pending claims', value: '24',         sub: 'Awaiting approval', subTone: 'text-amber-700' },
  { label: 'Approved claims',value: '31',         sub: 'This month',        subTone: 'text-green-700' },
];

export default function BusinessHome() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Good evening, Harsh" subtitle="Your business at a glance — cash, compliance and payroll." />

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
          label="Revenue CAGR"       sub="3-year, FY22–25"
          value="16.4%"             delta="+1.2 pts YoY"     deltaType="positive"
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
          label="Credit Utilization" sub="of ₹84L limit"
          value="60%"               delta="High utilization"    deltaType="warning"
          footer="Limit: ₹84,00,000"  footerCta="Manage"         footerCtaColor="amber"
        />
        <KpiTile
          icon={<TrendingUp size={24} />}
          iconBg="bg-teal-100"       iconColor="text-teal-600"
          label="Revenue Growth"     sub="Month on month"
          value="+18%"              delta="Above target"       deltaType="positive"
          footer="Target: +20% by Q4"  footerCta="View Intel"   footerCtaColor="primary"
        />
      </div>

      {/* ── Tax alerts + Payroll ── */}
      <div className="grid grid-cols-2 gap-4">
        <div className="card flex flex-col">
          <SectionHeader
            title="Tax & Compliance"
            subtitle="Filings and payments this quarter"
            actions={<button className="link-action">View all <ArrowRight size={14} /></button>}
          />
          <div className="flex flex-col gap-2.5">
            {TAX_ALERTS.map((a, i) => <AlertRow key={i} {...a} />)}
          </div>
        </div>

        <div className="card flex flex-col">
          <SectionHeader title="Payroll & Benefits" subtitle="September cycle" />
          <div className="grid grid-cols-2 gap-2.5 flex-1">
            {PAYROLL_TILES.map((p) => (
              <div key={p.label} className="rounded-xl border border-[#EEF1F5] bg-[#F8FAFC] px-4 py-3.5">
                <p className="text-[12px] text-muted">{p.label}</p>
                <p className="text-[20px] font-bold text-navy mt-1 leading-tight tabular-nums">{p.value}</p>
                <p className={`text-[12px] font-medium mt-1 ${p.subTone}`}>{p.sub}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2.5 mt-4">
            <button className="btn-primary justify-center">
              <Users size={14} /> Process Payroll
            </button>
            <button className="btn-outline justify-center">
              <Check size={14} /> Approve Claims
            </button>
          </div>
        </div>
      </div>

      {/* ── AI Suggestions + Expense dist ── */}
      <div className="grid grid-cols-2 gap-4">
        <div className="card">
          <SectionHeader title="AI Suggestions" subtitle="Recommended actions for this week" />
          <div className="flex flex-col gap-2.5">
            {AI_SUGGESTIONS.map(({ icon: Icon, title, sub, cta }) => (
              <div key={title} className="list-row">
                <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Icon size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-navy leading-snug">{title}</p>
                  <p className="text-[12px] text-muted mt-0.5 leading-snug truncate">{sub}</p>
                </div>
                <button className="text-[12px] font-semibold text-primary px-3 py-1.5 rounded-lg shrink-0 hover:bg-primary/10 transition">
                  {cta}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <SectionHeader title="Expense Distribution" subtitle="Share of operating spend, this month" />
          <div className="flex items-center gap-8 pr-2">
            <div className="w-44 h-44 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={EXPENSE_DIST} cx="50%" cy="50%"
                    innerRadius={48} outerRadius={74}
                    dataKey="value" stroke="none" paddingAngle={2}
                  >
                    {EXPENSE_DIST.map((d, i) => <Cell key={i} fill={d.color} />)}
                  </Pie>
                  <Tooltip formatter={(v) => `${v}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col gap-2.5 flex-1">
              {EXPENSE_DIST.map((d) => (
                <div key={d.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
                    <span className="text-[12px] text-muted">{d.name}</span>
                  </div>
                  <span className="text-[12px] font-semibold text-navy tabular-nums">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
