
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Gift, Trophy, Calendar, Clock, Tag, Share2, Heart, ArrowRight, ChevronLeft, ChevronRight, Filter, Star, Zap, ShoppingCart, MessageSquare, Users, Award } from "lucide-react";

// Define types for our data structures
interface Prize {
  id: string;
  name: string;
  image?: string;
  description?: string;
  quantity: number;
  claimed: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  color: string;
}

interface Campaign {
  id: string;
  name: string;
  description: string;
  endDate: Date;
  startDate: Date;
  status: 'upcoming' | 'active' | 'ended';
  category: string;
  sponsor?: {
    name: string;
    logo?: string;
  };
  entryMethods: ('purchase' | 'engagement' | 'direct' | 'vip')[];
  prizes: Prize[];
  totalEntries: number;
  remainingEntries: number;
  userEntries: number;
  winners?: Winner[];
}

interface Winner {
  id: string;
  userId: string;
  username: string;
  avatarUrl?: string;
  prizeId: string;
  prize: Prize;
  claimed: boolean;
  claimDeadline?: Date;
  winDate: Date;
}

// Sample data (in a real app, this would come from your Supabase database)
const campaigns: Campaign[] = [
  {
    id: "1",
    name: "Summer Tech Giveaway",
    description: "Win the latest gadgets in our biggest tech giveaway of the summer!",
    startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    status: "active",
    category: "Electronics",
    sponsor: {
      name: "TechGiant",
      logo: "https://placehold.co/100x40/purple/white?text=TechGiant"
    },
    entryMethods: ["purchase", "engagement", "direct", "vip"],
    prizes: [
      {
        id: "p1",
        name: "Premium Smartphone",
        image: "https://placehold.co/300x300/8B5CF6/white?text=Smartphone",
        description: "Latest model with advanced camera system",
        quantity: 1,
        claimed: 0,
        rarity: "legendary",
        color: "#8B5CF6"
      },
      {
        id: "p2",
        name: "Wireless Earbuds",
        image: "https://placehold.co/300x300/3B82F6/white?text=Earbuds",
        description: "Noise-cancelling with 24h battery life",
        quantity: 5,
        claimed: 0,
        rarity: "epic",
        color: "#3B82F6"
      },
      {
        id: "p3",
        name: "Smart Watch",
        image: "https://placehold.co/300x300/10B981/white?text=Watch",
        description: "Fitness tracking and notifications",
        quantity: 10,
        claimed: 0,
        rarity: "rare",
        color: "#10B981"
      },
      {
        id: "p4",
        name: "Power Bank",
        image: "https://placehold.co/300x300/6B7280/white?text=PowerBank",
        description: "10,000 mAh fast charging",
        quantity: 20,
        claimed: 0,
        rarity: "common",
        color: "#6B7280"
      }
    ],
    totalEntries: 10000,
    remainingEntries: 8540,
    userEntries: 3
  },
  {
    id: "2",
    name: "Fashion Week Special",
    description: "Exclusive fashion items from top designers during Fashion Week!",
    startDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    status: "active",
    category: "Fashion",
    sponsor: {
      name: "StyleHub",
      logo: "https://placehold.co/100x40/F59E0B/white?text=StyleHub"
    },
    entryMethods: ["purchase", "engagement"],
    prizes: [
      {
        id: "p5",
        name: "Designer Handbag",
        image: "https://placehold.co/300x300/F59E0B/white?text=Handbag",
        description: "Limited edition designer handbag",
        quantity: 1,
        claimed: 0,
        rarity: "legendary",
        color: "#F59E0B"
      },
      {
        id: "p6",
        name: "Luxury Watch",
        image: "https://placehold.co/300x300/EC4899/white?text=Watch",
        description: "Elegant timepiece for any occasion",
        quantity: 3,
        claimed: 0,
        rarity: "epic",
        color: "#EC4899"
      }
    ],
    totalEntries: 5000,
    remainingEntries: 1200,
    userEntries: 5
  },
  {
    id: "3",
    name: "Gaming Paradise",
    description: "Exclusive gaming gear and accessories for the ultimate gaming setup!",
    startDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    status: "active",
    category: "Gaming",
    sponsor: {
      name: "GamersWorld",
      logo: "https://placehold.co/100x40/EF4444/white?text=GamersWorld"
    },
    entryMethods: ["purchase", "engagement", "direct"],
    prizes: [
      {
        id: "p7",
        name: "Gaming Console",
        image: "https://placehold.co/300x300/EF4444/white?text=Console",
        description: "Next-gen gaming experience",
        quantity: 1,
        claimed: 0,
        rarity: "legendary",
        color: "#EF4444"
      },
      {
        id: "p8",
        name: "Gaming Headset",
        image: "https://placehold.co/300x300/A855F7/white?text=Headset",
        description: "Immersive surround sound",
        quantity: 5,
        claimed: 0,
        rarity: "epic",
        color: "#A855F7"
      }
    ],
    totalEntries: 7500,
    remainingEntries: 4200,
    userEntries: 0
  },
  {
    id: "4",
    name: "Home Essentials",
    description: "Transform your living space with premium home essentials!",
    startDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    status: "upcoming",
    category: "Home & Living",
    sponsor: {
      name: "HomeStyle",
      logo: "https://placehold.co/100x40/059669/white?text=HomeStyle"
    },
    entryMethods: ["purchase", "engagement"],
    prizes: [
      {
        id: "p9",
        name: "Smart Home System",
        image: "https://placehold.co/300x300/059669/white?text=SmartHome",
        description: "Complete smart home automation",
        quantity: 1,
        claimed: 0,
        rarity: "legendary",
        color: "#059669"
      }
    ],
    totalEntries: 3000,
    remainingEntries: 3000,
    userEntries: 0
  },
  {
    id: "5",
    name: "Fitness Challenge",
    description: "Get fit and win amazing fitness equipment and subscriptions!",
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    status: "ended",
    category: "Health & Fitness",
    sponsor: {
      name: "FitLife",
      logo: "https://placehold.co/100x40/0EA5E9/white?text=FitLife"
    },
    entryMethods: ["purchase", "direct"],
    prizes: [
      {
        id: "p10",
        name: "Premium Treadmill",
        image: "https://placehold.co/300x300/0EA5E9/white?text=Treadmill",
        description: "Professional grade home treadmill",
        quantity: 1,
        claimed: 1,
        rarity: "legendary",
        color: "#0EA5E9"
      }
    ],
    totalEntries: 4000,
    remainingEntries: 0,
    userEntries: 8,
    winners: [
      {
        id: "w1",
        userId: "u1",
        username: "fitness_enthusiast",
        avatarUrl: "https://placehold.co/100x100/6366F1/white?text=FE",
        prizeId: "p10",
        prize: {
          id: "p10",
          name: "Premium Treadmill",
          image: "https://placehold.co/300x300/0EA5E9/white?text=Treadmill",
          description: "Professional grade home treadmill",
          quantity: 1,
          claimed: 1,
          rarity: "legendary",
          color: "#0EA5E9"
        },
        claimed: true,
        winDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      }
    ]
  }
];

