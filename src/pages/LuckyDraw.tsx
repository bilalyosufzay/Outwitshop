
import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift, Timer, Star, AlertCircle, Trophy, History, Share2, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PrizeHistory } from "@/components/lucky-draw/PrizeHistory";
import { Rules } from "@/components/lucky-draw/Rules";
import { Missions } from "@/components/lucky-draw/Missions";
import { EventBanner } from "@/components/lucky-draw/EventBanner";
import { PrizeGrid } from "@/components/lucky-draw/PrizeGrid";
import { useLuckyDraw } from "@/components/lucky-draw/hooks/useLuckyDraw";
import { prizes, specialEvent } from "@/components/lucky-draw/constants/prizes";

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
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-4">
              <CardTitle className="flex items-center gap-2">
                <Gift className="h-5 w-5" />
                Lucky Draw
              </CardTitle>
              <Rules showRules={showRules} setShowRules={setShowRules} />
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowMissions(!showMissions)}
              className="text-yellow-600"
            >
              <Target className="h-4 w-4 mr-2" />
              Missions
            </Button>
          </CardHeader>
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
                <div className="mb-6">
                  <div className="flex items-center justify-center gap-2 mt-2 text-sm text-yellow-600">
                    <Timer className="h-4 w-4" />
                    Next draw available in: {formatTimeRemaining()}
                  </div>
                </div>

                <PrizeGrid
                  prizes={prizes}
                  selectedPrize={selectedPrize}
                  isSpinning={isSpinning}
                />

                <div className="space-y-4">
                  <Button
                    onClick={spinDraw}
                    disabled={isSpinning || !canSpin}
                    className="w-full max-w-xs text-lg font-medium"
                  >
                    <Gift className="h-5 w-5 mr-2" />
                    {isSpinning ? "Drawing..." : "Draw a Card!"}
                  </Button>

                  {selectedPrize && (
                    <Button
                      variant="outline"
                      onClick={shareWin}
                      className="w-full max-w-xs"
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Share Your Win
                    </Button>
                  )}

                  <Button
                    variant="ghost"
                    onClick={() => setShowHistory(!showHistory)}
                    className="w-full max-w-xs"
                  >
                    <History className="h-4 w-4 mr-2" />
                    Prize History
                  </Button>
                </div>

                {showHistory && prizeHistory.length > 0 && (
                  <PrizeHistory history={prizeHistory} />
                )}

                <div className="mt-6 text-sm text-muted-foreground space-y-2">
                  <div className="flex items-center justify-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>One free draw available every 24 hours</span>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <Trophy className="h-4 w-4 text-yellow-500" />
                    <span>Keep your daily streak for bonus rewards!</span>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <AlertCircle className="h-4 w-4 text-blue-500" />
                    <span>All prizes are automatically added to your account</span>
                  </div>
                </div>
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
