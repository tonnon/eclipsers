
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { User, AtSign, MapPin, Link as LinkIcon, PenSquare } from 'lucide-react';

export interface ProfileFormData {
  name: string;
  username: string;
  bio: string | null;
  location: string | null;
  website: string | null;
  avatar_url: string | null;
}

interface ProfileFormProps {
  formData: ProfileFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ formData, onChange }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Info */}
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="flex items-center text-sm font-medium mb-2">
              <User size={16} className="mr-2" /> Name
            </label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={onChange}
              placeholder="Your name"
            />
          </div>
          
          <div>
            <label htmlFor="username" className="flex items-center text-sm font-medium mb-2">
              <AtSign size={16} className="mr-2" /> Username
            </label>
            <Input
              id="username"
              name="username"
              value={formData.username}
              onChange={onChange}
              placeholder="username"
            />
          </div>
        </div>
        
        {/* Additional Info */}
        <div className="space-y-4">
          <div>
            <label htmlFor="location" className="flex items-center text-sm font-medium mb-2">
              <MapPin size={16} className="mr-2" /> Location
            </label>
            <Input
              id="location"
              name="location"
              value={formData.location || ''}
              onChange={onChange}
              placeholder="City, Country"
            />
          </div>
          
          <div>
            <label htmlFor="website" className="flex items-center text-sm font-medium mb-2">
              <LinkIcon size={16} className="mr-2" /> Website
            </label>
            <Input
              id="website"
              name="website"
              value={formData.website || ''}
              onChange={onChange}
              placeholder="yourwebsite.com"
            />
          </div>
        </div>
      </div>
      
      {/* Bio */}
      <div>
        <label htmlFor="bio" className="flex items-center text-sm font-medium mb-2">
          <PenSquare size={16} className="mr-2" /> Bio
        </label>
        <Textarea
          id="bio"
          name="bio"
          value={formData.bio || ''}
          onChange={onChange}
          placeholder="Tell others about yourself"
          rows={4}
        />
      </div>
    </>
  );
};

export default ProfileForm;
