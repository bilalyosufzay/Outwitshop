
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
    <CardHeader className="flex flex-col space-y-2">
      <div className="flex items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Gift className="h-5 w-5" />
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
            className={showMissions ? "text-yellow-600" : ""}
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
            className={showCampaigns ? "text-purple-600" : ""}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Campaigns
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowRules(!showRules)}
          >
            <Info className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {activeCampaign && (
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-muted-foreground">
            <Award className="h-4 w-4 mr-2 text-yellow-500" />
            <span className="font-medium">{activeCampaign.name}</span>
          </div>
          <div className="text-muted-foreground">
            Ends: {activeCampaign.endDate.toLocaleDateString()}
          </div>
        </div>
      )}
      
      {showRules && <Rules showRules={showRules} setShowRules={setShowRules} />}
    </CardHeader>
  );
};
