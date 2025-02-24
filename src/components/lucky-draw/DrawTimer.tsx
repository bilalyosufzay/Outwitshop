
import { Timer } from "lucide-react";

interface DrawTimerProps {
  timeRemaining: string;
}

export const DrawTimer = ({ timeRemaining }: DrawTimerProps) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-center gap-2 mt-2 text-sm text-yellow-600">
        <Timer className="h-4 w-4" />
        Next draw available in: {timeRemaining}
      </div>
    </div>
  );
};
