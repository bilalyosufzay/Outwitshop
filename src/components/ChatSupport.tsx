
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader, MessageCircle, X } from "lucide-react";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

export const ChatSupport = () => {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversations, setConversations] = useState<any[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (user && open) {
      loadChatHistory();
    }
  }, [user, open]);

  const loadChatHistory = async () => {
    try {
      const { data, error } = await supabase
        .from("chat_conversations")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) throw error;
      setConversations(data || []);
    } catch (error) {
      console.error("Error loading chat history:", error);
      toast.error("Failed to load chat history");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !user) return;

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("chat-support", {
        body: { message, userId: user.id },
      });

      if (error) throw error;

      setMessage("");
      await loadChatHistory();
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-20 right-4 h-12 w-12 rounded-full shadow-lg md:bottom-4"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[90vw] sm:w-[440px]">
        <SheetHeader className="border-b pb-4">
          <SheetTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Chat Support
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-12rem)] py-4">
          <div className="flex flex-col gap-4">
            {conversations.map((conv) => (
              <div key={conv.id} className="space-y-2">
                <div className="flex justify-end">
                  <div className="rounded-lg bg-primary px-4 py-2 text-primary-foreground">
                    {conv.message}
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="rounded-lg bg-muted px-4 py-2">
                    {conv.response}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <form
          onSubmit={handleSubmit}
          className="absolute bottom-0 left-0 right-0 border-t bg-background p-4"
        >
          <div className="flex gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <Loader className="h-4 w-4 animate-spin" />
              ) : (
                "Send"
              )}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};
