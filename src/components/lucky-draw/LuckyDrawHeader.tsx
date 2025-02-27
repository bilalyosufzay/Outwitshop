
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift, Target, Info, Award, Calendar } from "lucide-react";
import { Rules } from "./Rules";
import { DrawCampaign } from "./types";

interface LuckyDrawHeaderProps {
  showRules: boolean;
  setShowRules: (show: boolean) => void;
  showMissions: boolean;
  setShowMissions: (show: boolean) => void;
  showCampaigns: boolean;
  setShowCampaigns: (show: boolean) => void;
  activeCampaign: DrawCampaign | null;
}

export const LuckyDrawHeader = ({
  showRules,
  setShowRules,
  showMissions,
  setShowMissions,
  showCampaigns,
  setShowCampaigns,
  activeCampaign
}: LuckyDrawHeaderProps) => {
  return (
    <CardHeader className="flex flex-col space-y-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg p-6">
      <div className="flex items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Gift className="h-6 w-6" />
          Lucky Draw
        </CardTitle>
        
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setShowMissions(!showMissions);
              setShowCampaigns(false);
            }}
            className={`text-white/90 hover:text-white hover:bg-white/10 ${showMissions ? "bg-white/20" : ""}`}
          >
            <Target className="h-4 w-4 mr-2" />
            Missions
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setShowCampaigns(!showCampaigns);
              setShowMissions(false);
            }}
            className={`text-white/90 hover:text-white hover:bg-white/10 ${showCampaigns ? "bg-white/20" : ""}`}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Campaigns
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowRules(!showRules)}
            className="text-white/90 hover:text-white hover:bg-white/10"
          >
            <Info className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {activeCampaign && (
        <div className="flex items-center justify-between text-sm text-white/80">
          <div className="flex items-center">
            <Award className="h-4 w-4 mr-2 text-yellow-300" />
            <span className="font-medium">{activeCampaign.name}</span>
          </div>
          <div>
            Ends: {activeCampaign.endDate.toLocaleDateString()}
          </div>
        </div>
      )}
      
      {showRules && <Rules showRules={showRules} setShowRules={setShowRules} />}
    </CardHeader>
  );
};
