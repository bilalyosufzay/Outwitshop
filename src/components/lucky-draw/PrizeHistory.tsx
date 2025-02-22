
import { Prize } from "./types";

interface PrizeHistoryProps {
  history: Array<{
    id: string;
    prize: Prize;
    date: Date;
    claimed: boolean;
  }>;
}

export const PrizeHistory = ({ history }: PrizeHistoryProps) => {
  return (
    <div className="mt-8 border rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4">Recent Prizes</h3>
      <div className="space-y-2">
        {history.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-2 bg-muted rounded"
          >
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded flex items-center justify-center"
                style={{ backgroundColor: item.prize.color }}
              >
                {item.prize.icon}
              </div>
              <span>{item.prize.name}</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {new Date(item.date).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
