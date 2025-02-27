
import { useState, useEffect, ReactNode } from "react";
import { DrawCampaign, DrawEntry, Mission, Prize, PrizeHistoryItem } from "../types";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

// Define database schema types for our new tables
type LuckyDrawCampaign = {
  id: string;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  status: 'upcoming' | 'active' | 'ended';
  entry_methods: string[] | any; // Can be string[] or JSON
  lucky_draw_prizes?: LuckyDrawPrize[];
}

type LuckyDrawPrize = {
  id: string;
  name: string;
  description?: string;
  color: string;
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
  points?: number;
  quantity: number;
  claimed?: number;
  image?: string;
}

type LuckyDrawEntry = {
  id: string;
  user_id: string;
  campaign_id: string;
  method: 'purchase' | 'engagement' | 'direct' | 'vip';
  quantity: number;
  date: string;
  description?: string;
  reference_id?: string;
  is_used: boolean;
}

type LuckyDrawMission = {
  id: string;
  type: 'review' | 'share' | 'referral' | 'purchase' | 'daily';
  title: string;
  description?: string;
  reward: number;
  is_active: boolean;
  campaign_id?: string;
}

type LuckyDrawWinner = {
  id: string;
  user_id: string;
  campaign_id: string;
  prize_id: string;
  entry_id: string;
  date: string;
  claimed: boolean;
  claim_code?: string;
  claimed_at?: string;
  expires_at?: string;
  lucky_draw_prizes?: LuckyDrawPrize;
}

