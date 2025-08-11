
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import StarryBackground from '@/components/common/StarryBackground';

const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-space-gradient text-white relative overflow-hidden">
      <StarryBackground />
      <Navbar />
      <main className="pt-20 pb-10 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
