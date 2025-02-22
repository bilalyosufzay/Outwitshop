
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "react-i18next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { BuyerContent } from "@/components/profile/BuyerContent";
import { SellerContent } from "@/components/profile/SellerContent";
import type { ProfileData } from "@/types/profile";

const Profile = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const [profile, setProfile] = useState<ProfileData | null>(null);

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

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-4 py-8">
        <ProfileHeader profile={profile} userEmail={user?.email} />

        <Tabs defaultValue="buyer" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="buyer">Buyer Profile</TabsTrigger>
            <TabsTrigger value="seller">Seller Dashboard</TabsTrigger>
          </TabsList>

          <TabsContent value="buyer" className="space-y-4">
            <BuyerContent />
          </TabsContent>

          <TabsContent value="seller" className="space-y-4">
            <SellerContent />
          </TabsContent>
        </Tabs>

        <div className="mt-8">
          <Button
            variant="destructive"
            className="w-full"
            onClick={handleSignOut}
          >
            {t('auth.profile.sign_out')}
          </Button>
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default Profile;
