
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export const AccountStatus = () => {
  return (
    <Card className="border-none shadow-none bg-accent/5 p-4">
      <CardContent className="p-0 flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="font-semibold">Account Status</h3>
          <p className="text-sm text-muted-foreground">Your account is in good standing</p>
        </div>
        <Badge variant="default" className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
          Active
        </Badge>
      </CardContent>
    </Card>
  );
};
