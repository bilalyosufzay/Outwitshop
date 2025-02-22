
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "react-i18next";
import {
  User,
  Settings,
  ShoppingBag,
  Store,
  CreditCard,
  Award,
  Shield,
  HelpCircle,
  Bell,
  LogOut,
  Heart,
  History,
  MapPin,
  Wallet,
  Star,
  MessageSquare,
  Bot,
  Link
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProfileData {
  username: string | null;
  avatar_url: string | null;
}

const ProfileSection = ({ title, icon: Icon, onClick }: { 
  title: string; 
  icon: React.ComponentType<{ className?: string }>; 
  onClick: () => void;
}) => (
  <Card className="cursor-pointer hover:bg-accent/5" onClick={onClick}>
    <CardContent className="flex items-center gap-3 p-4">
      <Icon className="h-5 w-5 text-muted-foreground" />
      <span className="text-sm font-medium">{title}</span>
    </CardContent>
  </Card>
);

const Profile = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [activeTab, setActiveTab] = useState("buyer");

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
        {/* Profile Header */}
        <div className="mb-8">
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 mb-4">
              {profile?.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover ring-2 ring-primary/10"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-accent/10 flex items-center justify-center ring-2 ring-primary/10">
                  <span className="text-4xl text-accent">
                    {profile?.username?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <h1 className="text-2xl font-semibold mb-1">
              {profile?.username || 'User'}
            </h1>
            <p className="text-muted-foreground mb-2">{user?.email}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/profile/edit')}
              className="mb-4"
            >
              {t('auth.profile.edit_profile')}
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="buyer" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="buyer">Buyer Profile</TabsTrigger>
            <TabsTrigger value="seller">Seller Dashboard</TabsTrigger>
          </TabsList>

          <TabsContent value="buyer" className="space-y-4">
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              <ProfileSection
                title="Orders & Shopping"
                icon={ShoppingBag}
                onClick={() => navigate('/orders')}
              />
              <ProfileSection
                title="Wishlist"
                icon={Heart}
                onClick={() => navigate('/wishlist')}
              />
              <ProfileSection
                title="Recently Viewed"
                icon={History}
                onClick={() => navigate('/recently-viewed')}
              />
              <ProfileSection
                title="Saved Addresses"
                icon={MapPin}
                onClick={() => navigate('/addresses')}
              />
              <ProfileSection
                title="Payment Methods"
                icon={CreditCard}
                onClick={() => navigate('/payment-methods')}
              />
              <ProfileSection
                title="Wallet & Transactions"
                icon={Wallet}
                onClick={() => navigate('/wallet')}
              />
              <ProfileSection
                title="Rewards & Points"
                icon={Award}
                onClick={() => navigate('/rewards')}
              />
              <ProfileSection
                title="Account Settings"
                icon={Settings}
                onClick={() => navigate('/settings')}
              />
              <ProfileSection
                title="Security"
                icon={Shield}
                onClick={() => navigate('/security')}
              />
              <ProfileSection
                title="Help Center"
                icon={HelpCircle}
                onClick={() => navigate('/help')}
              />
            </div>
          </TabsContent>

          <TabsContent value="seller" className="space-y-4">
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              <ProfileSection
                title="Manage Shop"
                icon={Store}
                onClick={() => navigate('/my-shop')}
              />
              <ProfileSection
                title="Customer Reviews"
                icon={Star}
                onClick={() => navigate('/shop/reviews')}
              />
              <ProfileSection
                title="Messages"
                icon={MessageSquare}
                onClick={() => navigate('/shop/messages')}
              />
              <ProfileSection
                title="AI Assistant"
                icon={Bot}
                onClick={() => navigate('/shop/ai-assistant')}
              />
              <ProfileSection
                title="Social Integration"
                icon={Link}
                onClick={() => navigate('/shop/social')}
              />
            </div>
          </TabsContent>
        </Tabs>

        {/* Logout Button */}
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
