
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import type { ProfileData } from "@/types/profile";
import { LevelDisplay } from "./LevelDisplay";
import { Star, Award, Crown } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface ProfileHeaderProps {
  profile: ProfileData | null;
  userEmail: string | undefined;
}

const getLevelIcon = (level: string) => {
  switch (level) {
    case "Newbie Shopper":
    case "Starter Seller":
      return Star;
    case "Frequent Buyer":
    case "Growing Seller":
      return Award;
    case "VIP Shopper":
    case "Top Seller":
      return Crown;
    default:
      return Star;
  }
};

export const ProfileHeader = ({ profile, userEmail }: ProfileHeaderProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const BuyerIcon = profile?.buyer_level ? getLevelIcon(profile.buyer_level.current) : Star;
  const SellerIcon = profile?.seller_level ? getLevelIcon(profile.seller_level.current) : Star;

  return (
    <div className="mb-8">
      <div className="flex flex-col items-center">
        <div className="relative">
          <Avatar className="w-32 h-32 mb-4">
            {profile?.avatar_url ? (
              <AvatarImage
                src={profile.avatar_url}
                alt="Profile"
                className="object-cover ring-2 ring-primary/10"
              />
            ) : (
              <AvatarFallback className="bg-accent/10 text-4xl">
                {profile?.username?.[0]?.toUpperCase() || userEmail?.[0]?.toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>
          
          <div className="absolute -right-2 -top-2 flex flex-col gap-2">
            {profile?.buyer_level && (
              <div 
                className={cn(
                  "p-2 rounded-full bg-background shadow-lg hover:scale-110 transition-transform",
                  profile.buyer_level.current === "VIP Shopper" ? "text-purple-500" :
                  profile.buyer_level.current === "Frequent Buyer" ? "text-yellow-500" :
                  "text-blue-500"
                )}
              >
                <BuyerIcon className="h-5 w-5 animate-pulse" />
              </div>
            )}
            {profile?.seller_level && (
              <div 
                className={cn(
                  "p-2 rounded-full bg-background shadow-lg hover:scale-110 transition-transform",
                  profile.seller_level.current === "Top Seller" ? "text-purple-500" :
                  profile.seller_level.current === "Growing Seller" ? "text-yellow-500" :
                  "text-green-500"
                )}
              >
                <SellerIcon className="h-5 w-5 animate-pulse" />
              </div>
            )}
          </div>
        </div>

        <h1 className="text-2xl font-semibold mb-1">
          {profile?.username || 'User'}
        </h1>
        <p className="text-muted-foreground mb-4">{userEmail}</p>
        
        <div className="w-full max-w-md space-y-4 mb-6">
          {profile?.buyer_level && (
            <LevelDisplay
              type="buyer"
              level={profile.buyer_level.current}
              progress={profile.buyer_level.progress}
              nextLevel={profile.buyer_level.next}
            />
          )}
          
          {profile?.seller_level && (
            <LevelDisplay
              type="seller"
              level={profile.seller_level.current}
              progress={profile.seller_level.progress}
              nextLevel={profile.seller_level.next}
            />
          )}
        </div>

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
  );
};
