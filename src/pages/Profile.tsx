
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const [profile, setProfile] = useState<{
    username: string | null;
    avatar_url: string | null;
  } | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('username, avatar_url')
          .eq('id', user?.id)
          .single();

        if (error) throw error;
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/auth/login');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Failed to sign out');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-32 w-32 bg-gray-200 rounded-full mx-auto" />
            <div className="h-6 w-48 bg-gray-200 rounded mx-auto" />
          </div>
        </div>
        <Navigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow p-6">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-4">
              {profile?.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-accent/10 flex items-center justify-center">
                  <span className="text-4xl text-accent">
                    {profile?.username?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              {profile?.username || 'User'}
            </h1>
            <p className="text-gray-600 mb-6">{user?.email}</p>
            <div className="space-y-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate('/profile/edit')}
              >
                {t('auth.profile.edit_profile')}
              </Button>
              <Button
                variant="destructive"
                className="w-full"
                onClick={handleSignOut}
              >
                {t('auth.profile.sign_out')}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default Profile;
