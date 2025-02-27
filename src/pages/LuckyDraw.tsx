
import { useState } from "react";
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

const LuckyDraw = () => {
  const { toast } = useToast();
  const [showCards, setShowCards] = useState(true);
  const [showRules, setShowRules] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showMissions, setShowMissions] = useState(false);
  const [showCampaigns, setShowCampaigns] = useState(false);

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
    enterCampaign
  } = useLuckyDraw();

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
            showCampaigns={showCampaigns}
            setShowCampaigns={setShowCampaigns}
            activeCampaign={activeCampaign}
          />
          <CardContent className="text-center space-y-6">
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
            ) : (
              <>
                {activeCampaign && (
                  <EventBanner
                    campaign={activeCampaign}
                    userEntries={totalEntries}
                    timeRemaining={formatEventTimeRemaining(activeCampaign.endDate)}
                    onEnter={enterCampaign}
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
                  onSpin={() => activeCampaign && enterCampaign(activeCampaign.id)}
                  onToggleHistory={() => {
                    setShowHistory(!showHistory);
                    setShowCampaigns(false);
                  }}
                  onViewCampaigns={handleViewCampaigns}
                />

                {showHistory && (
                  <PrizeHistory 
                    history={prizeHistory}
                    onClaim={claimPrize}
                  />
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
