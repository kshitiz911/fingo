import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import StatusBadge from '../../components/ui/StatusBadge';
import PageHeader from '../../components/ui/PageHeader';
import SectionHeader from '../../components/ui/SectionHeader';
import Segmented from '../../components/ui/Segmented';
import QuickAction from '../../components/ui/QuickAction';
import {
  Send, HandCoins, PlusCircle, Receipt,
  Zap, Flame, Wifi, Tv, Play, MoreHorizontal,
  Edit2, Trash2, FileText, ArrowDownLeft, ArrowUpRight,
  Settings, Plus, Eye, EyeOff, KeyRound, ArrowRight, User, Home as HomeIcon,
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
    avatarBg: '#F59E0B', avatarText: 'T',
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
  { icon: User,     to: 'Mom',      amount: '₹9,000',  sub: 'Monthly · 1st'      },
  { icon: Wifi,     to: 'Internet', amount: '₹8,500',  sub: 'Next on Oct 30'     },
  { icon: HomeIcon, to: 'Landlord', amount: '₹15,000', sub: 'Next on Nov 1'      },
];

const TX_TABS = ['All', 'Sent', 'Received', 'Bills'];

/* ── Sub-components ─────────────────────────────────── */
const CashflowTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-border rounded-xl shadow-card px-3 py-2 text-xs">
      <p className="font-semibold text-navy mb-1">{label}</p>
      <p className="text-primary font-medium">In: ₹{payload[0]?.value}k</p>
      <p className="text-red-500 font-medium">Out: ₹{payload[1]?.value}k</p>
    </div>
  );
};

const LINKED = [
  { abbr: 'SBI',  bg: '#1e5fa8', name: 'State Bank of India', num: '•••• 4567', primary: true  },
  { abbr: 'HDFC', bg: '#d4002a', name: 'HDFC Bank',           num: '•••• 8812', primary: false },
];

