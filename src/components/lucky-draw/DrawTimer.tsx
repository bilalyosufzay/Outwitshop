
import { Calendar, Timer } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface DrawTimerProps {
  timeRemaining: string;
  nextDrawTime?: Date;
}

export const DrawTimer = ({ timeRemaining, nextDrawTime }: DrawTimerProps) => {
  const calculateProgress = () => {
    if (!nextDrawTime) return 0;
    
    const now = new Date();
    const lastTime = new Date(now.getTime() - (24 * 60 * 60 * 1000)); // 24 hours ago
    const total = nextDrawTime.getTime() - lastTime.getTime();
    const elapsed = now.getTime() - lastTime.getTime();
    
    return Math.min(100, Math.max(0, (elapsed / total) * 100));
  };
  
  return (
    <div className="mb-6">
      <div className="flex items-center justify-center gap-2 mb-2 text-sm text-yellow-600">
        <Timer className="h-4 w-4" />
        <span>Next draw available in: {timeRemaining}</span>
      </div>
      
      {nextDrawTime && (
        <div className="w-full max-w-xs mx-auto">
          <Progress value={calculateProgress()} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>Last Draw</span>
            <span>Next Draw</span>
          </div>
        </div>
      )}
    </div>
  );
};
