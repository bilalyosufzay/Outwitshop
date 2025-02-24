
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { ArrowLeft, BarChart2 } from "lucide-react";

const Polls = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-4 py-6">
        <Button
          variant="ghost"
          size="icon"
          className="mb-4"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        
        <h1 className="text-2xl font-bold mb-6">Community Polls</h1>
        
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Participate in community polls and share your opinion.
          </p>
          
          {/* Placeholder for future polls content */}
          <div className="rounded-lg border p-4 flex flex-col items-center justify-center space-y-4">
            <BarChart2 className="h-12 w-12 text-muted-foreground" />
            <p className="text-muted-foreground text-center">
              No active polls at the moment
            </p>
            <Button>Create Poll</Button>
          </div>
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default Polls;
