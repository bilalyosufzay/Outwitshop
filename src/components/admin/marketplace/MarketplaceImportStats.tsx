
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, DownloadCloud } from "lucide-react";
import { getMarketplaceAdminStats, triggerMarketplaceImport, triggerScheduledImports } from "@/services/external-products/importApi";
import { toast } from "sonner";

// Import the new components
import StatsCards from "./components/StatsCards";
import MarketplaceTable from "./components/MarketplaceTable";
import ImportInfoBox from "./components/ImportInfoBox";
import LoadingState from "./components/LoadingState";

type MarketplaceStats = {
  marketplace: string;
  productCount: number;
  lastUpdated: string | null;
  status: 'success' | 'pending' | 'error' | 'never';
};

type ImportStats = {
  totalProducts: number;
  lastImport: string | null;
  marketplaces: MarketplaceStats[];
  clicksTracked: number;
  conversionRate: number;
};

const MarketplaceImportStats = () => {
  const [stats, setStats] = useState<ImportStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [importing, setImporting] = useState(false);
  const [selectedMarketplace, setSelectedMarketplace] = useState<string | null>(null);

  const loadStats = async () => {
    setLoading(true);
    try {
      const data = await getMarketplaceAdminStats();
      setStats(data);
    } catch (error) {
      console.error("Failed to load marketplace stats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const handleTriggerImport = async (marketplace: string) => {
    setSelectedMarketplace(marketplace);
    setImporting(true);
    try {
      const result = await triggerMarketplaceImport(marketplace);
      if (result.success) {
        toast.success(`Import for ${marketplace} completed successfully. Added ${result.count || 0} products.`);
        await loadStats(); // Refresh stats
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error(`Error importing from ${marketplace}:`, error);
      toast.error(`Failed to import from ${marketplace}`);
    } finally {
      setImporting(false);
      setSelectedMarketplace(null);
    }
  };

  const handleTriggerAllImports = async () => {
    setImporting(true);
    try {
      const result = await triggerScheduledImports();
      if (result.success) {
        toast.success("Scheduled imports completed successfully");
        await loadStats(); // Refresh stats
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error running scheduled imports:", error);
      toast.error("Failed to run scheduled imports");
    } finally {
      setImporting(false);
    }
  };

  const formatLastUpdated = (lastUpdated: string | null) => {
    if (!lastUpdated) return "Never";
    
    const date = new Date(lastUpdated);
    return date.toLocaleString();
  };

  if (loading) {
    return <LoadingState />;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Marketplace Imports</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={loadStats} disabled={loading}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh Stats
          </Button>
          <Button 
            variant="outline" 
            onClick={handleTriggerAllImports} 
            disabled={importing}
          >
            <DownloadCloud className="mr-2 h-4 w-4" />
            Import All Marketplaces
          </Button>
        </div>
      </div>
      
      {stats && (
        <>
          <StatsCards 
            totalProducts={stats.totalProducts}
            lastImport={stats.lastImport}
            clicksTracked={stats.clicksTracked}
            conversionRate={stats.conversionRate}
          />
          
          <h3 className="text-lg font-medium mb-4">Marketplace Status</h3>
          
          <MarketplaceTable 
            marketplaces={stats.marketplaces}
            importing={importing}
            selectedMarketplace={selectedMarketplace}
            onTriggerImport={handleTriggerImport}
            formatLastUpdated={formatLastUpdated}
          />
          
          <ImportInfoBox />
        </>
      )}
    </div>
  );
};

export default MarketplaceImportStats;
