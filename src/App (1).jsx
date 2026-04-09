import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Layouts
import PersonalLayout from './components/layout/PersonalLayout';
import BusinessLayout from './components/layout/BusinessLayout';

// Auth
import Login from './pages/Login';

// B2C Pages
import PersonalHome    from './pages/personal/Home';
import SharedWallet    from './pages/personal/SharedWallet';
import Payments        from './pages/personal/Payments';
import Insurance       from './pages/personal/Insurance';
import Tax             from './pages/personal/Tax';
import DigitalAssets   from './pages/personal/DigitalAssets';
import FinAIPersonal   from './pages/personal/FinAI';
import Settings        from './pages/personal/Settings';

// B2B Pages
import BusinessHome    from './pages/business/Home';
import ExpensePlanner  from './pages/business/ExpensePlanner';
import TaxCompliance   from './pages/business/TaxCompliance';
import FinanceIntel    from './pages/business/FinanceIntel';
import PayrollBenefits from './pages/business/PayrollBenefits';
import CashCredits     from './pages/business/CashCredits';
import FinAIBusiness   from './pages/business/FinAI';

// ── Protected route wrapper ───────────────────────────────────────────────────
// If not logged in → redirect to /login
// If logged in → render children normally
function Protected({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

// ── Routes ────────────────────────────────────────────────────────────────────
function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Login — redirect to home if already logged in */}
      <Route
        path="/login"
        element={user ? <Navigate to="/personal/home" replace /> : <Login />}
      />

      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/personal/home" replace />} />

      {/* B2C — Personal */}
      <Route path="/personal" element={<Protected><PersonalLayout /></Protected>}>
        <Route path="home"           element={<PersonalHome />} />
        <Route path="shared-wallet"  element={<SharedWallet />} />
        <Route path="payments"       element={<Payments />} />
        <Route path="insurance"      element={<Insurance />} />
        <Route path="tax"            element={<Tax />} />
        <Route path="digital-assets" element={<DigitalAssets />} />
        <Route path="finai"          element={<FinAIPersonal />} />
        <Route path="settings"        element={<Settings />} />
        <Route index element={<Navigate to="home" replace />} />
      </Route>

      {/* B2B — Business */}
      <Route path="/business" element={<Protected><BusinessLayout /></Protected>}>
        <Route path="home"             element={<BusinessHome />} />
        <Route path="expense-planner"  element={<ExpensePlanner />} />
        <Route path="tax-compliance"   element={<TaxCompliance />} />
        <Route path="finance-intel"    element={<FinanceIntel />} />
        <Route path="payroll-benefits" element={<PayrollBenefits />} />
        <Route path="cash-credits"     element={<CashCredits />} />
        <Route path="finai"            element={<FinAIBusiness />} />
        <Route index element={<Navigate to="home" replace />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/personal/home" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
