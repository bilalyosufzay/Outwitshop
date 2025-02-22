
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
      className="flex items-center gap-2 h-auto py-4 w-full"
      onClick={onClick}
    >
      <Icon className="h-5 w-5" />
      <div className="text-left">
        <div className="font-medium">{title}</div>
        {description && (
          <div className="text-sm text-muted-foreground">{description}</div>
        )}
      </div>
    </Button>
  );
};
