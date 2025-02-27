
import { ReactNode } from "react";
import { motion } from "framer-motion";

interface PrizeCardProps {
  id: number;
  name: string;
  color: string;
  icon: ReactNode;
  isSelected?: boolean;
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
  quantity?: number;
  claimed?: number;
  description?: string;
}

export const PrizeCard = ({ 
  name, 
  color, 
  icon, 
  isSelected,
  rarity,
  quantity,
  claimed,
  description
}: PrizeCardProps) => {
  const cardVariants = {
    hover: { 
      scale: 1.05,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      transition: { duration: 0.3 }
    },
    initial: { 
      scale: 1,
      boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      transition: { duration: 0.3 }
    }
  };

  const getRarityGlow = () => {
    if (rarity === 'legendary') return `0 0 15px 5px ${color}`;
    if (rarity === 'epic') return `0 0 10px 2px ${color}`;
    if (rarity === 'rare') return `0 0 5px 1px ${color}`;
    return 'none';
  };

  return (
    <motion.div
      className={`aspect-[3/4] rounded-xl shadow-lg flex flex-col items-center justify-center p-4 relative transition-all duration-300 ${
        isSelected ? 'animate-bounce-once' : ''
      } ${
        rarity === 'legendary' ? 'ring-4 ring-yellow-400 dark:ring-yellow-600' :
        rarity === 'epic' ? 'ring-3 ring-purple-400 dark:ring-purple-600' :
        rarity === 'rare' ? 'ring-2 ring-blue-400 dark:ring-blue-600' : ''
      }`}
      style={{ 
        backgroundColor: color,
        boxShadow: getRarityGlow()
      }}
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
    >
      {(quantity && claimed !== undefined) && (
        <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
          {claimed}/{quantity}
        </div>
      )}
      
      <div className="mb-4">
        {icon}
      </div>
      
      <div className="text-white text-xl font-semibold text-center mt-2">
        {name}
      </div>
      
      {description && (
        <div className="text-white/80 text-xs text-center mt-1 line-clamp-2">
          {description}
        </div>
      )}
      
      {rarity && (
        <div className={`
          mt-2 text-xs font-bold px-2 py-0.5 rounded-full 
          ${rarity === 'legendary' ? 'bg-yellow-400 text-yellow-900' : 
            rarity === 'epic' ? 'bg-purple-400 text-purple-900' :
            rarity === 'rare' ? 'bg-blue-400 text-blue-900' : 'bg-gray-400 text-gray-900'}
        `}>
          {rarity.toUpperCase()}
        </div>
      )}
    </motion.div>
  );
};
