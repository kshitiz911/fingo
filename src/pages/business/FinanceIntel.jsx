import React, { useState } from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import KpiTile from '../../components/ui/KpiTile';
import AlertCard from '../../components/ui/AlertCard';

const REV_EXP = [
  { month: 'Jan', rev: 4.2, exp: 3.1 }, { month: 'Feb', rev: 4.4, exp: 3.3 },
  { month: 'Mar', rev: 4.6, exp: 3.5 }, { month: 'Apr', rev: 4.3, exp: 3.1 },
  { month: 'May', rev: 4.8, exp: 3.7 }, { month: 'Jun', rev: 5.1, exp: 4.0 },
];

const FORECAST_BASE = [
  { month: 'Jul', val: 4.2 }, { month: 'Aug', val: 5.0 },
  { month: 'Sep', val: 5.5 }, { month: 'Oct', val: 5.8 },
  { month: 'Nov', val: 6.1 }, { month: 'Dec', val: 6.4 },
];

const FORECAST_WORST = [
  { month: 'Jul', val: 3.5 }, { month: 'Aug', val: 3.8 },
  { month: 'Sep', val: 4.0 }, { month: 'Oct', val: 4.1 },
  { month: 'Nov', val: 4.3 }, { month: 'Dec', val: 4.5 },
];

const ALERTS = [
  { type: 'error',   title: 'Operating Cost Overrun',  sub: 'Operating costs exceeded 15% of budget this month' },
  { type: 'success', title: 'Healthy Cash Flow',        sub: 'Cash flow within safe threshold' },
  { type: 'warning', title: 'Revenue Growth Decline',   sub: 'Revenue growth dipped below industry average' },
  { type: 'success', title: 'Strong Receivables',       sub: 'Customer payments collected 95% on time this month' },
];

const TIME_TABS = ['6M', '1Y', '5Y'];

export default function FinanceIntel() {
  const [revTab, setRevTab]   = useState('1Y');
  const [foreTab, setForeTab] = useState('Base Case');

  const forecastData = foreTab === 'Base Case' ? FORECAST_BASE : FORECAST_WORST;

  return (
    <div className="flex flex-col gap-6">
      {/* KPI tiles */}
      <div className="grid grid-cols-4 gap-4">
        <KpiTile label="Revenue (YTD)"   value="₹24.8M"  delta="+12.4%"  deltaType="positive" accent="text-primary" />
        <KpiTile label="Profit Margin"   value="18.5%"   delta="+3.2%"   deltaType="positive" accent="text-primary" />
        <KpiTile label="Operating Costs" value="₹8.4M"   delta="85%"     deltaType="warning"  accent="text-warning" />
        <KpiTile label="Cash Flow Status" value="₹3.2M"  delta="Surplus" deltaType="positive" accent="text-positive" />
      </div>

      {/* Revenue vs Expense + Alerts */}
      <div className="flex gap-4">
        <div className="card flex-1">
          <div className="flex items-center justify-between mb-4">
            <p className="text-base font-bold text-navy">Revenue vs Expense Over Time</p>
            <div className="flex gap-1">
              {TIME_TABS.map((t) => (
                <button key={t} onClick={() => setRevTab(t)}
                  className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all
                    ${revTab === t ? 'bg-primary text-white' : 'text-muted hover:bg-slate-100'}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4 mb-3 text-xs">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary inline-block" /> Revenue</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400 inline-block" /> Expenses</span>
          </div>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={REV_EXP}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                <Line type="monotone" dataKey="rev" stroke="#0B6E6E" strokeWidth={2} dot={{ r: 4, fill: '#0B6E6E' }} />
                <Line type="monotone" dataKey="exp" stroke="#F59E0B" strokeWidth={2} dot={{ r: 4, fill: '#F59E0B' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Alerts */}
        <div className="card w-72 shrink-0">
          <div className="flex items-center justify-between mb-4">
            <p className="text-base font-bold text-navy">Alerts</p>
          </div>
          <div className="flex flex-col gap-2">
            {ALERTS.map((a, i) => <AlertCard key={i} {...a} />)}
          </div>
          <button className="text-xs text-primary font-medium mt-3 hover:underline">
            Show all recommendations →
          </button>
        </div>
      </div>

      {/* AI Forecasting */}
      <div className="card">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-base font-bold text-navy">AI-Powered Financial Forecasting</p>
            <p className="text-xs text-muted mt-0.5">Forecasted revenue for next quarter: ₹12.4M (±8%)</p>
          </div>
          <div className="flex gap-1">
            {['Base Case', 'Worst Case'].map((t) => (
              <button key={t} onClick={() => setForeTab(t)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all
                  ${foreTab === t ? 'bg-primary text-white' : 'text-muted hover:bg-slate-100'}`}>
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="h-48 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={forecastData}>
              <defs>
                <linearGradient id="foreGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#0B6E6E" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0B6E6E" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} formatter={(v) => `₹${v}M`} />
              <Area type="monotone" dataKey="val" stroke="#0B6E6E" strokeWidth={2} fill="url(#foreGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
