import React from 'react';
import { Building2, Layers, Square, TrendingUp, CheckCircle, AlertTriangle } from 'lucide-react';
import { AreaStatement } from '../../types';
import { AnalyticsData } from '../../utils/analytics';

interface OverviewTabProps {
  data: AreaStatement;
  analytics: AnalyticsData;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ data, analytics }) => {
  const stats = [
    {
      label: 'Total Blocks',
      value: analytics.totalBlocks,
      icon: <Building2 className="h-6 w-6" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      label: 'Total Floors',
      value: analytics.totalFloors,
      icon: <Layers className="h-6 w-6" />,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      label: 'Total Area (sqm)',
      value: analytics.totalArea,
      icon: <Square className="h-6 w-6" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      label: 'Average Floor Area (sqm)',
      value: analytics.averageFloorArea,
      icon: <TrendingUp className="h-6 w-6" />,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  const complianceStats = [
    {
      label: 'Overall Compliance',
      value: analytics.complianceRate,
      icon: analytics.complianceRate >= 80 ? 
        <CheckCircle className="h-6 w-6" /> : 
        <AlertTriangle className="h-6 w-6" />,
      color: analytics.complianceRate >= 80 ? 'text-success-600' : 'text-warning-600',
      bgColor: analytics.complianceRate >= 80 ? 'bg-success-100' : 'bg-warning-100'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Key Statistics */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="card">
              <div className="flex items-center">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <div className={stat.color}>{stat.icon}</div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Compliance Statistics */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {complianceStats.map((stat, index) => (
            <div key={index} className="card">
              <div className="flex items-center">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <div className={stat.color}>{stat.icon}</div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Information */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Information</h3>
        <div className="card">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Site Details</h4>
              <dl className="space-y-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Actual Site Area (sqm)</dt>
                  <dd className="text-sm text-gray-900">{data.site_details.actual_site_area.sqm}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Net Plot Area (sqm)</dt>
                  <dd className="text-sm text-gray-900">{data.site_details.net_plot_area.sqm}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Total Lot Area Required (sqm)</dt>
                  <dd className="text-sm text-gray-900">{data.site_details.tot_lot_area.required.sqm}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Total Lot Area Provided (sqm)</dt>
                  <dd className="text-sm text-gray-900">{data.site_details.tot_lot_area.provided.sqm}</dd>
                </div>
              </dl>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Affected Area</h4>
              <dl className="space-y-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Road Widening/HT Lines (sqm)</dt>
                  <dd className="text-sm text-gray-900">{data.site_details.affected_area.road_widening_ht_lines.sqm}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Nala (sqm)</dt>
                  <dd className="text-sm text-gray-900">{data.site_details.affected_area.nala.sqm}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Nala Buffer (sqm)</dt>
                  <dd className="text-sm text-gray-900">{data.site_details.affected_area.nala_buffer.sqm}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Block Summary */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Block Summary</h3>
        <div className="card">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Block Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Area (sqm)
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Residential</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.residential_block_area_statement.super_structure_area_sqm}</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Mall/Multiplex</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.mall_multiplex_area_statement.total_area_sqm}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab; 