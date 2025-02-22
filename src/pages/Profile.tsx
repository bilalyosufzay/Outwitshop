
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "react-i18next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { BuyerContent } from "@/components/profile/BuyerContent";
import { SellerContent } from "@/components/profile/SellerContent";
import { SocialContent } from "@/components/profile/SocialContent";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Settings2, Bell, Shield, LogOut } from "lucide-react";
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
          .select('*')
          .eq('id', user?.id)
          .single();

        if (error) throw error;
        
        // Transform the data to match ProfileData interface
        const transformedData: ProfileData = {
          username: data.username,
          avatar_url: data.avatar_url,
          bio: data.bio,
          social_links: data.social_links as Record<string, string> || {},
          wishlist_public: data.wishlist_public || false,
          followers_count: data.followers_count || 0,
          following_count: data.following_count || 0
        };

        setProfile(transformedData);
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
      <div className="container mx-auto px-4 py-8 space-y-6">
        <ProfileHeader profile={profile} userEmail={user?.email} />

        <Card className="border-none shadow-none bg-accent/5 p-4">
          <CardContent className="p-0 flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="font-semibold">Account Status</h3>
              <p className="text-sm text-muted-foreground">Your account is in good standing</p>
            </div>
            <Badge variant="default" className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
              Active
            </Badge>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="outline" className="flex items-center gap-2 h-auto py-4" onClick={() => navigate('/settings')}>
            <Settings2 className="h-5 w-5" />
            <div className="text-left">
              <div className="font-medium">Settings</div>
              <div className="text-sm text-muted-foreground">Manage your preferences</div>
            </div>
          </Button>
          
          <Button variant="outline" className="flex items-center gap-2 h-auto py-4" onClick={() => navigate('/notifications')}>
            <Bell className="h-5 w-5" />
            <div className="text-left">
              <div className="font-medium">Notifications</div>
              <div className="text-sm text-muted-foreground">Configure alerts</div>
            </div>
          </Button>

          <Button variant="outline" className="flex items-center gap-2 h-auto py-4" onClick={() => navigate('/security')}>
            <Shield className="h-5 w-5" />
            <div className="text-left">
              <div className="font-medium">Security</div>
              <div className="text-sm text-muted-foreground">Protect your account</div>
            </div>
          </Button>
        </div>

        <Separator className="my-6" />

        <SocialContent />

        <Separator className="my-6" />

        <Tabs defaultValue="buyer" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="buyer">Buyer Profile</TabsTrigger>
            <TabsTrigger value="seller">Seller Dashboard</TabsTrigger>
          </TabsList>

          <TabsContent value="buyer" className="space-y-6 mt-6">
            <BuyerContent />
          </TabsContent>

          <TabsContent value="seller" className="space-y-6 mt-6">
            <SellerContent />
          </TabsContent>
        </Tabs>

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
