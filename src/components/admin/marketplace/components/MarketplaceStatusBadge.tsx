
import React from 'react';
import { Badge } from "@/components/ui/badge";

type StatusBadgeProps = {
  status: string;
};

const MarketplaceStatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
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

export default MarketplaceStatusBadge;
