import React from 'react';
import { Outlet } from 'react-router-dom';
import PersonalSidebar from './PersonalSidebar';
import Topbar from './Topbar';

export default function PersonalLayout() {
  return (
    <div className="flex min-h-screen" style={{ background: '#EEF0F4' }}>
      <PersonalSidebar />
      <div className="flex-1 ml-[220px] flex flex-col min-h-screen">
        <Topbar />
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
