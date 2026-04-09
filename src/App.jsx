import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Layouts
import PersonalLayout from './components/layout/PersonalLayout';
import BusinessLayout from './components/layout/BusinessLayout';

// Auth
import Login from './pages/Login';

// B2C Pages
import PersonalHome from './pages/personal/Home';
import SharedWallet from './pages/personal/SharedWallet';
import Payments from './pages/personal/Payments';
import Insurance from './pages/personal/Insurance';
import Tax from './pages/personal/Tax';
import DigitalAssets from './pages/personal/DigitalAssets';
import FinAIPersonal from './pages/personal/FinAI';

// B2B Pages
import BusinessHome from './pages/business/Home';
import ExpensePlanner from './pages/business/ExpensePlanner';
import TaxCompliance from './pages/business/TaxCompliance';
import FinanceIntel from './pages/business/FinanceIntel';
import PayrollBenefits from './pages/business/PayrollBenefits';
import CashCredits from './pages/business/CashCredits';
import FinAIBusiness from './pages/business/FinAI';

// ── Added: guards unauthenticated access ──────────────────────────────────────
function Protected({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

// ── Added: routes extracted so useAuth() works inside AuthProvider ────────────
function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Added: login route — skips to home if already logged in */}
      <Route
        path="/login"
        element={user ? <Navigate to="/personal/home" replace /> : <Login />}
      />

      {/* Unchanged: default redirect */}
      <Route path="/" element={<Navigate to="/personal/home" replace />} />

      {/* Unchanged: B2C routes — wrapped in Protected */}
      <Route path="/personal" element={<Protected><PersonalLayout /></Protected>}>
        <Route path="home" element={<PersonalHome />} />
        <Route path="shared-wallet" element={<SharedWallet />} />
        <Route path="payments" element={<Payments />} />
        <Route path="insurance" element={<Insurance />} />
        <Route path="tax" element={<Tax />} />
        <Route path="digital-assets" element={<DigitalAssets />} />
        <Route path="finai" element={<FinAIPersonal />} />
        <Route index element={<Navigate to="home" replace />} />
      </Route>

      {/* Unchanged: B2B routes — wrapped in Protected */}
      <Route path="/business" element={<Protected><BusinessLayout /></Protected>}>
        <Route path="home" element={<BusinessHome />} />
        <Route path="expense-planner" element={<ExpensePlanner />} />
        <Route path="tax-compliance" element={<TaxCompliance />} />
        <Route path="finance-intel" element={<FinanceIntel />} />
        <Route path="payroll-benefits" element={<PayrollBenefits />} />
        <Route path="cash-credits" element={<CashCredits />} />
        <Route path="finai" element={<FinAIBusiness />} />
        <Route index element={<Navigate to="home" replace />} />
      </Route>

      {/* Added: catch-all */}
      <Route path="*" element={<Navigate to="/personal/home" replace />} />
    </Routes>
  );
}

// ── Added: AuthProvider wraps everything, AppRoutes uses useAuth inside it ────
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
