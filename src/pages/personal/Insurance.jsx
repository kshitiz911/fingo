import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Landmark, GraduationCap, PiggyBank, Diamond, Home, HeartPulse, TrendingUp, ArrowUp, ChevronRight } from 'lucide-react';

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
const GoalCard = ({ icon: Icon, label, value, target, pct, completion }) => (
  <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-5 flex flex-col gap-3">
    <div className="flex items-start justify-between">
      <p className="text-sm font-bold text-navy">{label}</p>
      <Icon size={20} className="text-primary shrink-0" />
    </div>
    <p className="text-2xl font-bold text-navy">{value}</p>
    <p className="text-xs text-muted">{target}</p>
    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
      <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${pct}%` }} />
    </div>
    <p className="text-xs text-muted">{completion}</p>
  </div>
);

// ── Main ─────────────────────────────────────────────────────────────────────
export default function Insurance() {
  const [growthTab, setGrowthTab] = useState('Daily');

  return (
    <div className="flex flex-col gap-6">

      {/* ── KPI Tiles — 4 unique tinted cards ── */}
      <div className="grid grid-cols-4 gap-4">

        {/* Total Net Worth — teal tint */}
        <div className="rounded-2xl border border-teal-100 bg-teal-50/60 px-5 py-4 flex flex-col gap-1">
          <p className="text-sm font-semibold text-primary">Total Net Worth</p>
          <p className="text-3xl font-bold text-navy">₹24,85,670</p>
          <p className="text-xs font-semibold text-positive flex items-center gap-0.5">
            <ArrowUp size={11} /> +12.5%
          </p>
        </div>

        {/* Portfolio Growth — blue tint with toggle */}
        <div className="rounded-2xl border border-blue-100 bg-blue-50/60 px-5 py-4 flex flex-col gap-1">
          <p className="text-sm font-semibold text-blue-600">Portfolio Growth</p>
          <p className="text-3xl font-bold text-navy">+18.2%</p>
          <div className="flex gap-1 mt-1">
            {['Daily', 'Weekly', 'Monthly'].map((t) => (
              <button key={t} onClick={() => setGrowthTab(t)}
                className={`text-[11px] px-2 py-0.5 rounded-md font-medium transition-all
                  ${growthTab === t
                    ? 'bg-primary text-white'
                    : 'text-muted hover:bg-white/80'}`}>
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Insurance Coverage — purple tint */}
        <div className="rounded-2xl border border-purple-100 bg-purple-50/60 px-5 py-4 flex flex-col gap-1">
          <p className="text-sm font-semibold text-purple-600">Insurance Coverage</p>
          <p className="text-3xl font-bold text-navy">₹75,00,000</p>
          <p className="text-xs font-semibold text-primary">4 Active Policies</p>
        </div>

        {/* Monthly Returns — green tint */}
        <div className="rounded-2xl border border-green-100 bg-green-50/60 px-5 py-4 flex flex-col gap-1">
          <p className="text-sm font-semibold text-green-600">Monthly Returns</p>
          <p className="text-3xl font-bold text-navy">₹42,850</p>
          <p className="text-xs font-semibold text-positive flex items-center gap-0.5">
            <ArrowUp size={11} /> +8.5%
          </p>
        </div>

      </div>

      {/* ── Financial Goals ── */}
      <div>
          <h2 className="font-display text-[28px] font-bold font-Denton text-navy mb-4">Financial Goals</h2>
        <div className="grid grid-cols-3 gap-4">
          {GOALS.map((g) => <GoalCard key={g.label} {...g} />)}
        </div>
        <button className="flex items-center gap-1 text-sm font-medium text-primary mt-4 hover:underline">
          Manage Financial Goals <ChevronRight size={15} />
        </button>
      </div>

      {/* ── Asset Allocation ── */}
      <div className="bg-white rounded-2xl shadow-card p-6">
        <h2 className="font-display text-[24px] font-bold font-Denton text-navy mb-6">Asset Allocation</h2>
        <div className="flex gap-6">

          {/* Donut chart — left half */}
          <div className="flex-1 flex items-center justify-center" style={{ minHeight: 280 }}>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={ALLOCATION_DATA}
                  cx="50%" cy="50%"
                  innerRadius={72} outerRadius={118}
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

          {/* Right panel */}
          <div className="flex-1 flex flex-col gap-4 justify-center">

            {/* Total Returns card */}
            <div className="border border-border rounded-2xl p-4">
              <p className="text-sm font-bold text-navy mb-2">Total Returns</p>
              <div className="flex items-end gap-6">
                <div>
                  <p className="text-2xl font-bold text-navy">₹4,85,000</p>
                  <p className="text-xs text-muted mt-0.5">Absolute Returns</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">14.2%</p>
                  <p className="text-xs text-muted mt-0.5">CAGR</p>
                </div>
              </div>
            </div>

            {/* Best Performers — side by side */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Best Performer', name: 'Mahindra', val: '+285%' },
                { label: 'Best Performer', name: 'BYJUS',    val: '+123%' },
              ].map((p) => (
                <div key={p.name} className="border border-border rounded-2xl p-4">
                  <p className="text-xs text-muted">{p.label}</p>
                  <p className="text-base font-bold text-navy mt-0.5 flex items-center gap-1">
                    <TrendingUp size={13} className="text-positive" /> {p.name}
                  </p>
                  <p className="text-sm font-bold text-positive mt-0.5">{p.val}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
