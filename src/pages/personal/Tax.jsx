import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import Stepper from '../../components/ui/Stepper';
import KpiTile from '../../components/ui/KpiTile';
import PageHeader from '../../components/ui/PageHeader';
import SectionHeader from '../../components/ui/SectionHeader';
import { ArrowRight, FileText, CheckCircle, PiggyBank, BarChart2 } from 'lucide-react';

const TAX_STEPS = [
  { label: 'Collect Data',      status: 'done' },
  { label: 'Review Deductions', status: 'done' },
  { label: 'Calculate',         status: 'active' },
  { label: 'File Return',       status: 'pending' },
  { label: 'Confirm Filing',    status: 'pending' },
];

const INCOME_DATA = [
  { name: 'Salary',      value: 52, color: '#0D2B45' },
  { name: 'Freelance',   value: 30, color: '#94A3B8' },
  { name: 'Investments', value: 10, color: '#0E9090' },
  { name: 'Interest',    value: 8,  color: '#CBD5E1' },
];

const EXPENSE_DATA = [
  { name: 'Rent',          value: 52, color: '#16A34A' },
  { name: 'Utilities',     value: 15, color: '#F59E0B' },
  { name: 'Groceries',     value: 10, color: '#EC4899' },
  { name: 'Entertainment', value: 11, color: '#A78BFA' },
  { name: 'Miscellaneous', value: 12, color: '#6366F1' },
];

const CustomLegend = ({ data }) => (
  <div className="flex flex-col gap-2.5">
    {data.map((d) => (
      <div key={d.name} className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: d.color }} />
          <span className="text-[12px] text-slate-600">{d.name}</span>
        </div>
        <span className="text-[12px] font-semibold text-navy tabular-nums">{d.value}%</span>
      </div>
    ))}
  </div>
);

const DonutChart = ({ data, label, sub }) => (
  <div className="card">
    <SectionHeader title={label} subtitle={sub} />
    <div className="flex gap-8 items-center pr-2">
      <div className="w-40 h-40 shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={44} outerRadius={70}
              dataKey="value" strokeWidth={2} stroke="#fff">
              {data.map((d, i) => <Cell key={i} fill={d.color} />)}
            </Pie>
            <Tooltip formatter={(v) => `${v}%`} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex-1">
        <CustomLegend data={data} />
      </div>
    </div>
  </div>
);

export default function Tax() {
  const [, setStep] = useState(2);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Tax" subtitle="FY 2024-25 · ITR-2 filing in progress." />

      {/* KPI tiles */}
      <div className="grid grid-cols-4 gap-4">
        <KpiTile icon={<FileText />}    label="Total Tax Liability" value="₹2,45,000" delta="+12% YoY"      deltaType="negative" sub="vs last year" />
        <KpiTile icon={<CheckCircle />} label="Deductions Applied"  value="₹1,50,000" delta="80% used"      deltaType="positive" sub="of eligible limit" />
        <KpiTile icon={<PiggyBank />}   label="Expected Savings"    value="₹22,500"   delta="24% slab"      deltaType="positive" sub="from deductions" />
        <KpiTile icon={<BarChart2 />}   label="Filing Progress"     value="60%"       delta="Step 3 of 5"   deltaType="neutral"  sub="Calculate" />
      </div>

      {/* Stepper */}
      <div className="card">
        <SectionHeader
          title="Filing Progress"
          subtitle="ITR-2 · due 31 Jul 2025"
          className="mb-6"
          actions={
            <button onClick={() => setStep((s) => Math.min(s + 1, 4))} className="btn-primary">
              Continue <ArrowRight size={15} />
            </button>
          }
        />
        <Stepper steps={TAX_STEPS} />
      </div>

      {/* Donut charts */}
      <div className="grid grid-cols-2 gap-4">
        <DonutChart data={INCOME_DATA}  label="Income Breakdown"  sub="Sources of taxable income" />
        <DonutChart data={EXPENSE_DATA} label="Expense Breakdown" sub="Where deductible spend went" />
      </div>
    </div>
  );
}
