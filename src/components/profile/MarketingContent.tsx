
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { ProfileSection } from "./ProfileSection";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Share2,
  Users,
  Trophy,
  Megaphone,
  Copy,
  Twitter,
  Instagram,
  Facebook,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { ReferralCode } from "@/types/marketing";

export const MarketingContent = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [referralCode, setReferralCode] = useState<string>("");

  const generateReferralCode = async () => {
    if (!user) return;

    try {
      const code = `${user.id.substring(0, 6)}${Math.random().toString(36).substring(2, 7)}`.toUpperCase();
      
      const { error } = await supabase
        .from('referral_codes')
        .insert({
          user_id: user.id,
          code: code,
          type: 'buyer' as const,
          referrals_count: 0,
          rewards_earned: 0,
        });

      if (error) throw error;

      setReferralCode(code);
      toast.success('Referral code generated successfully!');
    } catch (error: any) {
      toast.error('Error generating referral code: ' + error.message);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const shareToSocial = (platform: 'twitter' | 'facebook' | 'instagram') => {
    const message = encodeURIComponent(`Join me on our marketplace! Use my referral code: ${referralCode}`);
    const url = encodeURIComponent(window.location.origin);

    let shareUrl = '';
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${message}&url=${url}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${message}`;
        break;
      case 'instagram':
        // Instagram doesn't support direct sharing, so we'll copy the message
        copyToClipboard(`${decodeURIComponent(message)} ${decodeURIComponent(url)}`);
        toast.success('Message copied! Share it on Instagram');
        return;
    }

    window.open(shareUrl, '_blank');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Marketing & Growth</h2>
      
      <Card>
        <CardContent className="p-6 space-y-4">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Referral Program
          </h3>
          
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <Label>Your Referral Code</Label>
              <div className="mt-2 flex gap-2">
                <Input
                  value={referralCode}
                  readOnly
                  placeholder="Generate your referral code"
                />
                {!referralCode ? (
                  <Button onClick={generateReferralCode}>
                    Generate
                  </Button>
                ) : (
                  <Button size="icon" variant="outline" onClick={() => copyToClipboard(referralCode)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            {referralCode && (
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() => shareToSocial('twitter')}
                >
                  <Twitter className="h-4 w-4" />
                  Share on Twitter
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() => shareToSocial('facebook')}
                >
                  <Facebook className="h-4 w-4" />
                  Share on Facebook
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() => shareToSocial('instagram')}
                >
                  <Instagram className="h-4 w-4" />
                  Share on Instagram
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <ProfileSection
          title="Referral Dashboard"
          description="Track your referrals and rewards"
          icon={Trophy}
          onClick={() => navigate('/referrals')}
        />
        <ProfileSection
          title="Affiliate Program"
          description="Earn commission by promoting products"
          icon={Users}
          onClick={() => navigate('/affiliate')}
        />
        <ProfileSection
          title="Influencer Portal"
          description="Exclusive access and special perks"
          icon={Megaphone}
          onClick={() => navigate('/influencer')}
        />
        <ProfileSection
          title="Social Integration"
          description="Connect and share on social media"
          icon={Share2}
          onClick={() => navigate('/social-integration')}
        />
      </div>
    </div>
  );
};
