
import React from 'react';
import { Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FormField from './FormField';
import { Checkbox } from '@/components/ui/checkbox';

interface LoginFormProps {
  formData: {
    email: string;
    password: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
  showPassword: boolean;
  toggleShowPassword: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  formData,
  handleChange,
  isLoading,
  showPassword,
  toggleShowPassword
}) => {
  return (
    <>
      <FormField
        id="email"
        name="email"
        label="Email"
        type="email"
        placeholder="your.email@example.com"
        value={formData.email}
        onChange={handleChange}
        required
        Icon={Mail}
      />
      
      <FormField
        id="password"
        name="password"
        label="Password"
        type={showPassword ? 'text' : 'password'}
        placeholder="Your password"
        value={formData.password}
        onChange={handleChange}
        required
        Icon={Lock}
        showPassword={showPassword}
        togglePassword={toggleShowPassword}
      />
      
      <div className="relative  z-[1000px]  flex items-center space-x-2 my-2">
        <Checkbox id="remember" />
        <label
          htmlFor="remember"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-eclipse-300"
        >
          Remember me
        </label>
      </div>
      
      <Button
        type="submit"
        className="w-full relative z-[1000px] bg-eclipse-400 hover:bg-eclipse-500 text-white cursor-pointer"
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Signing in...
          </span>
        ) : (
          <>Sign in</>
        )}
      </Button>
    </>
  );
};

export default LoginForm;
