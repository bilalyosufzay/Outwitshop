import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift, Timer, Star, AlertCircle, Percent, Package, Truck, BadgeDollarSign, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const prizes = [
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
  const [selectedPrize, setSelectedPrize] = useState<typeof prizes[0] | null>(null);
  const [nextSpinTime, setNextSpinTime] = useState<Date | null>(null);
  const [canSpin, setCanSpin] = useState(true);
  const [showCards, setShowCards] = useState(true);
  const [showRules, setShowRules] = useState(false);

  useEffect(() => {
    const lastSpinTime = localStorage.getItem('lastSpinTime');
    if (lastSpinTime) {
      const nextTime = new Date(Number(lastSpinTime) + 24 * 60 * 60 * 1000); // 24 hours
      if (nextTime > new Date()) {
        setCanSpin(false);
        setNextSpinTime(nextTime);
      }
    }
  }, []);

  useEffect(() => {
    if (nextSpinTime && !canSpin) {
      const timer = setInterval(() => {
        const now = new Date();
        if (nextSpinTime <= now) {
          setCanSpin(true);
          setNextSpinTime(null);
          clearInterval(timer);
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [nextSpinTime, canSpin]);

  const resetDraw = () => {
    localStorage.removeItem('lastSpinTime');
    setCanSpin(true);
    setNextSpinTime(null);
    setSelectedPrize(null);
    setShowCards(true);
    setIsSpinning(false);
    toast({
      title: "Reset Complete",
      description: "You can now try the lucky draw again!",
      duration: 3000,
    });
  };

  const spinDraw = () => {
    if (!canSpin) return;

    setIsSpinning(true);
    setShowCards(false);

    // Simulate card shuffling animation
    setTimeout(() => {
      const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
      setSelectedPrize(randomPrize);
      setShowCards(true);

      toast({
        title: "Congratulations! 🎉",
        description: `You won: ${randomPrize.name}`,
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

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-4">
              <CardTitle className="flex items-center gap-2">
                <Gift className="h-5 w-5" />
                Lucky Draw
              </CardTitle>
              <TooltipProvider>
                <Tooltip open={showRules} onOpenChange={setShowRules}>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 relative cursor-pointer"
                      onClick={() => setShowRules(!showRules)}
                    >
                      <BookOpen className="h-4 w-4" />
                      <span className="sr-only">View Rules</span>
                      <span className="absolute -bottom-1 -right-1 text-[10px] text-muted-foreground">Tap</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent 
                    className="w-[400px] p-4"
                    onPointerDownOutside={() => setShowRules(false)}
                  >
                    <div className="space-y-4">
                      <h4 className="font-semibold text-base">Lucky Draw Rules</h4>
                      
                      <div>
                        <h5 className="font-medium mb-1">1. Entry Options</h5>
                        <ul className="list-disc ml-4 space-y-1 text-sm">
                          <li>Daily Spin: Users can participate once per day</li>
                          <li>Bonus Entries: Earn extra spins by inviting friends or making purchases</li>
                          <li>VIP Entries: Special spins for premium members or high-spending customers</li>
                        </ul>
                      </div>

                      <div>
                        <h5 className="font-medium mb-1">2. Prize Categories</h5>
                        <ul className="list-disc ml-4 space-y-1 text-sm">
                          <li>Discount Coupons: 5%, 10%, 20% off on purchases</li>
                          <li>Free Products: Select items from our store</li>
                          <li>Cashback Rewards: Win a percentage of your last order back</li>
                          <li>Exclusive Deals: Limited-time offers for winners</li>
                          <li>Loyalty Points: Points added to your account for future use</li>
                        </ul>
                      </div>

                      <div>
                        <h5 className="font-medium mb-1">3. Spin Customization</h5>
                        <ul className="list-disc ml-4 space-y-1 text-sm">
                          <li>Spin the Wheel: Rotating wheel with different prize sections</li>
                          <li>Scratch Cards: Digital scratch cards with hidden prizes</li>
                          <li>Mystery Box: Open a box to reveal your reward</li>
                        </ul>
                      </div>

                      <div>
                        <h5 className="font-medium mb-1">4. Winner Announcement</h5>
                        <ul className="list-disc ml-4 space-y-1 text-sm">
                          <li>Instant Win Popup: See what you won immediately</li>
                          <li>Leaderboard: View recent winners</li>
                          <li>Push Notifications: Get reminded when you can spin again</li>
                        </ul>
                      </div>

                      <div>
                        <h5 className="font-medium mb-1">5. Redemption Rules</h5>
                        <ul className="list-disc ml-4 space-y-1 text-sm">
                          <li>Claim Time Limit: Must claim prizes within the specified period</li>
                          <li>Minimum Order Requirement: Some rewards require minimum purchase value</li>
                          <li>Non-Transferable: Prizes are bound to winner's account only</li>
                        </ul>
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardHeader>
          <CardContent className="text-center">
            <div className="mb-6">
              <p className="text-muted-foreground">
                Draw a card and win amazing prizes!
              </p>
              {!canSpin && nextSpinTime && (
                <div className="flex items-center justify-center gap-2 mt-2 text-sm text-yellow-600">
                  <Timer className="h-4 w-4" />
                  Next draw available in: {formatTimeRemaining()}
                </div>
              )}
            </div>

            {/* Cards Display */}
            <div className="relative min-h-[300px] mb-8">
              {showCards ? (
                <div className={`grid grid-cols-2 sm:grid-cols-4 gap-4 transition-all duration-500 ${isSpinning ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}>
                  {(selectedPrize ? [selectedPrize] : prizes.slice(0, 8)).map((prize) => (
                    <div
                      key={prize.id}
                      className="aspect-[3/4] rounded-xl shadow-lg flex flex-col items-center justify-center p-4 transition-transform hover:scale-105"
                      style={{ backgroundColor: prize.color }}
                    >
                      <div className="mb-4">
                        {prize.icon}
                      </div>
                      <div className="text-white text-xl font-semibold text-center mt-2">
                        {prize.name}
                      </div>
                    </div>
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

            <Button
              onClick={spinDraw}
              disabled={isSpinning || !canSpin}
              className="w-full max-w-xs text-lg font-medium"
            >
              <Gift className="h-5 w-5 mr-2" />
              {isSpinning ? "Drawing..." : "Draw a Card!"}
            </Button>

            <div className="mt-6 text-sm text-muted-foreground">
              <div className="flex items-center justify-center gap-1">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>One free draw available every 24 hours</span>
              </div>
              <div className="flex items-center justify-center gap-1 mt-2">
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
