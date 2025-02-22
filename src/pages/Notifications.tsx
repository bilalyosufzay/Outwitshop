
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, ShoppingBag, Heart, MessageSquare, Gift } from "lucide-react";
import Navigation from "@/components/Navigation";

export default function Notifications() {
  const notifications = [
    {
      id: 1,
      title: "Order Delivered",
      message: "Your order #123 has been delivered",
      time: "2 hours ago",
      type: "order",
      read: false,
    },
    {
      id: 2,
      title: "New Message",
      message: "You have a new message from Seller",
      time: "5 hours ago",
      type: "message",
      read: true,
    },
    // Add more notifications as needed
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <ShoppingBag className="w-4 h-4" />;
      case 'message':
        return <MessageSquare className="w-4 h-4" />;
      case 'wishlist':
        return <Heart className="w-4 h-4" />;
      case 'reward':
        return <Gift className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Notifications</h1>
          <Badge variant="outline" className="py-1">
            {notifications.filter(n => !n.read).length} unread
          </Badge>
        </div>

        <Card>
          <CardContent className="p-0">
            <ScrollArea className="h-[600px] p-4">
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 rounded-lg border ${
                      !notification.read ? 'bg-accent/5 border-accent' : 'bg-background'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-full ${!notification.read ? 'bg-accent/10' : 'bg-muted'}`}>
                        {getIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{notification.title}</h3>
                          <span className="text-sm text-muted-foreground">
                            {notification.time}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {notification.message}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
      <Navigation />
    </div>
  );
}
