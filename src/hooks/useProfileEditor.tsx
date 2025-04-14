
import { useProfileData } from './useProfileData';
import { useProfileActions } from './useProfileActions';
import { useAvatarUpload } from './useAvatarUpload';

export const useProfileEditor = () => {
  const { formData, isLoading, handleChange, setFormData } = useProfileData();
  const { isSaving, handleSave, handleCancel } = useProfileActions();
  const { isUploading, handleAvatarUpload } = useAvatarUpload(setFormData);

  return {
    formData,
    isLoading,
    isSaving: isSaving || isUploading,
    handleChange,
    handleSave: () => handleSave(formData),
    handleCancel,
    handleAvatarUpload
  };
};
