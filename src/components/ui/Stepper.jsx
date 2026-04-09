import React from 'react';
import { Check } from 'lucide-react';

/**
 * Stepper
 * steps: [{ label: string, status: 'done' | 'active' | 'pending' }]
 */
export default function Stepper({ steps }) {
  return (
    <div className="flex items-center gap-0">
      {steps.map((step, i) => {
        const isDone   = step.status === 'done';
        const isActive = step.status === 'active';
        return (
          <React.Fragment key={i}>
            <div className="flex flex-col items-center gap-1.5">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all
                ${isDone   ? 'bg-primary text-white' :
                  isActive ? 'bg-amber-500 text-white' :
                             'bg-slate-200 text-muted'}`}
              >
                {isDone ? <Check size={14} /> : i + 1}
              </div>
              <span className={`text-[11px] font-medium whitespace-nowrap
                ${isDone ? 'text-primary' : isActive ? 'text-amber-600' : 'text-muted'}`}>
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-2 mb-4 rounded-full
                ${isDone ? 'bg-primary' : 'bg-slate-200'}`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
