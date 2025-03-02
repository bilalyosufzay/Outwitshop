
import React from 'react';
import { Card } from "@/components/ui/card";

type StatsCardProps = {
  totalProducts: number;
  lastImport: string | null;
  clicksTracked: number;
  conversionRate: number;
};

const formatLastUpdated = (lastUpdated: string | null) => {
  if (!lastUpdated) return "Never";
  
  const date = new Date(lastUpdated);
  return date.toLocaleString();
};

const StatsCards: React.FC<StatsCardProps> = ({
  totalProducts,
  lastImport,
  clicksTracked,
  conversionRate
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card className="p-4">
        <h3 className="text-sm font-medium text-gray-500 mb-1">Total Products</h3>
        <p className="text-2xl font-bold">{totalProducts.toLocaleString()}</p>
        <p className="text-xs text-gray-500 mt-2">
          Last import: {formatLastUpdated(lastImport)}
        </p>
      </Card>
      <Card className="p-4">
        <h3 className="text-sm font-medium text-gray-500 mb-1">Clicks Tracked</h3>
        <p className="text-2xl font-bold">{clicksTracked.toLocaleString()}</p>
      </Card>
      <Card className="p-4">
        <h3 className="text-sm font-medium text-gray-500 mb-1">Conversion Rate</h3>
        <p className="text-2xl font-bold">{(conversionRate * 100).toFixed(2)}%</p>
      </Card>
    </div>
  );
};

export default StatsCards;
