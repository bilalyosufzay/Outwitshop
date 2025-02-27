
import { useState, useEffect, ReactNode } from "react";
import { DrawCampaign, DrawEntry, Mission, Prize, PrizeHistoryItem } from "../types";
import { useToast } from "@/hooks/use-toast";

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

  useEffect(() => {
    const lastSpinTime = localStorage.getItem('lastSpinTime');
    const storedStreak = localStorage.getItem('streak');
    const storedLastSpinDate = localStorage.getItem('lastSpinDate');
    const storedPrizeHistory = localStorage.getItem('prizeHistory');
    const storedUserEntries = localStorage.getItem('userEntries');

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
    if (storedUserEntries) setUserEntries(JSON.parse(storedUserEntries));

    // Fetch campaigns from API (mocked for now)
    fetchActiveCampaigns();
    fetchAvailableMissions();
  }, []);

  useEffect(() => {
    if (userEntries.length > 0) {
      const total = userEntries.reduce((sum, entry) => sum + entry.quantity, 0);
      setTotalEntries(total);
    }
  }, [userEntries]);

  const fetchActiveCampaigns = () => {
    // This would be an API call in a real implementation
    const mockCampaigns: DrawCampaign[] = [
      {
        id: 'campaign1',
        name: 'Summer Giveaway',
        startDate: new Date(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        status: 'active',
        prizes: [
          {
            id: 101,
            name: "Grand Prize",
            color: "#FFB7C5",
            icon: null,
            rarity: 'legendary',
            points: 1000,
            quantity: 1,
            description: "A brand new smartphone!"
          },
          {
            id: 102,
            name: "Second Prize",
            color: "#90EE90",
            icon: null,
            rarity: 'epic',
            points: 500,
            quantity: 3,
            description: "Wireless headphones"
          },
          {
            id: 103,
            name: "Third Prize",
            color: "#ADD8E6",
            icon: null,
            rarity: 'rare',
            points: 200,
            quantity: 10,
            description: "Store voucher worth $50"
          }
        ],
        entryMethods: ['purchase', 'engagement', 'vip'],
        totalEntries: 1248,
        userEntries: 5
      }
    ];
    
    setActiveCampaigns(mockCampaigns);
    if (mockCampaigns.length > 0) {
      setActiveCampaign(mockCampaigns[0]);
    }
  };

  const fetchAvailableMissions = () => {
    // This would be an API call in a real implementation
    const mockMissions: Mission[] = [
      {
        id: 'mission1',
        type: 'daily',
        title: 'Daily Check-in',
        description: 'Check in daily to earn entries',
        reward: 1,
        completed: false
      },
      {
        id: 'mission2',
        type: 'review',
        title: 'Write a Product Review',
        description: 'Review any product to earn 3 entries',
        reward: 3,
        completed: false
      },
      {
        id: 'mission3',
        type: 'share',
        title: 'Share on Social Media',
        description: 'Share our campaign on social media',
        reward: 2,
        completed: false
      },
      {
        id: 'mission4',
        type: 'referral',
        title: 'Invite Friends',
        description: 'Earn 1 entry for each friend who joins',
        reward: 1,
        completed: false,
        progress: 2,
        total: 5
      },
      {
        id: 'mission5',
        type: 'purchase',
        title: 'Make a Purchase',
        description: 'Earn entries with every purchase',
        reward: 5,
        completed: false
      }
    ];
    
    setAvailableMissions(mockMissions);
  };

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

  const addEntry = (method: 'purchase' | 'engagement' | 'direct' | 'vip', quantity: number, description: string) => {
    const newEntry: DrawEntry = {
      id: Date.now().toString(),
      method,
      quantity,
      date: new Date(),
      description
    };

    const updatedEntries = [...userEntries, newEntry];
    setUserEntries(updatedEntries);
    localStorage.setItem('userEntries', JSON.stringify(updatedEntries));
    
    toast({
      title: "Entry Added!",
      description: `You gained ${quantity} new entries with ${description}`,
      duration: 3000,
    });
  };

  const completeMission = (missionId: string) => {
    const mission = availableMissions.find(m => m.id === missionId);
    if (!mission) return;
    
    const updatedMissions = availableMissions.map(m => 
      m.id === missionId ? { ...m, completed: true } : m
    );
    
    setAvailableMissions(updatedMissions);
    addEntry('engagement', mission.reward, `Completed mission: ${mission.title}`);
  };

  const claimPrize = (prizeId: string) => {
    const updatedHistory = prizeHistory.map(item => 
      item.id === prizeId ? { ...item, claimed: true } : item
    );
    
    setPrizeHistory(updatedHistory);
    localStorage.setItem('prizeHistory', JSON.stringify(updatedHistory));
    
    toast({
      title: "Prize Claimed!",
      description: "Your prize has been successfully claimed.",
      duration: 3000,
    });
  };

  const enterCampaign = (campaignId: string) => {
    // This would make an API call in a real implementation
    // For now, just simulate entering the campaign
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
    
    setTimeout(() => {
      // Simulate drawing a random prize from the campaign
      const campaign = activeCampaigns.find(c => c.id === campaignId);
      if (!campaign) return;
      
      const randomPrize = campaign.prizes[Math.floor(Math.random() * campaign.prizes.length)];
      
      setSelectedPrize(randomPrize);
      
      const newPrize: PrizeHistoryItem = {
        id: Date.now().toString(),
        prize: randomPrize,
        date: new Date(),
        claimed: false,
        claimCode: `PRIZE-${Math.floor(100000 + Math.random() * 900000)}`,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      };
      
      const updatedHistory = [newPrize, ...prizeHistory];
      setPrizeHistory(updatedHistory);
      localStorage.setItem('prizeHistory', JSON.stringify(updatedHistory));
      
      // Deduct used entries
      const remainingEntries = [...userEntries];
      remainingEntries.pop(); // Just remove the last entry for this demo
      setUserEntries(remainingEntries);
      localStorage.setItem('userEntries', JSON.stringify(remainingEntries));
      
      toast({
        title: `Congratulations! 🎉`,
        description: `You won: ${randomPrize.name}${randomPrize.description ? `\n${randomPrize.description}` : ''}${randomPrize.rarity ? `\n${randomPrize.rarity.toUpperCase()} PRIZE!` : ''}`,
        duration: 5000,
      });
      
      setIsSpinning(false);
    }, 2000);
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
    completeMission,
    addEntry,
    totalEntries,
    claimPrize,
    enterCampaign
  };
};
