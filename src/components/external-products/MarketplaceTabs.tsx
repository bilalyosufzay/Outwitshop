
import { useTranslation } from "react-i18next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAvailableMarketplacesForCountry } from "@/services/externalProductsService";

interface MarketplaceTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  country: string;
}

const MarketplaceTabs = ({ activeTab, onTabChange, country }: MarketplaceTabsProps) => {
  const { t } = useTranslation();
  
  // Get available marketplaces for selected country
  const availableMarketplaces = getAvailableMarketplacesForCountry(country);

  return (
    <Tabs value={activeTab} onValueChange={onTabChange}>
      <TabsList className="w-full justify-start overflow-x-auto">
        <TabsTrigger value="all">{t("external_products.all_platforms", "All Platforms")}</TabsTrigger>
        
        {/* Dynamically generate tabs based on available marketplaces */}
        {availableMarketplaces.map((marketplace) => (
          <TabsTrigger key={marketplace.id} value={marketplace.id}>
            {marketplace.name}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default MarketplaceTabs;
