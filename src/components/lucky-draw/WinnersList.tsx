
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Trophy, Award, Calendar } from "lucide-react";
import { PrizeHistoryItem } from "./types";

interface WinnersListProps {
  history: PrizeHistoryItem[];
  onBack: () => void;
}

export const WinnersList = ({ history, onBack }: WinnersListProps) => {
  // Sort winners by date (newest first)
  const sortedWinners = [...history].sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          className="flex items-center gap-2"
          onClick={onBack}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          Past Winners
        </h2>
      </div>

      {sortedWinners.length === 0 ? (
        <div className="text-center py-12">
          <Award className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No Winners Yet</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Be the first to win! Enter our lucky draws to see your name on the winners list.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sortedWinners.map((winner) => (
            <Card key={winner.id} className="overflow-hidden border-0 transition-all duration-300 hover:shadow-md dark:bg-slate-800/80">
              <CardContent className="p-0">
                <div className="flex">
                  <div 
                    className="w-1/3 p-4 flex items-center justify-center"
                    style={{ backgroundColor: winner.prize.color + '33' }} // Add transparency
                  >
                    {winner.prize.image ? (
                      <img 
                        src={winner.prize.image} 
                        alt={winner.prize.name}
                        className="max-h-24 object-contain" 
                      />
                    ) : (
                      <Award 
                        style={{ color: winner.prize.color }} 
                        className="h-16 w-16"
                      />
                    )}
                  </div>
                  <div className="w-2/3 p-4 space-y-2">
                    <h3 className="font-bold text-lg">{winner.prize.name}</h3>
                    
                    {winner.prize.rarity && (
                      <div className={`
                        inline-block px-2 py-1 rounded-full text-xs font-semibold
                        ${winner.prize.rarity === 'legendary' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' : 
                          winner.prize.rarity === 'epic' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' :
                          winner.prize.rarity === 'rare' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' : 
                          'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'}
                      `}>
                        {winner.prize.rarity.toUpperCase()}
                      </div>
                    )}
                    
                    <div className="flex items-center text-sm text-muted-foreground gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>Won on {new Date(winner.date).toLocaleDateString()}</span>
                    </div>
                    
                    {winner.claimed ? (
                      <div className="text-sm text-green-600 dark:text-green-400">
                        ✓ Claimed
                      </div>
                    ) : (
                      winner.expiresAt && (
                        <div className="text-sm text-orange-600 dark:text-orange-400">
                          Expires on {new Date(winner.expiresAt).toLocaleDateString()}
                        </div>
                      )
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
