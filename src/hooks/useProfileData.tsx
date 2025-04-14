
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
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
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          navigate('/auth');
          return;
        }
        
        // Fetch current user's profile data
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .maybeSingle();
          
        if (error && error.code !== 'PGRST116') { 
          toast.error("Error loading profile");
          console.error("Error fetching profile:", error);
          setIsLoading(false);
          return;
        }
        
        if (!data) {
          // Create a new profile if one doesn't exist
          const newProfile = {
            id: session.user.id,
            name: session.user.user_metadata?.full_name || '',
            username: session.user.email?.split('@')[0] || '',
            bio: null,
            location: null,
            website: null,
            avatar_url: null,
            email: session.user.email,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          };
          
          const { error: insertError } = await supabase
            .from('profiles')
            .insert(newProfile);
            
          if (insertError) {
            toast.error("Error creating profile");
            console.error("Error creating profile:", insertError);
          } else {
            setFormData({
              name: newProfile.name,
              username: newProfile.username,
              bio: newProfile.bio || '',
              location: newProfile.location || '',
              website: newProfile.website || '',
              avatar_url: newProfile.avatar_url || '',
            });
            toast.success("Profile created successfully");
          }
        } else {
          // Use existing profile data
          setFormData({
            name: data.name || '',
            username: data.username || '',
            bio: data.bio || '',
            location: data.location || '',
            website: data.website || '',
            avatar_url: data.avatar_url || '',
          });
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error("Unexpected error:", error);
        toast.error("An unexpected error occurred");
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
