
import { useNavigate } from "react-router-dom";
import { ProfileSection } from "./ProfileSection";
import { Store, Star, MessageSquare, Bot, Link } from "lucide-react";

export const SellerContent = () => {
  const navigate = useNavigate();

  return (
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
  );
};
