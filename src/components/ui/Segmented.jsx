import React from 'react';

/**
 * Segmented — the single tab / time-range control used across FinGo.
 * Grey track, white raised active segment.
 */
export default function Segmented({ options, value, onChange, size = 'md' }) {
  const pad = size === 'sm' ? 'px-2.5 py-1 text-[12px]' : 'px-3 py-1.5 text-[12px]';
  return (
    <div className="inline-flex items-center gap-0.5 rounded-lg bg-[#F1F4F8] p-0.5">
      {options.map((opt) => {
        const active = opt === value;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`${pad} rounded-md font-medium whitespace-nowrap transition-all
              ${active
                ? 'bg-white text-navy font-semibold shadow-[0_1px_2px_rgba(15,23,42,0.08)]'
                : 'text-muted hover:text-navy'}`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}
