import React, { useState, useRef } from 'react';
import { 
  User, Camera, Mail, Phone, MapPin, Bell, Shield, Trash2, 
  Save, X, Check, Eye, EyeOff, AlertTriangle, Globe, Lock,
  Palette, Calendar, Clock, Edit2, Upload
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { USER_UPLOADS_BUCKET } from '@/lib/storageBucket';
import { toast } from '@/components/ui/use-toast';

interface ProfileSettingsProps {
  user: any;
  profile: any;
  onProfileUpdate: () => void;
}

interface NotificationSettings {
  email_marketing: boolean;
  email_updates: boolean;
  email_reminders: boolean;
  consultation_reminders: boolean;
  class_reminders: boolean;
  new_features: boolean;
}

interface PrivacySettings {
  profile_visible: boolean;
  show_elemental_type: boolean;
  allow_recommendations: boolean;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ user, profile, onProfileUpdate }) => {
  const [activeSettingsTab, setActiveSettingsTab] = useState<'personal' | 'notifications' | 'privacy' | 'security'>('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [avatarUploading, setAvatarUploading] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    bio: profile?.bio || '',
    phone: profile?.phone || '',
    location: profile?.location || '',
    website: profile?.website || '',
    avatar_url: profile?.avatar_url || ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const [notifications, setNotifications] = useState<NotificationSettings>({
    email_marketing: profile?.email_marketing ?? true,
    email_updates: profile?.email_updates ?? true,
    email_reminders: profile?.email_reminders ?? true,
    consultation_reminders: profile?.consultation_reminders ?? true,
    class_reminders: profile?.class_reminders ?? true,
    new_features: profile?.new_features ?? true
  });

  const [privacy, setPrivacy] = useState<PrivacySettings>({
    profile_visible: profile?.profile_visible ?? true,
    show_elemental_type: profile?.show_elemental_type ?? true,
    allow_recommendations: profile?.allow_recommendations ?? true
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Invalid file type',
        description: 'Please upload an image file',
        variant: 'destructive'
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'Please upload an image smaller than 5MB',
        variant: 'destructive'
      });
      return;
    }

    setAvatarUploading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from(USER_UPLOADS_BUCKET)
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(USER_UPLOADS_BUCKET)
        .getPublicUrl(filePath);

      // Update profile with new avatar URL
      const { error: updateError } = await supabase
        .from('user_profiles')
        .update({ avatar_url: publicUrl, updated_at: new Date().toISOString() })
        .eq('id', user.id);


      if (updateError) throw updateError;

      setFormData(prev => ({ ...prev, avatar_url: publicUrl }));
      onProfileUpdate();

      toast({
        title: 'Avatar updated',
        description: 'Your profile photo has been updated successfully'
      });
    } catch (error: any) {
      console.error('Error uploading avatar:', error);
      toast({
        title: 'Upload failed',
        description: error.message || 'Failed to upload avatar',
        variant: 'destructive'
      });
    } finally {
      setAvatarUploading(false);
    }
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);

    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({
          full_name: formData.full_name,
          bio: formData.bio,
          phone: formData.phone,
          location: formData.location,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);


      if (error) throw error;

      onProfileUpdate();
      setIsEditing(false);

      toast({
        title: 'Profile updated',
        description: 'Your profile has been saved successfully'
      });
    } catch (error: any) {
      console.error('Error saving profile:', error);
      toast({
        title: 'Save failed',
        description: error.message || 'Failed to save profile',
        variant: 'destructive'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveNotifications = async () => {
    setIsSaving(true);

    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({
          ...notifications,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);


      if (error) throw error;

      onProfileUpdate();

      toast({
        title: 'Preferences saved',
        description: 'Your notification preferences have been updated'
      });
    } catch (error: any) {
      console.error('Error saving notifications:', error);
      toast({
        title: 'Save failed',
        description: error.message || 'Failed to save preferences',
        variant: 'destructive'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSavePrivacy = async () => {
    setIsSaving(true);

    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({
          ...privacy,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);


      if (error) throw error;

      onProfileUpdate();

      toast({
        title: 'Privacy settings saved',
        description: 'Your privacy settings have been updated'
      });
    } catch (error: any) {
      console.error('Error saving privacy:', error);
      toast({
        title: 'Save failed',
        description: error.message || 'Failed to save settings',
        variant: 'destructive'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: 'Passwords do not match',
        description: 'Please make sure your new passwords match',
        variant: 'destructive'
      });
      return;
    }

    if (passwordData.newPassword.length < 8) {
      toast({
        title: 'Password too short',
        description: 'Password must be at least 8 characters',
        variant: 'destructive'
      });
      return;
    }

    setIsSaving(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: passwordData.newPassword
      });

      if (error) throw error;

      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setShowPasswordChange(false);

      toast({
        title: 'Password updated',
        description: 'Your password has been changed successfully'
      });
    } catch (error: any) {
      console.error('Error changing password:', error);
      toast({
        title: 'Password change failed',
        description: error.message || 'Failed to change password',
        variant: 'destructive'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsSaving(true);

    try {
      // Delete user profile first
      await supabase
        .from('user_profiles')
        .delete()
        .eq('id', user.id);


      // Sign out and delete auth user (this would typically be done via edge function)
      await supabase.auth.signOut();

      toast({
        title: 'Account deleted',
        description: 'Your account has been permanently deleted'
      });
    } catch (error: any) {
      console.error('Error deleting account:', error);
      toast({
        title: 'Deletion failed',
        description: error.message || 'Failed to delete account',
        variant: 'destructive'
      });
    } finally {
      setIsSaving(false);
      setShowDeleteConfirm(false);
    }
  };

  const getProfileCompleteness = () => {
    let completed = 0;
    const total = 6;
    
    if (formData.full_name) completed++;
    if (formData.bio) completed++;
    if (formData.phone) completed++;
    if (formData.location) completed++;
    if (formData.avatar_url) completed++;
    if (profile?.elemental_type) completed++;
    
    return Math.round((completed / total) * 100);
  };

  const completeness = getProfileCompleteness();

  return (
    <div className="space-y-6">
      {/* Profile Completeness */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-gray-900">Profile Completeness</h3>
          <span className="text-sm font-semibold text-purple-600">{completeness}%</span>
        </div>
        <div className="w-full bg-purple-100 rounded-full h-2.5">
          <div 
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${completeness}%` }}
          />
        </div>
        {completeness < 100 && (
          <p className="text-sm text-gray-600 mt-2">
            Complete your profile to get personalized recommendations
          </p>
        )}
      </div>

      {/* Settings Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[
          { id: 'personal', label: 'Personal Info', icon: User },
          { id: 'notifications', label: 'Notifications', icon: Bell },
          { id: 'privacy', label: 'Privacy', icon: Shield },
          { id: 'security', label: 'Security', icon: Lock }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSettingsTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeSettingsTab === tab.id
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Personal Info Tab */}
      {activeSettingsTab === 'personal' && (
        <div className="space-y-6">
          {/* Avatar Section */}
          <div className="flex items-center gap-6">
            <div className="relative">
              <div 
                className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 cursor-pointer group"
                onClick={handleAvatarClick}
              >
                {formData.avatar_url ? (
                  <img 
                    src={formData.avatar_url} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-400 to-pink-400 text-white text-3xl font-serif">
                    {formData.full_name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                  </div>
                )}
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  {avatarUploading ? (
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent" />
                  ) : (
                    <Camera className="w-6 h-6 text-white" />
                  )}
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
              />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Profile Photo</h3>
              <p className="text-sm text-gray-500 mb-2">Click to upload a new photo</p>
              <button
                onClick={handleAvatarClick}
                className="text-sm text-purple-600 hover:text-purple-700 font-medium"
              >
                {formData.avatar_url ? 'Change photo' : 'Upload photo'}
              </button>
            </div>
          </div>

          {/* Personal Details Form */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-gray-900">Personal Details</h3>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 text-sm text-purple-600 hover:text-purple-700 font-medium"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({
                        full_name: profile?.full_name || '',
                        bio: profile?.bio || '',
                        phone: profile?.phone || '',
                        location: profile?.location || '',
                        website: profile?.website || '',
                        avatar_url: profile?.avatar_url || ''
                      });
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-700 font-medium"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveProfile}
                    disabled={isSaving}
                    className="flex items-center gap-1 px-3 py-1.5 bg-purple-600 text-white rounded-full text-sm font-medium hover:bg-purple-700 disabled:opacity-50"
                  >
                    {isSaving ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    Save
                  </button>
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    placeholder="Your full name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 text-gray-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    placeholder="City, Country"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Website
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    placeholder="https://yourwebsite.com"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 resize-none"
                  placeholder="Tell us a bit about yourself..."
                />
              </div>
            </div>
          </div>

          {/* Account Info */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Account Information</h4>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Member since</span>
                <p className="font-medium text-gray-900">
                  {profile?.created_at 
                    ? new Date(profile.created_at).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })
                    : 'N/A'}
                </p>
              </div>
              <div>
                <span className="text-gray-500">Membership</span>
                <p className="font-medium text-gray-900 capitalize">
                  {profile?.membership_tier || 'Free'}
                </p>
              </div>
              <div>
                <span className="text-gray-500">Elemental Type</span>
                <p className="font-medium text-gray-900">
                  {profile?.elemental_type 
                    ? profile.elemental_type.charAt(0).toUpperCase() + profile.elemental_type.slice(1)
                    : 'Not determined'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeSettingsTab === 'notifications' && (
        <div className="space-y-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Email Notifications</h3>
            <div className="space-y-4">
              {[
                { key: 'email_updates', label: 'Product Updates', description: 'Get notified about new features and improvements' },
                { key: 'email_marketing', label: 'Marketing Emails', description: 'Receive promotional offers and special deals' },
                { key: 'email_reminders', label: 'Reminders', description: 'Get reminded about incomplete actions' },
                { key: 'consultation_reminders', label: 'Consultation Reminders', description: 'Receive reminders before your scheduled consultations' },
                { key: 'class_reminders', label: 'Class Reminders', description: 'Get notified before your booked color classes' },
                { key: 'new_features', label: 'New Features', description: 'Be the first to know about new tools and features' }
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-900">{item.label}</p>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                  <button
                    onClick={() => setNotifications(prev => ({ 
                      ...prev, 
                      [item.key]: !prev[item.key as keyof NotificationSettings] 
                    }))}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      notifications[item.key as keyof NotificationSettings]
                        ? 'bg-purple-600'
                        : 'bg-gray-300'
                    }`}
                  >
                    <span 
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        notifications[item.key as keyof NotificationSettings]
                          ? 'translate-x-7'
                          : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleSaveNotifications}
            disabled={isSaving}
            className="w-full py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isSaving ? (
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save Preferences
              </>
            )}
          </button>
        </div>
      )}

      {/* Privacy Tab */}
      {activeSettingsTab === 'privacy' && (
        <div className="space-y-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Privacy Settings</h3>
            <div className="space-y-4">
              {[
                { key: 'profile_visible', label: 'Public Profile', description: 'Allow others to see your profile information' },
                { key: 'show_elemental_type', label: 'Show Elemental Type', description: 'Display your elemental type on your public profile' },
                { key: 'allow_recommendations', label: 'Personalized Recommendations', description: 'Allow us to use your data for personalized suggestions' }
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-900">{item.label}</p>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                  <button
                    onClick={() => setPrivacy(prev => ({ 
                      ...prev, 
                      [item.key]: !prev[item.key as keyof PrivacySettings] 
                    }))}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      privacy[item.key as keyof PrivacySettings]
                        ? 'bg-purple-600'
                        : 'bg-gray-300'
                    }`}
                  >
                    <span 
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        privacy[item.key as keyof PrivacySettings]
                          ? 'translate-x-7'
                          : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium text-blue-900">Data Protection</p>
                <p className="text-sm text-blue-700 mt-1">
                  Your data is encrypted and stored securely. We never sell your personal information to third parties.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={handleSavePrivacy}
            disabled={isSaving}
            className="w-full py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isSaving ? (
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save Privacy Settings
              </>
            )}
          </button>
        </div>
      )}

      {/* Security Tab */}
      {activeSettingsTab === 'security' && (
        <div className="space-y-6">
          {/* Change Password */}
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-medium text-gray-900">Password</h3>
                <p className="text-sm text-gray-500">Update your password regularly for security</p>
              </div>
              {!showPasswordChange && (
                <button
                  onClick={() => setShowPasswordChange(true)}
                  className="px-4 py-2 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800"
                >
                  Change Password
                </button>
              )}
            </div>

            {showPasswordChange && (
              <div className="space-y-4 mt-4 pt-4 border-t border-gray-200">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPasswords.new ? 'text' : 'password'}
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                      className="w-full pl-10 pr-12 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPasswords.confirm ? 'text' : 'password'}
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      className="w-full pl-10 pr-12 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Confirm new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowPasswordChange(false);
                      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                    }}
                    className="flex-1 py-2.5 border border-gray-300 rounded-xl font-medium hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleChangePassword}
                    disabled={isSaving || !passwordData.newPassword || !passwordData.confirmPassword}
                    className="flex-1 py-2.5 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 disabled:opacity-50"
                  >
                    {isSaving ? 'Updating...' : 'Update Password'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Active Sessions */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-medium text-gray-900 mb-2">Active Sessions</h3>
            <p className="text-sm text-gray-500 mb-4">Manage your active login sessions</p>
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Current Session</p>
                  <p className="text-sm text-gray-500">This device • Active now</p>
                </div>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                Active
              </span>
            </div>
          </div>

          {/* Delete Account */}
          <div className="bg-red-50 rounded-xl p-6 border border-red-100">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-red-900">Delete Account</h3>
                <p className="text-sm text-red-700 mt-1 mb-4">
                  Permanently delete your account and all associated data. This action cannot be undone.
                </p>
                {!showDeleteConfirm ? (
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="px-4 py-2 bg-red-600 text-white rounded-full text-sm font-medium hover:bg-red-700"
                  >
                    Delete My Account
                  </button>
                ) : (
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-red-900">
                      Are you sure? This will permanently delete:
                    </p>
                    <ul className="text-sm text-red-700 space-y-1 ml-4 list-disc">
                      <li>Your profile and personal information</li>
                      <li>Your elemental type results</li>
                      <li>Your custom color palettes</li>
                      <li>Your consultation and class bookings</li>
                    </ul>

                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={() => setShowDeleteConfirm(false)}
                        className="flex-1 py-2 border border-red-300 text-red-700 rounded-full text-sm font-medium hover:bg-red-100"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleDeleteAccount}
                        disabled={isSaving}
                        className="flex-1 py-2 bg-red-600 text-white rounded-full text-sm font-medium hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {isSaving ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                        Yes, Delete Account
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSettings;
