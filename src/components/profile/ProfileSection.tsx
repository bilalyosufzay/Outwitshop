
import { Card, CardContent } from "@/components/ui/card";

interface ProfileSectionProps {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick: () => void;
}

export const ProfileSection = ({ title, icon: Icon, onClick }: ProfileSectionProps) => (
  <Card className="cursor-pointer hover:bg-accent/5" onClick={onClick}>
    <CardContent className="flex items-center gap-3 p-4">
      <Icon className="h-5 w-5 text-muted-foreground" />
      <span className="text-sm font-medium">{title}</span>
    </CardContent>
  </Card>
);
