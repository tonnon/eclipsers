
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ProfileFormData } from '@/components/profile/ProfileForm';

export const useProfileData = () => {
  const [formData, setFormData] = useState<ProfileFormData>({
    name: '',
    username: '',
    bio: '',
    location: '',
    website: '',
    avatar_url: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const stored = localStorage.getItem('mockUser');
        if (!stored) {
          // guest user with empty profile
          setIsLoading(false);
          return;
        }
        const user = JSON.parse(stored);
        // Load profile from localStorage or defaults
        const storedProfile = localStorage.getItem('mockProfile');
        if (storedProfile) {
          const p = JSON.parse(storedProfile);
          setFormData({
            name: p.name || user.name || '',
            username: p.username || user.username || '',
            bio: p.bio || '',
            location: p.location || '',
            website: p.website || '',
            avatar_url: p.avatar_url || '',
          });
        } else {
          setFormData({
            name: user.name || '',
            username: user.username || '',
            bio: '',
            location: '',
            website: '',
            avatar_url: '',
          });
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Unexpected error:', error);
        toast.error('An unexpected error occurred');
        setIsLoading(false);
      }
    };
    
    fetchUserProfile();
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return {
    formData,
    isLoading,
    handleChange,
    setFormData
  };
};
