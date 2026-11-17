import React, { useState } from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import KpiTile from '../../components/ui/KpiTile';
import AlertCard from '../../components/ui/AlertCard';
import PageHeader from '../../components/ui/PageHeader';
import SectionHeader from '../../components/ui/SectionHeader';
import Segmented from '../../components/ui/Segmented';
import { ArrowRight } from 'lucide-react';

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
      <PageHeader title="Finance Intel" subtitle="Revenue, margins and AI forecasts for FY 2025." />

      {/* KPI tiles */}
      <div className="grid grid-cols-4 gap-4">
        <KpiTile label="Revenue (YTD)"   sub="vs last year"     value="₹24.8M" delta="+12.4%"        deltaType="positive" />
        <KpiTile label="Profit Margin"   sub="vs last quarter"  value="18.5%"  delta="+3.2 pts"      deltaType="positive" />
        <KpiTile label="Operating Costs" sub="This quarter"     value="₹8.4M"  delta="85% of budget" deltaType="warning" />
        <KpiTile label="Net Cash Flow"   sub="This quarter"     value="₹3.2M"  delta="Surplus"       deltaType="positive" />
      </div>

      {/* Revenue vs Expense + Alerts */}
      <div className="grid grid-cols-[1fr_320px] gap-4">
        <div className="card flex flex-col">
          <SectionHeader
            title="Revenue vs Expenses"
            subtitle="Monthly, in ₹ millions"
            actions={<Segmented options={TIME_TABS} value={revTab} onChange={setRevTab} />}
          />
          <div className="flex items-center gap-4 mb-2 text-[12px] text-muted">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-primary inline-block" /> Revenue</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" /> Expenses</span>
          </div>
          <div className="flex-1 min-h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={REV_EXP} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EEF1F5" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} dy={6} />
                <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false}
                  domain={[2, 6]} ticks={[2, 3, 4, 5, 6]} tickFormatter={(v) => `₹${v}M`} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #E2E8F0' }} formatter={(v) => `₹${v}M`} />
                <Line type="monotone" dataKey="rev" name="Revenue"  stroke="#0B6E6E" strokeWidth={2.5} dot={{ r: 3, fill: '#0B6E6E' }} />
                <Line type="monotone" dataKey="exp" name="Expenses" stroke="#F59E0B" strokeWidth={2.5} dot={{ r: 3, fill: '#F59E0B' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Alerts */}
        <div className="card">
          <SectionHeader title="Alerts" subtitle="4 signals this month" />
          <div className="flex flex-col gap-2.5">
            {ALERTS.map((a, i) => <AlertCard key={i} {...a} />)}
          </div>
          <button className="link-action mt-4">
            Show all recommendations <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* AI Forecasting */}
      <div className="card">
        <SectionHeader
          title="AI Revenue Forecast"
          subtitle="Next quarter: ₹12.4M expected (±8%)"
          actions={<Segmented options={['Base Case', 'Worst Case']} value={foreTab} onChange={setForeTab} />}
        />
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={forecastData}>
              <defs>
                <linearGradient id="foreGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#0B6E6E" stopOpacity={0.18} />
                  <stop offset="95%" stopColor="#0B6E6E" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF1F5" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} dy={6} />
              <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} width={44}
                domain={[3, 7]} ticks={[3, 4, 5, 6, 7]} tickFormatter={(v) => `₹${v}M`} />
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #E2E8F0' }} formatter={(v) => `₹${v}M`} />
              <Area type="monotone" dataKey="val" stroke="#0B6E6E" strokeWidth={2} fill="url(#foreGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
