
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Users, Gift, PieChart, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ProfileSection } from "./ProfileSection";

export const SocialContent = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Community & Social</h2>
      
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <ProfileSection
          title="Live Q&A Sessions"
          icon={MessageCircle}
          onClick={() => navigate('/qa-sessions')}
        />
        <ProfileSection
          title="Community Polls"
          icon={PieChart}
          onClick={() => navigate('/polls')}
        />
        <ProfileSection
          title="Public Wishlists"
          icon={Gift}
          onClick={() => navigate('/wishlists')}
        />
        <ProfileSection
          title="Following & Followers"
          icon={Users}
          onClick={() => navigate('/connections')}
        />
        <ProfileSection
          title="Share & Earn"
          description="Share products and earn rewards"
          icon={Share2}
          onClick={() => navigate('/share-earn')}
        />
      </div>
    </div>
  );
};
