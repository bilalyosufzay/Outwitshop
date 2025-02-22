
import { LucideIcon } from "lucide-react";

interface PrizeCardProps {
  id: number;
  name: string;
  color: string;
  icon: React.ReactNode;
  isSelected?: boolean;
}

export const PrizeCard = ({ name, color, icon, isSelected }: PrizeCardProps) => {
  return (
    <div
      className={`aspect-[3/4] rounded-xl shadow-lg flex flex-col items-center justify-center p-4 transition-all duration-300 hover:scale-105 ${
        isSelected ? 'animate-bounce-once' : ''
      }`}
      style={{ backgroundColor: color }}
    >
      <div className="mb-4">
        {icon}
      </div>
      <div className="text-white text-xl font-semibold text-center mt-2">
        {name}
      </div>
    </div>
  );
};
