
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import StarryBackground from '@/components/common/StarryBackground';
import { supabase } from '@/integrations/supabase/client';
import { Session } from '@supabase/supabase-js';

const AppLayout: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check current session
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
      
      if (!session) {
        navigate('/auth');
      }
    };
    
    checkSession();

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      
      if (!session) {
        navigate('/auth');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-space-gradient flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-eclipse-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-space-gradient text-white relative overflow-hidden">
      <StarryBackground />
      <Navbar key={session?.user.id} />
      <main className="pt-20 pb-10 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
