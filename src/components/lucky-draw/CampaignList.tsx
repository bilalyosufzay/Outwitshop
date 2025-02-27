
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Award, Calendar, Clock, Gift, Trophy, User, Filter } from "lucide-react";
import { DrawCampaign, Prize } from "./types";
import { useState } from "react";

interface CampaignListProps {
  campaigns: DrawCampaign[];
  onSelect: (campaign: DrawCampaign) => void;
  activeCampaign: DrawCampaign | null;
}

export const CampaignList = ({ campaigns, onSelect, activeCampaign }: CampaignListProps) => {
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'upcoming'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'ending'>('newest');
  
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

  // Filter campaigns
  const filteredCampaigns = campaigns.filter(campaign => {
    if (filterStatus === 'all') return true;
    return campaign.status === filterStatus;
  });

  // Sort campaigns
  const sortedCampaigns = [...filteredCampaigns].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    } else if (sortBy === 'popular') {
      return b.totalEntries - a.totalEntries;
    } else if (sortBy === 'ending') {
      return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
    }
    return 0;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Active Campaigns</h3>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center gap-1"
          >
            <Filter className="h-3 w-3" />
            <span className="text-xs">Filter</span>
          </Button>
          
          <select 
            className="text-xs px-2 py-1 rounded-md border bg-background"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
          >
            <option value="newest">Newest</option>
            <option value="popular">Most Popular</option>
            <option value="ending">Ending Soon</option>
          </select>
        </div>
      </div>
      
      {sortedCampaigns.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <Trophy className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p>No active campaigns at the moment.</p>
          <p className="text-sm mt-2">Check back soon for new opportunities!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedCampaigns.map((campaign) => (
            <div 
              key={campaign.id} 
              className={`border rounded-xl p-4 transition-all duration-300 ${
                activeCampaign?.id === campaign.id 
                  ? 'border-2 border-primary shadow-md bg-primary/5' 
                  : 'hover:border-primary/50 hover:bg-accent/5'
              }`}
            >
              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <div className="space-y-3">
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
                    className={activeCampaign?.id === campaign.id ? "bg-gradient-to-r from-purple-500 to-pink-500 border-none" : ""}
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
