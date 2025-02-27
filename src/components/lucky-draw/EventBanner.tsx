
import { Gift, Star, Calendar, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DrawCampaign } from "./types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface EventBannerProps {
  campaign: DrawCampaign;
  userEntries: number;
  timeRemaining: string;
  onEnter: (campaignId: string) => void;
}

export const EventBanner = ({ campaign, userEntries, timeRemaining, onEnter }: EventBannerProps) => {
  const getEntryMethodsText = (methods: ('purchase' | 'engagement' | 'direct' | 'vip')[]) => {
    const labels = {
      purchase: 'Purchase',
      engagement: 'Engagement',
      direct: 'Direct Entry',
      vip: 'VIP Bonus'
    };
    
    return methods.map(m => labels[m]).join(', ');
  };
  
  return (
    <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 mb-6">
      <div className="absolute top-0 right-0 -mt-4 -mr-4 opacity-10">
        <Star className="h-32 w-32" />
      </div>
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-2 max-w-md">
          <h3 className="text-xl font-bold flex items-center gap-2">
            {campaign.name}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="hover:text-white/80">
                    <Info className="h-4 w-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>Entry Methods: {getEntryMethodsText(campaign.entryMethods)}</p>
                  <p className="mt-1">Total entries: {campaign.totalEntries}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </h3>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-sm">
              <Calendar className="h-4 w-4" />
              <span>Ends in: {timeRemaining}</span>
            </div>
            
            <div className="flex items-center gap-1 text-sm">
              <Gift className="h-4 w-4" />
              <span>{campaign.prizes.length} prizes</span>
            </div>
          </div>
          
          <div className="bg-white/20 rounded-lg px-3 py-2 text-sm">
            <p className="font-medium">Your entries: {userEntries}</p>
          </div>
        </div>
        
        <Button 
          className="bg-white text-purple-600 hover:bg-white/90 whitespace-nowrap"
          onClick={() => onEnter(campaign.id)}
        >
          <Gift className="h-4 w-4 mr-2" />
          Enter Draw
        </Button>
      </div>
    </div>
  );
};
