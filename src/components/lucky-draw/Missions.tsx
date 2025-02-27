
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, ChevronRight, Star, Package, Share2, Users, ShoppingCart } from "lucide-react";
import { Mission } from "./types";

interface MissionsProps {
  missions: Mission[];
  onComplete: (id: string) => void;
  userEntries: number;
}

export const Missions = ({ missions, onComplete, userEntries }: MissionsProps) => {
  const getMissionIcon = (type: string) => {
    switch(type) {
      case 'daily': return <Star className="h-5 w-5 text-yellow-500" />;
      case 'review': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'share': return <Share2 className="h-5 w-5 text-blue-500" />;
      case 'referral': return <Users className="h-5 w-5 text-purple-500" />;
      case 'purchase': return <ShoppingCart className="h-5 w-5 text-red-500" />;
      default: return <Package className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg p-4 text-white shadow-md">
        <div className="text-sm opacity-80">Total Entries</div>
        <div className="text-3xl font-bold">{userEntries}</div>
        <div className="mt-2 text-xs opacity-70">Complete missions to earn more entries</div>
      </div>
      
      <h3 className="text-lg font-semibold">Available Missions</h3>
      
      <div className="space-y-3">
        {missions.map((mission) => (
          <div key={mission.id} className="border rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="mt-0.5">{getMissionIcon(mission.type)}</div>
                <div>
                  <h4 className="font-medium">{mission.title}</h4>
                  <p className="text-sm text-muted-foreground">{mission.description}</p>
                  
                  {mission.progress !== undefined && mission.total !== undefined && (
                    <div className="mt-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span>{mission.progress} / {mission.total}</span>
                        <span>{Math.round((mission.progress / mission.total) * 100)}%</span>
                      </div>
                      <Progress value={(mission.progress / mission.total) * 100} className="h-2" />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                  +{mission.reward} entries
                </div>
                
                {mission.completed ? (
                  <Button size="sm" variant="outline" disabled>
                    Completed
                  </Button>
                ) : (
                  <Button 
                    size="sm" 
                    onClick={() => onComplete(mission.id)}
                  >
                    <span>Complete</span>
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
