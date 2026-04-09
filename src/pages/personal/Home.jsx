import React, { useState } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid,
} from 'recharts';
import KpiTile from '../../components/ui/KpiTile';
import {
  Wallet, CreditCard, TrendingUp, FileText, Bitcoin,
  HeartPulse, Lightbulb, Shield, RefreshCw,
} from 'lucide-react';

/* ── Mock data ─────────────────────────────────────────── */
const MARKET_DATA = [
  { d: 'Jan', val: 42000, last: 38000 },
  { d: 'Feb', val: 44500, last: 40000 },
  { d: 'Mar', val: 43000, last: 39000 },
  { d: 'Apr', val: 46000, last: 41000 },
  { d: 'May', val: 45000, last: 40500 },
  { d: 'Jun', val: 47500, last: 42000 },
  { d: 'Jul', val: 46500, last: 41500 },
  { d: 'Aug', val: 49000, last: 43000 },
];

const TX_DONUT = [
  { name: 'Transfers', value: 42.1, color: '#0D2B45' },
  { name: 'Utilities', value: 22.8, color: '#0B6E6E' },
  { name: 'Groceries', value: 13.9, color: '#5EEAD4' },
  { name: 'Shopping',  value: 10.2, color: '#A78BFA' },
  { name: 'Other',     value: 11.0, color: '#CBD5E1' },
];

const AI_SUGGESTIONS = [
  {
    icon: Lightbulb,
    title: 'Optimize your savings',
    sub: 'Move ₹500 to high-yield savings account',
    cta: 'Act Now',
  },
  {
    icon: TrendingUp,
    title: 'Investment opportunity',
    sub: 'Consider diversifying with index funds',
    cta: 'Learn More',
  },
  {
    icon: Shield,
    title: 'Review insurance',
    sub: 'Your life insurance may need updating',
    cta: 'Review',
  },
];

const TIME_TABS = ['1D', '5D', '1W', '1M'];

/* ── Sub-components ────────────────────────────────────── */

// 3-column layout: icon | title+sub | CTA — single light-blue, unified
const SuggestionCard = ({ icon: Icon, title, sub, cta }) => (
  <div className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0"
        style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
        <Icon size={15} style={{ color: '#0d2b45' }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-semibold text-navy leading-tight">{title}</p>
        <p className="text-[12px] text-muted mt-0.5 leading-tight truncate">{sub}</p>
      </div>
      <button className="text-[12px] font-semibold text-[#0d2b45] bg-white border border-slate-200
                         px-3 py-1.5 rounded-lg shrink-0 hover:bg-slate-50 transition whitespace-nowrap"
        style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.06)' }}>
        {cta}
      </button>
    </div>
  </div>
);

const DonutLegend = ({ data }) => (
  <div className="flex flex-col gap-2.5 flex-1">
    {data.map((d) => (
      <div key={d.name} className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: d.color }} />
          <span className="text-[12px] text-muted">{d.name}</span>
        </div>
        <span className="text-[12px] font-semibold text-navy">{d.value}%</span>
      </div>
    ))}
  </div>
);

