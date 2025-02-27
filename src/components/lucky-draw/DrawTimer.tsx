
import { Clock, Hourglass } from "lucide-react";

interface DrawTimerProps {
  timeRemaining?: string;
  nextDrawTime?: Date;
}

export const DrawTimer = ({ timeRemaining, nextDrawTime }: DrawTimerProps) => {
  if (!timeRemaining || !nextDrawTime) return null;

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-4 mb-4 flex items-center justify-center space-x-4 shadow-sm border border-blue-100 dark:border-blue-800/30">
      <div className="flex items-center text-muted-foreground">
        <Clock className="h-5 w-5 mr-2 text-blue-500" />
        <span className="text-sm">Next spin available in:</span>
      </div>
      
      <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 flex items-center">
        <Hourglass className="h-5 w-5 mr-2 text-purple-500" />
        {timeRemaining}
      </div>
    </div>
  );
};
