import React from 'react';

/**
 * PageHeader — one per screen. Establishes the top of the hierarchy:
 * Denton display title, muted one-line context, optional actions on the right.
 */
export default function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div className="min-w-0">
        <h1 className="page-title">{title}</h1>
        {subtitle && <p className="page-subtitle">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
    </div>
  );
}
