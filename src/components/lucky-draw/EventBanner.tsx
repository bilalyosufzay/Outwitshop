
import { Gift, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EventBannerProps {
  title: string;
  description: string;
  timeRemaining: string;
  onClick: () => void;
}

export const EventBanner = ({ title, description, timeRemaining, onClick }: EventBannerProps) => {
  return (
    <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 mb-6">
      <div className="absolute top-0 right-0 -mt-4 -mr-4">
        <Star className="h-24 w-24 opacity-10" />
      </div>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-sm opacity-90">{description}</p>
          <p className="text-xs opacity-75">Time remaining: {timeRemaining}</p>
        </div>
        <Button 
          variant="secondary" 
          className="bg-white text-purple-600 hover:bg-white/90"
          onClick={onClick}
        >
          <Gift className="h-4 w-4 mr-2" />
          Draw Now
        </Button>
      </div>
    </div>
  );
};
