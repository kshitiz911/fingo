import React, { useState } from 'react';
import KpiTile from '../../components/ui/KpiTile';
import StatusBadge from '../../components/ui/StatusBadge';
import PageHeader from '../../components/ui/PageHeader';
import SectionHeader from '../../components/ui/SectionHeader';
import { Eye, ChevronLeft, ChevronRight, Check, Download, Search, HeartPulse, PiggyBank, UtensilsCrossed, CheckCircle2, Clock, ArrowRight } from 'lucide-react';

const EMPLOYEES = [
  { name: 'Tejas Sharma',  sub: '+91 98765 43210', dept: 'Engineering', salary: '₹2,500',  status: 'pending', lastPaid: 'Aug 21, 2025' },
  { name: 'Kapil Sharma',  sub: 'Electricity Bill', dept: 'Marketing',   salary: '₹12,545', status: 'onhold',  lastPaid: 'Sep 18, 2025' },
  { name: 'Ajit Pandey',   sub: 'Salary Credit',    dept: 'Sales',       salary: '₹45,000', status: 'success', lastPaid: 'Aug 6, 2025' },
];

const BENEFITS = [
  { icon: HeartPulse,      label: 'Group health insurance', value: '1,180', of: 'enrolled' },
  { icon: PiggyBank,       label: 'Provident fund',         value: '1,247', of: 'contributing' },
  { icon: UtensilsCrossed, label: 'Meal card',              value: '940',   of: 'active' },
];

const CLAIMS = [
  { name: 'Priya Nair',   type: 'Travel',  amount: '₹8,400',  status: 'pending' },
  { name: 'Rohan Mehta',  type: 'Medical', amount: '₹12,750', status: 'success', label: 'Approved' },
  { name: 'Sana Qureshi', type: 'Internet',amount: '₹1,200',  status: 'failed',  label: 'Rejected' },
];

const COMPLIANCE = [
  { label: 'PF ECR — August',        meta: 'Filed 12 Sep',  done: true },
  { label: 'ESI contribution',       meta: 'Due 15 Oct',    done: false },
  { label: 'Professional tax return',meta: 'Due 31 Oct',    done: false },
];

