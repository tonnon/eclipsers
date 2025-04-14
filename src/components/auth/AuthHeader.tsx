
import React from 'react';
import Logo from '../common/Logo';

interface AuthHeaderProps {
  mode: 'login' | 'register';
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ mode }) => {
  return (
    <>
      <div className="flex flex-col items-center mb-8">
        <Logo className="h-16 w-16 mb-4" />
        <h1 className="text-3xl font-display font-bold bg-gradient-to-r from-white to-eclipse-200 bg-clip-text text-transparent">
          Eclipsers
        </h1>
        <p className="text-eclipse-300 mt-2">Share your celestial moments</p>
      </div>
      
      <h2 className="text-2xl font-display font-semibold mb-6 text-center">
        {mode === 'login' ? 'Sign In' : 'Create Account'}
      </h2>
    </>
  );
};

export default AuthHeader;
