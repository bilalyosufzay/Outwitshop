
import React from 'react';
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

const LoadingState: React.FC = () => {
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
};

export default LoadingState;
