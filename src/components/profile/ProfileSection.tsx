
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface ProfileSectionProps {
  title: string;
  description?: string;
  icon: LucideIcon;
  onClick: () => void;
}

export const ProfileSection = ({
  title,
  description,
  icon: Icon,
  onClick,
}: ProfileSectionProps) => {
  return (
    <Button
      variant="outline"
      className="flex items-center gap-4 h-auto py-6 px-6 w-full hover:bg-accent/5 hover:border-accent transition-colors group"
      onClick={onClick}
    >
      <div className="bg-accent/10 p-2.5 rounded-lg group-hover:bg-accent/20 transition-colors">
        <Icon className="h-5 w-5 text-accent" />
      </div>
      <div className="text-left flex-1">
        <div className="font-medium text-base">{title}</div>
        {description && (
          <div className="text-sm text-muted-foreground mt-0.5">{description}</div>
        )}
      </div>
    </Button>
  );
};
