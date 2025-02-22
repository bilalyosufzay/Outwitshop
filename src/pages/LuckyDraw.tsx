
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift, Timer, Star, AlertCircle, Percent, Package, Truck, BadgeDollarSign, Trophy, History, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PrizeCard } from "@/components/lucky-draw/PrizeCard";
import { PrizeHistory } from "@/components/lucky-draw/PrizeHistory";
import { Rules } from "@/components/lucky-draw/Rules";
import { Prize, PrizeHistoryItem } from "@/components/lucky-draw/types";

const prizes: Prize[] = [
  { 
    id: 1, 
    name: "5% Discount", 
    color: "#FF6B6B",
    icon: <Percent className="h-24 w-24 text-white" />
  },
  { 
    id: 2, 
    name: "10% Discount", 
    color: "#4ECDC4",
    icon: <Percent className="h-24 w-24 text-white" />
  },
  { 
    id: 3, 
    name: "Free Shipping", 
    color: "#45B7D1",
    icon: <Truck className="h-24 w-24 text-white" />
  },
  { 
    id: 4, 
    name: "20% Discount", 
    color: "#96CEB4",
    icon: <Percent className="h-24 w-24 text-white" />
  },
  { 
    id: 5, 
    name: "100 Points", 
    color: "#FFEEAD",
    icon: <BadgeDollarSign className="h-24 w-24 text-white" />
  },
  { 
    id: 6, 
    name: "Mystery Box", 
    color: "#D4A5A5",
    icon: <Package className="h-24 w-24 text-white" />
  },
  { 
    id: 7, 
    name: "15% Discount", 
    color: "#9EC1CF",
    icon: <Percent className="h-24 w-24 text-white" />
  },
  { 
    id: 8, 
    name: "50 Points", 
    color: "#FFD93D",
    icon: <BadgeDollarSign className="h-24 w-24 text-white" />
  },
];

const LuckyDraw = () => {
  const { toast } = useToast();
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedPrize, setSelectedPrize] = useState<Prize | null>(null);
  const [nextSpinTime, setNextSpinTime] = useState<Date | null>(null);
  const [canSpin, setCanSpin] = useState(true);
  const [showCards, setShowCards] = useState(true);
  const [showRules, setShowRules] = useState(false);
  const [streak, setStreak] = useState(0);
  const [lastSpinDate, setLastSpinDate] = useState<string | null>(null);
  const [prizeHistory, setPrizeHistory] = useState<PrizeHistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);

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

  const spinDraw = () => {
    if (!canSpin) return;

    setIsSpinning(true);
    setShowCards(false);

    setTimeout(() => {
      const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
      setSelectedPrize(randomPrize);
      setShowCards(true);

      const newPrize: PrizeHistoryItem = {
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
      setNextSpinTime(new Date(Date.now() + 24 * 60 * 60 * 1000));
    }, 2000);
  };

  const formatTimeRemaining = () => {
    if (!nextSpinTime) return "";
    const now = new Date();
    const diff = nextSpinTime.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
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
          </CardHeader>
          <CardContent className="text-center">
            <div className="mb-6">
              <div className="flex items-center justify-center gap-4 mb-4">
                <p className="text-muted-foreground">Draw a card and win amazing prizes!</p>
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-medium">Streak: {streak} days</span>
                </div>
              </div>
              {!canSpin && nextSpinTime && (
                <div className="flex items-center justify-center gap-2 mt-2 text-sm text-yellow-600">
                  <Timer className="h-4 w-4" />
                  Next draw available in: {formatTimeRemaining()}
                </div>
              )}
            </div>

            <div className="relative min-h-[300px] mb-8">
              {showCards ? (
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
                  <div className="animate-spin text-primary">
                    <Gift className="h-12 w-12" />
                  </div>
                </div>
              )}
            </div>

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
          </CardContent>
        </Card>
      </div>
      <Navigation />
    </div>
  );
};

export default LuckyDraw;
