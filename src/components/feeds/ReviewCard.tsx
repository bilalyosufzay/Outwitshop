
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ReviewCardProps {
  index: number;
  shopName: string;
}

export const ReviewCard = ({ index, shopName }: ReviewCardProps) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <Avatar>
            <AvatarImage src={`https://avatar.vercel.sh/${index}`} />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">User {index + 1}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Reviewed <span className="font-medium text-primary">{shopName}</span>
                </p>
                <p className="text-sm text-muted-foreground">2 hours ago</p>
              </div>
              <div className="flex text-yellow-400 text-sm">
                {'★'.repeat(5 - index)}{'☆'.repeat(index)}
              </div>
            </div>
            <p className="mt-2">
              Great product! The quality exceeded my expectations. Would definitely recommend to others.
            </p>
            <img 
              src={`https://picsum.photos/seed/${index}/400/300`} 
              alt="Product review" 
              className="mt-3 rounded-lg w-full h-48 object-cover"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
