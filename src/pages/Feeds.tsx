
import { Header } from "@/components/Header";
import Navigation from "@/components/Navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Video } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

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
            {/* Sample Product Reviews */}
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarImage src={`https://avatar.vercel.sh/${i}`} />
                      <AvatarFallback>UN</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">User {i + 1}</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Reviewed <span className="font-medium text-primary">{sampleShops[i % sampleShops.length].name}</span>
                          </p>
                          <p className="text-sm text-muted-foreground">2 hours ago</p>
                        </div>
                        <div className="flex text-yellow-400 text-sm">
                          {'★'.repeat(5 - i)}{'☆'.repeat(i)}
                        </div>
                      </div>
                      <p className="mt-2">
                        Great product! The quality exceeded my expectations. Would definitely recommend to others.
                      </p>
                      <img 
                        src={`https://picsum.photos/seed/${i}/400/300`} 
                        alt="Product review" 
                        className="mt-3 rounded-lg w-full h-48 object-cover"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="livestreams" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="relative overflow-hidden">
                  <CardContent className="p-0">
                    <img 
                      src={`https://picsum.photos/seed/${i + 10}/400/300`} 
                      alt="Live stream thumbnail" 
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                        <span className="w-2 h-2 bg-white rounded-full animate-pulse inline-block"></span>
                        LIVE
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium">Product Showcase #{i + 1}</h3>
                      <p className="text-sm text-muted-foreground">{sampleShops[i % sampleShops.length].name}</p>
                      <Button variant="secondary" size="sm" className="mt-2 w-full">
                        Join Stream
                      </Button>
                    </div>
                  </CardContent>
                </Card>
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
