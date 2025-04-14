
import React from 'react';
import AuthForm from '@/components/auth/AuthForm';
import StarryBackground from '@/components/common/StarryBackground';

const Auth: React.FC = () => {
  return (
    <div className="min-h-screen bg-space-gradient flex items-center justify-center p-4 relative">
      <StarryBackground />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-eclipse-glow opacity-50 blur-3xl"></div>
      <AuthForm />
    </div>
  );
};

export default Auth;
