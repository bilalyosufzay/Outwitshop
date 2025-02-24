
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { ArrowLeft } from "lucide-react";

const QASessions = () => {
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
        
        <h1 className="text-2xl font-bold mb-6">Q&A Sessions</h1>
        
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Join live Q&A sessions with experts and fellow community members.
          </p>
          
          {/* Placeholder for future Q&A session content */}
          <div className="rounded-lg border p-4 text-center text-muted-foreground">
            No active Q&A sessions at the moment.
          </div>
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default QASessions;
