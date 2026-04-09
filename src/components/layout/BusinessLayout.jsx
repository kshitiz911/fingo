import React from 'react';
import { Outlet } from 'react-router-dom';
import BusinessSidebar from './BusinessSidebar';
import Topbar from './Topbar';

export default function BusinessLayout() {
  return (
    <div className="flex min-h-screen" style={{ background: '#EEF0F4' }}>
      <BusinessSidebar />
      <div className="flex-1 ml-[220px] flex flex-col min-h-screen">
        <Topbar />
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
