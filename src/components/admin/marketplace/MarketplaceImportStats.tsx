
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Loader, RefreshCw, ShoppingBag, ExternalLink, BarChart3, Tag } from "lucide-react";
import { toast } from "sonner";
import { getMarketplaceAdminStats, triggerScheduledImports } from "@/services/externalProductsService";

export function MarketplaceImportStats() {
  const [stats, setStats] = useState<any>(null);
  const [recentImports, setRecentImports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [importRunning, setImportRunning] = useState(false);

  // Load stats on component mount
  useEffect(() => {
    loadStats();
  }, []);

  // Function to load admin statistics
  const loadStats = async () => {
    try {
      setLoading(true);
      const data = await getMarketplaceAdminStats();
      setStats(data.stats);
      setRecentImports(data.recentImports);
    } catch (error) {
      console.error("Failed to load marketplace stats:", error);
      toast.error("Failed to load marketplace statistics");
    } finally {
      setLoading(false);
    }
  };

  // Function to refresh statistics
  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      await loadStats();
      toast.success("Statistics refreshed");
    } catch (error) {
      // Error already handled in loadStats
    } finally {
      setRefreshing(false);
    }
  };

  // Function to trigger imports
  const handleRunImports = async () => {
    try {
      setImportRunning(true);
      const result = await triggerScheduledImports();
      
      if (result.success) {
        toast.success("Import process started", {
          description: "It may take a few minutes to complete"
        });
        
        // Set a timeout to refresh stats after 30 seconds
        setTimeout(() => {
          loadStats();
        }, 30000);
      } else {
        toast.error("Failed to start import process");
      }
    } catch (error) {
      toast.error("Failed to run imports");
      console.error("Import error:", error);
    } finally {
      setImportRunning(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader className="h-8 w-8 animate-spin text-muted-foreground" />
        <span className="ml-2 text-muted-foreground">Loading marketplace statistics...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Marketplace Import Dashboard</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            disabled={refreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            onClick={handleRunImports}
            disabled={importRunning}
          >
            <ShoppingBag className="h-4 w-4 mr-2" />
            Run Imports
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats && stats.map((stat: any) => (
          <Card key={stat.marketplace}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg capitalize">{stat.marketplace}</CardTitle>
                <Badge variant="outline">{stat.productCount} products</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground flex items-center">
                    <ExternalLink className="h-3 w-3 mr-1" /> Clicks
                  </span>
                  <span className="font-medium">{stat.clicks}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground flex items-center">
                    <Tag className="h-3 w-3 mr-1" /> Conversions
                  </span>
                  <span className="font-medium">{stat.conversions}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground flex items-center">
                    <BarChart3 className="h-3 w-3 mr-1" /> Conversion Rate
                  </span>
                  <span className="font-medium">{stat.conversionRate.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t">
                  <span className="text-muted-foreground">Commission</span>
                  <span className="font-medium">${stat.commission.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Import Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto max-h-[300px]">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-2">Date</th>
                  <th className="text-left py-2 px-2">Status</th>
                  <th className="text-left py-2 px-2">Marketplaces</th>
                  <th className="text-left py-2 px-2">Details</th>
                </tr>
              </thead>
              <tbody>
                {recentImports.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-4 text-muted-foreground">
                      No recent import activity found
                    </td>
                  </tr>
                ) : (
                  recentImports.map((log: any) => (
                    <tr key={log.id} className="border-b hover:bg-muted/30">
                      <td className="py-2 px-2 text-sm">
                        {new Date(log.created_at).toLocaleString()}
                      </td>
                      <td className="py-2 px-2">
                        <Badge 
                          variant={log.status === 'completed' ? 'success' : 
                                  log.status === 'started' ? 'default' : 'destructive'}
                        >
                          {log.status}
                        </Badge>
                      </td>
                      <td className="py-2 px-2 text-sm">
                        {log.marketplaces.map((m: string) => (
                          <Badge key={m} variant="outline" className="mr-1 capitalize">
                            {m}
                          </Badge>
                        ))}
                      </td>
                      <td className="py-2 px-2 text-sm text-muted-foreground">
                        {log.details}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default MarketplaceImportStats;
