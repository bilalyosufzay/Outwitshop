
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Connections = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Profile
        </Button>

        <h1 className="text-2xl font-bold mb-6">Following & Followers</h1>

        <Tabs defaultValue="followers" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="followers">Followers</TabsTrigger>
            <TabsTrigger value="following">Following</TabsTrigger>
          </TabsList>

          <TabsContent value="followers" className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground text-center">No followers yet.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="following" className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground text-center">Not following anyone yet.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Navigation />
    </div>
  );
};

export default Connections;
