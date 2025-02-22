
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import type { ProfileData } from "@/types/profile";
import { LevelDisplay } from "./LevelDisplay";

interface ProfileHeaderProps {
  profile: ProfileData | null;
  userEmail: string | undefined;
}

export const ProfileHeader = ({ profile, userEmail }: ProfileHeaderProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
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
                {profile?.username?.[0]?.toUpperCase() || userEmail?.[0]?.toUpperCase()}
              </span>
            </div>
          )}
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
