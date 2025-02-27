
import { Button } from "@/components/ui/button";
import { Gift, History, ListPlus, Award } from "lucide-react";
import { Prize } from "./types";

interface DrawActionsProps {
  isSpinning: boolean;
  canSpin: boolean;
  selectedPrize: Prize | null;
  userEntries: number;
  onSpin: () => void;
  onToggleHistory: () => void;
  onViewCampaigns: () => void;
}

export const DrawActions = ({
  isSpinning,
  canSpin,
  selectedPrize,
  userEntries,
  onSpin,
  onToggleHistory,
  onViewCampaigns,
}: DrawActionsProps) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center">
        <div className="text-sm text-muted-foreground mb-2">
          {userEntries > 0 
            ? `You have ${userEntries} entries available` 
            : "You have no entries, complete missions to earn some!"}
        </div>
        
        <Button
          onClick={onSpin}
          disabled={isSpinning || !canSpin || userEntries <= 0}
          className="w-full max-w-xs text-lg font-medium"
        >
          <Gift className="h-5 w-5 mr-2" />
          {isSpinning ? "Drawing..." : "Try Your Luck!"}
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        <Button
          variant="outline"
          onClick={onViewCampaigns}
          className="flex-1 max-w-[160px]"
        >
          <Award className="h-4 w-4 mr-2" />
          View Campaigns
        </Button>
        
        <Button
          variant="outline"
          onClick={onToggleHistory}
          className="flex-1 max-w-[160px]"
        >
          <History className="h-4 w-4 mr-2" />
          Prize History
        </Button>
      </div>
    </div>
  );
};
