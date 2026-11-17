import React, { useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';
import { ArrowLeftRight, Minus, Plus, Upload, CheckCircle2, Plus as PlusIcon } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import SectionHeader from '../../components/ui/SectionHeader';
import Segmented from '../../components/ui/Segmented';
import QuickAction from '../../components/ui/QuickAction';

// ── Data ────────────────────────────────────────────────────────────────────
const CHART_DATA = [
  { month: 'Jan', value: 2150000 },
  { month: 'Feb', value: 2420000 },
  { month: 'Mar', value: 2280000 },
  { month: 'Apr', value: 2490000 },
  { month: 'May', value: 2380000 },
  { month: 'Jun', value: 2485420 },
];

const ASSETS = [
  {
    icon: '₿', iconBg: '#FF6B35', name: 'Bitcoin',  symbol: 'BTC',
    qty: '0.425 BTC', price: '₹25,48,320', value: '₹10,83,036',
    change: '+2.45%', positive: true,
  },
  {
    icon: 'Ξ', iconBg: '#627EEA', name: 'Ethereum', symbol: 'ETH',
    qty: '3.28 ETH',  price: '₹2,15,680',  value: '₹7,07,430',
    change: '-1.23%', positive: false,
  },
];

const LINKED = [
  { label: 'Binance',  sub: 'Exchange', initial: 'B', bg: '#F0B90B', textColor: '#000' },
  { label: 'MetaMask', sub: 'Ethereum wallet', initial: 'M', bg: '#1C1C1C', textColor: '#fff' },
];

const TIME_TABS = ['1D', '1W', '1M', '1Y'];

// ── Main ─────────────────────────────────────────────────────────────────────
export default function DigitalAssets() {
  const [activeTab, setActiveTab] = useState('1D');

  return (
    <div className="flex flex-col gap-6">

      <PageHeader title="Digital Assets" subtitle="Crypto holdings across 2 linked accounts." />

      {/* Quick Actions */}
      <div className="flex gap-4">
        <QuickAction icon={Plus}           label="Buy Crypto"  sub="Instant INR purchase" />
        <QuickAction icon={Minus}          label="Sell Crypto" sub="Settles in seconds" />
        <QuickAction icon={ArrowLeftRight} label="Swap Assets" sub="Convert between coins" />
        <QuickAction icon={Upload}         label="Withdraw"    sub="To your bank account" />
      </div>

      {/* Portfolio Overview */}
      <div className="card">
        <SectionHeader
          title="Portfolio Overview"
          subtitle="Total value of all holdings"
          actions={<Segmented options={TIME_TABS} value={activeTab} onChange={setActiveTab} />}
        />

        <div className="flex items-start gap-12 mb-6">
          <div>
            <p className="text-[13px] text-muted">Total value</p>
            <p className="text-[34px] font-bold text-navy leading-none mt-2 tracking-[-0.02em] tabular-nums">₹24,85,420</p>
            <p className="text-[12px] font-semibold text-positive mt-2">+₹1,24,560 (+5.28%) all time</p>
          </div>
          <div className="pl-12 border-l border-[#EEF1F5]">
            <p className="text-[13px] text-muted">24h change</p>
            <p className="text-[34px] font-bold text-positive leading-none mt-2 tracking-[-0.02em] tabular-nums">+3.42%</p>
            <p className="text-[12px] text-muted mt-2 tabular-nums">+₹82,340</p>
          </div>
          <div className="pl-12 border-l border-[#EEF1F5]">
            <p className="text-[13px] text-muted">7d change</p>
            <p className="text-[34px] font-bold text-negative leading-none mt-2 tracking-[-0.02em] tabular-nums">−1.28%</p>
            <p className="text-[12px] text-muted mt-2 tabular-nums">−₹31,890</p>
          </div>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={CHART_DATA} margin={{ top: 10, right: 8, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="cryptoGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor="#0B6E6E" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#0B6E6E" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF1F5" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} dy={8} />
              <YAxis
                domain={[2050000, 2650000]}
                ticks={[2100000, 2300000, 2500000]}
                tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`}
                tick={{ fontSize: 11, fill: '#94A3B8' }}
                axisLine={false}
                tickLine={false}
                width={44}
              />
              <Tooltip
                formatter={(v) => [`₹${(v / 100000).toFixed(1)}L`, 'Value']}
                contentStyle={{ fontSize: 12, borderRadius: 10, border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
              />
              <Area type="monotone" dataKey="value" stroke="#0B6E6E" strokeWidth={2.5} fill="url(#cryptoGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Holdings + Linked Accounts */}
      <div className="grid grid-cols-[1fr_300px] gap-4">

        <div className="card">
          <SectionHeader title="Holdings" subtitle="2 assets" />
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="th">Asset</th>
                <th className="th text-right">Quantity</th>
                <th className="th text-right">Price</th>
                <th className="th text-right">Value</th>
                <th className="th text-right">24h</th>
                <th className="th text-right w-24"></th>
              </tr>
            </thead>
            <tbody>
              {ASSETS.map((a) => (
                <tr key={a.symbol} className="tr">
                  <td className="py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-base font-bold text-white"
                        style={{ background: a.iconBg }}>
                        {a.icon}
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold text-navy">{a.name}</p>
                        <p className="text-[12px] text-muted">{a.symbol}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 text-[13px] text-slate-600 text-right tabular-nums">{a.qty}</td>
                  <td className="py-3.5 text-[13px] text-slate-600 text-right tabular-nums">{a.price}</td>
                  <td className="py-3.5 text-[14px] font-semibold text-navy text-right tabular-nums">{a.value}</td>
                  <td className={`py-3.5 text-[13px] font-semibold text-right tabular-nums ${a.positive ? 'text-positive' : 'text-negative'}`}>
                    {a.change}
                  </td>
                  <td className="py-3.5 text-right">
                    <button className="text-[12px] font-semibold text-primary border border-border bg-white px-3.5 py-1.5 rounded-lg hover:border-primary/40 transition">
                      Trade
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card flex flex-col">
          <SectionHeader title="Linked Accounts" subtitle="Synced 5 min ago" />
          <div className="flex flex-col">
            {LINKED.map((a) => (
              <div key={a.label} className="flex items-center gap-3 py-3 border-b border-[#EEF1F5] last:border-0">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold shrink-0"
                  style={{ background: a.bg, color: a.textColor }}>
                  {a.initial}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-navy">{a.label}</p>
                  <p className="text-[12px] text-muted">{a.sub}</p>
                </div>
                <CheckCircle2 size={17} className="text-positive" />
              </div>
            ))}
          </div>
          <button className="link-action mt-auto pt-3"><PlusIcon size={14} /> Link account</button>
        </div>

      </div>
    </div>
  );
}