/* ── Page ───────────────────────────────────────────── */
export default function Payments() {
  const [txTab, setTxTab]             = useState('All');
  const [showBalance, setShowBalance] = useState(true);

  return (
    <div className="flex flex-col gap-6">

      <PageHeader title="Payments" subtitle="Send, request and pay bills from your linked accounts." />

      {/* ── Quick actions ── */}
      <div className="flex gap-4">
        <QuickAction icon={Send}       label="Send Money"    sub="Transfer instantly, anytime" />
        <QuickAction icon={HandCoins}  label="Request Money" sub="Ask & receive in one tap"    />
        <QuickAction icon={PlusCircle} label="Add Money"     sub="Top up your wallet"          />
        <QuickAction icon={Receipt}    label="Pay Bill"      sub="Settle utilities in seconds" />
      </div>

      {/* ── Balance + Cashflow ── */}
      <div className="grid grid-cols-[1fr_380px] gap-4">

        {/* Balance Overview */}
        <div className="card flex flex-col justify-between gap-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <p className="eyebrow">Available balance</p>
                <button onClick={() => setShowBalance(!showBalance)}
                  className="text-subtle hover:text-navy transition" title={showBalance ? 'Hide balance' : 'Show balance'}>
                  {showBalance ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
              <p className="text-[36px] font-bold text-navy tracking-[-0.02em] leading-none mt-3 tabular-nums">
                {showBalance ? '₹1,83,342' : '₹ ••••••'}
              </p>
              <p className="text-[13px] text-muted mt-2">Across 2 linked accounts</p>
            </div>
            <div className="flex gap-2">
              <button className="btn-ghost"><KeyRound size={14} /> UPI PIN</button>
              <button className="btn-outline"><ArrowUpRight size={14} /> Withdraw</button>
              <button className="btn-primary"><FileText size={14} /> Statement</button>
            </div>
          </div>

          {/* This month */}
          <div className="grid grid-cols-3 rounded-xl border border-[#EEF1F5] divide-x divide-[#EEF1F5]">
            {[
              { label: 'Spent this month', value: '₹42,310',   tone: 'text-navy' },
              { label: 'Received',         value: '₹1,05,000', tone: 'text-positive' },
              { label: 'Bills due',        value: '₹1,598',    tone: 'text-amber-700' },
            ].map((m) => (
              <div key={m.label} className="px-4 py-3">
                <p className="text-[12px] text-muted">{m.label}</p>
                <p className={`text-[17px] font-bold mt-0.5 tabular-nums ${m.tone}`}>{m.value}</p>
              </div>
            ))}
          </div>

          {/* Linked Accounts */}
          <div>
            <p className="eyebrow mb-2.5">Linked accounts</p>
            <div className="grid grid-cols-2 gap-2.5">
              {LINKED.map((a) => (
                <div key={a.abbr} className="list-row">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-[10px] font-bold shrink-0"
                    style={{ background: a.bg }}>
                    {a.abbr}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-navy truncate">{a.name}</p>
                    <p className="text-[12px] text-muted tabular-nums">{a.num}</p>
                  </div>
                  {a.primary
                    ? <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-primary/10 text-primary">Primary</span>
                    : <button className="text-[12px] font-semibold text-muted hover:text-navy">Set primary</button>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cashflow */}
        <div className="card flex flex-col">
          <SectionHeader title="Cash Flow" subtitle="Last 5 months" />
          <div className="grid grid-cols-2 gap-2.5">
            <div className="rounded-xl border border-[#EEF1F5] bg-[#F8FAFC] px-3.5 py-3">
              <p className="text-[12px] text-muted flex items-center gap-1.5">
                <ArrowDownLeft size={13} className="text-primary" /> Incoming
              </p>
              <p className="text-[18px] font-bold text-navy mt-1 tabular-nums">₹9,54,232</p>
            </div>
            <div className="rounded-xl border border-[#EEF1F5] bg-[#F8FAFC] px-3.5 py-3">
              <p className="text-[12px] text-muted flex items-center gap-1.5">
                <ArrowUpRight size={13} className="text-red-500" /> Outgoing
              </p>
              <p className="text-[18px] font-bold text-navy mt-1 tabular-nums">₹3,31,245</p>
            </div>
          </div>

          <div className="flex-1 min-h-[150px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CASHFLOW_DATA} barGap={3} barCategoryGap="30%" margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EEF1F5" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip content={<CashflowTooltip />} cursor={{ fill: '#F8FAFC' }} />
                <Bar dataKey="inc" fill="#0B6E6E" radius={[4, 4, 0, 0]} maxBarSize={14} />
                <Bar dataKey="out" fill="#FCA5A5" radius={[4, 4, 0, 0]} maxBarSize={14} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <p className="text-[12px] text-muted mt-3">
            <span className="font-semibold text-positive">30% better</span> than last month · 15% more saved
          </p>
        </div>
      </div>

      {/* ── Recent Transactions ── */}
      <div className="card">
        <SectionHeader
          title="Recent Transactions"
          subtitle="Payments in and out of your accounts"
          actions={<Segmented options={TX_TABS} value={txTab} onChange={setTxTab} size="sm" />}
        />

        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="th">Recipient / Sender</th>
              <th className="th">Date</th>
              <th className="th">Status</th>
              <th className="th text-right">Amount</th>
              <th className="th text-right w-24">Receipt</th>
            </tr>
          </thead>
          <tbody>
            {TRANSACTIONS.map((tx, i) => (
              <tr key={i} className="tr">
                <td className="py-3.5">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[12px] font-bold shrink-0"
                      style={{ background: tx.avatarBg }}
                    >
                      {tx.avatarText}
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-navy">{tx.name}</p>
                      <p className="text-[12px] text-muted">{tx.sub}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 text-[13px] text-muted">{tx.date}</td>
                <td className="py-3.5"><StatusBadge status={tx.status} /></td>
                <td className={`py-3.5 text-[14px] font-semibold text-right tabular-nums ${tx.positive ? 'text-positive' : 'text-navy'}`}>
                  {tx.amount}
                </td>
                <td className="py-3.5 text-right">
                  <button className="text-[13px] text-primary font-semibold hover:underline">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="link-action mt-4">Show all transactions <ArrowRight size={14} /></button>
      </div>

      {/* ── Bills & Scheduled ── */}
      <div className="grid grid-cols-2 gap-4">

        {/* Bills & Payments */}
        <div className="card">
          <SectionHeader
            title="Bills & Payments"
            subtitle="Pay any biller in two taps"
            actions={<button className="link-action"><Settings size={14} /> Manage</button>}
          />

          <div className="grid grid-cols-6 gap-1 mb-5">
            {BILLERS.map(({ icon: Icon, label, bg, color }) => (
              <button
                key={label}
                className="flex flex-col items-center gap-2 py-2.5 rounded-xl hover:bg-[#F8FAFC] transition-colors"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: bg }}>
                  <Icon size={18} style={{ color }} />
                </div>
                <span className="text-[12px] text-slate-600 font-medium">{label}</span>
              </button>
            ))}
          </div>

          <p className="eyebrow mb-2.5">Saved billers</p>
          <div className="flex flex-col gap-2.5">
            {SAVED_BILLERS.map((b) => (
              <div key={b.name} className="list-row">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: b.iconBg }}>
                  <b.icon size={15} style={{ color: b.iconColor }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-navy">{b.name}</p>
                  <p className="text-[12px] text-muted">Due <span className="font-semibold text-navy tabular-nums">{b.due}</span></p>
                </div>
                <button className="btn-primary py-1.5 px-3 text-[12px]">Pay now</button>
              </div>
            ))}
          </div>
        </div>

        {/* Scheduled Transfers */}
        <div className="card flex flex-col">
          <SectionHeader
            title="Scheduled Transfers"
            subtitle="Recurring payments on autopilot"
            actions={<button className="link-action"><Plus size={14} /> New</button>}
          />
          <div className="flex flex-col gap-2.5">
            {SCHEDULED.map((s) => (
              <div key={s.to} className="list-row">
                <div className="w-9 h-9 rounded-lg bg-white border border-border text-navy flex items-center justify-center shrink-0">
                  <s.icon size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-navy">
                    <span className="tabular-nums">{s.amount}</span> <span className="font-normal text-muted">to</span> {s.to}
                  </p>
                  <p className="text-[12px] text-muted">{s.sub}</p>
                </div>
                <div className="flex gap-1.5">
                  <button className="icon-btn" title="Edit"><Edit2 size={13} /></button>
                  <button className="icon-btn hover:!text-negative hover:!border-red-200" title="Delete"><Trash2 size={13} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
