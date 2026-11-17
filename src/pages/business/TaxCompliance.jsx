import React, { useState } from 'react';
import Stepper from '../../components/ui/Stepper';
import KpiTile from '../../components/ui/KpiTile';
import PageHeader from '../../components/ui/PageHeader';
import SectionHeader from '../../components/ui/SectionHeader';
import Segmented from '../../components/ui/Segmented';
import StatusBadge from '../../components/ui/StatusBadge';
import { Upload, Download, FileText, FileSpreadsheet, ArrowRight } from 'lucide-react';

const STEPS = [
  { label: 'Collect Data', status: 'done' },
  { label: 'Validate',     status: 'done' },
  { label: 'Calculate',    status: 'active' },
  { label: 'File Return',  status: 'pending' },
  { label: 'Confirm Filing', status: 'pending' },
];

const DOC_TABS = ['Receipts', 'Deduction Proofs', 'Returns', 'Certificates'];

const UPLOADED = [
  { name: 'Form-16-2024.pdf',      icon: FileText,        status: 'success', label: 'Verified', meta: 'PDF · 248 KB · Uploaded today' },
  { name: 'Medical-Bills-Q4.xlsx', icon: FileSpreadsheet, status: 'pending', label: 'In review', meta: 'XLSX · 96 KB · Uploaded yesterday' },
];

const INVENTORY = ['Tax Summary Report', 'FY24 vs FY25 Comparison', 'GST Reconciliation', 'TDS Certificates'];

export default function TaxCompliance() {
  const [docTab, setDocTab] = useState('Receipts');
  const [format, setFormat] = useState('PDF');

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Tax & Compliance" subtitle="FY 2024-25 · GST, TDS and corporate tax in one place." />

      {/* KPI tiles */}
      <div className="grid grid-cols-4 gap-4">
        <KpiTile label="Tax Payable"         sub="GST + TDS"            value="₹2,53,900" delta="Due in 7 days" deltaType="negative" />
        <KpiTile label="Deductions Applied"  sub="Via TDS / GST credit" value="₹1,50,000" delta="Claimed"       deltaType="positive" />
        <KpiTile label="Expected Deductions" sub="Proofs outstanding"    value="₹3,25,000" delta="Pending"       deltaType="warning" />
        <KpiTile label="Filing Progress"     sub="GSTR-3B · September"   value="60%"       delta="Step 3 of 5"   deltaType="neutral" />
      </div>

      {/* Stepper */}
      <div className="card">
        <SectionHeader
          title="Filing Progress"
          subtitle="Current return: GSTR-3B for September"
          className="mb-6"
          actions={<button className="btn-primary">Proceed to next stage <ArrowRight size={15} /></button>}
        />
        <Stepper steps={STEPS} />
      </div>

      {/* Document Vault + Inventory */}
      <div className="grid grid-cols-[1fr_300px] gap-4">
        {/* Vault */}
        <div className="card">
          <SectionHeader
            title="Document Vault"
            subtitle="Receipts and proofs used for this filing"
            actions={<button className="btn-outline"><Upload size={14} /> Upload</button>}
          />

          <div className="mb-4">
            <Segmented options={DOC_TABS} value={docTab} onChange={setDocTab} />
          </div>

          {/* Drop zone */}
          <div className="border border-dashed border-[#CBD5E1] bg-[#F8FAFC] rounded-xl py-7 flex flex-col items-center gap-2 mb-4 hover:border-primary transition-colors cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-white border border-border flex items-center justify-center">
              <Upload size={17} className="text-primary" />
            </div>
            <p className="text-[13px] text-navy"><span className="font-semibold text-primary">Choose a file</span> or drag it here</p>
            <p className="text-[12px] text-muted">PDF, XLSX or JPG · up to 10 MB</p>
          </div>

          {/* Uploaded files */}
          <div className="flex flex-col gap-2.5">
            {UPLOADED.map((f) => (
              <div key={f.name} className="list-row">
                <div className="w-9 h-9 rounded-lg bg-white border border-border flex items-center justify-center shrink-0">
                  <f.icon size={16} className="text-navy" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-navy truncate">{f.name}</p>
                  <p className="text-[12px] text-muted">{f.meta}</p>
                </div>
                <StatusBadge status={f.status} label={f.label} />
              </div>
            ))}
          </div>
        </div>

        {/* Inventory */}
        <div className="card flex flex-col">
          <SectionHeader title="Reports" subtitle="Generated for FY 2024-25" />
          <div className="flex flex-col mb-5">
            {INVENTORY.map((doc) => (
              <div key={doc} className="flex items-center justify-between py-3 border-b border-[#EEF1F5] last:border-0">
                <div className="flex items-center gap-2.5 min-w-0">
                  <FileText size={15} className="text-muted shrink-0" />
                  <span className="text-[13px] text-navy font-medium truncate">{doc}</span>
                </div>
                <button className="text-muted hover:text-primary transition-colors" title="Download">
                  <Download size={15} />
                </button>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2 mt-auto">
            <p className="eyebrow">Export format</p>
            <select value={format} onChange={(e) => setFormat(e.target.value)}
              className="input-base w-full">
              <option>PDF</option>
              <option>XLS</option>
              <option>PPT</option>
            </select>
            <button className="btn-primary justify-center">
              <Download size={14} /> Download tax report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
