
import { Gift } from "lucide-react";
import { Prize } from "./types";
import { PrizeCard } from "./PrizeCard";
import { motion } from "framer-motion";

interface PrizeGridProps {
  prizes: Prize[];
  selectedPrize: Prize | null;
  isSpinning: boolean;
}

export const PrizeGrid = ({ prizes, selectedPrize, isSpinning }: PrizeGridProps) => {
  return (
    <div className="relative min-h-[300px] mb-8">
      {!isSpinning ? (
        <div
          className={`grid grid-cols-2 sm:grid-cols-4 gap-4 transition-all duration-500 ${
            isSpinning ? 'opacity-0 scale-90 rotate-180' : 'opacity-100 scale-100 rotate-0'
          }`}
        >
          {(selectedPrize ? [selectedPrize] : prizes.slice(0, 8)).map((prize) => (
            <PrizeCard
              key={prize.id}
              {...prize}
              isSelected={selectedPrize !== null}
            />
          ))}
        </div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1]
            }} 
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-primary"
          >
            <Gift className="h-16 w-16" />
          </motion.div>
        </div>
      )}
    </div>
  );
};
