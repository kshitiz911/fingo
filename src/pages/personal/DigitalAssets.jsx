import React, { useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';
import { ArrowLeftRight, Minus, Plus, Upload, CheckCircle } from 'lucide-react';

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
  { label: 'Binance',  initial: 'B', bg: '#F0B90B', textColor: '#000' },
  { label: 'Etherum',  initial: 'E', bg: '#1C1C1C', textColor: '#fff' },
];

const TIME_TABS = ['1D', '1W', '1M', '1Y'];

// ── Quick Action Card ────────────────────────────────────────────────────────
const QuickAction = ({ icon: Icon, label, sub }) => (
  <div className="bg-white rounded-2xl shadow-card flex flex-col items-center justify-center gap-3
                  px-4 py-5 cursor-pointer hover:shadow-card-hover transition-shadow flex-1 text-center">
    <Icon size={22} className="text-navy" strokeWidth={1.5} />
    <div>
      <p className="text-sm font-bold text-navy">{label}</p>
      <p className="text-xs text-muted mt-0.5">{sub}</p>
    </div>
  </div>
);

// ── Main ─────────────────────────────────────────────────────────────────────
export default function DigitalAssets() {
  const [activeTab, setActiveTab] = useState('1D');

  return (
    <div className="flex flex-col gap-5">

      {/* Quick Actions — 4 white cards */}
      <div className="flex gap-4">
        <QuickAction icon={ArrowLeftRight} label="Swap Assets"  sub="Swap instantly in no time" />
        <QuickAction icon={Minus}          label="Sell Crypto"  sub="sell cryptos in seconds" />
        <QuickAction icon={Plus}           label="Buy Crypto"   sub="buy cryptos instantly" />
        <QuickAction icon={Upload}         label="Withdraw"     sub="Quick withdraw" />
      </div>

      {/* Portfolio Overview — heading outside card, chart fills white card */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display text-[28px] font-bold font-Denton text-navy mb-0">Portfolio Overview</h2>
          {/* Time tabs */}
          <div className="flex gap-1">
            {TIME_TABS.map((t) => (
              <button key={t} onClick={() => setActiveTab(t)}
                className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-all
                  ${activeTab === t
                    ? 'bg-primary text-white'
                    : 'bg-white text-navy border border-border hover:border-primary'}`}>
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-card px-6 pt-5 pb-4">
          {/* Stats row */}
          <div className="flex gap-16 mb-6">
            <div>
              <p className="text-sm text-muted font-medium">Total Value</p>
              <p className="text-3xl font-bold text-navy mt-2">₹24,85,420</p>
              <p className="text-xs font-semibold text-positive mt-1">+₹1,24,560 (+5.28%)</p>
            </div>
            <div>
              <p className="text-sm text-muted font-medium">24h Change</p>
              <p className="text-3xl font-bold text-positive mt-2">+3.42%</p>
              <p className="text-xs font-semibold text-positive mt-1">+₹82,340</p>
            </div>
            <div>
              <p className="text-sm text-muted font-medium">Weekly Change</p>
              <p className="text-3xl font-bold text-negative mt-2">-1.28%</p>
              <p className="text-xs font-semibold text-negative mt-1">-₹31,890</p>
            </div>
          </div>

          {/* Area Chart — with visible Y axis labels */}
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CHART_DATA} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id="cryptoGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor="#0B9E8E" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#0B9E8E" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12, fill: '#94A3B8' }}
                  axisLine={false}
                  tickLine={false}
                  dy={8}
                />
                <YAxis
                  domain={[2050000, 2650000]}
                  ticks={[2100000, 2200000, 2300000, 2400000, 2500000, 2600000]}
                  tickFormatter={(v) => `${Math.floor(v/1000).toLocaleString('en-IN')}k`}
                  tick={{ fontSize: 11, fill: '#94A3B8' }}
                  axisLine={false}
                  tickLine={false}
                  width={52}
                />
                <Tooltip
                  formatter={(v) => [`₹${(v / 100000).toFixed(1)}L`, 'Value']}
                  contentStyle={{ fontSize: 12, borderRadius: 10, border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#0B9E8E"
                  strokeWidth={2.5}
                  fill="url(#cryptoGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom row — Assets Summary + Linked Accounts */}
      <div className="flex gap-4">

        {/* Assets Summary */}
        <div className="bg-white rounded-2xl shadow-card flex-1 px-6 py-5">
          <h3 className="font-display text-[20px] font-bold font-Denton text-navy mb-4">Financial Goals</h3>
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left pb-3 text-sm font-semibold text-navy">Asset</th>
                <th className="text-left pb-3 text-sm font-semibold text-navy">Quantity</th>
                <th className="text-left pb-3 text-sm font-semibold text-navy">Price</th>
                <th className="text-left pb-3 text-sm font-semibold text-navy">Value</th>
                <th className="text-left pb-3 text-sm font-semibold text-navy">24h Change</th>
                <th className="text-left pb-3 text-sm font-semibold text-navy">Actions</th>
              </tr>
            </thead>
            <tbody>
              {ASSETS.map((a) => (
                <tr key={a.symbol} className="border-b border-border last:border-0">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-base font-bold text-white"
                        style={{ background: a.iconBg }}>
                        {a.icon}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-navy">{a.name}</p>
                        <p className="text-xs text-muted">{a.symbol}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 text-sm text-navy">{a.qty}</td>
                  <td className="py-4 text-sm text-navy">{a.price}</td>
                  <td className="py-4 text-sm font-semibold text-navy">{a.value}</td>
                  <td className={`py-4 text-sm font-semibold ${a.positive ? 'text-positive' : 'text-negative'}`}>
                    {a.change}
                  </td>
                  <td className="py-4">
                    <button className="bg-navy text-white text-xs font-semibold px-4 py-1.5 rounded-lg hover:opacity-90 transition">
                      Trade
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Linked Accounts */}
        <div className="bg-white rounded-2xl shadow-card w-56 shrink-0 px-5 py-5">
          <h3 className="font-display text-[20px] font-bold font-Denton text-navy mb-4">Linked Accounts</h3>
          <div className="flex flex-col gap-4">
            {LINKED.map((a) => (
              <div key={a.label} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold"
                    style={{ background: a.bg, color: a.textColor }}>
                    {a.initial}
                  </div>
                  <span className="text-sm font-semibold text-navy">{a.label}</span>
                </div>
                <CheckCircle size={18} className="text-positive" fill="#dcfce7" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
