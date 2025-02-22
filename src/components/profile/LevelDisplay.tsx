
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  ShoppingBag,
  Star,
  Crown,
  Diamond,
  Store,
  TrendingUp,
  Trophy,
  Gem,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface LevelDisplayProps {
  type: "buyer" | "seller";
  level: string;
  progress: number;
  nextLevel?: string;
}

const LEVEL_ICONS = {
  "Newbie Shopper": ShoppingBag,
  "Frequent Buyer": Star,
  "VIP Shopper": Crown,
  "Elite Member": Diamond,
  "Starter Seller": Store,
  "Growing Seller": TrendingUp,
  "Top Seller": Trophy,
  "Platinum Seller": Gem,
} as const;

const LEVEL_COLORS = {
  "Newbie Shopper": "text-blue-500",
  "Frequent Buyer": "text-yellow-500",
  "VIP Shopper": "text-purple-500",
  "Elite Member": "text-pink-500",
  "Starter Seller": "text-green-500",
  "Growing Seller": "text-blue-500",
  "Top Seller": "text-yellow-500",
  "Platinum Seller": "text-purple-500",
} as const;

export const LevelDisplay = ({ type, level, progress, nextLevel }: LevelDisplayProps) => {
  const IconComponent = LEVEL_ICONS[level as keyof typeof LEVEL_ICONS] || ShoppingBag;
  const color = LEVEL_COLORS[level as keyof typeof LEVEL_COLORS];

  return (
    <Card className="bg-accent/5 border-none">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={cn("p-2 rounded-full bg-background", color)}>
              <IconComponent className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold">{level}</h3>
              <p className="text-sm text-muted-foreground">
                {type === "buyer" ? "Buyer Level" : "Seller Level"}
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="capitalize">
            {type}
          </Badge>
        </div>

        {nextLevel && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progress to {nextLevel}</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
