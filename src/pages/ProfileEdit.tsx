
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import ProfileAvatar from '@/components/profile/ProfileAvatar';
import ProfileForm from '@/components/profile/ProfileForm';
import ProfileActionButtons from '@/components/profile/ProfileActionButtons';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useProfileEditor } from '@/hooks/useProfileEditor';

const ProfileEdit: React.FC = () => {
  const {
    formData,
    isLoading,
    isSaving,
    handleChange,
    handleSave,
    handleCancel,
    handleAvatarUpload
  } = useProfileEditor();
  
  if (isLoading) {
    return <LoadingSpinner message="Loading profile..." />;
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="eclipse-card">
        <CardHeader>
          <CardTitle className="text-2xl font-display font-bold">Edit Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-8">
            <ProfileAvatar 
              avatarUrl={formData.avatar_url} 
              name={formData.name} 
              username={formData.username}
              onUpload={handleAvatarUpload}
            />
            
            <ProfileForm 
              formData={formData}
              onChange={handleChange}
            />
            
            <ProfileActionButtons 
              onSave={handleSave}
              onCancel={handleCancel}
              isSaving={isSaving}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileEdit;
