
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ProfileFormData } from '@/components/profile/ProfileForm';

export const useAvatarUpload = (setFormData: React.Dispatch<React.SetStateAction<ProfileFormData>>) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleAvatarUpload = async (file: File) => {
    try {
      setIsUploading(true);
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error("You must be logged in to upload an avatar");
        setIsUploading(false);
        return;
      }
      
      const userId = session.user.id;
      const fileExt = file.name.split('.').pop();
      const filePath = `${userId}/${Date.now()}.${fileExt}`;
      
      // Show upload progress to the user
      toast.info("Uploading avatar...");
      
      // Upload the file to the 'avatars' bucket
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });
        
      if (uploadError) {
        throw uploadError;
      }
      
      // Get the public URL for the uploaded file
      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);
        
      const avatarUrl = data.publicUrl;
      
      // Update the profile with the new avatar URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ 
          avatar_url: avatarUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId);
        
      if (updateError) {
        throw updateError;
      }
      
      // Update the local state with the new avatar URL
      setFormData(prev => ({ ...prev, avatar_url: avatarUrl }));
      
      toast.success("Avatar updated successfully");
      
      // Trigger auth state change to refresh navbar avatar
      const { error } = await supabase.auth.refreshSession();
      if (error) {
        console.error("Error refreshing session:", error);
      }
      
    } catch (error) {
      console.error('Error uploading avatar:', error);
      toast.error("Failed to upload avatar");
    } finally {
      setIsUploading(false);
    }
  };

  return {
    isUploading,
    handleAvatarUpload
  };
};
