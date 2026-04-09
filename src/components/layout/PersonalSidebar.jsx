// src/components/layout/PersonalSidebar.jsx
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Wallet,
  CreditCard,
  Shield,
  FileText,
  Bitcoin,
  Sparkles,
  ArrowLeftRight,
  MessageSquarePlus,
  HelpCircle,
} from "lucide-react";
import fingoLogo from "./fingo.svg";

const navItems = [
  { label: "Home",          icon: LayoutDashboard, to: "/personal/home"          },
  { label: "Shared Wallet", icon: Wallet,          to: "/personal/shared-wallet" },
  { label: "Payments",      icon: CreditCard,      to: "/personal/payments"      },
  { label: "Insurance",     icon: Shield,          to: "/personal/insurance"     },
  { label: "Tax",           icon: FileText,        to: "/personal/tax"           },
  { label: "Digital Assets",icon: Bitcoin,         to: "/personal/digital-assets"},
  { label: "FinAI",         icon: Sparkles,        to: "/personal/finai"         },
];

const bottomItems = [
  { label: "Feature Request", icon: MessageSquarePlus, to: "/personal/feature-request" },
  { label: "Help & Support",  icon: HelpCircle,        to: "/personal/help"            },
];

export default function PersonalSidebar() {
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
          to="/business/home"
          className="btn-outline mt-2 justify-center"
        >
          <ArrowLeftRight size={14} />
          <span>Switch to Business</span>
        </NavLink>
      </div>
    </aside>
  );
}
