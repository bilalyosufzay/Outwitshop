import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift, Timer, Star, AlertCircle, Ticket, Package, Truck, Percent } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const prizes = [
  { id: 1, name: "5% Discount", color: "#FF6B6B", icon: <Percent className="h-8 w-8" /> },
  { id: 2, name: "10% Discount", color: "#4ECDC4", icon: <Percent className="h-8 w-8" /> },
  { id: 3, name: "Free Shipping", color: "#45B7D1", icon: <Truck className="h-8 w-8" /> },
  { id: 4, name: "20% Discount", color: "#96CEB4", icon: <Percent className="h-8 w-8" /> },
  { id: 5, name: "100 Points", color: "#FFEEAD", icon: <Star className="h-8 w-8" /> },
  { id: 6, name: "Mystery Box", color: "#D4A5A5", icon: <Package className="h-8 w-8" /> },
  { id: 7, name: "15% Discount", color: "#9EC1CF", icon: <Percent className="h-8 w-8" /> },
  { id: 8, name: "50 Points", color: "#FFD93D", icon: <Star className="h-8 w-8" /> },
];

const LuckyDraw = () => {
  const { toast } = useToast();
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [nextSpinTime, setNextSpinTime] = useState<Date | null>(null);
  const [canSpin, setCanSpin] = useState(true);

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

  const spinWheel = () => {
    if (!canSpin) return;

    setIsSpinning(true);
    const randomDegrees = Math.floor(Math.random() * 360) + 1440; // At least 4 full rotations
    setRotation(rotation + randomDegrees);

    // Calculate which prize was won based on final rotation
    setTimeout(() => {
      const normalizedDegree = (rotation + randomDegrees) % 360;
      const prizeIndex = Math.floor((normalizedDegree / 45) % 8);
      const prize = prizes[prizeIndex];

      toast({
        title: "Congratulations! 🎉",
        description: `You won: ${prize.name}`,
        duration: 5000,
      });

      setIsSpinning(false);
      setCanSpin(false);
      localStorage.setItem('lastSpinTime', Date.now().toString());
      setNextSpinTime(new Date(Date.now() + 24 * 60 * 60 * 1000));
    }, 5000);
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
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="h-5 w-5" />
              Lucky Draw
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="mb-6">
              <p className="text-muted-foreground">
                Spin the wheel and win amazing prizes!
              </p>
              {!canSpin && nextSpinTime && (
                <div className="flex items-center justify-center gap-2 mt-2 text-sm text-yellow-600">
                  <Timer className="h-4 w-4" />
                  Next spin available in: {formatTimeRemaining()}
                </div>
              )}
            </div>

            {/* Spinning Wheel */}
            <div className="relative w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] mx-auto mb-8">
              <div
                className="absolute w-full h-full rounded-full transition-transform duration-[5000ms] ease-out shadow-lg"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  background: `conic-gradient(
                    ${prizes.map((prize, index) => 
                      `${prize.color} ${index * 45}deg ${(index + 1) * 45}deg`
                    ).join(', ')}
                  )`,
                }}
              >
                {prizes.map((prize, index) => (
                  <div
                    key={prize.id}
                    className="absolute w-full h-full text-lg sm:text-2xl font-medium text-white flex items-center justify-center"
                    style={{
                      transform: `rotate(${index * 45 + 22.5}deg)`,
                    }}
                  >
                    <div 
                      className="absolute flex flex-col items-center gap-3 bg-black/40 px-4 py-3 rounded" 
                      style={{ transform: "rotate(-90deg)" }}
                    >
                      {prize.icon}
                      {prize.name}
                    </div>
                  </div>
                ))}
              </div>
              {/* Center pointer */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8">
                <div className="w-0 h-0 border-l-[16px] border-l-transparent border-b-[32px] border-b-red-500 border-r-[16px] border-r-transparent absolute -top-[32px] left-1/2 -translate-x-1/2"></div>
              </div>
            </div>

            <Button
              onClick={spinWheel}
              disabled={isSpinning || !canSpin}
              className="w-full max-w-xs text-lg font-medium"
            >
              <Gift className="h-5 w-5 mr-2" />
              {isSpinning ? "Spinning..." : "Spin to Win!"}
            </Button>

            <div className="mt-6 text-sm text-muted-foreground">
              <div className="flex items-center justify-center gap-1">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>One free spin available every 24 hours</span>
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
