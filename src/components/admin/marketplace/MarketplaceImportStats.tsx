
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RefreshCw, DownloadCloud, AlertCircle } from "lucide-react";
import { getMarketplaceAdminStats, triggerMarketplaceImport, triggerScheduledImports } from "@/services/external-products/importApi";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { getAvailableMarketplaces } from "@/services/external-products/marketplaceUtils";
import { toast } from "sonner";

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

  // Map status to badge variant
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge variant="outline" className="bg-green-100 text-green-800">Success</Badge>;
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      case 'never':
      default:
        return <Badge variant="outline" className="bg-gray-100">Never run</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="p-6 bg-white rounded-lg shadow">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Marketplace Imports</h2>
          <Button variant="outline" disabled>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refreshing...
          </Button>
        </div>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4 w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="h-24 bg-gray-200 rounded"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
          </div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="p-4">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Total Products</h3>
              <p className="text-2xl font-bold">{stats.totalProducts.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-2">
                Last import: {formatLastUpdated(stats.lastImport)}
              </p>
            </Card>
            <Card className="p-4">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Clicks Tracked</h3>
              <p className="text-2xl font-bold">{stats.clicksTracked.toLocaleString()}</p>
            </Card>
            <Card className="p-4">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Conversion Rate</h3>
              <p className="text-2xl font-bold">{(stats.conversionRate * 100).toFixed(2)}%</p>
            </Card>
          </div>
          
          <h3 className="text-lg font-medium mb-4">Marketplace Status</h3>
          <div className="border rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marketplace</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {stats.marketplaces.map((marketplace) => (
                  <tr key={marketplace.marketplace}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium">{marketplace.marketplace}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {marketplace.productCount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatLastUpdated(marketplace.lastUpdated)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(marketplace.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Button 
                        variant="secondary"
                        size="sm"
                        onClick={() => handleTriggerImport(marketplace.marketplace)}
                        disabled={importing && selectedMarketplace === marketplace.marketplace}
                      >
                        {importing && selectedMarketplace === marketplace.marketplace ? (
                          <>
                            <RefreshCw className="mr-2 h-3 w-3 animate-spin" />
                            Importing...
                          </>
                        ) : (
                          <>
                            <DownloadCloud className="mr-2 h-3 w-3" />
                            Import
                          </>
                        )}
                      </Button>
                    </td>
                  </tr>
                ))}
                
                {/* Show all available marketplaces that aren't in stats yet */}
                {getAvailableMarketplaces().filter(
                  m => !stats.marketplaces.some(sm => sm.marketplace === m.id)
                ).map(marketplace => (
                  <tr key={marketplace.id} className="bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium">{marketplace.id}</div>
                      <span className="text-xs text-gray-500">Not imported yet</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">0</td>
                    <td className="px-6 py-4 whitespace-nowrap">Never</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge('never')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Button 
                        variant="secondary"
                        size="sm"
                        onClick={() => handleTriggerImport(marketplace.id)}
                        disabled={importing && selectedMarketplace === marketplace.id}
                      >
                        {importing && selectedMarketplace === marketplace.id ? (
                          <>
                            <RefreshCw className="mr-2 h-3 w-3 animate-spin" />
                            Importing...
                          </>
                        ) : (
                          <>
                            <DownloadCloud className="mr-2 h-3 w-3" />
                            Import
                          </>
                        )}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-8 bg-gray-50 p-4 rounded-lg border">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
              <div>
                <h4 className="font-medium">Automated Imports</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Products are automatically imported every 12 hours. You can also manually trigger
                  imports for specific marketplaces using the buttons above.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MarketplaceImportStats;

