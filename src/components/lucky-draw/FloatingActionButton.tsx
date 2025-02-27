
import { Button } from "@/components/ui/button";
import { Gift } from "lucide-react";

interface FloatingActionButtonProps {
  text: string;
  onClick: () => void;
}

export const FloatingActionButton = ({ text, onClick }: FloatingActionButtonProps) => {
  return (
    <Button
      className="fixed bottom-20 right-4 shadow-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white animate-bounce-slow z-20"
      onClick={onClick}
    >
      <Gift className="mr-2 h-5 w-5" />
      {text}
    </Button>
  );
};
