import React from 'react';

/**
 * SectionHeader — heading row inside a card.
 * Title (Inter 16/600) + optional subtitle on the left, controls on the right.
 */
export default function SectionHeader({ title, subtitle, actions, className = 'mb-4' }) {
  return (
    <div className={`flex items-start justify-between gap-4 ${className}`}>
      <div className="min-w-0">
        <h2 className="section-title">{title}</h2>
        {subtitle && <p className="section-subtitle">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-3 shrink-0">{actions}</div>}
    </div>
  );
}
