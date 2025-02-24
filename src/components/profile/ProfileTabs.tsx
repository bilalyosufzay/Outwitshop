
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BuyerContent } from "./BuyerContent";
import { SellerContent } from "./SellerContent";

export const ProfileTabs = () => {
  return (
    <Tabs defaultValue="buyer" className="space-y-6">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="buyer">Buyer Profile</TabsTrigger>
        <TabsTrigger value="seller">Seller Dashboard</TabsTrigger>
      </TabsList>

      <TabsContent value="buyer" className="space-y-6 mt-6">
        <BuyerContent />
      </TabsContent>

      <TabsContent value="seller" className="space-y-6 mt-6">
        <SellerContent />
      </TabsContent>
    </Tabs>
  );
};
