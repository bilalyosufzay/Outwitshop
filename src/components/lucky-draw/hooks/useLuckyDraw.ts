
import { useState, useEffect } from "react";
import { Prize, PrizeHistoryItem } from "../types";

export const useLuckyDraw = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedPrize, setSelectedPrize] = useState<Prize | null>(null);
  const [nextSpinTime, setNextSpinTime] = useState<Date | null>(null);
  const [canSpin, setCanSpin] = useState(true);
  const [streak, setStreak] = useState(0);
  const [lastSpinDate, setLastSpinDate] = useState<string | null>(null);
  const [prizeHistory, setPrizeHistory] = useState<PrizeHistoryItem[]>([]);

  useEffect(() => {
    const lastSpinTime = localStorage.getItem('lastSpinTime');
    const storedStreak = localStorage.getItem('streak');
    const storedLastSpinDate = localStorage.getItem('lastSpinDate');
    const storedPrizeHistory = localStorage.getItem('prizeHistory');

    if (lastSpinTime) {
      const nextTime = new Date(Number(lastSpinTime) + 24 * 60 * 60 * 1000);
      if (nextTime > new Date()) {
        setCanSpin(false);
        setNextSpinTime(nextTime);
      }
    }

    if (storedStreak) setStreak(Number(storedStreak));
    if (storedLastSpinDate) setLastSpinDate(storedLastSpinDate);
    if (storedPrizeHistory) setPrizeHistory(JSON.parse(storedPrizeHistory));
  }, []);

  const updateStreak = () => {
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    
    if (lastSpinDate === yesterday) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      localStorage.setItem('streak', String(newStreak));
    } else if (lastSpinDate !== today) {
      setStreak(1);
      localStorage.setItem('streak', '1');
    }
    
    setLastSpinDate(today);
    localStorage.setItem('lastSpinDate', today);
  };

  return {
    isSpinning,
    setIsSpinning,
    selectedPrize,
    setSelectedPrize,
    nextSpinTime,
    setNextSpinTime,
    canSpin,
    setCanSpin,
    streak,
    prizeHistory,
    setPrizeHistory,
    updateStreak,
  };
};
