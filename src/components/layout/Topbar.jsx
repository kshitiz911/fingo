import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, Settings, LogOut, User, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Topbar() {
  const { user, signOut }       = useAuth();
  const navigate                 = useNavigate();
  const [dropOpen, setDropOpen] = useState(false);
  const dropRef                 = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handler(e) {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setDropOpen(false);
      }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <header className="h-16 bg-white border-b border-border flex items-center px-6 gap-4 sticky top-0 z-30">
      {/* Search — unchanged */}
      <div className="flex-1 max-w-lg relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-subtle" size={15} />
        <input
          type="text"
          placeholder="Search by name, amount, or date (/)"
          className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-border rounded-xl
                     placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-primary/20
                     focus:border-primary/40 transition"
        />
      </div>

      {/* Right actions — Settings + Bell unchanged, avatar upgraded to dropdown */}
      <div className="ml-auto flex items-center gap-2">
        <button className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-50 text-muted transition">
          <Settings size={18} />
        </button>
        <button className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-50 text-muted transition relative">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* Avatar — now a dropdown trigger */}
        <div className="relative ml-1" ref={dropRef}>
          <button
            onClick={() => setDropOpen((o) => !o)}
            className="flex items-center gap-1.5 rounded-xl hover:bg-slate-50 p-1 transition"
          >
            <div className="w-8 h-8 rounded-full bg-navy flex items-center justify-center">
              <span className="text-sm font-bold text-white">
                {user?.avatar || 'H'}
              </span>
            </div>
            <ChevronDown
              size={14}
              className={`text-muted transition-transform duration-200 ${dropOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {/* Dropdown */}
          {dropOpen && (
            <div
              className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl overflow-hidden z-50"
              style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.12)' }}
            >
              {/* User info */}
              <div className="px-4 py-3 border-b border-slate-100">
                <p className="text-sm font-semibold text-navy">{user?.name || 'Harsh'}</p>
                <p className="text-xs text-muted truncate">{user?.email || 'harsh@fingo.app'}</p>
              </div>

              {/* Menu items */}
              <div className="p-1.5 flex flex-col gap-0.5">
                <button className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-navy hover:bg-slate-50 transition w-full text-left">
                  <User size={15} className="text-muted" />
                  My Profile
                </button>
                <button
                  onClick={() => { setDropOpen(false); navigate('/personal/settings'); }}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-navy hover:bg-slate-50 transition w-full text-left">
                  <Settings size={15} className="text-muted" />
                  Settings
                </button>
                <div className="h-px bg-slate-100 my-1" />
                <button
                  onClick={() => { setDropOpen(false); signOut(); }}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium
                             text-red-600 hover:bg-red-50 transition w-full text-left"
                >
                  <LogOut size={15} />
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
