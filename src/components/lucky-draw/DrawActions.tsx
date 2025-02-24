
import { Button } from "@/components/ui/button";
import { Gift, Share2, History } from "lucide-react";
import { Prize } from "./types";

interface DrawActionsProps {
  isSpinning: boolean;
  canSpin: boolean;
  selectedPrize: Prize | null;
  onSpin: () => void;
  onShare: () => void;
  onToggleHistory: () => void;
}

export const DrawActions = ({
  isSpinning,
  canSpin,
  selectedPrize,
  onSpin,
  onShare,
  onToggleHistory,
}: DrawActionsProps) => {
  return (
    <div className="space-y-4">
      <Button
        onClick={onSpin}
        disabled={isSpinning || !canSpin}
        className="w-full max-w-xs text-lg font-medium"
      >
        <Gift className="h-5 w-5 mr-2" />
        {isSpinning ? "Drawing..." : "Draw a Card!"}
      </Button>

      {selectedPrize && (
        <Button
          variant="outline"
          onClick={onShare}
          className="w-full max-w-xs"
        >
          <Share2 className="h-4 w-4 mr-2" />
          Share Your Win
        </Button>
      )}

      <Button
        variant="ghost"
        onClick={onToggleHistory}
        className="w-full max-w-xs"
      >
        <History className="h-4 w-4 mr-2" />
        Prize History
      </Button>
    </div>
  );
};
