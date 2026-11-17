import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Landmark, GraduationCap, PiggyBank, Diamond, Home, HeartPulse, TrendingUp, ChevronRight, Wallet, ShieldCheck, LineChart as LineIcon, IndianRupee } from 'lucide-react';
import KpiTile from '../../components/ui/KpiTile';
import PageHeader from '../../components/ui/PageHeader';
import SectionHeader from '../../components/ui/SectionHeader';

// ── KPI Tiles data ────────────────────────────────────────────────────────────
// Each tile has its own unique layout — built individually to match design exactly

// ── Goal cards data ───────────────────────────────────────────────────────────
const GOALS = [
  { icon: Landmark,      label: 'Retirement Fund',    value: '₹85,00,000', target: 'Target: ₹2 Cr by 2045',    pct: 42.5, completion: '42.5% completed' },
  { icon: GraduationCap, label: "Child's Education",  value: '₹12,50,000', target: 'Target: ₹25 L by 2035',    pct: 50,   completion: '50% completed' },
  { icon: PiggyBank,     label: 'Retirement Savings', value: '₹20,00,000', target: 'Target: ₹1 Crore by 2040', pct: 30,   completion: '30% completed' },
  { icon: Diamond,       label: 'Emergency Fund',     value: '₹5,00,000',  target: 'Target: ₹10 L by 2028',    pct: 60,   completion: '60% completed' },
  { icon: Home,          label: 'Dream Home',         value: '₹35,00,000', target: 'Target: ₹1.5 Cr by 2030',  pct: 23.3, completion: '23.3% completed' },
  { icon: HeartPulse,    label: 'Health Insurance',   value: '₹5,00,000',  target: 'Goal: ₹20 L by 2030',      pct: 20,   completion: '20% achieved' },
];

// ── Asset allocation data ─────────────────────────────────────────────────────
const ALLOCATION_DATA = [
  { name: 'Equity',      value: 45, color: '#0EA5E9' },
  { name: 'Debt',        value: 30, color: '#6366F1' },
  { name: 'Gold',        value: 15, color: '#0B6E6E' },
  { name: 'Real Estate', value: 10, color: '#0D2B45' },
];

// ── Goal Card ─────────────────────────────────────────────────────────────────
const GoalCard = ({ icon: Icon, label, value, target, pct }) => (
  <div className="card flex flex-col gap-4">
    <div className="flex items-center gap-2.5">
      <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
        <Icon size={16} />
      </div>
      <p className="text-[14px] font-semibold text-navy">{label}</p>
    </div>
    <div>
      <p className="text-[24px] font-bold text-navy leading-none tabular-nums">{value}</p>
      <p className="text-[12px] text-muted mt-1.5">{target}</p>
    </div>
    <div>
      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${pct}%` }} />
      </div>
      <p className="text-[12px] text-muted mt-2"><span className="font-semibold text-navy">{pct}%</span> of target</p>
    </div>
  </div>
);

// ── Main ─────────────────────────────────────────────────────────────────────
export default function Insurance() {

  return (
    <div className="flex flex-col gap-6">

      <PageHeader title="Wealth & Insurance" subtitle="Net worth, cover and progress on your financial goals." />

      {/* ── KPI Tiles ── */}
      <div className="grid grid-cols-4 gap-4">
        <KpiTile icon={<Wallet />}      label="Total Net Worth"    value="₹24,85,670" delta="+12.5%"   deltaType="positive" sub="this year" />
        <KpiTile icon={<LineIcon />}    label="Portfolio Growth"   value="+18.2%"     delta="+0.4% today" deltaType="positive" sub="since Jan" />
        <KpiTile icon={<ShieldCheck />} label="Insurance Cover"    value="₹75,00,000" delta="4 policies" deltaType="neutral"  sub="Life, health, motor" />
        <KpiTile icon={<IndianRupee />} label="Monthly Returns"    value="₹42,850"    delta="+8.5%"    deltaType="positive" sub="vs last month" />
      </div>

      {/* ── Financial Goals ── */}
      <div>
        <SectionHeader
          title="Financial Goals"
          subtitle="6 goals · ₹1.62 Cr saved so far"
          actions={<button className="link-action">Manage goals <ChevronRight size={14} /></button>}
        />
        <div className="grid grid-cols-3 gap-4">
          {GOALS.map((g) => <GoalCard key={g.label} {...g} />)}
        </div>
      </div>

      {/* ── Asset Allocation ── */}
      <div className="card">
        <SectionHeader title="Asset Allocation" subtitle="How your ₹24.9L portfolio is split" />
        <div className="grid grid-cols-2 gap-8 items-center">

          {/* Donut + legend */}
          <div className="flex items-center gap-8">
            <div className="w-56 h-56 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ALLOCATION_DATA}
                  cx="50%" cy="50%"
                  innerRadius={66} outerRadius={104}
                  dataKey="value"
                  strokeWidth={3} stroke="#fff"
                  startAngle={90} endAngle={-270}
                >
                  {ALLOCATION_DATA.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
                <Tooltip formatter={(v) => `${v}%`}
                  contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #E2E8F0' }} />
              </PieChart>
            </ResponsiveContainer>
            </div>
            <div className="flex flex-col gap-3 flex-1">
              {ALLOCATION_DATA.map((d) => (
                <div key={d.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
                    <span className="text-[13px] text-slate-600">{d.name}</span>
                  </div>
                  <span className="text-[13px] font-semibold text-navy tabular-nums">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right panel */}
          <div className="flex flex-col gap-3">

            {/* Total Returns card */}
            <div className="rounded-xl border border-[#EEF1F5] bg-[#F8FAFC] p-4">
              <p className="eyebrow mb-3">Total returns</p>
              <div className="flex items-end gap-10">
                <div>
                  <p className="text-[24px] font-bold text-navy leading-none tabular-nums">₹4,85,000</p>
                  <p className="text-[12px] text-muted mt-1.5">Absolute</p>
                </div>
                <div>
                  <p className="text-[24px] font-bold text-primary leading-none tabular-nums">14.2%</p>
                  <p className="text-[12px] text-muted mt-1.5">CAGR</p>
                </div>
              </div>
            </div>

            {/* Best Performers — side by side */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Top performer', name: 'Mahindra', val: '+285%' },
                { label: 'Runner-up',     name: 'BYJUS',    val: '+123%' },
              ].map((p) => (
                <div key={p.name} className="rounded-xl border border-[#EEF1F5] bg-[#F8FAFC] p-4">
                  <p className="eyebrow">{p.label}</p>
                  <p className="text-[15px] font-semibold text-navy mt-2">{p.name}</p>
                  <p className="text-[13px] font-semibold text-positive mt-0.5 flex items-center gap-1">
                    <TrendingUp size={13} /> {p.val}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
