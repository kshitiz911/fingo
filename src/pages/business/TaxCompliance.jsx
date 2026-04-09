import React, { useState } from 'react';
import Stepper from '../../components/ui/Stepper';
import KpiTile from '../../components/ui/KpiTile';
import { Upload, Download, FileText, FileSpreadsheet, AlertTriangle, ArrowRight } from 'lucide-react';

const STEPS = [
  { label: 'Collect Data', status: 'done' },
  { label: 'Validate',     status: 'done' },
  { label: 'Calculate',    status: 'active' },
  { label: 'File Return',  status: 'pending' },
  { label: 'Confirm Filing', status: 'pending' },
];

const DOC_TABS = ['Receipts', 'Deduction Proofs', 'Returns', 'Certificates'];

const UPLOADED = [
  { name: 'Form-16-2024.pdf',      icon: FileText,        status: 'verified', statusColor: 'text-positive', bg: 'bg-red-50' },
  { name: 'Medical-Bills-Q4.xlsx', icon: FileSpreadsheet, status: 'pending',  statusColor: 'text-warning',  bg: 'bg-green-50' },
];

const INVENTORY = ['Tax Summary Report', 'Comparative Analysis', 'Comparative Analysis', 'Comparative Analysis'];

export default function TaxCompliance() {
  const [docTab, setDocTab] = useState('Receipts');
  const [format, setFormat] = useState('PDF');

  return (
    <div className="flex flex-col gap-6">
      {/* KPI tiles */}
      <div className="grid grid-cols-4 gap-4">
        <KpiTile label="Due Soon"    value="₹2,53,900" delta="Total tax payable"              deltaType="negative" accent="text-negative" />
        <KpiTile label="Applied"     value="₹1,50,000" delta="Deductions via TDS/GST"         deltaType="positive" accent="text-positive" />
        <KpiTile label="Pending"     value="₹32,5000"  delta="Expected additional deductions" deltaType="warning"  accent="text-warning" />
        <KpiTile label="Pending"     value="₹32,5000"  delta="Compliance filing progress"     deltaType="neutral"  accent="text-muted" />
      </div>

      {/* Stepper */}
      <div className="card">
        <p className="text-base font-bold text-navy mb-6">Filling Progress</p>
        <Stepper steps={STEPS} />
        <button className="mt-6 btn-primary flex items-center gap-2 w-fit">
          Proceed to Next Stage <ArrowRight size={15} />
        </button>
      </div>

      {/* Document Vault + Inventory */}
      <div className="flex gap-4">
        {/* Vault */}
        <div className="card flex-1">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-bold text-navy">Document Vault</p>
            <button className="btn-primary text-xs py-1.5 px-3 flex items-center gap-1.5">
              <Upload size={13} /> Upload Tax Document
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mb-4 border-b border-border pb-2">
            {DOC_TABS.map((t) => (
              <button key={t} onClick={() => setDocTab(t)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all
                  ${docTab === t ? 'bg-primary text-white' : 'text-muted hover:bg-slate-100'}`}>
                {t}
              </button>
            ))}
          </div>

          {/* Drop zone */}
          <div className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center gap-2 mb-4 hover:border-primary transition-colors cursor-pointer">
            <Upload size={24} className="text-muted" />
            <p className="text-sm text-muted">Drag & drop or select a file</p>
            <button className="text-sm text-primary font-semibold hover:underline">Choose File</button>
          </div>

          {/* Uploaded files */}
          <div className="flex flex-col gap-2">
            {UPLOADED.map((f) => (
              <div key={f.name} className="flex items-center justify-between bg-surface rounded-xl px-3 py-2.5">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg ${f.bg} flex items-center justify-center`}>
                    <f.icon size={15} className="text-muted" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-navy">{f.name}</p>
                    <p className="text-[10px] text-muted">Uploaded recently</p>
                  </div>
                </div>
                <span className={`text-xs font-semibold capitalize ${f.statusColor}`}>{f.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Inventory */}
        <div className="card w-64 shrink-0">
          <p className="text-sm font-bold text-navy mb-4">Document Inventory</p>
          <div className="flex flex-col gap-2 mb-6">
            {INVENTORY.map((doc, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div className="flex items-center gap-2">
                  <FileText size={14} className="text-muted" />
                  <span className="text-xs text-navy font-medium">{doc}</span>
                </div>
                <button className="text-muted hover:text-primary transition-colors">
                  <Download size={14} />
                </button>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <select value={format} onChange={(e) => setFormat(e.target.value)}
              className="w-full text-xs border border-border rounded-lg px-3 py-2 text-muted focus:outline-none focus:border-primary">
              <option>PDF</option>
              <option>XLS</option>
              <option>PPT</option>
            </select>
            <button className="btn-primary text-xs py-2 flex items-center justify-center gap-1.5">
              <Download size={13} /> Download Tax Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
