
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

export const useAuth = () => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already signed in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/');
      }
    };

    checkUser();
  }, [navigate]);

  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    // Reset form data when switching modes
    setFormData({
      name: '',
      email: '',
      password: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (mode === 'login') {
        // Handle login
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) {
          throw error;
        }

        toast.success("Successfully logged in!");
        navigate('/');
      } else {
        // Handle registration
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              name: formData.name,
              username: formData.name.toLowerCase().replace(/\s+/g, '_'),
            }
          }
        });

        if (error) {
          throw error;
        }

        toast.success("Account created successfully! Please check your email for verification.");
        setMode('login');
      }
    } catch (error: any) {
      console.error('Authentication error:', error);
      toast.error(error.message || (mode === 'login' 
        ? "Failed to login. Please check your credentials." 
        : "Failed to create account. Please try again.")
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    mode,
    formData,
    isLoading,
    showPassword,
    handleChange,
    handleSubmit,
    toggleMode,
    toggleShowPassword,
  };
};
