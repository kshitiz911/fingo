import React, { useState, useRef, useEffect } from 'react';
import {
  BarChart2, TrendingUp,
  Bell, Settings2, Paperclip, ArrowUp, Pin, Copy, Download, X
} from 'lucide-react';
import finAiGif from '../../assets/fin-ai.gif';

// ── Mock AI responses ────────────────────────────────────────────────────────
const MOCK_RESPONSES = {
  default: {
    type: 'cashflow',
    month: 'April 2024',
    cashflow: '+₹73,200',
    cashflowDelta: '12.4% increase from March',
    income: '₹1,25,000',
    spending: '₹51,800',
    categories: [
      { label: 'Food & Dining',  amount: '₹18,130', pct: 35, color: '#0B6E6E' },
      { label: 'Transportation', amount: '₹12,950', pct: 25, color: '#0E9090' },
      { label: 'Shopping',       amount: '₹10,360', pct: 20, color: '#F59E0B' },
    ],
    sources: ['Axis Bank', 'Salary', 'Bills'],
  },
};

const SLASH_COMMANDS = [
  { cmd: '/chart',    label: '/chart'    },
  { cmd: '/explain',  label: '/explain'  },
  { cmd: '/forecast', label: '/forecast' },
  { cmd: '/analyze',  label: '/analyze'  },
  { cmd: '/alert',    label: '/alert'    },
];

const TIME_FILTERS = ['30D', 'QTD', 'YTD'];

