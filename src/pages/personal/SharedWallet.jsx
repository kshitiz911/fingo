import React, { useState } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis,
} from 'recharts';
import PageHeader from '../../components/ui/PageHeader';
import SectionHeader from '../../components/ui/SectionHeader';
import Segmented from '../../components/ui/Segmented';
import {
  Plus, UserPlus, ArrowUpFromLine,
  UtensilsCrossed, ShoppingCart, Receipt, PlusCircle, ArrowRight,
} from 'lucide-react';

/* ── Mock data ─────────────────────────────────────── */
const MEMBERS = [
  { name: 'Harsh (You)', color: '#0B6E6E', amount: 8500  },
  { name: 'Shristi',     color: '#16A34A', amount: 7200  },
  { name: 'Vinayak',     color: '#5EEAD4', amount: 7200  },
  { name: 'Others',      color: '#A78BFA', amount: 7200  },
];

const TRANSACTIONS = [
  {
    icon: UtensilsCrossed,
    iconBg: '#FEE2E2', iconColor: '#DC2626',
    name: 'Dinner at Olive Garden',
    time: 'Today, 8:30 PM',
    amount: '-₹2,450', by: 'Vinayak', positive: false,
  },
  {
    icon: PlusCircle,
    iconBg: '#DCFCE7', iconColor: '#16A34A',
    name: 'Money Added',
    time: 'Yesterday, 2:15 PM',
    amount: '+₹8,000', by: 'Shristi', positive: true,
  },
  {
    icon: ShoppingCart,
    iconBg: '#DBEAFE', iconColor: '#2563EB',
    name: 'Grocery Shopping',
    time: '2 days ago, 6:45 PM',
    amount: '-₹1,950', by: 'Harsh', positive: false,
  },
  {
    icon: Receipt,
    iconBg: '#EDE9FE', iconColor: '#7C3AED',
    name: 'Bill Payment',
    time: '2 days ago, 9:45 AM',
    amount: '-₹9,900', by: 'Harsh', positive: false,
  },
];

const CATEGORY_DATA = [
  { cat: 'Utility',   thisMonth: 45000, lastMonth: 38000 },
  { cat: 'Transfer',  thisMonth: 20000, lastMonth: 25000 },
  { cat: 'Shopping',  thisMonth: 30000, lastMonth: 22000 },
  { cat: 'Groceries', thisMonth: 18000, lastMonth: 15000 },
  { cat: 'Misc',      thisMonth: 12000, lastMonth: 10000 },
];

const TX_TABS = ['All', 'Income', 'Expense', 'By Member'];

const USED  = 18500;
const LIMIT = 25000;
const PCT   = Math.round((USED / LIMIT) * 100);
const TOTAL = MEMBERS.reduce((s, m) => s + m.amount, 0);

/* ── Custom tooltip for bar chart ──────────────────── */
const BarTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-border rounded-xl shadow-card px-3 py-2 text-xs">
      <p className="font-semibold text-navy mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.fill }} className="font-medium">
          {p.name === 'thisMonth' ? 'This Month' : 'Last Month'}: ₹{p.value.toLocaleString('en-IN')}
        </p>
      ))}
    </div>
  );
};

