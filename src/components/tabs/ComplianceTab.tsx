import React from 'react';
import { AreaStatement } from '../../types';
import { AlertTriangle } from 'lucide-react';

interface ComplianceTabProps {
  data: AreaStatement;
}

const ComplianceTab: React.FC<ComplianceTabProps> = ({ data }) => {
  // No compliance data in the new AreaStatement structure
  return (
    <div className="text-center py-12">
      <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">No Compliance Data</h3>
      <p className="text-gray-500">
        Compliance information is not available in the new area statement format.
      </p>
    </div>
  );
};

export default ComplianceTab; 