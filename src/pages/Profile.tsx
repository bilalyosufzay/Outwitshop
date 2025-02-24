
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "react-i18next";
import { Separator } from "@/components/ui/separator";
import { LogOut } from "lucide-react";
import type { ProfileData } from "@/types/profile";
import { useUserLevels } from "@/hooks/useUserLevels";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { AccountStatus } from "@/components/profile/AccountStatus";
import { QuickActions } from "@/components/profile/QuickActions";
import { SocialContent } from "@/components/profile/SocialContent";
import { ProfileTabs } from "@/components/profile/ProfileTabs";

const Profile = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const { data: levels } = useUserLevels(user?.id);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();

        if (error) {
          console.error('Error fetching profile:', error);
          toast.error('Failed to load profile');
          return;
        }
        
        if (data) {
          const socialLinks: Record<string, string> = 
            typeof data.social_links === 'object' && data.social_links !== null
              ? Object.entries(data.social_links).reduce((acc, [key, value]) => ({
                  ...acc,
                  [key]: String(value)
                }), {})
              : {};

          const transformedData: ProfileData = {
            username: data.username,
            avatar_url: data.avatar_url,
            bio: data.bio,
            social_links: socialLinks,
            wishlist_public: data.wishlist_public || false,
            followers_count: data.followers_count || 0,
            following_count: data.following_count || 0,
            buyer_level: levels?.buyer || undefined,
            seller_level: levels?.seller || undefined,
          };
          setProfile(transformedData);
        } else {
          console.log('No profile found for user:', user.id);
        }
      } catch (error) {
        console.error('Error in fetchProfile:', error);
        toast.error('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, levels]);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/auth/login');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Failed to sign out');
    }
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-32 w-32 bg-accent/10 rounded-full mx-auto" />
            <div className="h-6 w-48 bg-accent/10 rounded mx-auto" />
          </div>
        </div>
        <Navigation />
      </div>
    );
  }

  if (!user) {
    navigate('/auth/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-4 py-8 space-y-6">
        <ProfileHeader profile={profile} userEmail={user?.email} />
        <AccountStatus />
        <QuickActions onNavigate={handleNavigation} />
        <Separator className="my-6" />
        <SocialContent />
        <Separator className="my-6" />
        <ProfileTabs />
        <Button
          variant="destructive"
          className="w-full flex items-center justify-center gap-2"
          onClick={handleSignOut}
        >
          <LogOut className="h-5 w-5" />
          {t('auth.profile.sign_out')}
        </Button>
      </div>
      <Navigation />
    </div>
  );
};

export default Profile;
