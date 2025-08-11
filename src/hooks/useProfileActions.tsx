
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ProfileFormData } from '@/components/profile/ProfileForm';

export const useProfileActions = () => {
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  
  const handleSave = async (formData: ProfileFormData) => {
    setIsSaving(true);
    try {
      localStorage.setItem('mockProfile', JSON.stringify(formData));
      toast.success('Profile updated successfully');
      navigate('/profile');
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleCancel = () => {
    navigate('/profile');
  };

  return {
    isSaving,
    handleSave,
    handleCancel
  };
};
