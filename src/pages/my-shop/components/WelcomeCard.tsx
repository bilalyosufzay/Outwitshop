
import { Button } from "@/components/ui/button";
import { AlertCircle, Building2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface WelcomeCardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const WelcomeCard = ({ open, onOpenChange }: WelcomeCardProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Welcome to Seller Center
          </DialogTitle>
          <DialogDescription>
            Before creating your shop, please ensure you have the following information ready.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-semibold">Required Information</h3>
            <ul className="grid gap-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                Valid government-issued ID card
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                Business license (if applicable)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                Contact email and phone number
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                Physical business address
              </li>
            </ul>
          </div>

          <div className="bg-muted/50 p-4 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <p className="font-medium">Verification Process</p>
              <p>Your shop application will be reviewed within 1-2 business days. We'll verify your information to ensure a safe marketplace for all users.</p>
            </div>
          </div>

          <DialogFooter>
            <Button 
              onClick={() => {
                onOpenChange(false);
                toast.info("Please fill in all required information carefully");
              }} 
              className="w-full"
            >
              Continue to Shop Creation
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};
