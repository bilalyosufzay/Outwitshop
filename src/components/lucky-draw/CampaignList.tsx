
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Award, Calendar, Clock, Gift, Trophy, User } from "lucide-react";
import { DrawCampaign, Prize } from "./types";

interface CampaignListProps {
  campaigns: DrawCampaign[];
  onSelect: (campaign: DrawCampaign) => void;
  activeCampaign: DrawCampaign | null;
}

export const CampaignList = ({ campaigns, onSelect, activeCampaign }: CampaignListProps) => {
  const getTimeLeft = (endDate: Date) => {
    const now = new Date();
    const diff = endDate.getTime() - now.getTime();
    
    if (diff <= 0) return "Ended";
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h left`;
    return `${hours}h left`;
  };
  
  const getTopPrizes = (prizes: Prize[], limit = 3) => {
    // Sort by rarity and return top 3
    const rarityOrder = { 'legendary': 0, 'epic': 1, 'rare': 2, 'common': 3, undefined: 4 };
    
    return [...prizes]
      .sort((a, b) => {
        const aOrder = rarityOrder[a.rarity || 'common'];
        const bOrder = rarityOrder[b.rarity || 'common'];
        return aOrder - bOrder;
      })
      .slice(0, limit);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Active Campaigns</h3>
      </div>
      
      {campaigns.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <Trophy className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p>No active campaigns at the moment.</p>
          <p className="text-sm mt-2">Check back soon for new opportunities!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {campaigns.map((campaign) => (
            <div 
              key={campaign.id} 
              className={`border rounded-lg p-4 transition-all ${
                activeCampaign?.id === campaign.id 
                  ? 'border-2 border-primary shadow-md' 
                  : 'hover:border-primary/50'
              }`}
            >
              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">{campaign.name}</h4>
                    <Badge 
                      variant={campaign.status === 'active' ? 'default' : 'outline'}
                      className="text-xs"
                    >
                      {campaign.status === 'active' ? 'ACTIVE' : 
                        campaign.status === 'upcoming' ? 'UPCOMING' : 'ENDED'}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground gap-4">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{getTimeLeft(campaign.endDate)}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Gift className="h-4 w-4 mr-1" />
                      <span>{campaign.prizes.length} prizes</span>
                    </div>
                    
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      <span>{campaign.totalEntries} entries</span>
                    </div>
                  </div>
                  
                  {campaign.prizes.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {getTopPrizes(campaign.prizes).map((prize) => (
                        <div 
                          key={prize.id} 
                          className="flex items-center gap-1 text-xs py-1 px-2 rounded-full"
                          style={{ 
                            backgroundColor: `${prize.color}20`, 
                            color: prize.color 
                          }}
                        >
                          <Award className="h-3 w-3" />
                          <span>{prize.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Your entries: {campaign.userEntries}</span>
                      <span>Total: {campaign.totalEntries}</span>
                    </div>
                    <Progress 
                      value={(campaign.userEntries / Math.max(campaign.totalEntries, 1)) * 100} 
                      className="h-2" 
                    />
                  </div>
                </div>
                
                <div className="flex items-center sm:items-start">
                  <Button
                    onClick={() => onSelect(campaign)}
                    variant={activeCampaign?.id === campaign.id ? "default" : "outline"}
                  >
                    {activeCampaign?.id === campaign.id ? (
                      <span>Selected</span>
                    ) : (
                      <span>Select</span>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
