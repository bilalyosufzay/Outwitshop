
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { PrizeHistory } from "@/components/lucky-draw/PrizeHistory";
import { Missions } from "@/components/lucky-draw/Missions";
import { EventBanner } from "@/components/lucky-draw/EventBanner";
import { PrizeGrid } from "@/components/lucky-draw/PrizeGrid";
import { useLuckyDraw } from "@/components/lucky-draw/hooks/useLuckyDraw";
import { prizes } from "@/components/lucky-draw/constants/prizes";
import { LuckyDrawHeader } from "@/components/lucky-draw/LuckyDrawHeader";
import { DrawActions } from "@/components/lucky-draw/DrawActions";
import { DrawInfo } from "@/components/lucky-draw/DrawInfo";
import { DrawTimer } from "@/components/lucky-draw/DrawTimer";
import { CampaignList } from "@/components/lucky-draw/CampaignList";
import { LuckyDrawFeatured } from "@/components/lucky-draw/LuckyDrawFeatured";
import { LuckyDrawEnding } from "@/components/lucky-draw/LuckyDrawEnding";
import { Confetti } from "@/components/lucky-draw/Confetti";
import { Button } from "@/components/ui/button";
import { FloatingActionButton } from "@/components/lucky-draw/FloatingActionButton";
import { ArrowUp } from "lucide-react";
import { WinnersList } from "@/components/lucky-draw/WinnersList";

const LuckyDraw = () => {
  const { toast } = useToast();
  const [showCards, setShowCards] = useState(true);
  const [showRules, setShowRules] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showMissions, setShowMissions] = useState(false);
  const [showCampaigns, setShowCampaigns] = useState(false);
  const [showWinners, setShowWinners] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

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
    updateStreak,
    activeCampaigns,
    activeCampaign,
    setActiveCampaign,
    userEntries,
    availableMissions,
    completeMission,
    totalEntries,
    claimPrize,
    enterCampaign,
    isLoading
  } = useLuckyDraw();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatTimeRemaining = () => {
    if (!nextSpinTime) return "";
    const now = new Date();
    const diff = nextSpinTime.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const formatEventTimeRemaining = (endDate: Date) => {
    const now = new Date();
    const diff = endDate.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return `${days}d ${hours}h`;
  };

  const handleViewCampaigns = () => {
    setShowCampaigns(!showCampaigns);
    setShowMissions(false);
    setShowHistory(false);
    setShowWinners(false);
  };

  const handleEnterDraw = async (campaignId: string) => {
    if (totalEntries <= 0) {
      toast({
        title: "No Entries Available",
        description: "Complete missions to earn entries first!",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    await enterCampaign(campaignId);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 pb-20">
      {showConfetti && <Confetti />}
      
      <div className="container mx-auto px-4 py-8 space-y-6">
        <Card className="border-0 bg-white/80 backdrop-blur-sm dark:bg-slate-900/80 shadow-lg overflow-hidden">
          <LuckyDrawHeader
            showRules={showRules}
            setShowRules={setShowRules}
            showMissions={showMissions}
            setShowMissions={setShowMissions}
            showCampaigns={showCampaigns}
            setShowCampaigns={setShowCampaigns}
            activeCampaign={activeCampaign}
          />
          <CardContent className="text-center space-y-6 p-6">
            {showMissions ? (
              <Missions 
                missions={availableMissions} 
                onComplete={completeMission}
                userEntries={totalEntries}
              />
            ) : showCampaigns ? (
              <CampaignList
                campaigns={activeCampaigns}
                onSelect={setActiveCampaign}
                activeCampaign={activeCampaign}
              />
            ) : showWinners ? (
              <WinnersList
                history={prizeHistory}
                onBack={() => setShowWinners(false)}
              />
            ) : showHistory ? (
              <PrizeHistory 
                history={prizeHistory}
                onClaim={claimPrize}
                onViewAll={() => setShowWinners(true)}
              />
            ) : (
              <>
                {activeCampaign && (
                  <EventBanner
                    campaign={activeCampaign}
                    userEntries={totalEntries}
                    timeRemaining={formatEventTimeRemaining(activeCampaign.endDate)}
                    onEnter={handleEnterDraw}
                  />
                )}

                <DrawTimer 
                  timeRemaining={formatTimeRemaining()} 
                  nextDrawTime={nextSpinTime || undefined}
                />

                <PrizeGrid
                  prizes={prizes}
                  selectedPrize={selectedPrize}
                  isSpinning={isSpinning}
                />

                <DrawActions
                  isSpinning={isSpinning}
                  canSpin={canSpin}
                  selectedPrize={selectedPrize}
                  userEntries={totalEntries}
                  onSpin={() => activeCampaign && handleEnterDraw(activeCampaign.id)}
                  onToggleHistory={() => {
                    setShowHistory(!showHistory);
                    setShowCampaigns(false);
                    setShowWinners(false);
                  }}
                  onViewCampaigns={handleViewCampaigns}
                />

                <DrawInfo />
              </>
            )}
          </CardContent>
        </Card>

        {!showMissions && !showCampaigns && !showWinners && !showHistory && (
          <>
            <LuckyDrawFeatured 
              campaigns={activeCampaigns.filter(c => c.prizes.some(p => p.rarity === 'legendary'))} 
              onSelect={setActiveCampaign}
            />
            
            <LuckyDrawEnding 
              campaigns={activeCampaigns.filter(c => {
                const daysLeft = Math.floor((c.endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                return daysLeft <= 3;
              })}
              onSelect={setActiveCampaign}
            />
          </>
        )}
      </div>

      {showScrollTop && (
        <Button 
          className="fixed bottom-20 right-4 p-2 rounded-full shadow-lg animate-fade-in"
          variant="secondary"
          size="icon"
          onClick={scrollToTop}
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      )}

      <FloatingActionButton 
        text="Join Now" 
        onClick={() => {
          handleViewCampaigns();
          setShowCampaigns(true);
        }}
      />
      
      <Navigation />
    </div>
  );
};

export default LuckyDraw;
