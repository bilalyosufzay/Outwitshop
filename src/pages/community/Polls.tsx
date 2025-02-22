
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Polls = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data: polls, isLoading } = useQuery({
    queryKey: ['polls'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('polls')
        .select('*')
        .eq('status', 'active');

      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-48 bg-accent/10 rounded" />
            <div className="h-32 bg-accent/10 rounded" />
          </div>
        </div>
        <Navigation />
      </div>
    );
  }

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
          <h1 className="text-2xl font-bold">Community Polls</h1>
          <Button onClick={() => navigate('/polls/create')}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Poll
          </Button>
        </div>

        <div className="space-y-6">
          {polls?.length === 0 ? (
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground text-center">No active polls found.</p>
              </CardContent>
            </Card>
          ) : (
            polls?.map((poll) => (
              <Card key={poll.id}>
                <CardHeader>
                  <CardTitle>{poll.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{poll.description}</p>
                  <div className="space-y-2">
                    {Object.entries(poll.options).map(([key, value]) => (
                      <Button
                        key={key}
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => navigate(`/polls/${poll.id}`)}
                      >
                        {value as string}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default Polls;
