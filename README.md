# Fingo

A unified fintech platform with B2C (Personal) and B2B (Business) surfaces.

## Stack
- React 18
- React Router v6
- Tailwind CSS
- Recharts
- Lucide Icons

## Getting Started

```bash
npm install
npm start
```

App runs at http://localhost:3000

## Routes

### Personal (B2C)
- /personal/home
- /personal/shared-wallet
- /personal/payments
- /personal/insurance
- /personal/tax
- /personal/digital-assets
- /personal/finai

### Business (B2B)
- /business/home
- /business/expense-planner
- /business/tax-compliance
- /business/finance-intel
- /business/payroll-benefits
- /business/cash-credits
- /business/finai

## Folder Structure
src/
├── components/
│   ├── layout/     — Sidebar, Topbar, Layout wrappers
│   ├── ui/         — KpiTile, StatusBadge, AlertCard, Stepper
│   └── charts/     — Chart wrappers
├── pages/
│   ├── personal/   — 7 B2C screens
│   └── business/   — 7 B2B screens
├── data/
│   ├── b2c/        — Mock JSON for personal screens
│   └── b2b/        — Mock JSON for business screens
├── context/        — React Context (mode, user)
├── hooks/          — Custom hooks
└── utils/          — Formatters (currency, dates)
