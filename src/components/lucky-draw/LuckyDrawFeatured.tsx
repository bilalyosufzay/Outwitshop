
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Star, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DrawCampaign } from "./types";
import { Progress } from "@/components/ui/progress";

interface LuckyDrawFeaturedProps {
  campaigns: DrawCampaign[];
  onSelect: (campaign: DrawCampaign) => void;
}

export const LuckyDrawFeatured = ({ campaigns, onSelect }: LuckyDrawFeaturedProps) => {
  if (campaigns.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-xl font-bold">
        <Trophy className="h-6 w-6 text-yellow-500" />
        <h2>Featured Giveaways</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {campaigns.slice(0, 4).map((campaign) => (
          <Card 
            key={campaign.id}
            className="overflow-hidden border-0 transition-all duration-300 hover:shadow-lg dark:bg-slate-800/80 backdrop-blur-sm hover:scale-[1.02] group"
          >
            <CardContent className="p-0">
              <div className="relative h-48 bg-gradient-to-r from-indigo-500 to-purple-600 overflow-hidden">
                <div className="absolute top-2 right-2 bg-yellow-500 text-yellow-900 font-bold px-3 py-1 rounded-full text-xs flex items-center gap-1 shadow-lg z-10">
                  <Star className="h-3 w-3" />
                  <span>Featured</span>
                </div>
                
                {campaign.prizes[0]?.image ? (
                  <div className="h-full w-full flex items-center justify-center p-4">
                    <img 
                      src={campaign.prizes[0].image} 
                      alt={campaign.prizes[0].name}
                      className="max-h-full object-contain transition-transform duration-500 group-hover:scale-110" 
                    />
                  </div>
                ) : (
                  <div className="h-full w-full flex items-center justify-center">
                    <Gift className="h-24 w-24 text-white opacity-50" />
                  </div>
                )}
              </div>

              <div className="p-4 space-y-3">
                <h3 className="text-lg font-bold truncate">{campaign.name}</h3>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Top Prize:</span>
                  <span className="font-medium text-yellow-600 dark:text-yellow-400">
                    {campaign.prizes.find(p => p.rarity === 'legendary')?.name || campaign.prizes[0]?.name}
                  </span>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Your entries: {campaign.userEntries}</span>
                    <span>Total: {campaign.totalEntries}</span>
                  </div>
                  <Progress 
                    value={(campaign.userEntries / Math.max(campaign.totalEntries, 1)) * 100} 
                    className="h-2 bg-slate-200 dark:bg-slate-700"
                  />
                </div>

                <Button 
                  className="w-full mt-3" 
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
  );
};