/* ── Page ───────────────────────────────────────────── */
export default function SharedWallet() {
  const [txTab, setTxTab] = useState('All');

  return (
    <div className="flex flex-col gap-6">

      <PageHeader
        title="Shared Wallet"
        subtitle="Family wallet · 4 members contributing this month."
        actions={
          <>
            <button className="btn-ghost"><ArrowUpFromLine size={15} /> Withdraw</button>
            <button className="btn-outline"><UserPlus size={15} /> Invite Members</button>
            <button className="btn-primary"><Plus size={15} /> Add Money</button>
          </>
        }
      />

      {/* ── Row 1: Wallet Overview + Contribution Breakdown ── */}
      <div className="grid grid-cols-[1fr_340px] gap-4">

        {/* Wallet Overview */}
        <div className="card flex flex-col justify-between gap-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="eyebrow">Total available balance</p>
              <p className="text-[40px] font-bold text-navy tracking-[-0.02em] leading-none mt-3 tabular-nums">
                ₹{TOTAL.toLocaleString('en-IN')}
              </p>
              <p className="text-[13px] text-muted mt-2">
                <span className="font-semibold text-positive">+₹8,000</span> added this week
              </p>
            </div>

            {/* Members */}
            <div className="flex flex-col items-end gap-1.5">
              <div className="flex items-center">
                {MEMBERS.slice(0, 3).map((m, i) => (
                  <div
                    key={m.name}
                    className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-white text-[12px] font-bold"
                    style={{ background: m.color, marginLeft: i === 0 ? 0 : '-10px', zIndex: 3 - i }}
                  >
                    {m.name[0]}
                  </div>
                ))}
                <div
                  className="w-9 h-9 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[11px] font-semibold text-muted"
                  style={{ marginLeft: '-10px' }}
                >
                  +2
                </div>
              </div>
              <p className="text-[12px] text-muted">4 members</p>
            </div>
          </div>

          {/* This month */}
          <div className="grid grid-cols-3 rounded-xl border border-[#EEF1F5] divide-x divide-[#EEF1F5]">
            {[
              { label: 'Spent this month', value: '₹14,300' },
              { label: 'Added this month', value: '₹30,100' },
              { label: 'Avg. per member',  value: '₹7,525' },
            ].map((m) => (
              <div key={m.label} className="px-4 py-3">
                <p className="text-[12px] text-muted">{m.label}</p>
                <p className="text-[17px] font-bold text-navy mt-0.5 tabular-nums">{m.value}</p>
              </div>
            ))}
          </div>

          {/* Spending limit bar */}
          <div className="rounded-xl border border-[#EEF1F5] bg-[#F8FAFC] px-4 py-3.5">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[13px] font-semibold text-navy">Monthly spending limit</p>
              <p className="text-[13px] text-muted tabular-nums">
                <span className="font-semibold text-navy">₹{USED.toLocaleString('en-IN')}</span> of ₹{LIMIT.toLocaleString('en-IN')}
              </p>
            </div>
            <div className="h-2 bg-slate-200/70 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${PCT}%`,
                  background: PCT >= 80 ? '#D97706' : '#0B6E6E',
                }}
              />
            </div>
            <p className="text-[12px] text-muted mt-2">
              ₹{(LIMIT - USED).toLocaleString('en-IN')} left · {PCT}% used
            </p>
          </div>
        </div>

        {/* Contribution Breakdown */}
        <div className="card flex flex-col">
          <SectionHeader title="Contributions" subtitle="Who added what this month" />

          <div className="flex-1 flex flex-col justify-center gap-5">
          {/* Donut */}
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={MEMBERS}
                  cx="50%"
                  cy="50%"
                  innerRadius={44}
                  outerRadius={68}
                  dataKey="amount"
                  stroke="none"
                  paddingAngle={3}
                >
                  {MEMBERS.map((m, i) => (
                    <Cell key={i} fill={m.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(v) => `₹${v.toLocaleString('en-IN')}`}
                  contentStyle={{
                    fontSize: 11,
                    borderRadius: 8,
                    border: '1px solid #E2E8F0',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex flex-col gap-2.5">
            {MEMBERS.map((m) => (
              <div key={m.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: m.color }} />
                  <span className="text-[12px] text-muted">{m.name}</span>
                </div>
                <span className="text-[12px] font-semibold text-navy tabular-nums">
                  ₹{m.amount.toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>
          </div>
        </div>
      </div>

      {/* ── Row 2: Recent Transactions + Spent by Categories ── */}
      <div className="grid grid-cols-[1fr_340px] gap-4">

        {/* Recent Transactions */}
        <div className="card">
          <SectionHeader
            title="Recent Transactions"
            subtitle="Everyone’s activity in this wallet"
            className="mb-2"
            actions={<Segmented options={TX_TABS} value={txTab} onChange={setTxTab} size="sm" />}
          />

          {/* Transaction rows */}
          <div className="flex flex-col">
            {TRANSACTIONS.map((tx, i) => (
              <div
                key={i}
                className="flex items-center gap-3 py-3.5 border-b border-[#EEF1F5] last:border-0"
              >
                {/* Icon */}
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: tx.iconBg }}
                >
                  <tx.icon size={16} style={{ color: tx.iconColor }} />
                </div>

                {/* Name + time */}
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-navy truncate">{tx.name}</p>
                  <p className="text-[12px] text-muted">{tx.time}</p>
                </div>

                {/* Amount + by */}
                <div className="text-right shrink-0">
                  <p className={`text-[14px] font-semibold tabular-nums ${tx.positive ? 'text-positive' : 'text-navy'}`}>
                    {tx.amount}
                  </p>
                  <p className="text-[12px] text-muted">by {tx.by}</p>
                </div>
              </div>
            ))}
          </div>

          <button className="link-action mt-4">
            Show all transactions <ArrowRight size={14} />
          </button>
        </div>

        {/* Spent by Categories */}
        <div className="card flex flex-col">
          <SectionHeader title="Spending by Category" subtitle="This month vs last month" />

          {/* Legend */}
          <div className="flex items-center gap-4 mb-3">
            <span className="flex items-center gap-1.5 text-[11px] text-muted">
              <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block" />
              This Month
            </span>
            <span className="flex items-center gap-1.5 text-[11px] text-muted">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300 inline-block" />
              Last Month
            </span>
          </div>

          {/* Bar chart */}
          <div className="flex-1 min-h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={CATEGORY_DATA}
                barGap={3}
                barCategoryGap="30%"
                margin={{ top: 4, right: 4, left: 0, bottom: 0 }}
              >
                <XAxis
                  dataKey="cat"
                  interval={0}
                  tick={{ fontSize: 11, fill: '#94A3B8' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis hide />
                <Tooltip content={<BarTooltip />} />
                <Bar dataKey="thisMonth" fill="#0B6E6E" radius={[4, 4, 0, 0]} maxBarSize={16} />
                <Bar dataKey="lastMonth" fill="#CBD5E1" radius={[4, 4, 0, 0]} maxBarSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

    </div>
  );
}
