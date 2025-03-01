
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Gift, Share2, ShoppingCart, CreditCard } from "lucide-react";

interface WelcomeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const WelcomeDialog = ({ open, onOpenChange }: WelcomeDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto bg-gradient-to-b from-purple-50 to-white dark:from-purple-950 dark:to-slate-900">
        <DialogHeader className="text-center">
          <DialogTitle className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            🎉 WELCOME TO OUTWIT SHOP LUCKY DRAW! 🎉
          </DialogTitle>
          <p className="text-sm sm:text-base font-semibold text-purple-600 dark:text-purple-400 mt-1">
            🚀 Your chance to win BIG starts now! 🚀
          </p>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <h3 className="text-lg font-bold text-center text-slate-800 dark:text-slate-200">
            💰 How to Enter the Lucky Draw?
          </h3>

          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-purple-50 dark:bg-purple-900/30">
              <div className="bg-purple-100 dark:bg-purple-800 p-2 rounded-full">
                <ShoppingCart className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="font-semibold text-slate-800 dark:text-slate-200">
                  ✅ BUY ENTRY SLOTS
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Purchase Lucky Draw entries by buying eligible products! Each item gives you a specific number of entry slots. More entries = Higher chances to WIN!
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/30">
              <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded-full">
                <Share2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="font-semibold text-slate-800 dark:text-slate-200">
                  👥 REFER & ENTER
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Share your unique referral link! Once 50 friends sign up through your link, you get 1 FREE Lucky Draw entry!
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-900/30">
              <div className="bg-green-100 dark:bg-green-800 p-2 rounded-full">
                <CreditCard className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="font-semibold text-slate-800 dark:text-slate-200">
                  💳 SPEND & ENTER
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Make a purchase of $300 or more in a single order and instantly receive 1 Lucky Draw entry!
                </p>
              </div>
            </div>
          </div>

          <p className="text-center font-bold text-purple-600 dark:text-purple-400">
            🎊 More entries = More chances to WIN! 🎊
          </p>

          <p className="text-center font-semibold text-slate-800 dark:text-slate-200">
            🔥 Exciting prizes are waiting for YOU! 🔥
          </p>
        </div>

        <DialogFooter>
          <Button 
            className="w-full py-6 text-lg bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600"
            onClick={() => onOpenChange(false)}
          >
            <Gift className="mr-2 h-5 w-5" />
            🚀 ENTER NOW 🚀
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeDialog;
