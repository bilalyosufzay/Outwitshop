
import React from 'react';
import { Button } from "@/components/ui/button";
import { RefreshCw, DownloadCloud } from "lucide-react";
import MarketplaceStatusBadge from './MarketplaceStatusBadge';
import { getAvailableMarketplacesForCountry } from "@/services/external-products/marketplaceUtils";

type MarketplaceStats = {
  marketplace: string;
  productCount: number;
  lastUpdated: string | null;
  status: 'success' | 'pending' | 'error' | 'never';
};

type MarketplaceTableProps = {
  marketplaces: MarketplaceStats[];
  importing: boolean;
  selectedMarketplace: string | null;
  onTriggerImport: (marketplace: string) => void;
  formatLastUpdated: (lastUpdated: string | null) => string;
};

const MarketplaceTable: React.FC<MarketplaceTableProps> = ({
  marketplaces,
  importing,
  selectedMarketplace,
  onTriggerImport,
  formatLastUpdated
}) => {
  return (
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
          {marketplaces.map((marketplace) => (
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
                <MarketplaceStatusBadge status={marketplace.status} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Button 
                  variant="secondary"
                  size="sm"
                  onClick={() => onTriggerImport(marketplace.marketplace)}
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
          {getAvailableMarketplacesForCountry('US').filter(
            m => !marketplaces.some(sm => sm.marketplace === m.id)
          ).map(marketplace => (
            <tr key={marketplace.id} className="bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="font-medium">{marketplace.id}</div>
                <span className="text-xs text-gray-500">Not imported yet</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">0</td>
              <td className="px-6 py-4 whitespace-nowrap">Never</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <MarketplaceStatusBadge status="never" />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Button 
                  variant="secondary"
                  size="sm"
                  onClick={() => onTriggerImport(marketplace.id)}
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
  );
};

export default MarketplaceTable;