export default function PayrollBenefits() {
  const [search, setSearch] = useState('');
  const [dept, setDept]     = useState('All Departments');
  const [status, setStatus] = useState('All Status');

  const filtered = EMPLOYEES.filter((e) => {
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase());
    const matchDept   = dept === 'All Departments' || e.dept === dept;
    const matchStatus = status === 'All Status' || e.status === status;
    return matchSearch && matchDept && matchStatus;
  });

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Payroll & Benefits"
        subtitle="September cycle · 1,247 employees across 4 departments."
        actions={
          <>
            <button className="btn-outline"><Eye size={15} /> Preview Payroll</button>
            <button className="btn-primary"><Check size={15} /> Approve All</button>
          </>
        }
      />

      {/* KPI tiles */}
      <div className="grid grid-cols-3 gap-4">
        <KpiTile label="Total Payroll Expense" value="₹2,47,500"
          delta="+8.2% vs last cycle" deltaType="negative"
          sub="Processed this month" accent="text-navy" />
        <KpiTile label="Employees Paid" value="1,247"
          delta="+124 new hires" deltaType="positive"
          sub="Paid this cycle" accent="text-navy" />
        <KpiTile label="Pending Issues" value="7"
          delta="Requires attention" deltaType="negative"
          sub="Bank or PAN details missing" accent="text-negative" />
        <KpiTile label="Overtime Payments" value="₹4,75,000"
          delta="+18% vs last cycle" deltaType="warning"
          sub="From logged overtime" accent="text-navy" />
        <KpiTile label="Employee Reimbursements" value="₹3,40,000"
          delta="15 pending claims" deltaType="warning"
          sub="Awaiting approval" accent="text-navy" />
        <KpiTile label="Next Payroll Date" value="Sep 30"
          delta="In 5 days" deltaType="neutral"
          sub="Scheduled disbursement" accent="text-primary" />
      </div>

      {/* Employee table */}
      <div className="card">
        <SectionHeader title="Employees" subtitle="Net pay and status for the current cycle" />

        {/* Filters */}
        <div className="flex gap-2.5 mb-5">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-subtle" />
            <input value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, ID or department"
              className="input-base w-full pl-9" />
          </div>
          <select value={dept} onChange={(e) => setDept(e.target.value)} className="input-base text-muted">
            <option>All Departments</option>
            <option>Engineering</option>
            <option>Marketing</option>
            <option>Sales</option>
          </select>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="input-base text-muted">
            <option value="All Status">All Status</option>
            <option value="pending">Pending</option>
            <option value="onhold">On Hold</option>
            <option value="success">Paid</option>
          </select>
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="th">Employee</th>
              <th className="th">Department</th>
              <th className="th">Last Paid</th>
              <th className="th">Status</th>
              <th className="th text-right">Net Salary</th>
              <th className="th text-right w-20">Payslip</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((e, i) => (
              <tr key={i} className="tr">
                <td className="py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-[12px] font-bold text-primary">
                      {e.name[0]}
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-navy">{e.name}</p>
                      <p className="text-[12px] text-muted">{e.sub}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 text-[13px] text-slate-600">{e.dept}</td>
                <td className="py-3.5 text-[13px] text-muted">{e.lastPaid}</td>
                <td className="py-3.5"><StatusBadge status={e.status} label={e.status === 'success' ? 'Paid' : undefined} /></td>
                <td className="py-3.5 text-[14px] font-semibold text-navy text-right tabular-nums">{e.salary}</td>
                <td className="py-3.5">
                  <button className="icon-btn ml-auto" title="Download payslip"><Download size={14} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#EEF1F5]">
          <p className="text-[12px] text-muted">Showing 1–10 of 1,247 employees</p>
          <div className="flex items-center gap-1">
            <button className="icon-btn">
              <ChevronLeft size={13} className="text-muted" />
            </button>
            {[1, 2, 3].map((p) => (
              <button key={p}
                className={`w-8 h-8 rounded-lg text-[12px] font-semibold transition-all
                  ${p === 1 ? 'bg-navy text-white' : 'border border-border bg-white text-muted hover:text-navy'}`}>
                {p}
              </button>
            ))}
            <button className="icon-btn">
              <ChevronRight size={13} className="text-muted" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-3 gap-4">
        <div className="card">
          <SectionHeader title="Benefits Overview" subtitle="Enrolment this cycle" />
          <div className="flex flex-col">
            {BENEFITS.map(({ icon: Icon, label, value, of }) => (
              <div key={label} className="flex items-center gap-3 py-3 border-b border-[#EEF1F5] last:border-0">
                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Icon size={15} />
                </div>
                <p className="text-[13px] text-navy font-medium flex-1">{label}</p>
                <p className="text-[13px] text-muted"><span className="font-semibold text-navy tabular-nums">{value}</span> {of}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <SectionHeader title="Recent Claims" subtitle="Reimbursements submitted this week" />
          <div className="flex flex-col">
            {CLAIMS.map((c) => (
              <div key={c.name} className="flex items-center gap-3 py-3 border-b border-[#EEF1F5] last:border-0">
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-navy truncate">{c.name}</p>
                  <p className="text-[12px] text-muted">{c.type} · <span className="tabular-nums">{c.amount}</span></p>
                </div>
                <StatusBadge status={c.status} label={c.label} />
              </div>
            ))}
          </div>
        </div>

        <div className="card flex flex-col">
          <SectionHeader title="Reports & Compliance" subtitle="Statutory filings" />
          <div className="flex flex-col">
            {COMPLIANCE.map((c) => (
              <div key={c.label} className="flex items-center gap-3 py-3 border-b border-[#EEF1F5] last:border-0">
                {c.done
                  ? <CheckCircle2 size={17} className="text-positive shrink-0" />
                  : <Clock size={17} className="text-warning shrink-0" />}
                <p className="text-[13px] text-navy font-medium flex-1">{c.label}</p>
                <p className={`text-[12px] font-medium ${c.done ? 'text-muted' : 'text-amber-700'}`}>{c.meta}</p>
              </div>
            ))}
          </div>
          <button className="link-action mt-auto pt-3">Download payroll register <ArrowRight size={14} /></button>
        </div>
      </div>
    </div>
  );
}
