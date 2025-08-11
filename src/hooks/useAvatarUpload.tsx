
import { useState } from 'react';
import { toast } from 'sonner';
import { ProfileFormData } from '@/components/profile/ProfileForm';

export const useAvatarUpload = (setFormData: React.Dispatch<React.SetStateAction<ProfileFormData>>) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleAvatarUpload = async (file: File) => {
    try {
      setIsUploading(true);
      toast.info('Uploading avatar...');
      const objectUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, avatar_url: objectUrl }));
      const existing = JSON.parse(localStorage.getItem('mockProfile') || '{}');
      localStorage.setItem('mockProfile', JSON.stringify({
        ...existing,
        avatar_url: objectUrl,
      }));
      toast.success('Avatar updated successfully');
    } catch (error) {
      console.error('Error uploading avatar:', error);
      toast.error('Failed to upload avatar');
    } finally {
      setIsUploading(false);
    }
  };

  return {
    isUploading,
    handleAvatarUpload
  };
};
