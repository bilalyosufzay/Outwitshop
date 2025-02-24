
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift, Target } from "lucide-react";
import { Rules } from "./Rules";

interface LuckyDrawHeaderProps {
  showRules: boolean;
  setShowRules: (show: boolean) => void;
  showMissions: boolean;
  setShowMissions: (show: boolean) => void;
}

export const LuckyDrawHeader = ({
  showRules,
  setShowRules,
  showMissions,
  setShowMissions,
}: LuckyDrawHeaderProps) => {
  return (
    <CardHeader className="flex flex-row items-center justify-between">
      <div className="flex items-center gap-4">
        <CardTitle className="flex items-center gap-2">
          <Gift className="h-5 w-5" />
          Lucky Draw
        </CardTitle>
        <Rules showRules={showRules} setShowRules={setShowRules} />
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowMissions(!showMissions)}
        className="text-yellow-600"
      >
        <Target className="h-4 w-4 mr-2" />
        Missions
      </Button>
    </CardHeader>
  );
};
