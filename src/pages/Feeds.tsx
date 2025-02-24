
import { Header } from "@/components/Header";
import Navigation from "@/components/Navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Video } from "lucide-react";
import { ReviewForm } from "@/components/feeds/ReviewForm";
import { ReviewCard } from "@/components/feeds/ReviewCard";
import { LivestreamCard } from "@/components/feeds/LivestreamCard";

const Feeds = () => {
  const sampleShops = [
    { id: 1, name: "Tech Haven" },
    { id: 2, name: "Fashion Corner" },
    { id: 3, name: "Home Essentials" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <Tabs defaultValue="reviews" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="reviews" className="flex-1">
              <MessageSquare className="w-4 h-4 mr-2" />
              Reviews
            </TabsTrigger>
            <TabsTrigger value="livestreams" className="flex-1">
              <Video className="w-4 h-4 mr-2" />
              Live Streams
            </TabsTrigger>
          </TabsList>

          <TabsContent value="reviews" className="mt-4 space-y-4">
            <ReviewForm shops={sampleShops} />
            
            {Array.from({ length: 3 }).map((_, i) => (
              <ReviewCard 
                key={i}
                index={i}
                shopName={sampleShops[i % sampleShops.length].name}
              />
            ))}
          </TabsContent>

          <TabsContent value="livestreams" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <LivestreamCard
                  key={i}
                  index={i}
                  shopName={sampleShops[i % sampleShops.length].name}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Navigation />
    </div>
  );
};

export default Feeds;
