import React, { useState } from 'react';
import { AreaStatement } from '../../types';

interface BlocksTabProps {
  data: AreaStatement;
}

const BlocksTab: React.FC<BlocksTabProps> = ({ data }) => {
  // For the new structure, show residential and mall/multiplex block details
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Block Details</h3>
      </div>
      <div className="space-y-4">
        {/* Residential Block */}
        <div className="card">
          <h4 className="font-medium text-gray-900 mb-2">Residential Block</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Super Structure Area (sqm)</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Residential</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.residential_block_area_statement.super_structure_area_sqm}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4">
            <h5 className="font-medium text-gray-800 mb-2">Floor-wise Area</h5>
            <ul className="list-disc pl-6 text-sm text-gray-700">
              {Object.entries(data.residential_block_area_statement.floor_wise_area).map(([floor, area]) => (
                <li key={floor}>{floor}: {area} sqm</li>
              ))}
            </ul>
          </div>
        </div>
        {/* Mall/Multiplex Block */}
        <div className="card">
          <h4 className="font-medium text-gray-900 mb-2">Mall/Multiplex Block</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Area (sqm)</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Mall/Multiplex</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.mall_multiplex_area_statement.total_area_sqm}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4">
            <h5 className="font-medium text-gray-800 mb-2">Floor-wise Area</h5>
            <ul className="list-disc pl-6 text-sm text-gray-700">
              {Object.entries(data.mall_multiplex_area_statement.floor_wise_area).map(([floor, area]) => (
                <li key={floor}>{floor}: {area} sqm</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlocksTab; 