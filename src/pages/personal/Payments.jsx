import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import StatusBadge from '../../components/ui/StatusBadge';
import {
  Send, HandCoins, PlusCircle, Receipt,
  Zap, Flame, Wifi, Tv, Play, MoreHorizontal,
  Edit2, Trash2, FileText, ArrowDownLeft, ArrowUpRight,
  Settings, Plus,
} from 'lucide-react';

/* ── Mock data ─────────────────────────────────────── */
const CASHFLOW_DATA = [
  { month: 'April', inc: 80, out: 55 },
  { month: 'May',   inc: 90, out: 60 },
  { month: 'July',  inc: 75, out: 50 },
  { month: 'Sep',   inc: 85, out: 65 },
  { month: 'Nov',   inc: 95, out: 70 },
];

const TRANSACTIONS = [
  {
    date: 'Jan 15, 2025',
    name: 'Rahul Sharma',
    sub: '+91 98765 43210',
    avatarBg: '#0B6E6E', avatarText: 'R',
    amount: '-₹2,500', status: 'success', positive: false,
  },
  {
    date: 'Jan 14, 2025',
    name: 'TATA Power',
    sub: 'Electricity Bill',
    avatarBg: '#F59E0B', avatarText: '⚡',
    amount: '-₹1,245', status: 'success', positive: false,
  },
  {
    date: 'Jan 13, 2025',
    name: 'Tejas Sharma',
    sub: 'Salary Credit',
    avatarBg: '#6366F1', avatarText: 'T',
    amount: '+₹45,000', status: 'success', positive: true,
  },
];

const BILLERS = [
  { icon: Zap,           label: 'Electricity', bg: '#FEF3C7', color: '#D97706' },
  { icon: Flame,         label: 'Gas',         bg: '#FEE2E2', color: '#DC2626' },
  { icon: Wifi,          label: 'Internet',    bg: '#DBEAFE', color: '#2563EB' },
  { icon: Tv,            label: 'DTH',         bg: '#EDE9FE', color: '#7C3AED' },
  { icon: Play,          label: 'Streaming',   bg: '#FCE7F3', color: '#DB2777' },
  { icon: MoreHorizontal,label: 'More',        bg: '#F1F5F9', color: '#64748B' },
];

const SAVED_BILLERS = [
  { icon: Zap,  iconBg: '#FEF3C7', iconColor: '#D97706', name: 'State EB',         due: '₹999' },
  { icon: Wifi, iconBg: '#DBEAFE', iconColor: '#2563EB', name: 'Airtel Broadband', due: '₹599' },
];

const SCHEDULED = [
  { emoji: '👩', bg: '#FEF3C7', label: '₹9,000 to Mom',       bold: 'Mom',      sub: 'Every 1st of month'  },
  { emoji: '📶', bg: '#DBEAFE', label: '₹8,500 for Internet', bold: 'Internet', sub: 'Next: Oct 30, 2025'  },
  { emoji: '🏠', bg: '#EDE9FE', label: '₹15,000 to Landlord', bold: 'Landlord', sub: 'Next: Nov 1, 2025'   },
];

const TX_TABS = ['All', 'Sent', 'Received', 'Bills'];

/* ── Sub-components ─────────────────────────────────── */
const QuickAction = ({ icon: Icon, label, sub }) => (
  <button className="flex-1 flex flex-col items-center gap-2 py-4 bg-white rounded-card 
    hover:shadow-card-hover transition-shadow cursor-pointer">
<div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center">
      <Icon size={19} className="text-primary" />
    </div>
    <div className="text-center">
      <p className="text-[13px] font-semibold text-navy">{label}</p>
      <p className="text-[11px] text-muted">{sub}</p>
    </div>
  </button>
);

const CashflowTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-border rounded-xl shadow-card px-3 py-2 text-xs">
      <p className="font-semibold text-navy mb-1">{label}</p>
      <p className="text-positive font-medium">In: {payload[0]?.value}k</p>
      <p className="text-negative font-medium">Out: {payload[1]?.value}k</p>
    </div>
  );
};

