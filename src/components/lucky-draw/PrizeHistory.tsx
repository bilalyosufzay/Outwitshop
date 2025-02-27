
import { Button } from "@/components/ui/button";
import { Calendar, Check, Clock } from "lucide-react";
import { PrizeHistoryItem } from "./types";

interface PrizeHistoryProps {
  history: PrizeHistoryItem[];
  onClaim: (id: string) => void;
}

export const PrizeHistory = ({ history, onClaim }: PrizeHistoryProps) => {
  return (
    <div className="mt-8 border rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4">Your Prizes</h3>
      {history.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <p>You haven't won any prizes yet.</p>
          <p className="text-sm mt-2">Enter a lucky draw to win!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {history.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg p-3 bg-muted/30"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-md flex items-center justify-center text-white"
                    style={{ backgroundColor: item.prize.color }}
                  >
                    {item.prize.icon}
                  </div>
                  <div>
                    <p className="font-medium">{item.prize.name}</p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{new Date(item.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                
                {item.claimed ? (
                  <div className="flex items-center text-green-600 text-sm">
                    <Check className="h-4 w-4 mr-1" />
                    <span>Claimed</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-end">
                    {item.expiresAt && (
                      <div className="flex items-center text-yellow-600 text-xs mb-1">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>Expires: {new Date(item.expiresAt).toLocaleDateString()}</span>
                      </div>
                    )}
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => onClaim(item.id)}
                    >
                      Claim Prize
                    </Button>
                  </div>
                )}
              </div>
              {item.claimCode && item.claimed && (
                <div className="mt-2 p-2 bg-muted rounded border text-center">
                  <p className="text-xs text-muted-foreground">Claim Code</p>
                  <p className="font-mono font-bold">{item.claimCode}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
