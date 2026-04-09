// src/components/layout/BusinessSidebar.jsx
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Receipt,
  ClipboardCheck,
  BarChart2,
  Users,
  CreditCard,
  Sparkles,
  ArrowLeftRight,
  Lightbulb,
  HelpCircle,
} from "lucide-react";
import fingoLogo from "./fingo-b.svg";

const navItems = [
  { label: "Home",              icon: LayoutDashboard, to: "/business/home"            },
  { label: "Expense Planner",   icon: Receipt,         to: "/business/expense-planner" },
  { label: "Tax & Compliance",  icon: ClipboardCheck,  to: "/business/tax-compliance"  },
  { label: "Finance Intel",     icon: BarChart2,       to: "/business/finance-intel"   },
  { label: "Payroll & Benefits",icon: Users,           to: "/business/payroll-benefits"},
  { label: "Cash & Credits",    icon: CreditCard,      to: "/business/cash-credits"    },
  { label: "FinAI",             icon: Sparkles,        to: "/business/finai"           },
];

const bottomItems = [
  { label: "Feature Request", icon: Lightbulb,  to: "/business/feature-request" },
  { label: "Help & Support",  icon: HelpCircle, to: "/business/help"            },
];

export default function BusinessSidebar() {
  const location = useLocation();

  const isActive = (to) => location.pathname.startsWith(to);

  return (
    <aside className="sidebar">
      {/* ── Logo ── */}
      <div className="px-5 pt-5 pb-4">
        <img src={fingoLogo} alt="FinGo" className="h-12 w-auto" />
      </div>

      {/* ── Main nav ── */}
      <nav className="flex-1 overflow-y-auto px-3 pt-4 flex flex-col gap-1">
        {navItems.map(({ label, icon: Icon, to }) => (
          <NavLink
            key={to}
            to={to}
            className={() => isActive(to) ? "nav-item-active" : "nav-item"}
          >
            <Icon size={17} strokeWidth={1.8} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* ── Bottom links ── */}
      <div className="px-3 pb-5 flex flex-col gap-1 border-t border-border pt-3">
        {bottomItems.map(({ label, icon: Icon, to }) => (
          <NavLink
            key={to}
            to={to}
            className={() => isActive(to) ? "nav-item-active" : "nav-item"}
          >
            <Icon size={16} strokeWidth={1.8} />
            <span>{label}</span>
          </NavLink>
        ))}

        <NavLink
          to="/personal/home"
          className="btn-outline mt-2 justify-center"
        >
          <ArrowLeftRight size={14} />
          <span>Switch to Personal</span>
        </NavLink>
      </div>
    </aside>
  );
}
