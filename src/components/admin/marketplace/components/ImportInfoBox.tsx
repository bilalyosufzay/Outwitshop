
import React from 'react';
import { AlertCircle } from "lucide-react";

const ImportInfoBox: React.FC = () => {
  return (
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
  );
};

export default ImportInfoBox;
