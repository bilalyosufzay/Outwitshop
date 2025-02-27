
import { useState, useEffect } from "react";
import { DrawCampaign, DrawEntry, Mission, Prize, PrizeHistoryItem } from "../types";
import { useToast } from "@/hooks/use-toast";
import { calculateStreak } from "./utils/lucky-draw-utils";
import { fetchActiveCampaigns, fetchCampaignStatistics } from "./api/campaigns-api";
import { fetchUserEntries, addEntry } from "./api/entries-api";
import { fetchAvailableMissions, completeMission } from "./api/missions-api";
import { fetchPrizeHistory, claimPrize as claimPrizeApi } from "./api/prizes-api";
import { enterCampaign as enterCampaignApi } from "./api/draw-api";

export const useLuckyDraw = () => {
  const { toast } = useToast();
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedPrize, setSelectedPrize] = useState<Prize | null>(null);
  const [nextSpinTime, setNextSpinTime] = useState<Date | null>(null);
  const [canSpin, setCanSpin] = useState(true);
  const [streak, setStreak] = useState(0);
  const [lastSpinDate, setLastSpinDate] = useState<string | null>(null);
  const [prizeHistory, setPrizeHistory] = useState<PrizeHistoryItem[]>([]);
  const [activeCampaigns, setActiveCampaigns] = useState<DrawCampaign[]>([]);
  const [userEntries, setUserEntries] = useState<DrawEntry[]>([]);
  const [availableMissions, setAvailableMissions] = useState<Mission[]>([]);
  const [activeCampaign, setActiveCampaign] = useState<DrawCampaign | null>(null);
  const [totalEntries, setTotalEntries] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const lastSpinTime = localStorage.getItem('lastSpinTime');
    const storedStreak = localStorage.getItem('streak');
    const storedLastSpinDate = localStorage.getItem('lastSpinDate');
    
    if (lastSpinTime) {
      const nextTime = new Date(Number(lastSpinTime) + 24 * 60 * 60 * 1000);
      if (nextTime > new Date()) {
        setCanSpin(false);
        setNextSpinTime(nextTime);
      }
    }

    if (storedStreak) setStreak(Number(storedStreak));
    if (storedLastSpinDate) setLastSpinDate(storedLastSpinDate);

    // Fetch data from Supabase
    loadInitialData();
  }, []);

  useEffect(() => {
    if (userEntries.length > 0) {
      const total = userEntries.reduce((sum, entry) => sum + entry.quantity, 0);
      setTotalEntries(total);
    }
  }, [userEntries]);

  const loadInitialData = async () => {
    try {
      setIsLoading(true);
      
      // Fetch campaigns
      const { campaigns, error: campaignsError } = await fetchActiveCampaigns();
      if (campaignsError) {
        setError(campaignsError);
      } else {
        setActiveCampaigns(campaigns);
        
        // Set the first campaign as active by default
        if (campaigns.length > 0) {
          setActiveCampaign(campaigns[0]);
          
          // Fetch campaign statistics
          const { totalEntries, userEntries, error: statsError } = 
            await fetchCampaignStatistics(campaigns[0].id);
            
          if (!statsError) {
            // Update the active campaign with statistics
            const updatedCampaign = {
              ...campaigns[0],
              totalEntries,
              userEntries
            };
            setActiveCampaign(updatedCampaign);
            
            // Also update in the campaigns array
            setActiveCampaigns(prev => 
              prev.map(campaign => 
                campaign.id === campaigns[0].id 
                  ? updatedCampaign
                  : campaign
              )
            );
          }
        }
      }
      
      // Fetch user entries
      const { entries, error: entriesError } = await fetchUserEntries();
      if (!entriesError) {
        setUserEntries(entries);
      }
      
      // Fetch available missions
      const { missions, error: missionsError } = await fetchAvailableMissions();
      if (!missionsError) {
        setAvailableMissions(missions);
      }
      
      // Fetch prize history
      const { history, error: historyError } = await fetchPrizeHistory();
      if (!historyError) {
        setPrizeHistory(history);
      }
    } catch (err) {
      console.error("Error loading initial data:", err);
      setError("Failed to load data");
    } finally {
      setIsLoading(false);
    }
  };

  const updateStreak = () => {
    const newStreak = calculateStreak(lastSpinDate, streak);
    const today = new Date().toDateString();
    
    setStreak(newStreak);
    localStorage.setItem('streak', String(newStreak));
    
    setLastSpinDate(today);
    localStorage.setItem('lastSpinDate', today);
  };

  const handleAddEntry = async (
    method: 'purchase' | 'engagement' | 'direct' | 'vip', 
    quantity: number, 
    description: string
  ) => {
    if (!activeCampaign) {
      toast({
        title: "Error",
        description: "No active campaign selected",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    const { entry, error: entryError } = await addEntry(
      activeCampaign.id,
      method,
      quantity,
      description
    );

    if (entryError || !entry) {
      toast({
        title: "Error",
        description: entryError || "Failed to add entry",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    // Add the new entry to our state
    setUserEntries(prev => [entry, ...prev]);
    
    toast({
      title: "Entry Added!",
      description: `You gained ${quantity} new entries with ${description}`,
      duration: 3000,
    });

    // Refresh campaign statistics
    if (activeCampaign) {
      const { totalEntries, userEntries } = await fetchCampaignStatistics(activeCampaign.id);
      
      // Update the active campaign with new statistics
      setActiveCampaign(prev => 
        prev ? { 
          ...prev, 
          totalEntries, 
          userEntries 
        } : null
      );
      
      // Also update in the campaigns array
      setActiveCampaigns(prev => 
        prev.map(campaign => 
          campaign.id === activeCampaign.id 
            ? { ...campaign, totalEntries, userEntries }
            : campaign
        )
      );
    }
  };

  const handleCompleteMission = async (missionId: string) => {
    if (!activeCampaign) {
      toast({
        title: "Error",
        description: "No active campaign selected",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    const mission = availableMissions.find(m => m.id === missionId);
    if (!mission) return;

    const { success, reward, error: missionError } = await completeMission(
      missionId,
      activeCampaign.id
    );

    if (!success || missionError) {
      toast({
        title: "Error",
        description: missionError || "Failed to complete mission",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    // Add entries for completing the mission
    await handleAddEntry(
      'engagement', 
      reward, 
      `Completed mission: ${mission.title}`
    );
    
    // Update the mission status locally
    setAvailableMissions(prev =>
      prev.map(m => (m.id === missionId ? { ...m, completed: true } : m))
    );
  };

  const handleClaimPrize = async (prizeId: string) => {
    const { success, error: claimError } = await claimPrizeApi(prizeId);

    if (!success || claimError) {
      toast({
        title: "Error",
        description: claimError || "Failed to claim prize",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    // Update the local state
    setPrizeHistory(prev => 
      prev.map(item => item.id === prizeId ? { ...item, claimed: true } : item)
    );
    
    toast({
      title: "Prize Claimed!",
      description: "Your prize has been successfully claimed.",
      duration: 3000,
    });
  };

  const handleEnterCampaign = async (campaignId: string) => {
    if (totalEntries <= 0) {
      toast({
        title: "No Entries Available",
        description: "Complete missions to earn entries first!",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    setIsSpinning(true);

    const { selectedPrize: prize, winnerRecord, error: enterError } = 
      await enterCampaignApi(campaignId);

    if (enterError || !prize || !winnerRecord) {
      toast({
        title: "Error",
        description: enterError || "Failed to enter the campaign",
        variant: "destructive",
        duration: 3000,
      });
      setIsSpinning(false);
      return;
    }

    setSelectedPrize(prize);

    // Add to prize history
    setPrizeHistory(prev => [winnerRecord, ...prev]);
    
    // Update user entries
    const { entries } = await fetchUserEntries();
    setUserEntries(entries);
    
    toast({
      title: `Congratulations! 🎉`,
      description: `You won: ${prize.name}${prize.description ? `\n${prize.description}` : ''}${prize.rarity ? `\n${prize.rarity.toUpperCase()} PRIZE!` : ''}`,
      duration: 5000,
    });
    
    setIsSpinning(false);
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
    activeCampaigns,
    activeCampaign,
    setActiveCampaign,
    userEntries,
    availableMissions,
    completeMission: handleCompleteMission,
    addEntry: handleAddEntry,
    totalEntries,
    claimPrize: handleClaimPrize,
    enterCampaign: handleEnterCampaign,
    isLoading,
    error
  };
};
