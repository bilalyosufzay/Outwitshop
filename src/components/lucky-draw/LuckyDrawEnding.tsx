
import { Card, CardContent } from "@/components/ui/card";
import { Clock, AlarmClock, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DrawCampaign } from "./types";

interface LuckyDrawEndingProps {
  campaigns: DrawCampaign[];
  onSelect: (campaign: DrawCampaign) => void;
}

export const LuckyDrawEnding = ({ campaigns, onSelect }: LuckyDrawEndingProps) => {
  if (campaigns.length === 0) return null;

  const getTimeLeft = (endDate: Date) => {
    const now = new Date();
    const diff = endDate.getTime() - now.getTime();
    
    if (diff <= 0) return "Ended";
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h left`;
    if (hours > 0) return `${hours}h ${minutes}m left`;
    return `${minutes}m left`;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-xl font-bold">
        <AlarmClock className="h-6 w-6 text-red-500" />
        <h2>Ending Soon</h2>
      </div>

      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4" style={{ minWidth: 'max-content' }}>
          {campaigns.map((campaign) => (
            <Card 
              key={campaign.id}
              className="w-72 overflow-hidden border-0 transition-all duration-300 hover:shadow-lg dark:bg-slate-800/80 backdrop-blur-sm hover:scale-[1.02]"
            >
              <CardContent className="p-0">
                <div className="relative h-32 bg-gradient-to-r from-red-500 to-orange-600 overflow-hidden">
                  <div className="absolute top-2 right-2 bg-red-100 text-red-700 font-bold px-3 py-1 rounded-full text-xs flex items-center gap-1 shadow-lg animate-pulse">
                    <Clock className="h-3 w-3" />
                    <span>{getTimeLeft(campaign.endDate)}</span>
                  </div>
                  
                  {campaign.prizes[0]?.image ? (
                    <div className="h-full w-full flex items-center justify-center p-4">
                      <img 
                        src={campaign.prizes[0].image} 
                        alt={campaign.prizes[0].name}
                        className="max-h-full object-contain" 
                      />
                    </div>
                  ) : (
                    <div className="h-full w-full flex items-center justify-center">
                      <Gift className="h-16 w-16 text-white opacity-50" />
                    </div>
                  )}
                </div>

                <div className="p-4 space-y-2">
                  <h3 className="font-bold truncate">{campaign.name}</h3>
                  
                  <div className="text-xs text-muted-foreground truncate">
                    {campaign.prizes.length} prizes available
                  </div>

                  <Button 
                    className="w-full mt-2" 
                    variant="outline"
                    onClick={() => onSelect(campaign)}
                  >
                    Enter Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