const LuckyDraw = () => {
  const [activeCampaigns, setActiveCampaigns] = useState<Campaign[]>([]);
  const [upcomingCampaigns, setUpcomingCampaigns] = useState<Campaign[]>([]);
  const [endedCampaigns, setEndedCampaigns] = useState<Campaign[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [currentTab, setCurrentTab] = useState("browse");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortOption, setSortOption] = useState("popular");
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showWinners, setShowWinners] = useState(false);

  // Process campaigns based on their status
  useEffect(() => {
    setActiveCampaigns(campaigns.filter(c => c.status === "active"));
    setUpcomingCampaigns(campaigns.filter(c => c.status === "upcoming"));
    setEndedCampaigns(campaigns.filter(c => c.status === "ended"));
  }, []);

  const sortCampaigns = (campaignsToSort: Campaign[]): Campaign[] => {
    return [...campaignsToSort].sort((a, b) => {
      if (sortOption === "popular") {
        return b.totalEntries - a.totalEntries;
      } else if (sortOption === "ending") {
        return a.endDate.getTime() - b.endDate.getTime();
      } else if (sortOption === "newest") {
        return b.startDate.getTime() - a.startDate.getTime();
      }
      return 0;
    });
  };

  const enterCampaign = (campaign: Campaign, method: 'purchase' | 'engagement' | 'direct' | 'vip') => {
    // In a real app, you would make a Supabase call here
    console.log(`Entering campaign ${campaign.id} via ${method}`);
    
    // Simulate entry
    const updatedCampaigns = activeCampaigns.map(c => {
      if (c.id === campaign.id) {
        return {
          ...c,
          userEntries: c.userEntries + 1,
          remainingEntries: c.remainingEntries - 1
        };
      }
      return c;
    });
    
    setActiveCampaigns(updatedCampaigns);
    
    // If this is the selected campaign, update it too
    if (selectedCampaign && selectedCampaign.id === campaign.id) {
      setSelectedCampaign({
        ...selectedCampaign,
        userEntries: selectedCampaign.userEntries + 1,
        remainingEntries: selectedCampaign.remainingEntries - 1
      });
    }
    
    // Show confetti animation
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
    
    // Show success toast
    toast({
      title: "Entry Confirmed!",
      description: `You've successfully entered ${campaign.name}`,
      duration: 3000,
    });
  };

  const claimPrize = (winnerId: string) => {
    // In a real app, this would update the database
    console.log(`Claiming prize for winner ${winnerId}`);
    
    toast({
      title: "Prize Claimed!",
      description: "Your prize has been claimed successfully.",
      duration: 3000,
    });
  };

  const shareCampaign = (campaign: Campaign) => {
    // Generate a shareable link with referral
    const shareUrl = `${window.location.origin}/lucky-draw?campaign=${campaign.id}&ref=user123`;
    
    // In a real app, you might use the Web Share API
    if (navigator.share) {
      navigator.share({
        title: campaign.name,
        text: campaign.description,
        url: shareUrl,
      });
    } else {
      // Fallback for browsers without Web Share API
      navigator.clipboard.writeText(shareUrl);
      
      toast({
        title: "Link Copied!",
        description: "Share link has been copied to clipboard",
        duration: 3000,
      });
    }
  };

  const formatTimeRemaining = (endDate: Date) => {
    const now = new Date();
    const diff = endDate.getTime() - now.getTime();
    
    if (diff <= 0) return "Ended";
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h left`;
    if (hours > 0) return `${hours}h ${minutes}m left`;
    return `${minutes}m left`;
  };

  const categories = ["All", "Electronics", "Fashion", "Gaming", "Home & Living", "Health & Fitness"];
  
  // Filter campaigns by category
  const filteredCampaigns = categoryFilter === "All" 
    ? activeCampaigns 
    : activeCampaigns.filter(c => c.category === categoryFilter);
  
  // Sort the filtered campaigns
  const sortedCampaigns = sortCampaigns(filteredCampaigns);

  // Confetti component
  const Confetti = () => {
    return (
      <div className="fixed inset-0 pointer-events-none z-50">
        {Array.from({ length: 100 }).map((_, i) => {
          const left = Math.random() * 100;
          const top = Math.random() * 100;
          const size = Math.random() * 10 + 5;
          const color = [
            "#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", 
            "#F15BB5", "#9B5DE5", "#00BBF9", "#00F5D4"
          ][Math.floor(Math.random() * 8)];
          
          return (
            <div
              key={i}
              className="absolute rounded-sm"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                width: `${size}px`,
                height: `${size * 1.5}px`,
                backgroundColor: color,
                transform: `rotate(${Math.random() * 360}deg)`,
                opacity: Math.random(),
                animation: `fall ${Math.random() * 3 + 2}s linear forwards`
              }}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {showConfetti && <Confetti />}
      
      <div className="container mx-auto px-4 py-8 pb-20">
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Gift className="h-6 w-6 text-purple-500" />
              Lucky Draws
            </h1>
            <TabsList>
              <TabsTrigger value="browse">Browse</TabsTrigger>
              <TabsTrigger value="campaign">Campaign</TabsTrigger>
              <TabsTrigger value="winners">Winners</TabsTrigger>
            </TabsList>
          </div>

          {/* Browse Tab - Homepage with carousel and listings */}
          <TabsContent value="browse" className="space-y-8">
            {/* Carousel of Featured Campaigns */}
            <div className="relative overflow-hidden rounded-xl">
              <div className="flex space-x-2 absolute top-4 right-4 z-10">
                <button 
                  onClick={() => setCarouselIndex(prev => (prev > 0 ? prev - 1 : activeCampaigns.length - 1))}
                  className="p-2 bg-black/30 backdrop-blur-sm rounded-full text-white hover:bg-black/50 transition-colors"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button 
                  onClick={() => setCarouselIndex(prev => (prev < activeCampaigns.length - 1 ? prev + 1 : 0))}
                  className="p-2 bg-black/30 backdrop-blur-sm rounded-full text-white hover:bg-black/50 transition-colors"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
              
              {activeCampaigns.length > 0 && (
                <div 
                  className="w-full h-72 sm:h-96 relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 to-blue-500"
                  style={{
                    backgroundImage: activeCampaigns[carouselIndex]?.prizes[0]?.image 
                      ? `url(${activeCampaigns[carouselIndex].prizes[0].image}), linear-gradient(to right, #8B5CF6, #3B82F6)`
                      : "linear-gradient(to right, #8B5CF6, #3B82F6)",
                    backgroundSize: "cover, cover",
                    backgroundPosition: "center, center",
                    backgroundBlendMode: "overlay"
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="flex justify-between items-end">
                      <div className="space-y-2">
                        <Badge className="bg-purple-500 mb-2">
                          Featured
                        </Badge>
                        <h2 className="text-2xl sm:text-3xl font-bold">
                          {activeCampaigns[carouselIndex].name}
                        </h2>
                        <p className="text-white/80 max-w-lg">
                          {activeCampaigns[carouselIndex].description}
                        </p>
                        <div className="flex items-center space-x-4 text-sm mt-2">
                          <div className="flex items-center">
                            <Trophy className="h-4 w-4 mr-1 text-yellow-400" />
                            <span>{activeCampaigns[carouselIndex].prizes.length} prizes</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1 text-red-400" />
                            <span>{formatTimeRemaining(activeCampaigns[carouselIndex].endDate)}</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1 text-blue-400" />
                            <span>{activeCampaigns[carouselIndex].totalEntries.toLocaleString()} entries</span>
                          </div>
                        </div>
                      </div>
                      
                      <Button 
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 border-none"
                        onClick={() => {
                          setSelectedCampaign(activeCampaigns[carouselIndex]);
                          setCurrentTab("campaign");
                        }}
                      >
                        Enter Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Featured Giveaways Section */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  Featured Giveaways
                </h2>
                <Button 
                  variant="ghost" 
                  className="text-sm text-muted-foreground"
                  onClick={() => {/* View all */}}
                >
                  View All
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {activeCampaigns.slice(0, 3).map(campaign => (
                  <Card 
                    key={campaign.id}
                    className="overflow-hidden transition-all duration-300 hover:shadow-lg group"
                  >
                    <div className="relative h-40 bg-gradient-to-r from-indigo-500 to-purple-600">
                      <div className="absolute top-2 right-2 bg-yellow-500 text-yellow-900 font-bold px-3 py-1 rounded-full text-xs flex items-center gap-1 shadow-md">
                        <Star className="h-3 w-3" />
                        <span>Featured</span>
                      </div>
                      
                      {campaign.prizes[0]?.image && (
                        <div className="h-full w-full flex items-center justify-center p-4">
                          <img 
                            src={campaign.prizes[0].image} 
                            alt={campaign.prizes[0].name}
                            className="max-h-full object-contain transition-transform duration-500 group-hover:scale-110" 
                          />
                        </div>
                      )}
                    </div>
                    
                    <CardContent className="p-4">
                      <h3 className="font-bold truncate">{campaign.name}</h3>
                      
                      <div className="flex items-center justify-between my-2 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Tag className="h-4 w-4 mr-1" />
                          <span>{campaign.category}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{formatTimeRemaining(campaign.endDate)}</span>
                        </div>
                      </div>
                      
                      <div className="mt-3 mb-4">
                        <div className="flex justify-between text-xs">
                          <span>Entries remaining</span>
                          <span>{campaign.remainingEntries.toLocaleString()} / {campaign.totalEntries.toLocaleString()}</span>
                        </div>
                        <Progress 
                          value={(campaign.totalEntries - campaign.remainingEntries) / campaign.totalEntries * 100} 
                          className="h-2 mt-1"
                        />
                      </div>
                      
                      <Button 
                        className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                        onClick={() => {
                          setSelectedCampaign(campaign);
                          setCurrentTab("campaign");
                        }}
                      >
                        Enter Now
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
            
            {/* Ending Soon Section */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Clock className="h-5 w-5 text-red-500" />
                  Ending Soon
                </h2>
              </div>
              
              <div className="overflow-x-auto -mx-4 px-4 pb-4">
                <div className="flex gap-4" style={{ minWidth: 'max-content' }}>
                  {sortCampaigns(activeCampaigns).slice(0, 4).map(campaign => {
                    const timeLeft = new Date(campaign.endDate).getTime() - new Date().getTime();
                    const daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
                    
                    if (daysLeft > 3) return null; // Only show campaigns ending in 3 days or less
                    
                    return (
                      <Card 
                        key={campaign.id}
                        className="w-72 overflow-hidden transition-all duration-300 hover:shadow-md"
                      >
                        <div className="relative h-32 bg-gradient-to-r from-red-500 to-orange-500">
                          <div className="absolute top-2 right-2 bg-red-100 text-red-800 font-bold px-3 py-1 rounded-full text-xs flex items-center gap-1 shadow-md animate-pulse">
                            <Clock className="h-3 w-3" />
                            <span>{formatTimeRemaining(campaign.endDate)}</span>
                          </div>
                          
                          {campaign.prizes[0]?.image && (
                            <div className="h-full w-full flex items-center justify-center p-4">
                              <img 
                                src={campaign.prizes[0].image} 
                                alt={campaign.prizes[0].name}
                                className="max-h-full object-contain" 
                              />
                            </div>
                          )}
                        </div>
                        
                        <CardContent className="p-3">
                          <h3 className="font-bold truncate">{campaign.name}</h3>
                          
                          <div className="text-xs text-muted-foreground mt-1 truncate">
                            {campaign.prizes.length} prizes available
                          </div>
                          
                          <Button 
                            className="w-full mt-3" 
                            variant="outline"
                            onClick={() => {
                              setSelectedCampaign(campaign);
                              setCurrentTab("campaign");
                            }}
                          >
                            Enter Now
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </section>
            
            {/* All Lucky Draws Section */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Gift className="h-5 w-5 text-purple-500" />
                  All Lucky Draws
                </h2>
                <div className="flex items-center gap-2">
                  <select 
                    className="text-sm px-2 py-1 rounded-md border bg-background"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  
                  <select 
                    className="text-sm px-2 py-1 rounded-md border bg-background"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                  >
                    <option value="popular">Most Popular</option>
                    <option value="ending">Ending Soon</option>
                    <option value="newest">Newest</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedCampaigns.map(campaign => (
                  <Card 
                    key={campaign.id}
                    className="overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer"
                    onClick={() => {
                      setSelectedCampaign(campaign);
                      setCurrentTab("campaign");
                    }}
                  >
                    <div 
                      className="h-48 bg-cover bg-center"
                      style={{
                        backgroundImage: campaign.prizes[0]?.image 
                          ? `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${campaign.prizes[0].image})`
                          : `linear-gradient(to right, ${campaign.prizes[0]?.color || '#8B5CF6'}, ${campaign.prizes[1]?.color || '#3B82F6'})`
                      }}
                    >
                      <div className="h-full w-full flex flex-col justify-between p-4">
                        <div className="flex justify-between">
                          <Badge className="bg-black/50 text-white backdrop-blur-sm">
                            {campaign.category}
                          </Badge>
                          <Badge className="bg-red-500/80 text-white backdrop-blur-sm flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatTimeRemaining(campaign.endDate)}
                          </Badge>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-bold text-white drop-shadow-md">{campaign.name}</h3>
                          <div className="flex items-center mt-1 text-white/90 text-sm">
                            <Trophy className="h-4 w-4 mr-1" />
                            <span>Top prize: {campaign.prizes[0]?.name}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-sm text-muted-foreground">
                          {campaign.prizes.length} prizes • {campaign.totalEntries.toLocaleString()} entries
                        </div>
                        <div className="flex space-x-1">
                          {campaign.entryMethods.includes('purchase') && (
                            <div className="p-1 rounded-full bg-muted" title="Enter via Purchase">
                              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                            </div>
                          )}
                          {campaign.entryMethods.includes('engagement') && (
                            <div className="p-1 rounded-full bg-muted" title="Enter via Engagement">
                              <MessageSquare className="h-4 w-4 text-muted-foreground" />
                            </div>
                          )}
                          {campaign.entryMethods.includes('direct') && (
                            <div className="p-1 rounded-full bg-muted" title="Direct Entry">
                              <Gift className="h-4 w-4 text-muted-foreground" />
                            </div>
                          )}
                          {campaign.entryMethods.includes('vip') && (
                            <div className="p-1 rounded-full bg-muted" title="VIP Bonus">
                              <Star className="h-4 w-4 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="mt-2">
                        <div className="flex justify-between text-xs">
                          <span>Your entries: {campaign.userEntries}</span>
                          <span>Total: {campaign.totalEntries.toLocaleString()}</span>
                        </div>
                        <Progress 
                          value={(campaign.totalEntries - campaign.remainingEntries) / campaign.totalEntries * 100} 
                          className="h-2 mt-1"
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
            
            {/* Upcoming Campaigns Section */}
            {upcomingCampaigns.length > 0 && (
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-blue-500" />
                    Coming Soon
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {upcomingCampaigns.map(campaign => (
                    <Card 
                      key={campaign.id}
                      className="overflow-hidden transition-all duration-300 hover:shadow-md"
                    >
                      <div className="h-40 bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center">
                        {campaign.prizes[0]?.image ? (
                          <img 
                            src={campaign.prizes[0].image} 
                            alt={campaign.prizes[0].name}
                            className="max-h-full object-contain p-4" 
                          />
                        ) : (
                          <Gift className="h-16 w-16 text-white/80" />
                        )}
                      </div>
                      
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <h3 className="font-bold">{campaign.name}</h3>
                          <Badge className="bg-blue-100 text-blue-800">
                            Upcoming
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                          {campaign.description}
                        </p>
                        
                        <div className="flex items-center justify-between mt-3 text-sm">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1 text-blue-500" />
                            <span>Starts {campaign.startDate.toLocaleDateString()}</span>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              // In a real app, this might save a reminder
                              toast({
                                title: "Reminder Set",
                                description: `We'll notify you when ${campaign.name} begins`,
                                duration: 3000,
                              });
                            }}
                          >
                            Remind Me
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}
          </TabsContent>
          
          {/* Campaign Tab - Individual Lucky Draw page */}
          <TabsContent value="campaign" className="space-y-8">
            {selectedCampaign ? (
              <>
                {/* Hero Section */}
                <div className="relative rounded-xl overflow-hidden">
                  <div 
                    className="h-64 sm:h-80 bg-cover bg-center"
                    style={{
                      backgroundImage: selectedCampaign.prizes[0]?.image 
                        ? `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${selectedCampaign.prizes[0].image})`
                        : `linear-gradient(to right, ${selectedCampaign.prizes[0]?.color || '#8B5CF6'}, ${selectedCampaign.prizes[1]?.color || '#3B82F6'})`
                    }}
                  >
                    <div className="absolute top-4 left-4">
                      <Button 
                        variant="ghost" 
                        className="text-white bg-black/30 backdrop-blur-sm hover:bg-black/50"
                        onClick={() => setCurrentTab("browse")}
                      >
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Back
                      </Button>
                    </div>
                    
                    <div className="absolute top-4 right-4">
                      <Button
                        variant="ghost"
                        className="text-white bg-black/30 backdrop-blur-sm hover:bg-black/50"
                        onClick={() => shareCampaign(selectedCampaign)}
                      >
                        <Share2 className="h-4 w-4 mr-1" />
                        Share
                      </Button>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent p-6 text-white">
                    <Badge className={`mb-2 ${selectedCampaign.status === 'active' ? 'bg-green-500' : selectedCampaign.status === 'upcoming' ? 'bg-blue-500' : 'bg-gray-500'}`}>
                      {selectedCampaign.status === 'active' ? 'ACTIVE' : 
                       selectedCampaign.status === 'upcoming' ? 'UPCOMING' : 'ENDED'}
                    </Badge>
                    
                    <h1 className="text-2xl sm:text-3xl font-bold">{selectedCampaign.name}</h1>
                    
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-2 text-white/80">
                      <div className="flex items-center">
                        <Tag className="h-4 w-4 mr-1" />
                        <span>{selectedCampaign.category}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <Trophy className="h-4 w-4 mr-1" />
                        <span>{selectedCampaign.prizes.length} prizes</span>
                      </div>
                      
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{formatTimeRemaining(selectedCampaign.endDate)}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{selectedCampaign.totalEntries.toLocaleString()} entries</span>
                      </div>
                      
                      {selectedCampaign.sponsor && (
                        <div className="flex items-center">
                          <span className="mr-1">by</span>
                          {selectedCampaign.sponsor.logo ? (
                            <img 
                              src={selectedCampaign.sponsor.logo} 
                              alt={selectedCampaign.sponsor.name}
                              className="h-5 ml-1" 
                            />
                          ) : (
                            <span>{selectedCampaign.sponsor.name}</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-6">
                    {/* Description */}
                    <Card>
                      <CardContent className="p-6">
                        <h2 className="text-xl font-bold mb-4">About This Giveaway</h2>
                        <p className="text-muted-foreground">
                          {selectedCampaign.description}
                        </p>
                        
                        {/* Progress Bar */}
                        <div className="mt-6 space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Entries Remaining</span>
                            <span className="font-medium">{selectedCampaign.remainingEntries.toLocaleString()} / {selectedCampaign.totalEntries.toLocaleString()}</span>
                          </div>
                          <Progress 
                            value={(selectedCampaign.totalEntries - selectedCampaign.remainingEntries) / selectedCampaign.totalEntries * 100} 
                            className="h-3"
                          />
                          <p className="text-xs text-muted-foreground text-right">
                            {Math.round((selectedCampaign.totalEntries - selectedCampaign.remainingEntries) / selectedCampaign.totalEntries * 100)}% claimed
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Prize Breakdown */}
                    <Card>
                      <CardContent className="p-6">
                        <h2 className="text-xl font-bold mb-4">Prize Breakdown</h2>
                        <div className="space-y-4">
                          {selectedCampaign.prizes.map(prize => (
                            <div 
                              key={prize.id} 
                              className="flex items-center gap-4 p-3 rounded-lg transition-colors"
                              style={{ backgroundColor: `${prize.color}10` }}
                            >
                              <div
                                className="h-16 w-16 rounded-md flex items-center justify-center"
                                style={{ backgroundColor: prize.color }}
                              >
                                {prize.image ? (
                                  <img src={prize.image} alt={prize.name} className="h-12 w-12 object-contain" />
                                ) : (
                                  <Award className="h-8 w-8 text-white" />
                                )}
                              </div>
                              
                              <div className="flex-1">
                                <div className="flex items-center">
                                  <h3 className="font-bold">{prize.name}</h3>
                                  <Badge 
                                    className="ml-2"
                                    style={{
                                      backgroundColor: prize.rarity === 'legendary' ? '#FBBF24' :
                                                      prize.rarity === 'epic' ? '#8B5CF6' :
                                                      prize.rarity === 'rare' ? '#3B82F6' : '#6B7280',
                                      color: prize.rarity === 'legendary' ? '#7C2D12' : 'white'
                                    }}
                                  >
                                    {prize.rarity.toUpperCase()}
                                  </Badge>
                                </div>
                                
                                {prize.description && (
                                  <p className="text-sm text-muted-foreground mt-1">{prize.description}</p>
                                )}
                              </div>
                              
                              <div className="text-right">
                                <div className="font-medium">{prize.quantity - prize.claimed} left</div>
                                <div className="text-xs text-muted-foreground mt-1">
                                  {prize.claimed} claimed
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Winner Announcement Section (if campaign has ended) */}
                    {selectedCampaign.status === 'ended' && selectedCampaign.winners && selectedCampaign.winners.length > 0 && (
                      <Card>
                        <CardContent className="p-6">
                          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Trophy className="h-5 w-5 text-yellow-500" />
                            Winners
                          </h2>
                          
                          <div className="space-y-4">
                            {selectedCampaign.winners.map(winner => (
                              <div key={winner.id} className="flex items-center gap-4 p-4 border rounded-lg">
                                <div className="h-12 w-12 rounded-full overflow-hidden bg-muted flex items-center justify-center">
                                  {winner.avatarUrl ? (
                                    <img src={winner.avatarUrl} alt={winner.username} className="h-full w-full object-cover" />
                                  ) : (
                                    <User className="h-6 w-6 text-muted-foreground" />
                                  )}
                                </div>
                                
                                <div className="flex-1">
                                  <div className="font-bold">{winner.username}</div>
                                  <div className="text-sm text-muted-foreground">
                                    Won {winner.prize.name}
                                  </div>
                                </div>
                                
                                <div className="text-right">
                                  <div className="text-sm">
                                    {winner.winDate.toLocaleDateString()}
                                  </div>
                                  <div className={`text-xs ${winner.claimed ? 'text-green-600' : 'text-orange-600'}`}>
                                    {winner.claimed ? 'Claimed' : 'Unclaimed'}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                  
                  <div className="space-y-6">
                    {/* Entry Methods */}
                    <Card>
                      <CardContent className="p-6">
                        <h2 className="text-lg font-bold mb-4">Entry Methods</h2>
                        
                        <div className="space-y-4">
                          {selectedCampaign.status === 'active' ? (
                            <>
                              {selectedCampaign.entryMethods.includes('purchase') && (
                                <Button 
                                  className="w-full flex items-center justify-start gap-2 bg-primary/10 hover:bg-primary/20 text-primary"
                                  variant="outline"
                                  onClick={() => enterCampaign(selectedCampaign, 'purchase')}
                                >
                                  <ShoppingCart className="h-5 w-5" />
                                  <div className="flex-1 text-left">
                                    <div className="font-medium">Enter via Purchase</div>
                                    <div className="text-xs text-muted-foreground">Get 5 entries with any purchase</div>
                                  </div>
                                  <Zap className="h-4 w-4 text-yellow-500" />
                                </Button>
                              )}
                              
                              {selectedCampaign.entryMethods.includes('engagement') && (
                                <Button 
                                  className="w-full flex items-center justify-start gap-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400"
                                  variant="outline"
                                  onClick={() => enterCampaign(selectedCampaign, 'engagement')}
                                >
                                  <MessageSquare className="h-5 w-5" />
                                  <div className="flex-1 text-left">
                                    <div className="font-medium">Enter via Engagement</div>
                                    <div className="text-xs text-muted-foreground">Share or leave a review</div>
                                  </div>
                                  <span className="text-xs font-bold">+1</span>
                                </Button>
                              )}
                              
                              {selectedCampaign.entryMethods.includes('direct') && (
                                <Button 
                                  className="w-full flex items-center justify-start gap-2 bg-green-500/10 hover:bg-green-500/20 text-green-600 dark:text-green-400"
                                  variant="outline"
                                  onClick={() => enterCampaign(selectedCampaign, 'direct')}
                                >
                                  <Gift className="h-5 w-5" />
                                  <div className="flex-1 text-left">
                                    <div className="font-medium">Free Entry</div>
                                    <div className="text-xs text-muted-foreground">One free entry per day</div>
                                  </div>
                                  <span className="text-xs font-bold">+1</span>
                                </Button>
                              )}
                              
                              {selectedCampaign.entryMethods.includes('vip') && (
                                <Button 
                                  className="w-full flex items-center justify-start gap-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-400"
                                  variant="outline"
                                  onClick={() => enterCampaign(selectedCampaign, 'vip')}
                                >
                                  <Star className="h-5 w-5" />
                                  <div className="flex-1 text-left">
                                    <div className="font-medium">VIP Bonus</div>
                                    <div className="text-xs text-muted-foreground">Exclusive for VIP members</div>
                                  </div>
                                  <span className="text-xs font-bold">+3</span>
                                </Button>
                              )}
                            </>
                          ) : selectedCampaign.status === 'upcoming' ? (
                            <div className="text-center py-6">
                              <Calendar className="h-12 w-12 mx-auto text-blue-500 mb-2" />
                              <h3 className="text-lg font-medium">Coming Soon</h3>
                              <p className="text-muted-foreground mt-1">
                                This campaign starts on {selectedCampaign.startDate.toLocaleDateString()}.
                              </p>
                              <Button 
                                className="mt-4" 
                                variant="outline"
                                onClick={() => {
                                  toast({
                                    title: "Reminder Set",
                                    description: `We'll notify you when ${selectedCampaign.name} begins`,
                                    duration: 3000,
                                  });
                                }}
                              >
                                Remind Me
                              </Button>
                            </div>
                          ) : (
                            <div className="text-center py-6">
                              <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                              <h3 className="text-lg font-medium">Campaign Ended</h3>
                              <p className="text-muted-foreground mt-1">
                                This campaign ended on {selectedCampaign.endDate.toLocaleDateString()}.
                              </p>
                              {selectedCampaign.winners && selectedCampaign.winners.length > 0 ? (
                                <Button 
                                  className="mt-4"
                                  onClick={() => setShowWinners(true)}
                                >
                                  View Winners
                                </Button>
                              ) : (
                                <p className="text-sm mt-4">
                                  Winners will be announced soon.
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Your Entries Card */}
                    <Card>
                      <CardContent className="p-6">
                        <h2 className="text-lg font-bold mb-4">Your Entries</h2>
                        
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-muted-foreground">Total Entries</span>
                          <span className="text-2xl font-bold">{selectedCampaign.userEntries}</span>
                        </div>
                        
                        <Progress 
                          value={selectedCampaign.userEntries / 10 * 100} 
                          className="h-2 mb-1"
                        />
                        
                        <p className="text-xs text-muted-foreground text-right mb-4">
                          Recommended: 10+ entries
                        </p>
                        
                        {selectedCampaign.status === 'active' && (
                          <div className="space-y-2">
                            <Button 
                              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                              onClick={() => enterCampaign(selectedCampaign, 'direct')}
                            >
                              <Gift className="mr-2 h-4 w-4" />
                              Enter Now
                            </Button>
                            
                            <Button 
                              className="w-full" 
                              variant="outline"
                              onClick={() => shareCampaign(selectedCampaign)}
                            >
                              <Share2 className="mr-2 h-4 w-4" />
                              Share to Earn Entries
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                    
                    {/* Campaign Details */}
                    <Card>
                      <CardContent className="p-6">
                        <h2 className="text-lg font-bold mb-4">Campaign Details</h2>
                        
                        <div className="space-y-4 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Start Date</span>
                            <span>{selectedCampaign.startDate.toLocaleDateString()}</span>
                          </div>
                          
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">End Date</span>
                            <span>{selectedCampaign.endDate.toLocaleDateString()}</span>
                          </div>
                          
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Total Prizes</span>
                            <span>{selectedCampaign.prizes.reduce((total, prize) => total + prize.quantity, 0)}</span>
                          </div>
                          
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Total Entries</span>
                            <span>{selectedCampaign.totalEntries.toLocaleString()}</span>
                          </div>
                          
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Entry Methods</span>
                            <span>{selectedCampaign.entryMethods.length}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <Gift className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h2 className="text-2xl font-bold mb-2">No Campaign Selected</h2>
                <p className="text-muted-foreground">
                  Please select a lucky draw campaign to view details.
                </p>
                <Button 
                  className="mt-4"
                  onClick={() => setCurrentTab("browse")}
                >
                  Browse Campaigns
                </Button>
              </div>
            )}
          </TabsContent>
          
          {/* Winners Tab */}
          <TabsContent value="winners" className="space-y-8">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              Recent Winners
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {endedCampaigns.flatMap(campaign => 
                campaign.winners?.map(winner => (
                  <Card key={winner.id} className="overflow-hidden">
                    <div className="h-3" style={{ backgroundColor: winner.prize.color }} />
                    <CardContent className="p-4 pt-3">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-full overflow-hidden bg-muted flex items-center justify-center">
                          {winner.avatarUrl ? (
                            <img src={winner.avatarUrl} alt={winner.username} className="h-full w-full object-cover" />
                          ) : (
                            <User className="h-5 w-5 text-muted-foreground" />
                          )}
                        </div>
                        
                        <div>
                          <div className="font-bold">{winner.username}</div>
                          <div className="text-xs text-muted-foreground">
                            Won on {winner.winDate.toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 mt-3 p-3 rounded-lg" style={{ backgroundColor: `${winner.prize.color}15` }}>
                        <div className="h-14 w-14 rounded-md flex items-center justify-center" style={{ backgroundColor: winner.prize.color }}>
                          {winner.prize.image ? (
                            <img src={winner.prize.image} alt={winner.prize.name} className="h-10 w-10 object-contain" />
                          ) : (
                            <Award className="h-8 w-8 text-white" />
                          )}
                        </div>
                        
                        <div>
                          <div className="font-bold">{winner.prize.name}</div>
                          <div className="text-xs mt-1 flex items-center">
                            <Tag className="h-3 w-3 mr-1" />
                            <span>{campaign.name}</span>
                          </div>
                        </div>
                      </div>
                      
                      {winner.claimed ? (
                        <div className="mt-3 text-sm text-green-600 flex items-center justify-center">
                          <Check className="h-4 w-4 mr-1" />
                          Prize Claimed
                        </div>
                      ) : (
                        winner.claimDeadline && (
                          winner.claimDeadline.getTime() > new Date().getTime() ? (
                            <>
                              <div className="mt-3 text-xs text-center text-orange-600">
                                Claim by {winner.claimDeadline.toLocaleDateString()}
                              </div>
                              <Button 
                                className="w-full mt-2"
                                onClick={() => claimPrize(winner.id)}
                              >
                                Claim Prize
                              </Button>
                            </>
                          ) : (
                            <div className="mt-3 text-sm text-red-600 text-center">
                              Claim period expired
                            </div>
                          )
                        )
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
              
              {endedCampaigns.flatMap(campaign => campaign.winners || []).length === 0 && (
                <div className="col-span-full text-center py-12">
                  <Trophy className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Winners Yet</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Enter our lucky draws to see your name on the winners list!
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Floating CTA Button */}
      <div className="fixed bottom-20 right-4 z-10">
        <Button 
          className="shadow-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full px-6 animate-bounce"
          onClick={() => {
            if (activeCampaigns.length > 0) {
              setSelectedCampaign(activeCampaigns[0]);
              setCurrentTab("campaign");
            }
          }}
        >
          <Gift className="mr-2 h-5 w-5" />
          Join Now
        </Button>
      </div>
      
      <Navigation />
    </div>
  );
};

export default LuckyDraw;
