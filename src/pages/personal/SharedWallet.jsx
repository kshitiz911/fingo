import React, { useState } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis,
} from 'recharts';
import StatusBadge from '../../components/ui/StatusBadge';
import {
  Plus, UserPlus, ArrowUpFromLine,
  UtensilsCrossed, ShoppingCart, Receipt, PlusCircle,
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
    <div className="flex flex-col gap-5">

      {/* ── Row 1: Wallet Overview + Contribution Breakdown ── */}
      <div className="grid grid-cols-[1fr_280px] gap-4">

        {/* Wallet Overview */}
        <div className="card flex flex-col gap-4">
          <div>
          <p className="font-display text-[24px] font-bold font-Denton text-navy mb-2">Wallet Overview</p>
            <p className="text-[48px] font-bold text-navy tracking-tight leading-none">
              ₹{TOTAL.toLocaleString('en-IN')}
            </p>
            <p className="text-[16px] text-muted mt-2">Total Available Balance</p>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            <button className="btn-primary">
              <Plus size={16} /> Add Money
            </button>
            <button className="btn-outline">
              <UserPlus size={16} /> Invite Members
            </button>
            <button className="btn-ghost">
              <ArrowUpFromLine size={16} /> Withdraw Funds
            </button>
          </div>

          {/* Member avatars */}
          <div>
            <div className="flex items-center mb-1">
              {MEMBERS.slice(0, 3).map((m, i) => (
                <div
                  key={m.name}
                  className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-[11px] font-bold"
                  style={{ background: m.color, marginLeft: i === 0 ? 0 : '-8px', zIndex: 3 - i }}
                >
                  {m.name[0]}
                </div>
              ))}
              <div
                className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[11px] font-semibold text-muted"
                style={{ marginLeft: '-8px' }}
              >
                +2
              </div>
            </div>
            <p className="text-[12px] text-muted">4 members</p>
          </div>

          {/* Spending limit bar */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-[12px] font-medium text-muted">Monthly Spending Limit</p>
              <p className="text-[12px] text-muted">
                ₹{USED.toLocaleString('en-IN')} used of ₹{LIMIT.toLocaleString('en-IN')}
              </p>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${PCT}%`,
                  background: PCT >= 80 ? '#D97706' : '#0B6E6E',
                }}
              />
            </div>
            <p className="text-[12px] text-warning font-semibold mt-1.5">
              ₹{(LIMIT - USED).toLocaleString('en-IN')} remaining this month
            </p>
          </div>
        </div>

        {/* Contribution Breakdown */}
        <div className="card flex flex-col">
          <p className="font-display text-[20px] font-bold font-Denton text-navy mb-4">Contribution Breakdown</p>

          {/* Donut */}
          <div className="h-44">
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
          <div className="flex flex-col gap-2 mt-1">
            {MEMBERS.map((m) => (
              <div key={m.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: m.color }} />
                  <span className="text-[12px] text-muted">{m.name}</span>
                </div>
                <span className="text-[12px] font-semibold text-navy">
                  ₹{m.amount.toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Row 2: Recent Transactions + Spent by Categories ── */}
      <div className="grid grid-cols-[1fr_280px] gap-4">

        {/* Recent Transactions */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
          <p className="font-display text-[20px] font-bold font-Denton text-navy mb-4">Recent Transactions</p>
            {/* Tab group */}
            <div className="flex items-center gap-0.5 bg-surface rounded-lg p-0.5">
              {TX_TABS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTxTab(t)}
                  className={`text-[11px] px-2.5 py-1 rounded-md font-medium transition-all
                    ${txTab === t
                      ? 'bg-white text-navy shadow-sm font-semibold'
                      : 'text-muted hover:text-navy'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Transaction rows */}
          <div className="flex flex-col">
            {TRANSACTIONS.map((tx, i) => (
              <div
                key={i}
                className="flex items-center gap-3 py-3 border-b border-border last:border-0"
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
                  <p className="text-[11px] text-muted">{tx.time}</p>
                </div>

                {/* Amount + by */}
                <div className="text-right shrink-0">
                  <p className={`text-[13px] font-bold ${tx.positive ? 'text-positive' : 'text-negative'}`}>
                    {tx.amount}
                  </p>
                  <p className="text-[11px] text-muted">{tx.by}</p>
                </div>
              </div>
            ))}
          </div>

          <button className="text-[12px] text-primary font-semibold mt-3 flex items-center gap-1 hover:underline">
            Show all transactions ↓
          </button>
        </div>

        {/* Spent by Categories */}
        <div className="card flex flex-col">
          <p className="font-display text-[20px] font-bold font-Denton text-navy mb-4">Spent by Categories</p>

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
          <div className="flex-1 h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={CATEGORY_DATA}
                barGap={3}
                barCategoryGap="30%"
                margin={{ top: 4, right: 4, left: 0, bottom: 0 }}
              >
                <XAxis
                  dataKey="cat"
                  tick={{ fontSize: 10, fill: '#94A3B8' }}
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
