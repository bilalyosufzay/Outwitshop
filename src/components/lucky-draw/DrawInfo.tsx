
import { Star, Trophy, AlertCircle } from "lucide-react";

export const DrawInfo = () => {
  return (
    <div className="mt-6 text-sm text-muted-foreground space-y-2">
      <div className="flex items-center justify-center gap-1">
        <Star className="h-4 w-4 text-yellow-500" />
        <span>One free draw available every 24 hours</span>
      </div>
      <div className="flex items-center justify-center gap-1">
        <Trophy className="h-4 w-4 text-yellow-500" />
        <span>Keep your daily streak for bonus rewards!</span>
      </div>
      <div className="flex items-center justify-center gap-1">
        <AlertCircle className="h-4 w-4 text-blue-500" />
        <span>All prizes are automatically added to your account</span>
      </div>
    </div>
  );
};
