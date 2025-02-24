
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface LivestreamCardProps {
  index: number;
  shopName: string;
}

export const LivestreamCard = ({ index, shopName }: LivestreamCardProps) => {
  return (
    <Card className="relative overflow-hidden">
      <CardContent className="p-0">
        <img 
          src={`https://picsum.photos/seed/${index + 10}/400/300`} 
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
          <h3 className="font-medium">Product Showcase #{index + 1}</h3>
          <p className="text-sm text-muted-foreground">{shopName}</p>
          <Button variant="secondary" size="sm" className="mt-2 w-full">
            Join Stream
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
