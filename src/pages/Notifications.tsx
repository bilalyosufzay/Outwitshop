
import { useAuth } from "@/contexts/AuthContext";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Bell, Package, Tag, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Notifications = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const notifications = [
    {
      id: 1,
      title: "Order Update",
      description: "Your order #1234 has been shipped",
      time: "2 hours ago",
      icon: Package,
      read: false,
    },
    {
      id: 2,
      title: "Price Drop Alert",
      description: "An item in your wishlist is now on sale",
      time: "5 hours ago",
      icon: Tag,
      read: false,
    },
    {
      id: 3,
      title: "New Follower",
      description: "John Doe started following you",
      time: "1 day ago",
      icon: Heart,
      read: true,
    },
  ];

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

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Notifications</h1>
          <Button variant="outline" size="sm">
            Mark all as read
          </Button>
        </div>

        <div className="space-y-4">
          {notifications.map((notification) => (
            <Card key={notification.id} className={notification.read ? "opacity-60" : ""}>
              <CardContent className="flex items-start gap-4 p-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <notification.icon className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{notification.title}</h3>
                    {!notification.read && (
                      <Badge variant="default" className="bg-primary/10 text-primary hover:bg-primary/20">
                        New
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {notification.description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {notification.time}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default Notifications;
