
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, Target, Trophy, Gift } from "lucide-react";

interface Mission {
  id: string;
  title: string;
  description: string;
  progress: number;
  total: number;
  reward: string;
  type: 'daily' | 'weekly';
  completed: boolean;
}

const missions: Mission[] = [
  {
    id: '1',
    title: 'Daily Login',
    description: 'Log in to the app',
    progress: 1,
    total: 1,
    reward: 'Extra Draw',
    type: 'daily',
    completed: true
  },
  {
    id: '2',
    title: 'Share Wins',
    description: 'Share your wins with friends',
    progress: 0,
    total: 3,
    reward: '50 Points',
    type: 'daily',
    completed: false
  },
  {
    id: '3',
    title: 'Weekly Streak',
    description: 'Maintain a 5-day streak',
    progress: 3,
    total: 5,
    reward: 'Premium Draw',
    type: 'weekly',
    completed: false
  }
];

export const Missions = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Target className="h-5 w-5" />
          Daily Missions
        </h3>
        <div className="space-y-4">
          {missions.filter(m => m.type === 'daily').map((mission) => (
            <div
              key={mission.id}
              className="bg-muted rounded-lg p-4 relative overflow-hidden"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-medium">{mission.title}</h4>
                  <p className="text-sm text-muted-foreground">{mission.description}</p>
                </div>
                <Badge variant={mission.completed ? "default" : "outline"}>
                  {mission.reward}
                </Badge>
              </div>
              <div className="space-y-2">
                <Progress value={(mission.progress / mission.total) * 100} />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{mission.progress}/{mission.total}</span>
                  {mission.completed ? (
                    <span className="text-green-500">Completed!</span>
                  ) : (
                    <span>In Progress</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Trophy className="h-5 w-5" />
          Weekly Missions
        </h3>
        <div className="space-y-4">
          {missions.filter(m => m.type === 'weekly').map((mission) => (
            <div
              key={mission.id}
              className="bg-muted rounded-lg p-4 relative overflow-hidden"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-medium">{mission.title}</h4>
                  <p className="text-sm text-muted-foreground">{mission.description}</p>
                </div>
                <Badge variant={mission.completed ? "default" : "outline"}>
                  {mission.reward}
                </Badge>
              </div>
              <div className="space-y-2">
                <Progress value={(mission.progress / mission.total) * 100} />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{mission.progress}/{mission.total}</span>
                  {mission.completed ? (
                    <span className="text-green-500">Completed!</span>
                  ) : (
                    <span>In Progress</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