type LuckyDrawCompletedMission = {
  id: string;
  user_id: string;
  mission_id: string;
  completed_at: string;
  entries_awarded: number;
}

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
    fetchActiveCampaigns();
    fetchUserEntries();
    fetchAvailableMissions();
    fetchPrizeHistory();
  }, []);

  useEffect(() => {
    if (userEntries.length > 0) {
      const total = userEntries.reduce((sum, entry) => sum + entry.quantity, 0);
      setTotalEntries(total);
    }
  }, [userEntries]);

  const getCurrentUser = async () => {
    const { data } = await supabase.auth.getUser();
    return data?.user;
  };

  const fetchActiveCampaigns = async () => {
    try {
      // Use type assertion for table name
      const { data, error } = await supabase
        .from('lucky_draw_campaigns' as any)
        .select(`
          id,
          name,
          description,
          start_date,
          end_date,
          status,
          entry_methods,
          lucky_draw_prizes (
            id,
            name,
            description,
            color,
            rarity,
            points,
            quantity,
            claimed,
            image
          )
        `)
        .eq('status', 'active');

      if (error) {
        console.error("Error fetching campaigns:", error);
        setError("Failed to load campaigns");
        return;
      }

      if (data && data.length > 0) {
        // Cast data to our defined type
        const typedData = data as unknown as LuckyDrawCampaign[];
        
        const mappedCampaigns: DrawCampaign[] = typedData.map(campaign => ({
          id: campaign.id,
          name: campaign.name,
          description: campaign.description,
          startDate: new Date(campaign.start_date),
          endDate: new Date(campaign.end_date),
          status: campaign.status,
          prizes: campaign.lucky_draw_prizes?.map(prize => ({
            id: Number(prize.id), // Convert string ID to number for Prize interface
            name: prize.name,
            description: prize.description,
            color: prize.color,
            icon: null, // We'll need to implement icons based on prize type
            rarity: prize.rarity,
            points: prize.points,
            quantity: prize.quantity,
            claimed: prize.claimed,
            image: prize.image
          })) || [],
          entryMethods: Array.isArray(campaign.entry_methods) 
            ? campaign.entry_methods 
            : (typeof campaign.entry_methods === 'string' 
                ? JSON.parse(campaign.entry_methods) 
                : []),
          totalEntries: 0, // We'll populate this from another query
          userEntries: 0 // We'll populate this from another query
        }));

        setActiveCampaigns(mappedCampaigns);
        
        // Set the first campaign as active by default
        if (mappedCampaigns.length > 0) {
          setActiveCampaign(mappedCampaigns[0]);
          // Fetch campaign statistics
          fetchCampaignStatistics(mappedCampaigns[0].id);
        }
      }
    } catch (err) {
      console.error("Error in fetchActiveCampaigns:", err);
      setError("Failed to load campaigns");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCampaignStatistics = async (campaignId: string) => {
    try {
      // Get total entries for this campaign
      const { count: totalCount, error: totalError } = await supabase
        .from('lucky_draw_entries' as any)
        .select('id', { count: 'exact', head: true })
        .eq('campaign_id', campaignId);

      if (totalError) {
        console.error("Error fetching campaign stats:", totalError);
        return;
      }

      // Get user entries for this campaign
      const user = await getCurrentUser();
      if (!user) return;

      const { count: userCount, error: userError } = await supabase
        .from('lucky_draw_entries' as any)
        .select('id', { count: 'exact', head: true })
        .eq('campaign_id', campaignId)
        .eq('user_id', user.id);

      if (userError) {
        console.error("Error fetching user stats:", userError);
        return;
      }

      // Update campaign with statistics
      setActiveCampaigns(prev => 
        prev.map(campaign => 
          campaign.id === campaignId 
            ? { 
                ...campaign, 
                totalEntries: totalCount || 0,
                userEntries: userCount || 0
              } 
            : campaign
        )
      );

      // Also update active campaign if it's the current one
      if (activeCampaign?.id === campaignId) {
        setActiveCampaign(prev => 
          prev ? { 
            ...prev, 
            totalEntries: totalCount || 0,
            userEntries: userCount || 0
          } : null
        );
      }
    } catch (err) {
      console.error("Error in fetchCampaignStatistics:", err);
    }
  };

  const fetchUserEntries = async () => {
    try {
      const user = await getCurrentUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('lucky_draw_entries' as any)
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (error) {
        console.error("Error fetching user entries:", error);
        return;
      }

      if (data) {
        // Cast data to our defined type
        const typedData = data as unknown as LuckyDrawEntry[];
        
        const mappedEntries: DrawEntry[] = typedData.map(entry => ({
          id: entry.id,
          method: entry.method,
          quantity: entry.quantity,
          date: new Date(entry.date),
          description: entry.description || ''
        }));

        setUserEntries(mappedEntries);
      }
    } catch (err) {
      console.error("Error in fetchUserEntries:", err);
    }
  };

  const fetchAvailableMissions = async () => {
    try {
      const { data, error } = await supabase
        .from('lucky_draw_missions' as any)
        .select('*')
        .eq('is_active', true);

      if (error) {
        console.error("Error fetching missions:", error);
        return;
      }

      if (data) {
        // Get completed missions for the current user
        const user = await getCurrentUser();
        if (!user) return;
        
        const { data: completedData, error: completedError } = await supabase
          .from('lucky_draw_completed_missions' as any)
          .select('mission_id')
          .eq('user_id', user.id);

        if (completedError) {
          console.error("Error fetching completed missions:", completedError);
        }

        // Create a set of completed mission IDs
        const completedMissionIds = new Set(
          (completedData || []).map((item: any) => item.mission_id)
        );

        // Cast data to our defined type
        const typedData = data as unknown as LuckyDrawMission[];

        const mappedMissions: Mission[] = typedData.map(mission => ({
          id: mission.id,
          type: mission.type,
          title: mission.title,
          description: mission.description || '',
          reward: mission.reward,
          completed: completedMissionIds.has(mission.id),
          // These would need to be added to the schema if we want to track progress
          progress: undefined,
          total: undefined
        }));

        setAvailableMissions(mappedMissions);
      }
    } catch (err) {
      console.error("Error in fetchAvailableMissions:", err);
    }
  };

  const fetchPrizeHistory = async () => {
    try {
      const user = await getCurrentUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('lucky_draw_winners' as any)
        .select(`
          id,
          date,
          claimed,
          claim_code,
          expires_at,
          prize_id
        `)
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (error) {
        console.error("Error fetching prize history:", error);
        return;
      }

      if (data && data.length > 0) {
        // Fetch prize details for each winner
        const prizeIds = data.map(winner => winner.prize_id);
        
        const { data: prizesData, error: prizesError } = await supabase
          .from('lucky_draw_prizes' as any)
          .select('*')
          .in('id', prizeIds);
          
        if (prizesError || !prizesData) {
          console.error("Error fetching prize details:", prizesError);
          return;
        }
        
        // Create a map of prize details for quick lookup
        const prizesMap = new Map();
        prizesData.forEach((prize: any) => {
          prizesMap.set(prize.id, prize);
        });
        
        // Map the winners with their prize details
        const mappedHistory: PrizeHistoryItem[] = data.map(winner => {
          const prizeDetails = prizesMap.get(winner.prize_id);
          if (!prizeDetails) return null;
          
          return {
            id: winner.id,
            prize: {
              id: Number(prizeDetails.id), // Convert string ID to number for Prize interface
              name: prizeDetails.name,
              color: prizeDetails.color,
              icon: null,
              description: prizeDetails.description,
              rarity: prizeDetails.rarity,
              points: prizeDetails.points,
              image: prizeDetails.image,
              quantity: prizeDetails.quantity,
              claimed: prizeDetails.claimed
            },
            date: new Date(winner.date),
            claimed: winner.claimed,
            claimCode: winner.claim_code,
            expiresAt: winner.expires_at ? new Date(winner.expires_at) : undefined
          };
        }).filter(item => item !== null) as PrizeHistoryItem[];

        setPrizeHistory(mappedHistory);
      }
    } catch (err) {
      console.error("Error in fetchPrizeHistory:", err);
    }
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

  const addEntry = async (method: 'purchase' | 'engagement' | 'direct' | 'vip', quantity: number, description: string) => {
    try {
      const user = await getCurrentUser();
      if (!user || !activeCampaign) {
        toast({
          title: "Error",
          description: "You must be logged in and have an active campaign to add entries",
          variant: "destructive",
          duration: 3000,
        });
        return;
      }

      const newEntry = {
        user_id: user.id,
        campaign_id: activeCampaign.id,
        method,
        quantity,
        description,
        date: new Date().toISOString(),
        is_used: false
      };

      const { data, error } = await supabase
        .from('lucky_draw_entries' as any)
        .insert(newEntry)
        .select()
        .single();

      if (error) {
        console.error("Error adding entry:", error);
        toast({
          title: "Error",
          description: "Failed to add entry",
          variant: "destructive",
          duration: 3000,
        });
        return;
      }

      if (data) {
        // Cast data to our defined type
        const typedData = data as unknown as LuckyDrawEntry;
        
        const mappedEntry: DrawEntry = {
          id: typedData.id,
          method: typedData.method,
          quantity: typedData.quantity,
          date: new Date(typedData.date),
          description: typedData.description || ''
        };

        setUserEntries(prev => [mappedEntry, ...prev]);
        
        toast({
          title: "Entry Added!",
          description: `You gained ${quantity} new entries with ${description}`,
          duration: 3000,
        });

        // Refresh campaign statistics
        fetchCampaignStatistics(activeCampaign.id);
      }
    } catch (err) {
      console.error("Error in addEntry:", err);
      toast({
        title: "Error",
        description: "Failed to add entry",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const completeMission = async (missionId: string) => {
    try {
      const user = await getCurrentUser();
      if (!user || !activeCampaign) {
        toast({
          title: "Error",
          description: "You must be logged in and have an active campaign to complete missions",
          variant: "destructive",
          duration: 3000,
        });
        return;
      }

      const mission = availableMissions.find(m => m.id === missionId);
      if (!mission) return;

      // Mark the mission as completed
      const { error: missionError } = await supabase
        .from('lucky_draw_completed_missions' as any)
        .insert({
          user_id: user.id,
          mission_id: missionId,
          entries_awarded: mission.reward,
          completed_at: new Date().toISOString()
        });

      if (missionError) {
        console.error("Error completing mission:", missionError);
        toast({
          title: "Error",
          description: "Failed to complete mission",
          variant: "destructive",
          duration: 3000,
        });
        return;
      }

      // Add entries for completing the mission
      await addEntry(
        'engagement', 
        mission.reward, 
        `Completed mission: ${mission.title}`
      );
      
      // Update the mission status locally
      setAvailableMissions(prev =>
        prev.map(m => (m.id === missionId ? { ...m, completed: true } : m))
      );
    } catch (err) {
      console.error("Error in completeMission:", err);
      toast({
        title: "Error",
        description: "Failed to complete mission",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const claimPrize = async (prizeId: string) => {
    try {
      const { error } = await supabase
        .from('lucky_draw_winners' as any)
        .update({ 
          claimed: true, 
          claimed_at: new Date().toISOString() 
        })
        .eq('id', prizeId);

      if (error) {
        console.error("Error claiming prize:", error);
        toast({
          title: "Error",
          description: "Failed to claim prize",
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
    } catch (err) {
      console.error("Error in claimPrize:", err);
      toast({
        title: "Error",
        description: "Failed to claim prize",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const enterCampaign = async (campaignId: string) => {
    try {
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

      // Get available entries for this user and campaign
      const user = await getCurrentUser();
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to enter the lucky draw",
          variant: "destructive",
          duration: 3000,
        });
        setIsSpinning(false);
        return;
      }

      const { data: entries, error: entriesError } = await supabase
        .from('lucky_draw_entries' as any)
        .select('id')
        .eq('user_id', user.id)
        .eq('campaign_id', campaignId)
        .eq('is_used', false)
        .limit(1);

      if (entriesError || !entries || entries.length === 0) {
        console.error("Error getting available entries:", entriesError);
        toast({
          title: "Error",
          description: "No available entries found",
          variant: "destructive",
          duration: 3000,
        });
        setIsSpinning(false);
        return;
      }

      const entryId = entries[0].id;

      // Get a random prize from the campaign
      const { data: campaignPrizes, error: prizesError } = await supabase
        .from('lucky_draw_prizes' as any)
        .select('*')
        .eq('campaign_id', campaignId)
        .lt('claimed', 'quantity'); // Only select prizes with available quantity

      if (prizesError || !campaignPrizes || campaignPrizes.length === 0) {
        console.error("Error getting prizes:", prizesError);
        toast({
          title: "Error",
          description: "No available prizes found",
          variant: "destructive",
          duration: 3000,
        });
        setIsSpinning(false);
        return;
      }

      // Cast data to our defined type
      const typedPrizes = campaignPrizes as unknown as LuckyDrawPrize[];

      // Select a random prize
      const randomPrize = typedPrizes[Math.floor(Math.random() * typedPrizes.length)];
      
      // Insert a winner record
      const expireDate = new Date();
      expireDate.setDate(expireDate.getDate() + 7); // Default 7 days to claim

      const { data: winner, error: winnerError } = await supabase
        .from('lucky_draw_winners' as any)
        .insert({
          user_id: user.id,
          campaign_id: campaignId,
          prize_id: randomPrize.id,
          entry_id: entryId,
          date: new Date().toISOString(),
          claimed: false,
          claim_code: `PRIZE-${Math.floor(100000 + Math.random() * 900000)}`,
          expires_at: expireDate.toISOString()
        })
        .select('id, date, claimed, claim_code, expires_at')
        .single();

      if (winnerError) {
        console.error("Error creating winner record:", winnerError);
        toast({
          title: "Error",
          description: "Failed to record your prize",
          variant: "destructive",
          duration: 3000,
        });
        setIsSpinning(false);
        return;
      }

      // Mark the entry as used
      await supabase
        .from('lucky_draw_entries' as any)
        .update({ is_used: true })
        .eq('id', entryId);

      // Increment the claimed count for this prize
      await supabase
        .from('lucky_draw_prizes' as any)
        .update({ 
          claimed: (randomPrize.claimed || 0) + 1 
        })
        .eq('id', randomPrize.id);

      // Convert prize data for the UI
      const mappedPrize: Prize = {
        id: Number(randomPrize.id), // Convert string ID to number for Prize interface
        name: randomPrize.name,
        color: randomPrize.color,
        icon: null,
        description: randomPrize.description,
        rarity: randomPrize.rarity,
        points: randomPrize.points,
        quantity: randomPrize.quantity,
        claimed: (randomPrize.claimed || 0) + 1,
        image: randomPrize.image
      };

      setSelectedPrize(mappedPrize);

      // Add to prize history
      const newPrize: PrizeHistoryItem = {
        id: winner.id,
        prize: mappedPrize,
        date: new Date(winner.date),
        claimed: winner.claimed,
        claimCode: winner.claim_code,
        expiresAt: winner.expires_at ? new Date(winner.expires_at) : undefined
      };

      setPrizeHistory(prev => [newPrize, ...prev]);
      
      // Update user entries (reduce by 1)
      fetchUserEntries();
      
      toast({
        title: `Congratulations! 🎉`,
        description: `You won: ${mappedPrize.name}${mappedPrize.description ? `\n${mappedPrize.description}` : ''}${mappedPrize.rarity ? `\n${mappedPrize.rarity.toUpperCase()} PRIZE!` : ''}`,
        duration: 5000,
      });
      
      setIsSpinning(false);
    } catch (err) {
      console.error("Error in enterCampaign:", err);
      toast({
        title: "Error",
        description: "Failed to enter the campaign",
        variant: "destructive",
        duration: 3000,
      });
      setIsSpinning(false);
    }
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
    enterCampaign,
    isLoading,
    error
  };
};
