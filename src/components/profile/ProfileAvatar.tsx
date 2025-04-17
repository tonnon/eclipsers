
import React, { useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Camera } from 'lucide-react';
import { toast } from 'sonner';

interface ProfileAvatarProps {
  avatarUrl: string | null;
  name: string;
  username: string;
  onUpload: (file: File) => Promise<void>;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  avatarUrl,
  name,
  username,
  onUpload
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }
    
    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image size should not exceed 2MB');
      return;
    }
    
    try {
      await onUpload(file);
    } catch (error) {
      console.error('Error uploading avatar:', error);
      toast.error('Failed to upload avatar');
    } finally {
      // Reset the input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };
  
  return (
    <div className="flex flex-col items-center space-y-4">
      <Avatar className="h-24 w-24 border-4 border-eclipse-700">
        {avatarUrl ? (
          <AvatarImage src={avatarUrl} alt={`${name || username}'s avatar`} />
        ) : (
          <AvatarFallback className="bg-eclipse-600 text-lg">
            {name?.charAt(0) || username?.charAt(0) || '?'}
          </AvatarFallback>
        )}
      </Avatar>
      <Button 
        variant="default" 
        onClick={handleButtonClick}
        className="flex items-center"
      >
        <Camera size={16} className="mr-2" />
        Change Avatar
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
        aria-label="Upload avatar"
      />
    </div>
  );
};

export default ProfileAvatar;
