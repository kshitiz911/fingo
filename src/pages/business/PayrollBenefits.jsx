import React, { useState } from 'react';
import KpiTile from '../../components/ui/KpiTile';
import StatusBadge from '../../components/ui/StatusBadge';
import { Eye, ChevronLeft, ChevronRight, Check } from 'lucide-react';

const EMPLOYEES = [
  { name: 'Tejas Sharma',  sub: '+91 98765 43210', dept: 'Engineering', salary: '₹2,500',  status: 'pending', lastPaid: 'Aug 21, 2025' },
  { name: 'Kapil Sharma',  sub: 'Electricity Bill', dept: 'Marketing',   salary: '₹12,545', status: 'onhold',  lastPaid: 'Sep 18, 2025' },
  { name: 'Ajit Pandey',   sub: 'Salary Credit',    dept: 'Sales',       salary: '₹45,000', status: 'success', lastPaid: 'Aug 6, 2025' },
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
      {/* KPI tiles */}
      <div className="grid grid-cols-3 gap-4">
        <KpiTile label="Total Payroll Expense" value="₹2,47,500"
          delta="+8.2% vs last cycle" deltaType="negative"
          sub="Total payroll processed for this month" accent="text-navy" />
        <KpiTile label="Employees Paid" value="1,247"
          delta="+124 new hires" deltaType="positive"
          sub="Employees successfully paid this cycle" accent="text-navy" />
        <KpiTile label="Pending Issues" value="7"
          delta="Requires attention" deltaType="negative"
          sub="Employees successfully paid this cycle" accent="text-negative" />
        <KpiTile label="Overtime Payments" value="₹4,75,000"
          delta="+18% vs last cycle" deltaType="warning"
          sub="Additional payouts due to overtime logged" accent="text-navy" />
        <KpiTile label="Employee Reimbursements" value="₹3,40,000"
          delta="15 pending claims" deltaType="warning"
          sub="Reimbursements awaiting approval" accent="text-navy" />
        <KpiTile label="Next Payroll Date" value="Sep 30"
          delta="In 5 days" deltaType="neutral"
          sub="Next scheduled payroll disbursement" accent="text-primary" />
      </div>

      {/* Employee table */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <p className="text-base font-bold text-navy">Employee Payroll Management</p>
          <div className="flex gap-2">
            <button className="btn-primary flex items-center gap-1.5 text-xs py-1.5 px-3">
              <Eye size={13} /> Preview Payroll
            </button>
            <button className="btn-outline flex items-center gap-1.5 text-xs py-1.5 px-3">
              <Check size={13} /> Approve All
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-4">
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, ID, or department"
            className="flex-1 text-xs border border-border rounded-lg px-3 py-2 focus:outline-none focus:border-primary text-navy placeholder:text-subtle" />
          <select value={dept} onChange={(e) => setDept(e.target.value)}
            className="text-xs border border-border rounded-lg px-2 py-2 text-muted focus:outline-none focus:border-primary">
            <option>All Departments</option>
            <option>Engineering</option>
            <option>Marketing</option>
            <option>Sales</option>
          </select>
          <select value={status} onChange={(e) => setStatus(e.target.value)}
            className="text-xs border border-border rounded-lg px-2 py-2 text-muted focus:outline-none focus:border-primary">
            <option>All Status</option>
            <option>pending</option>
            <option>onhold</option>
            <option>success</option>
          </select>
        </div>
        <p className="text-xs text-muted mb-3">Filter employees by department or payroll status</p>

        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-muted border-b border-border">
              <th className="text-left pb-2 font-medium">Employee</th>
              <th className="text-left pb-2 font-medium">Department</th>
              <th className="text-left pb-2 font-medium">Net Salary</th>
              <th className="text-left pb-2 font-medium">Status</th>
              <th className="text-left pb-2 font-medium">Last Paid</th>
              <th className="text-left pb-2 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((e, i) => (
              <tr key={i} className="border-b border-border last:border-0">
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                      {e.name[0]}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-navy">{e.name}</p>
                      <p className="text-[10px] text-muted">{e.sub}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 text-xs text-muted">{e.dept}</td>
                <td className="py-3 text-sm font-bold text-navy">{e.salary}</td>
                <td className="py-3"><StatusBadge status={e.status} /></td>
                <td className="py-3 text-xs text-muted">{e.lastPaid}</td>
                <td className="py-3">
                  <div className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center cursor-pointer hover:bg-red-100 transition">
                    <span className="text-red-500 text-[10px] font-bold">PDF</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
          <p className="text-xs text-muted">Showing 1 to 10 of 1,247 employees</p>
          <div className="flex items-center gap-1">
            <button className="w-7 h-7 rounded-lg border border-border flex items-center justify-center hover:border-primary transition">
              <ChevronLeft size={13} className="text-muted" />
            </button>
            {[1, 2, 3].map((p) => (
              <button key={p}
                className={`w-7 h-7 rounded-lg text-xs font-medium transition-all
                  ${p === 1 ? 'bg-primary text-white' : 'border border-border text-muted hover:border-primary'}`}>
                {p}
              </button>
            ))}
            <button className="w-7 h-7 rounded-lg border border-border flex items-center justify-center hover:border-primary transition">
              <ChevronRight size={13} className="text-muted" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-3 gap-4">
        {['Benefits Overview', 'Recent Claims', 'Reports & Compliance'].map((t) => (
          <div key={t} className="card flex items-center justify-center h-28">
            <p className="text-sm font-semibold text-muted">{t}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
