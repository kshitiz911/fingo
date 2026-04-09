import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import Stepper from '../../components/ui/Stepper';
import KpiTile from '../../components/ui/KpiTile';
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
  <div className="flex flex-col gap-2 mt-2">
    {data.map((d) => (
      <div key={d.name} className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: d.color }} />
          <span className="text-xs text-muted">{d.name}</span>
        </div>
        <span className="text-xs font-semibold text-navy">{d.value}%</span>
      </div>
    ))}
  </div>
);

const DonutChart = ({ data, label }) => (
  <div className="card flex-1">
    <p className="text-sm font-semibold text-navy mb-3">{label}</p>
    <div className="flex gap-4 items-center">
      <div className="w-36 h-36 shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={38} outerRadius={62}
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
      {/* KPI tiles */}
      <div className="grid grid-cols-4 gap-4">
        <KpiTile icon={<FileText size={20} />} iconBg="bg-red-100" iconColor="text-red-500" label="Total Tax Liability" value="₹2,45,000"
          delta="↑12% vs Last Year" deltaType="negative" accent="text-navy" />
        <KpiTile icon={<CheckCircle size={20} />} iconBg="bg-green-100" iconColor="text-green-600" label="Deductions Applied" value="₹1,50,000"
          delta="80% of eligible limit" deltaType="positive" accent="text-navy" />
        <KpiTile icon={<PiggyBank size={20} />} iconBg="bg-teal-100" iconColor="text-teal-600" label="Expected Savings" value="₹22,500"
          delta="Based on 24% tax slab" deltaType="positive" accent="text-navy" />
        <KpiTile icon={<BarChart2 size={20} />} iconBg="bg-blue-100" iconColor="text-blue-600" label="Filling Process" value="85%"
          delta="Stage 3 of 5" deltaType="neutral" accent="text-navy" />
      </div>

      {/* Stepper */}
      <div className="card">
          <p className="font-display text-[20px] font-bold font-Denton text-navy mb-4">Filling Progress</p>
        <Stepper steps={TAX_STEPS} />
        <button
          onClick={() => setStep((s) => Math.min(s + 1, 4))}
          className="mt-6 flex items-center gap-2 btn-primary w-fit">
          Continue <ArrowRight size={15} />
        </button>
      </div>

      {/* Donut charts */}
      <div>
        <p className="font-display text-[20px] font-bold font-Denton text-navy mb-4">Income & Expense Breakdown</p>
        <div className="flex gap-4">
          <DonutChart data={INCOME_DATA} label="Income Breakdown" />
          <DonutChart data={EXPENSE_DATA} label="Expense Breakdown" />
        </div>
      </div>
    </div>
  );
}
