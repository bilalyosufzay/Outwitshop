
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface RulesProps {
  showRules: boolean;
  setShowRules: (show: boolean) => void;
}

export const Rules = ({ showRules, setShowRules }: RulesProps) => {
  return (
    <TooltipProvider>
      <Tooltip open={showRules} onOpenChange={setShowRules}>
        <TooltipTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 relative cursor-pointer"
            onClick={() => setShowRules(!showRules)}
          >
            <BookOpen className="h-4 w-4" />
            <span className="sr-only">View Rules</span>
            <span className="absolute -bottom-1 -right-1 text-[10px] text-muted-foreground">Tap</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent 
          className="w-[400px] p-4"
          onPointerDownOutside={() => setShowRules(false)}
        >
          <div className="space-y-4">
            <h4 className="font-semibold text-base">Lucky Draw Rules</h4>
            
            <div>
              <h5 className="font-medium mb-1">1. Entry Options</h5>
              <ul className="list-disc ml-4 space-y-1 text-sm">
                <li>Daily Spin: Users can participate once per day</li>
                <li>Bonus Entries: Earn extra spins by inviting friends or making purchases</li>
                <li>VIP Entries: Special spins for premium members or high-spending customers</li>
              </ul>
            </div>

            <div>
              <h5 className="font-medium mb-1">2. Prize Categories</h5>
              <ul className="list-disc ml-4 space-y-1 text-sm">
                <li>Discount Coupons: 5%, 10%, 20% off on purchases</li>
                <li>Free Products: Select items from our store</li>
                <li>Cashback Rewards: Win a percentage of your last order back</li>
                <li>Exclusive Deals: Limited-time offers for winners</li>
                <li>Loyalty Points: Points added to your account for future use</li>
              </ul>
            </div>

            <div>
              <h5 className="font-medium mb-1">3. Spin Customization</h5>
              <ul className="list-disc ml-4 space-y-1 text-sm">
                <li>Spin the Wheel: Rotating wheel with different prize sections</li>
                <li>Scratch Cards: Digital scratch cards with hidden prizes</li>
                <li>Mystery Box: Open a box to reveal your reward</li>
              </ul>
            </div>

            <div>
              <h5 className="font-medium mb-1">4. Winner Announcement</h5>
              <ul className="list-disc ml-4 space-y-1 text-sm">
                <li>Instant Win Popup: See what you won immediately</li>
                <li>Leaderboard: View recent winners</li>
                <li>Push Notifications: Get reminded when you can spin again</li>
              </ul>
            </div>

            <div>
              <h5 className="font-medium mb-1">5. Redemption Rules</h5>
              <ul className="list-disc ml-4 space-y-1 text-sm">
                <li>Claim Time Limit: Must claim prizes within the specified period</li>
                <li>Minimum Order Requirement: Some rewards require minimum purchase value</li>
                <li>Non-Transferable: Prizes are bound to winner's account only</li>
              </ul>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
