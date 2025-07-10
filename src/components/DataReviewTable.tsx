import React from 'react';
import { AreaStatement } from '../types';

interface DataReviewTableProps {
  data: AreaStatement;
  onChange: (updated: AreaStatement) => void;
}

// Helper to render nested fields as editable rows
function renderEditableRows(obj: any, path: string[] = [], onChange: (path: string[], value: any) => void) {
  return Object.entries(obj).map(([key, value]) => {
    const currentPath = [...path, key];
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      return (
        <React.Fragment key={currentPath.join('.')}>
          <tr className="bg-gray-100">
            <td colSpan={2} className="font-semibold pl-2">{currentPath.join(' > ')}</td>
          </tr>
          {renderEditableRows(value, currentPath, onChange)}
        </React.Fragment>
      );
    } else if (
      typeof value === 'string' ||
      typeof value === 'number' ||
      typeof value === 'boolean' ||
      value === null ||
      value === undefined
    ) {
      return (
        <tr key={currentPath.join('.')}>
          <td className="pl-4 text-sm text-gray-700">{currentPath.join(' > ')}</td>
          <td>
            <input
              className="input input-bordered w-full text-sm"
              type="text"
              value={typeof value === 'boolean' ? String(value) : value ?? ''}
              onChange={e => onChange(currentPath, e.target.value)}
            />
          </td>
        </tr>
      );
    } else {
      // Skip rendering for arrays or unknown types
      return null;
    }
  });
}

const DataReviewTable: React.FC<DataReviewTableProps> = ({ data, onChange }) => {
  // Helper to update nested value
  const handleFieldChange = (path: string[], value: any) => {
    const updated = { ...data };
    let curr: any = updated;
    for (let i = 0; i < path.length - 1; i++) {
      curr[path[i]] = { ...curr[path[i]] };
      curr = curr[path[i]];
    }
    // Try to preserve number type if possible
    const oldVal = curr[path[path.length - 1]];
    if (typeof oldVal === 'number' && value !== '') {
      curr[path[path.length - 1]] = isNaN(Number(value)) ? value : Number(value);
    } else {
      curr[path[path.length - 1]] = value;
    }
    onChange(updated);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Field</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
          </tr>
        </thead>
        <tbody>
          {renderEditableRows(data, [], handleFieldChange)}
        </tbody>
      </table>
    </div>
  );
};

export default DataReviewTable; 