/* ── Page ──────────────────────────────────────────────── */
export default function Home() {
  const [marketTab, setMarketTab] = useState('1D');

  return (
    <div className="flex flex-col gap-6">

      <h1 className="font-display text-[32px] font-bold text-navy">Good evening, Harsh!</h1>

      {/* ── KPI grid 3×2 ── */}
      <div className="grid grid-cols-3 gap-4">
        <KpiTile
          label="Shared Wallet" sub="4 active members"
          value="₹ 15,950" delta="+2.5% this week" deltaType="positive"
          icon={<Wallet size={24} />} iconBg="bg-blue-100" iconColor="text-blue-600"
          footer="Last: Coffee Shop · ₹454" footerCta="Add Funds" footerCtaColor="primary"
        />
        <KpiTile
          label="Payments" sub="This month"
          value="₹ 3,224" delta="3 bills due" deltaType="negative"
          icon={<CreditCard size={24} />} iconBg="bg-green-100" iconColor="text-green-600"
          footer="Next: Electricity · ₹895" footerCta="Quick Pay" footerCtaColor="green"
        />
        <KpiTile
          label="Wealth" sub="Portfolio & Insurance"
          value="₹ 57,424" delta="+8.2% this month" deltaType="positive"
          icon={<TrendingUp size={24} />} iconBg="bg-purple-100" iconColor="text-purple-600"
          footer="Insurance expires: 2 policies" footerCta="View Portfolio" footerCtaColor="primary"
        />
        <KpiTile
          label="Tax Summary" sub="FY 2024-25"
          value="₹ 12,350" delta="₹2,100 remaining" deltaType="warning"
          icon={<FileText size={24} />} iconBg="bg-orange-100" iconColor="text-orange-600"
          footer="Deadline: Oct 31, 2025" footerCta="File Now" footerCtaColor="red"
        />
        <KpiTile
          label="Digital Assets" sub="Crypto & NFTs"
          value="₹ 3,224" delta="+5.8% (24h)" deltaType="positive"
          icon={<Bitcoin size={24} />} iconBg="bg-amber-100" iconColor="text-amber-600"
          footer="BTC, ETH, 3 NFTs" footerCta="Open Wallet" footerCtaColor="amber"
        />
        <KpiTile
          label="Financial Health" sub="AI Score"
          value="92" delta="out of 100" deltaType="positive"
          icon={<HeartPulse size={24} />} iconBg="bg-teal-100" iconColor="text-teal-600"
          footer="Excellent financial habits" footerCta="View Tips" footerCtaColor="teal"
        />
      </div>

      {/* ── Middle row ── */}
      <div className="grid grid-cols-2 gap-4">

        {/* AI Suggestions */}
        <div className="card">
          {/* <p className="text-[15px] font-Denton font-bold text-navy mb-4">AI Suggestions</p> */}
          <p className="font-display text-[20px] font-bold font-Denton text-navy mb-4">AI Suggestions</p>
          <div className="flex flex-col gap-3">
            {AI_SUGGESTIONS.map((s) => (
              <SuggestionCard key={s.title} {...s} />
            ))}
          </div>
        </div>

        {/* Transaction Insights */}
        <div className="card">
          <p className="font-display text-[20px] font-bold font-Denton text-navy mb-4">Transaction Insights</p>
          <div className="flex items-center gap-4">
            <div className="w-48 h-48 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={TX_DONUT} cx="50%" cy="50%"
                    innerRadius={46} outerRadius={72}
                    dataKey="value" stroke="none" paddingAngle={2}
                  >
                    {TX_DONUT.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip
                    formatter={(v) => `${v}%`}
                    contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #E2E8F0' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <DonutLegend data={TX_DONUT} />
          </div>
        </div>
      </div>

      {/* ── Market chart ── */}
      <div className="card">
        <div className="flex items-center justify-between mb-5">
          <p className="font-display text-[20px] font-bold font-Denton text-navy mb-4">Market</p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 bg-surface rounded-lg p-0.5">
              {TIME_TABS.map((t) => (
                <button key={t} onClick={() => setMarketTab(t)}
                  className={`text-[12px] px-3 py-1 rounded-md font-medium transition-all
                    ${marketTab === t ? 'bg-white text-navy shadow-sm font-semibold' : 'text-muted hover:text-navy'}`}>
                  {t}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3 text-[12px] text-muted">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary inline-block" /> This year
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-slate-300 inline-block" /> Last year
              </span>
            </div>
            <button className="btn-primary text-[12px] py-1.5 px-3">
              <RefreshCw size={12} /> Switch to Advanced Graph
            </button>
          </div>
        </div>
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={MARKET_DATA} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="d" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #E2E8F0' }} />
              <Line type="monotone" dataKey="val"  stroke="#0B6E6E" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
              <Line type="monotone" dataKey="last" stroke="#CBD5E1" strokeWidth={2} dot={false} strokeDasharray="4 3" activeDot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
