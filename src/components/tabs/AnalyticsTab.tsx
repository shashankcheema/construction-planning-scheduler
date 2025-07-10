import React from 'react';
import { AreaStatement } from '../../types';
import { AnalyticsData } from '../../utils/analytics';

interface AnalyticsTabProps {
  data: AreaStatement;
  analytics: AnalyticsData;
}

const AnalyticsTab: React.FC<AnalyticsTabProps> = ({ data, analytics }) => {
  // Area distribution: combine residential and mall/multiplex
  const areaDistribution = [
    { label: 'Residential', area: data.residential_block_area_statement.super_structure_area_sqm },
    { label: 'Mall/Multiplex', area: data.mall_multiplex_area_statement.total_area_sqm }
  ];
  const totalArea = areaDistribution.reduce((sum, item) => sum + item.area, 0);

  // Floor level analytics: combine all floor_wise_area
  const floorLevels: Record<string, number> = {
    ...data.residential_block_area_statement.floor_wise_area,
    ...data.mall_multiplex_area_statement.floor_wise_area
  };

  return (
    <div className="space-y-8">
      {/* Area Distribution Chart */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Area Distribution by Block</h3>
        <div className="space-y-4">
          {areaDistribution.map(({ label, area }) => {
            const percentage = totalArea > 0 ? (area / totalArea) * 100 : 0;
            return (
              <div key={label} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-900">{label}</span>
                  <span className="text-gray-500">{area} sqm ({percentage.toFixed(1)}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Floor Level Distribution */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Floor Level Distribution</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Area (sqm)</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Object.entries(floorLevels).map(([level, area]) => (
                <tr key={level} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{level}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{area}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsTab; 