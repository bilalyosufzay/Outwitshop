
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Star, Trophy, AlertCircle, Gift, HelpCircle, Users } from "lucide-react";

export const DrawInfo = () => {
  return (
    <div className="mt-6">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-sm">How to Earn Entries</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <Star className="h-4 w-4 text-yellow-500 mt-0.5" />
                <span>Complete daily check-ins to earn entries</span>
              </div>
              <div className="flex items-start gap-2">
                <Trophy className="h-4 w-4 text-yellow-500 mt-0.5" />
                <span>Write product reviews to earn bonus entries</span>
              </div>
              <div className="flex items-start gap-2">
                <Users className="h-4 w-4 text-yellow-500 mt-0.5" />
                <span>Invite friends to join and earn entries for each referral</span>
              </div>
              <div className="flex items-start gap-2">
                <Gift className="h-4 w-4 text-yellow-500 mt-0.5" />
                <span>Make purchases to automatically earn entries</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-sm">Prize Claims & Delivery</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• Winners must claim prizes within 7 days</p>
              <p>• Digital prizes will be delivered instantly</p>
              <p>• Physical prizes require shipping information</p>
              <p>• Unclaimed prizes may be returned to the prize pool</p>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-3">
          <AccordionTrigger className="text-sm">Frequently Asked Questions</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-medium flex items-center gap-1">
                  <HelpCircle className="h-3 w-3" />
                  How are winners selected?
                </p>
                <p className="text-muted-foreground mt-1">Winners are selected randomly from all eligible entries, ensuring fair chances for all participants.</p>
              </div>
              
              <div>
                <p className="font-medium flex items-center gap-1">
                  <HelpCircle className="h-3 w-3" />
                  Can I win multiple prizes?
                </p>
                <p className="text-muted-foreground mt-1">Yes, you can win multiple prizes across different campaigns, but usually only one prize per individual campaign.</p>
              </div>
              
              <div>
                <p className="font-medium flex items-center gap-1">
                  <HelpCircle className="h-3 w-3" />
                  Do entries expire?
                </p>
                <p className="text-muted-foreground mt-1">Entries are valid for the duration of each campaign and expire when the campaign ends.</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
