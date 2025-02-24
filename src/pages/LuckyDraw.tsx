
import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { PrizeHistory } from "@/components/lucky-draw/PrizeHistory";
import { Missions } from "@/components/lucky-draw/Missions";
import { EventBanner } from "@/components/lucky-draw/EventBanner";
import { PrizeGrid } from "@/components/lucky-draw/PrizeGrid";
import { useLuckyDraw } from "@/components/lucky-draw/hooks/useLuckyDraw";
import { prizes, specialEvent } from "@/components/lucky-draw/constants/prizes";
import { LuckyDrawHeader } from "@/components/lucky-draw/LuckyDrawHeader";
import { DrawActions } from "@/components/lucky-draw/DrawActions";
import { DrawInfo } from "@/components/lucky-draw/DrawInfo";
import { DrawTimer } from "@/components/lucky-draw/DrawTimer";

const LuckyDraw = () => {
  const { toast } = useToast();
  const [showCards, setShowCards] = useState(true);
  const [showRules, setShowRules] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showMissions, setShowMissions] = useState(false);

  const {
    isSpinning,
    setIsSpinning,
    selectedPrize,
    setSelectedPrize,
    nextSpinTime,
    canSpin,
    setCanSpin,
    streak,
    prizeHistory,
    setPrizeHistory,
    updateStreak,
  } = useLuckyDraw();

  const formatTimeRemaining = () => {
    if (!nextSpinTime) return "";
    const now = new Date();
    const diff = nextSpinTime.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const formatEventTimeRemaining = () => {
    const now = new Date();
    const diff = specialEvent.endDate.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return `${days}d ${hours}h`;
  };

  const shareWin = async () => {
    if (selectedPrize) {
      try {
        await navigator.share({
          title: 'Lucky Draw Win! 🎉',
          text: `I just won ${selectedPrize.name} in the Lucky Draw! Come join the fun!`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Sharing failed', err);
      }
    }
  };

  const spinDraw = () => {
    if (!canSpin) return;

    setIsSpinning(true);
    setShowCards(false);

    setTimeout(() => {
      const isSpecialDraw = Math.random() < 0.2;
      const randomPrize = isSpecialDraw 
        ? specialEvent.prizes[Math.floor(Math.random() * specialEvent.prizes.length)]
        : prizes[Math.floor(Math.random() * prizes.length)];

      setSelectedPrize(randomPrize);
      setShowCards(true);

      const newPrize = {
        id: Date.now().toString(),
        prize: randomPrize,
        date: new Date(),
        claimed: false,
      };

      const updatedHistory = [newPrize, ...prizeHistory].slice(0, 10);
      setPrizeHistory(updatedHistory);
      localStorage.setItem('prizeHistory', JSON.stringify(updatedHistory));

      updateStreak();

      toast({
        title: `Congratulations! 🎉 Day ${streak}`,
        description: (
          <div className="space-y-2">
            <p>You won: {randomPrize.name}</p>
            {randomPrize.rarity && (
              <p className="text-sm font-medium text-purple-500">
                {randomPrize.rarity.toUpperCase()} PRIZE!
              </p>
            )}
            {streak > 1 && (
              <p className="text-sm text-muted-foreground">
                🔥 {streak} day streak! Keep it up!
              </p>
            )}
          </div>
        ),
        duration: 5000,
      });

      setIsSpinning(false);
      setCanSpin(false);
      localStorage.setItem('lastSpinTime', Date.now().toString());
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-4 py-8 space-y-4">
        <Card>
          <LuckyDrawHeader
            showRules={showRules}
            setShowRules={setShowRules}
            showMissions={showMissions}
            setShowMissions={setShowMissions}
          />
          <CardContent className="text-center space-y-6">
            <EventBanner
              title={specialEvent.title}
              description={specialEvent.description}
              timeRemaining={formatEventTimeRemaining()}
              onClick={spinDraw}
            />

            {showMissions ? (
              <Missions />
            ) : (
              <>
                <DrawTimer timeRemaining={formatTimeRemaining()} />

                <PrizeGrid
                  prizes={prizes}
                  selectedPrize={selectedPrize}
                  isSpinning={isSpinning}
                />

                <DrawActions
                  isSpinning={isSpinning}
                  canSpin={canSpin}
                  selectedPrize={selectedPrize}
                  onSpin={spinDraw}
                  onShare={shareWin}
                  onToggleHistory={() => setShowHistory(!showHistory)}
                />

                {showHistory && prizeHistory.length > 0 && (
                  <PrizeHistory history={prizeHistory} />
                )}

                <DrawInfo />
              </>
            )}
          </CardContent>
        </Card>
      </div>
      <Navigation />
    </div>
  );
};

export default LuckyDraw;
