
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import AuthHeader from './AuthHeader';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthForm: React.FC = () => {
  const {
    mode,
    formData,
    isLoading,
    showPassword,
    handleChange,
    handleSubmit,
    toggleMode,
    toggleShowPassword,
  } = useAuth();

  return (
    <div className="w-full max-w-md mx-auto eclipse-card px-8 py-10 eclipse-glow">
      <AuthHeader mode={mode} />
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === 'login' ? (
          <LoginForm
            formData={formData}
            handleChange={handleChange}
            isLoading={isLoading}
            showPassword={showPassword}
            toggleShowPassword={toggleShowPassword}
          />
        ) : (
          <RegisterForm
            formData={formData}
            handleChange={handleChange}
            isLoading={isLoading}
            showPassword={showPassword}
            toggleShowPassword={toggleShowPassword}
          />
        )}
      </form>
      
      <div className="relative  z-[1000px]  mt-6 text-center text-sm">
        <p className="text-eclipse-300">
          {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            onClick={toggleMode}
            className="text-eclipse-400 hover:text-eclipse-300 underline font-medium cursor-pointer"
          >
            {mode === 'login' ? 'Create one' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
