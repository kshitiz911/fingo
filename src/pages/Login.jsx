import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { signIn } = useAuth();
  const [email, setEmail]       = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  function handleSignIn(e) {
    e.preventDefault();
    if (!email.trim()) { setError('Please enter your email.'); return; }
    setError('');
    setLoading(true);
    // Simulate auth — in real app call your API here
    setTimeout(() => {
      signIn({
        name: 'Harsh',
        email: email,
        avatar: email[0].toUpperCase(),
      });
      setLoading(false);
    }, 800);
  }

  return (
    <div className="min-h-screen flex">

      {/* ── Left panel — dark image side ── */}
      <div className="hidden lg:flex w-[52%] relative overflow-hidden"
           style={{ background: '#000' }}>
        {/* Abstract glowing columns — CSS-only, matching the design */}
        <div className="absolute inset-0 flex items-end justify-center pb-0">
          {[
            { h: '72%', delay: '0ms',   color: '#1a3a8f' },
            { h: '85%', delay: '80ms',  color: '#1e4db7' },
            { h: '62%', delay: '160ms', color: '#1a3a8f' },
            { h: '90%', delay: '240ms', color: '#1e4db7' },
          ].map((col, i) => (
            <div key={i} className="relative mx-2" style={{ width: 72, height: col.h }}>
              {/* Column body */}
              <div className="absolute inset-0 rounded-t-sm"
                style={{ background: `linear-gradient(180deg, ${col.color}cc 0%, ${col.color}44 100%)` }} />
              {/* Top glow edge */}
              <div className="absolute top-0 left-0 right-0 h-0.5 rounded-full"
                style={{ background: 'linear-gradient(90deg, transparent, #a5b4fc, #818cf8, #a5b4fc, transparent)', boxShadow: '0 0 12px 2px #818cf8' }} />
              {/* Left iridescent edge */}
              <div className="absolute top-0 left-0 bottom-0 w-0.5"
                style={{ background: 'linear-gradient(180deg, #a5b4fc 0%, #38bdf8 40%, #818cf8 80%, transparent 100%)', opacity: 0.8 }} />
              {/* Right iridescent edge */}
              <div className="absolute top-0 right-0 bottom-0 w-0.5"
                style={{ background: 'linear-gradient(180deg, #c4b5fd 0%, #60a5fa 40%, #818cf8 80%, transparent 100%)', opacity: 0.6 }} />
              {/* Inner highlight */}
              <div className="absolute inset-x-1 top-0 h-1/3"
                style={{ background: 'linear-gradient(180deg, rgba(165,180,252,0.15) 0%, transparent 100%)' }} />
            </div>
          ))}
        </div>
        {/* FinGo watermark bottom-left */}
        <div className="absolute bottom-8 left-8">
          <p className="text-white/20 text-sm font-semibold tracking-widest uppercase">FinGo</p>
        </div>
      </div>

      {/* ── Right panel — login form ── */}
      <div className="flex-1 flex items-center justify-center bg-white px-8">
        <div className="w-full max-w-sm">

          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-navy" style={{ fontFamily: 'Georgia, serif' }}>
              Welcome back
            </h1>
            <p className="text-muted text-sm mt-2">Sign in to your account to continue</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSignIn} className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-medium text-navy block mb-1.5">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-navy
                           placeholder:text-subtle focus:outline-none focus:ring-2
                           focus:ring-blue-500/30 focus:border-blue-400 transition"
              />
              {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            </div>

            {/* Forgot password */}
            <div className="text-right -mt-2">
              <button type="button"
                className="text-sm text-blue-600 hover:underline font-medium">
                Forgot password?
              </button>
            </div>

            {/* Sign in button */}
            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-xl text-white text-sm font-semibold
                         transition-all duration-150 active:scale-[0.98] disabled:opacity-70"
              style={{ background: loading ? '#2563EB99' : '#2563EB' }}>
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-xs text-muted font-medium">Or continue with</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* Social logins */}
          <div className="flex items-center justify-center gap-4">
            {/* Google */}
            <button className="w-11 h-11 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition">
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            </button>
            {/* Microsoft */}
            <button className="w-11 h-11 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition">
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path d="M11.4 11.4H1V1h10.4v10.4z" fill="#F35325"/>
                <path d="M23 11.4H12.6V1H23v10.4z" fill="#81BC06"/>
                <path d="M11.4 23H1V12.6h10.4V23z" fill="#05A6F0"/>
                <path d="M23 23H12.6V12.6H23V23z" fill="#FFBA08"/>
              </svg>
            </button>
            {/* Apple */}
            <button className="w-11 h-11 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-navy">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
            </button>
          </div>

          {/* Sign up link */}
          <p className="text-center text-sm text-muted mt-6">
            Don't have an account?{' '}
            <button className="text-blue-600 font-semibold hover:underline">
              Sign up
            </button>
          </p>

        </div>
      </div>
    </div>
  );
}
