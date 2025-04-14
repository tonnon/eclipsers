
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ProfileFormData } from '@/components/profile/ProfileForm';

export const useProfileActions = () => {
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  
  const handleSave = async (formData: ProfileFormData) => {
    setIsSaving(true);
    
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      toast.error("You must be logged in to save profile changes");
      setIsSaving(false);
      return;
    }
    
    const { error } = await supabase
      .from('profiles')
      .update({
        name: formData.name,
        username: formData.username,
        bio: formData.bio,
        location: formData.location,
        website: formData.website,
        updated_at: new Date().toISOString(),
      })
      .eq('id', session.user.id);
    
    if (error) {
      toast.error("Failed to update profile");
      console.error("Error updating profile:", error);
    } else {
      toast.success("Profile updated successfully");
      navigate('/profile');
    }
    
    setIsSaving(false);
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