/* ── Page ───────────────────────────────────────────── */
export default function Payments() {
  const [txTab, setTxTab]         = useState('All');
  const [showBalance, setShowBalance] = useState(false);

  return (
    <div className="flex flex-col gap-5">

      {/* ── Quick actions ── */}
      <div className="flex gap-4">
        <QuickAction icon={Send}       label="Send Money"    sub="Transfer instantly, anytime"  />
        <QuickAction icon={HandCoins}  label="Request Money" sub="Ask & receive in one tap"     />
        <QuickAction icon={PlusCircle} label="Add Money"     sub="Top-up wallet in one click"   />
        <QuickAction icon={Receipt}    label="Pay Bill"      sub="Settle utilities in seconds"   />
      </div>

      {/* ── Balance + Cashflow ── */}
      <div className="grid grid-cols-[1fr_340px] gap-4">

        {/* Balance Overview */}
        <div className="card flex flex-col gap-4">
          <div>
          <p className="font-display text-[20px] font-bold font-Denton text-navy mb-4">Balance Overview</p>
            {/* Blurred / revealed balance */}
            <p
              className="text-[30px] font-bold text-navy tracking-tight leading-none mb-1 cursor-pointer select-none"
              style={{ filter: showBalance ? 'none' : 'blur(0)' }}
              onClick={() => setShowBalance(!showBalance)}
            >
              ₹1,83,342
            </p>
            <p
              className="text-[11px] text-muted font-medium uppercase tracking-wider cursor-pointer"
              onClick={() => setShowBalance(!showBalance)}
            >
              {showBalance ? 'Tap to hide balance' : 'Tap to view balance'}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 flex-wrap">
            <button className="btn-primary">
              <FileText size={13} /> Account Statement
            </button>
            <button className="btn-outline">
              <ArrowUpRight size={13} /> Withdraw Funds
            </button>
            <button className="btn-ghost">
              ••• Manage UPI PIN
            </button>
          </div>

          {/* Linked Accounts */}
          <div>
            <p className="text-[11px] font-semibold text-muted mb-2 uppercase tracking-wider">
              Linked Accounts
            </p>
            <div className="flex flex-col gap-2">
              {[
                { abbr: 'SBI',  bg: '#1e5fa8', name: 'State Bank of India', num: '****4567', on: true  },
                { abbr: 'HDFC', bg: '#d4002a', name: 'HDFC Bank',           num: '****4567', on: false },
              ].map((a) => (
                <div key={a.abbr}
                  className="flex items-center justify-between bg-surface rounded-xl px-3 py-2.5">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-[10px] font-bold"
                      style={{ background: a.bg }}
                    >
                      {a.abbr}
                    </div>
                    <div>
                      <p className="text-[12px] font-semibold text-navy">{a.name}</p>
                      <p className="text-[11px] text-muted">{a.num}</p>
                    </div>
                  </div>
                  {/* Toggle */}
                  <div
                    className={`w-10 h-[22px] rounded-full transition-colors relative cursor-pointer
                      ${a.on ? 'bg-primary' : 'bg-slate-200'}`}
                  >
                    <div
                      className={`w-[18px] h-[18px] bg-white rounded-full absolute top-0.5 shadow-sm transition-all
                        ${a.on ? 'right-0.5' : 'left-0.5'}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cashflow Chart */}
        <div className="card flex flex-col gap-3">
          {/* Incoming / Outgoing tiles */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-surface rounded-xl px-3 py-2.5 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-positive flex items-center justify-center shrink-0">
                <ArrowDownLeft size={14} className="text-white" />
              </div>
              <div>
                <p className="text-[10px] text-muted">Incoming</p>
                <p className="text-[15px] font-bold text-positive">₹9,54,232</p>
              </div>
            </div>
            <div className="bg-surface rounded-xl px-3 py-2.5 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-negative flex items-center justify-center shrink-0">
                <ArrowUpRight size={14} className="text-white" />
              </div>
              <div>
                <p className="text-[10px] text-muted">Outgoing</p>
                <p className="text-[15px] font-bold text-negative">₹3,31,245</p>
              </div>
            </div>
          </div>

          {/* Stacked bar chart */}
          <div className="flex-1 h-44">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={CASHFLOW_DATA}
                barCategoryGap="35%"
                margin={{ top: 4, right: 4, left: 0, bottom: 0 }}
              >
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 10, fill: '#94A3B8' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis hide />
                <Tooltip content={<CashflowTooltip />} />
                <Bar dataKey="inc" stackId="a" fill="#16A34A" radius={[0, 0, 0, 0]} />
                <Bar dataKey="out" stackId="a" fill="#DC2626" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Stats */}
          <div className="flex gap-4">
            <p className="text-[11px] text-muted">
              <span className="font-bold text-navy">30%</span> better than last month
            </p>
            <p className="text-[11px] text-muted">
              <span className="font-bold text-navy">15%</span> more saved
            </p>
          </div>
        </div>
      </div>

      {/* ── Recent Transactions ── */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <p className="font-display text-[20px] font-bold font-Denton text-navy mb-4">Recent Transactions</p>
          <div className="flex items-center gap-0.5 bg-surface rounded-lg p-0.5">
            {TX_TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTxTab(t)}
                className={`text-[11px] px-3 py-1 rounded-md font-medium transition-all
                  ${txTab === t
                    ? 'bg-white text-navy shadow-sm font-semibold'
                    : 'text-muted hover:text-navy'}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left pb-2.5 text-[11px] font-medium text-muted">Date</th>
              <th className="text-left pb-2.5 text-[11px] font-medium text-muted">Recipient/Sender</th>
              <th className="text-left pb-2.5 text-[11px] font-medium text-muted">Amount</th>
              <th className="text-left pb-2.5 text-[11px] font-medium text-muted">Status</th>
              <th className="text-left pb-2.5 text-[11px] font-medium text-muted">Action</th>
            </tr>
          </thead>
          <tbody>
            {TRANSACTIONS.map((tx, i) => (
              <tr key={i} className="border-b border-border last:border-0">
                <td className="py-3.5 text-[12px] text-muted">{tx.date}</td>
                <td className="py-3.5">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[12px] font-bold shrink-0"
                      style={{ background: tx.avatarBg }}
                    >
                      {tx.avatarText}
                    </div>
                    <div>
                      <p className="text-[12px] font-semibold text-navy">{tx.name}</p>
                      <p className="text-[11px] text-muted">{tx.sub}</p>
                    </div>
                  </div>
                </td>
                <td className={`py-3.5 text-[13px] font-bold ${tx.positive ? 'text-positive' : 'text-negative'}`}>
                  {tx.amount}
                </td>
                <td className="py-3.5">
                  <StatusBadge status={tx.status} />
                </td>
                <td className="py-3.5">
                  <button className="text-[12px] text-primary font-semibold hover:underline">
                    Receipt
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="text-[12px] text-primary font-semibold mt-3 flex items-center gap-1 hover:underline">
          Show all transactions →
        </button>
      </div>

      {/* ── Bills & Scheduled ── */}
      <div className="grid grid-cols-2 gap-4">

        {/* Bills & Payments */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
          <p className="font-display text-[20px] font-bold font-Denton text-navy mb-4">Bills & Payments</p>
            <button className="flex items-center gap-1 text-[12px] text-primary font-medium hover:underline">
              Manage <Settings size={12} />
            </button>
          </div>

          {/* Biller grid */}
          <div className="grid grid-cols-3 gap-2 mb-5">
            {BILLERS.map(({ icon: Icon, label, bg, color }) => (
              <button
                key={label}
                className="flex flex-col items-center gap-1.5 py-3 rounded-xl hover:bg-surface transition-colors"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: bg }}
                >
                  <Icon size={18} style={{ color }} />
                </div>
                <span className="text-[11px] text-muted font-medium">{label}</span>
              </button>
            ))}
          </div>

          {/* Saved Billers */}
          <p className="text-[11px] font-semibold text-muted uppercase tracking-wider mb-2">
            Saved Billers
          </p>
          <div className="flex flex-col gap-3">
            {SAVED_BILLERS.map((b) => (
              <div key={b.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: b.iconBg }}
                  >
                    <b.icon size={14} style={{ color: b.iconColor }} />
                  </div>
                  <div>
                    <p className="text-[12px] font-semibold text-navy">{b.name}</p>
                    <p className="text-[11px] text-muted">Due: {b.due}</p>
                  </div>
                </div>
                <button className="btn-primary py-1 px-3 text-[11px]">Pay Now</button>
              </div>
            ))}
          </div>
        </div>

        {/* Scheduled Transfers */}
        <div className="card">
          <p className="font-display text-[20px] font-bold font-Denton text-navy mb-4">Scheduled Transfers</p>
          <div className="flex flex-col gap-3">
            {SCHEDULED.map((s, i) => (
              <div
                key={i}
                className="flex items-center justify-between bg-surface rounded-xl px-3 py-3"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-[18px]"
                    style={{ background: s.bg }}
                  >
                    {s.emoji}
                  </div>
                  <div>
                    {/* Bold the name within the label */}
                    <p className="text-[12px] font-semibold text-navy">
                      {s.label.split(s.bold).map((part, j, arr) =>
                        j < arr.length - 1
                          ? <span key={j}>{part}<span className="text-primary">{s.bold}</span></span>
                          : <span key={j}>{part}</span>
                      )}
                    </p>
                    <p className="text-[11px] text-muted">{s.sub}</p>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  <button className="w-7 h-7 rounded-lg bg-white border border-border flex items-center justify-center hover:border-primary transition-colors">
                    <Edit2 size={12} className="text-muted" />
                  </button>
                  <button className="w-7 h-7 rounded-lg bg-white border border-border flex items-center justify-center hover:border-negative transition-colors">
                    <Trash2 size={12} className="text-muted" />
                  </button>
                </div>
              </div>
            ))}

            <button className="flex items-center gap-2 text-[12px] text-primary font-semibold mt-1 hover:underline">
              <Plus size={13} /> Add New Transfer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