// ── ADDED: Customization Modal ───────────────────────────────────────────────
function CustomizationModal({ onClose }) {
  const [dataSources, setDataSources] = useState({
    bankAccounts: false, creditCards: false, investments: false,
    debitCards: false, upiTxn: false, mutualFunds: false,
    digitalAssets: false, loansEmi: false,
  });
  const [dateRange,   setDateRange]   = useState('Last 30 Days');
  const [txnType,     setTxnType]     = useState('Income');
  const [account,     setAccount]     = useState('All Accounts');
  const [categories,  setCategories]  = useState(['Bills', 'Rent']);
  const [respFormat,  setRespFormat]  = useState({ text: true, pie: false, line: false, bar: false, scatter: false, area: false });

  const toggleDS  = (k) => setDataSources((s) => ({ ...s, [k]: !s[k] }));
  const toggleFmt = (k) => setRespFormat((s)  => ({ ...s, [k]: !s[k] }));

  const DS_ITEMS = [
    { key: 'bankAccounts', label: 'Bank Accounts' },
    { key: 'creditCards',  label: 'Credit Cards' },
    { key: 'investments',  label: 'Investments' },
    { key: 'debitCards',   label: 'Debit Cards' },
    { key: 'upiTxn',       label: 'UPI Txn' },
    { key: 'mutualFunds',  label: 'Mutual Funds' },
    { key: 'digitalAssets',label: 'Digital Assets' },
    { key: 'loansEmi',     label: 'Loans &EMI' },
  ];

  const FMT_ITEMS = [
    { key: 'text',    label: 'Text Based Answer' },
    { key: 'pie',     label: 'Pie Chart' },
    { key: 'line',    label: 'Line Graph' },
    { key: 'bar',     label: 'Bar Chart' },
    { key: 'scatter', label: 'Scatter Plot' },
    { key: 'area',    label: 'Area Chart' },
  ];

  // Checkbox sub-component used only inside modal
  const CB = ({ checked, onChange, label }) => (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <div onClick={() => onChange(!checked)}
        className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors
          ${checked ? 'bg-primary border-primary' : 'border-slate-300 bg-white'}`}>
        {checked && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>
      <span className="text-sm text-navy">{label}</span>
    </label>
  );

  return (
    /* Backdrop */
    <div className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.3)' }}
      onClick={onClose}>
      {/* Panel — stop propagation so clicking inside doesn't close */}
      <div className="bg-white rounded-2xl w-[1080px] max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-2">
          <h2 className="font-display text-[24px] font-bold font-Denton text-navy mb-0">Customization</h2>
          <button onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 transition">
            <X size={16} className="text-muted" />
          </button>
        </div>

        <div className="px-6 pb-6 flex flex-col gap-5">

          {/* Data Sources */}
          <div>
            <p className="text-sm font-bold text-navy mb-3">Data Sources</p>
            <div className="grid grid-cols-5 gap-x-4 gap-y-2.5">
              {DS_ITEMS.slice(0, 5).map(({ key, label }) => (
                <CB key={key} checked={dataSources[key]} onChange={() => toggleDS(key)} label={label} />
              ))}
              {DS_ITEMS.slice(5).map(({ key, label }) => (
                <CB key={key} checked={dataSources[key]} onChange={() => toggleDS(key)} label={label} />
              ))}
              <button className="flex items-center gap-1.5 text-sm font-semibold text-white
                                 bg-navy px-3 py-1.5 rounded-lg hover:opacity-90 transition whitespace-nowrap col-span-1.5">
                + Add Data Sources
              </button>
            </div>
          </div>

          {/* Filters */}
          <div>
            <p className="text-sm font-bold text-navy mb-3">Filters</p>
            <div className="grid grid-cols-4 gap-3">
              {/* Date Range */}
              <div>
                <p className="text-xs text-muted mb-1.5">Date Range</p>
                <select value={dateRange} onChange={(e) => setDateRange(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-navy
                             focus:outline-none focus:border-primary">
                  <option>Last 30 Days</option>
                  <option>Last 7 Days</option>
                  <option>Last 90 Days</option>
                  <option>This Year</option>
                </select>
              </div>
              {/* Transaction Type */}
              <div>
                <p className="text-xs text-muted mb-1.5">Transaction Type</p>
                <select value={txnType} onChange={(e) => setTxnType(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-navy
                             focus:outline-none focus:border-primary">
                  <option>Income</option>
                  <option>Expense</option>
                  <option>All</option>
                </select>
              </div>
              {/* Category — with tags */}
              <div>
                <p className="text-xs text-muted mb-1.5">Category</p>
                <div className="flex items-center gap-1.5 border border-slate-200 rounded-xl px-3 py-1.5 min-h-[38px]">
                  {categories.map((c) => (
                    <span key={c}
                      className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                      {c}
                    </span>
                  ))}
                  <select onChange={(e) => {
                    if (e.target.value && !categories.includes(e.target.value)) {
                      setCategories((prev) => [...prev, e.target.value]);
                    }
                    e.target.value = '';
                  }}
                    className="flex-1 text-sm text-muted focus:outline-none bg-transparent min-w-0">
                    <option value="">+</option>
                    <option>Food</option>
                    <option>Shopping</option>
                    <option>Transport</option>
                    <option>Utilities</option>
                  </select>
                </div>
              </div>
              {/* Account */}
              <div>
                <p className="text-xs text-muted mb-1.5">Account</p>
                <select value={account} onChange={(e) => setAccount(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-navy
                             focus:outline-none focus:border-primary">
                  <option>All Accounts</option>
                  <option>SBI</option>
                  <option>HDFC</option>
                </select>
              </div>
            </div>
          </div>

          {/* Response Format */}
          <div>
            <p className="text-sm font-bold text-navy mb-3">Response Format</p>
            <div className="grid grid-cols-3 gap-x-6 gap-y-2.5">
              {FMT_ITEMS.map(({ key, label }) => (
                <CB key={key} checked={respFormat[key]} onChange={() => toggleFmt(key)} label={label} />
              ))}
            </div>
          </div>

          {/* Footer buttons */}
          <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
            <button onClick={() => {
                setDataSources(Object.fromEntries(Object.keys(dataSources).map((k) => [k, false])));
                setRespFormat({ text: true, pie: false, line: false, bar: false, scatter: false, area: false });
                setDateRange('Last 30 Days'); setTxnType('Income'); setAccount('All Accounts'); setCategories([]);
              }}
              className="px-5 py-2 rounded-xl text-sm font-semibold border border-slate-200
                         text-navy hover:bg-slate-50 transition"
              style={{ background: '#F59E0B', color: '#fff', border: 'none' }}>
              Reset
            </button>
            <button onClick={onClose}
              className="px-5 py-2 rounded-xl text-sm font-semibold text-white bg-navy hover:opacity-90 transition">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Unchanged sub-components ─────────────────────────────────────────────────

function WelcomeState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4 pb-32">
      <img src={finAiGif} alt="FinAI" className="w-32 h-32 object-contain" />
      <div className="text-center">
        <h2 className="text-2xl font-bold text-navy">Welcome to FinAI Agent</h2>
        <p className="text-muted mt-1">
          Your Personal AI Advisor for every{' '}
          <span className="text-primary font-semibold">Financial Move</span>
        </p>
      </div>
      <div className="flex flex-wrap gap-2 justify-center mt-4 max-w-lg">
        {[
          'Compare April spend vs income',
          'Show my top 3 expense categories',
          'Forecast next month savings',
          'Alert me if I overspend on food',
        ].map((p) => (
          <button key={p}
            className="text-xs px-3 py-1.5 rounded-full border border-border bg-white
                       text-muted hover:border-primary hover:text-primary transition-all">
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}

function CategoryBar({ label, amount, pct, color }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-navy w-32 shrink-0">{label}</span>
      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-700"
             style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
      <span className="text-sm font-semibold text-navy w-20 text-right">{amount}</span>
    </div>
  );
}

function CashflowCard({ data }) {
  return (
    <div className="bg-white rounded-2xl border border-border overflow-hidden max-w-xl w-full"
      style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
      <div className="flex items-center gap-3 px-5 pt-4 pb-3 border-b border-border">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <BarChart2 size={15} className="text-white" />
        </div>
        <div>
          <p className="text-sm font-semibold text-navy">Cashflow Analysis ({data.month})</p>
          <p className="text-xs text-muted">Income vs Spending Breakdown</p>
        </div>
      </div>
      <div className="px-5 py-4 flex flex-col gap-4">
        <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3">
          <div className="flex items-center gap-2">
            <TrendingUp size={14} className="text-green-600" />
            <span className="text-xs font-semibold text-green-700">Positive Cashflow</span>
          </div>
          <p className="text-2xl font-bold text-navy mt-1">{data.cashflow}</p>
          <p className="text-xs text-muted">{data.cashflowDelta}</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-surface rounded-xl p-3">
            <p className="text-xs text-muted">Total Income</p>
            <p className="text-lg font-bold text-navy mt-0.5">{data.income}</p>
          </div>
          <div className="bg-surface rounded-xl p-3">
            <p className="text-xs text-muted">Total Spending</p>
            <p className="text-lg font-bold text-navy mt-0.5">{data.spending}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2.5">
          {data.categories.map((cat) => (
            <CategoryBar key={cat.label} {...cat} />
          ))}
        </div>
        <div className="flex items-center justify-between pt-1">
          <div className="flex gap-1.5">
            {data.sources.map((s) => (
              <span key={s}
                className="text-[11px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full font-medium">
                {s}
              </span>
            ))}
          </div>
          <button className="text-xs text-primary font-medium hover:underline">
            Show method & assumptions
          </button>
        </div>
        <div className="flex items-center gap-3 pt-1 border-t border-border">
          <button className="flex items-center gap-1.5 text-xs text-muted hover:text-primary transition-colors">
            <Copy size={13} /> Copy
          </button>
          <button className="flex items-center gap-1.5 text-xs text-muted hover:text-primary transition-colors">
            <Pin size={13} /> Pin
          </button>
          <button className="flex items-center gap-1.5 text-xs text-muted hover:text-primary transition-colors">
            <BarChart2 size={13} /> Convert to chart
          </button>
          <button className="flex items-center gap-1.5 text-xs text-muted hover:text-primary transition-colors">
            <Download size={13} /> Export
          </button>
        </div>
      </div>
    </div>
  );
}

function ChatMessage({ msg }) {
  if (msg.role === 'user') {
    return (
      <div className="flex justify-end">
        <div className="bg-navy text-white text-sm px-4 py-2.5 rounded-2xl rounded-tr-sm max-w-md">
          {msg.text}
        </div>
      </div>
    );
  }
  return (
    <div className="flex justify-start">
      {msg.cardData
        ? <CashflowCard data={msg.cardData} />
        : (
          <div className="bg-white border border-border text-sm px-4 py-2.5 rounded-2xl rounded-tl-sm max-w-md"
            style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            {msg.text}
          </div>
        )
      }
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────
export default function FinAI() {
  const [messages,    setMessages]    = useState([]);
  const [input,       setInput]       = useState('');
  const [activeTime,  setActiveTime]  = useState('YTD');
  const [isTyping,    setIsTyping]    = useState(false);
  const [showCustom,  setShowCustom]  = useState(false); // ADDED
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  function handleSend(text) {
    const msg = text || input;
    if (!msg.trim()) return;
    setMessages((prev) => [...prev, { role: 'user', text: msg }]);
    setInput('');
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { role: 'ai', cardData: MOCK_RESPONSES.default }]);
    }, 1200);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  const isEmpty = messages.length === 0;

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] -m-6">

      {/* ADDED: Customization modal */}
      {showCustom && <CustomizationModal onClose={() => setShowCustom(false)} />}

      {/* Messages area — CHANGED: removed max-w-2xl mx-auto constraint so content fills width */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="flex flex-col gap-4 min-h-full">
          {isEmpty ? (
            <WelcomeState />
          ) : (
            <>
              {messages.map((msg, i) => <ChatMessage key={i} msg={msg} />)}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-border px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1.5"
                    style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                    {[0, 1, 2].map((i) => (
                      <span key={i}
                        className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input bar — CHANGED: removed max-w-2xl mx-auto so bar fills full width */}
      <div className="border-t border-border bg-white px-6 py-3">

        {/* Quick actions row — slash commands LEFT, time filters RIGHT, full width */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            {SLASH_COMMANDS.map(({ cmd, label }) => (
              <button key={cmd}
                onClick={() => setInput(cmd + ' ')}
                className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600
                           hover:bg-primary hover:text-white transition-all font-medium">
                {label}
              </button>
            ))}
            {/* CHANGED: Settings2 button now opens CustomizationModal */}
            <button
              onClick={() => setShowCustom(true)}
              className="w-6 h-6 rounded-lg bg-primary flex items-center justify-center ml-1">
              <Settings2 size={12} className="text-white" />
            </button>
          </div>
          <div className="flex items-center gap-1">
            {TIME_FILTERS.map((f) => (
              <button key={f}
                onClick={() => setActiveTime(f)}
                className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all
                  ${activeTime === f
                    ? 'bg-primary text-white'
                    : 'text-muted hover:bg-slate-100'}`}>
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Text input — fills full width */}
        <div className="flex items-center gap-2 border border-border rounded-xl px-3 py-2
                        bg-white focus-within:ring-2 focus-within:ring-primary/20
                        focus-within:border-primary/40 transition-all">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about your money e.g., 'Compare April spend vs income'"
            className="flex-1 text-sm bg-transparent outline-none text-navy placeholder:text-subtle"
          />
          <button className="text-muted hover:text-primary transition-colors">
            <Paperclip size={16} />
          </button>
          <button
            onClick={() => handleSend()}
            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all
              ${input.trim()
                ? 'bg-primary hover:opacity-90'
                : 'bg-slate-200 cursor-not-allowed'}`}>
            <ArrowUp size={14} className={input.trim() ? 'text-white' : 'text-muted'} />
          </button>
        </div>

      </div>
    </div>
  );
}
