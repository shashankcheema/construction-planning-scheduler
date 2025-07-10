import React from 'react';
import { AreaStatement } from '../types';

interface ScheduleViewProps {
  data: AreaStatement;
  onBack: () => void;
}

// Define construction phases and mapping logic
interface ScheduleTask {
  serial: number;
  description: string;
  quantity: string;
  startDate: string;
  endDate: string;
  duration: string;
}

// Helper to generate schedule sections from AreaStatement
function generateScheduleSections(data: AreaStatement): Record<string, ScheduleTask[]> {
  let serial = 1;
  const today = new Date();
  const addDays = (date: Date, days: number) => {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
  };
  const formatDate = (date: Date) => date.toISOString().slice(0, 10);
  let dayCursor = 0;

  // Subsections as per user/PDF
  const subsections: { name: string; quantity?: string }[] = [
    { name: 'Site Clearance & Layout', quantity: `${data.site_details.actual_site_area.sqm} sqm` },
    { name: 'Excavation', quantity: `${Object.values(data.residential_block_area_statement.basements).reduce((a, b) => a + b, 0)} sqm` },
    { name: 'Footings', quantity: `${data.residential_block_area_statement.super_structure_area_sqm} sqm` },
    { name: 'Column up to Plinth', quantity: 'N/A' },
    { name: 'Plinth Beam', quantity: 'N/A' },
    { name: 'Backfilling', quantity: 'N/A' },
    { name: 'Ground Floor Slab', quantity: `${data.residential_block_area_statement.floor_wise_area.first_floor ?? 'N/A'} sqm` },
    { name: 'Column Upto Roof Level', quantity: 'N/A' },
    { name: 'Roof Beam & Slab', quantity: 'N/A' },
    { name: 'Brick Work', quantity: 'N/A' },
    { name: 'Plastering', quantity: `${data.residential_block_area_statement.super_structure_area_sqm} sqm` },
    { name: 'Flooring', quantity: `${data.residential_block_area_statement.super_structure_area_sqm} sqm` },
    { name: 'Painting', quantity: `${data.residential_block_area_statement.super_structure_area_sqm} sqm` },
    { name: 'Water Supply and Sanitary', quantity: 'N/A' },
    { name: 'Electrical', quantity: 'N/A' },
    { name: 'Compound Wall', quantity: 'N/A' },
    { name: 'Septic Tank and Sump', quantity: 'N/A' },
    { name: 'Overhead Water Tank', quantity: 'N/A' },
    { name: 'Final Finishing / Handing Over', quantity: 'N/A' },
  ];

  // Each sub-section is a single task for now, but can be expanded
  const schedule: Record<string, ScheduleTask[]> = {};
  subsections.forEach((sub, idx) => {
    const durationDays = 7 + (idx % 3) * 3; // Vary duration for demo
    const start = addDays(today, dayCursor);
    const end = addDays(start, durationDays);
    schedule[sub.name] = [
      {
        serial: serial++,
        description: sub.name,
        quantity: sub.quantity ?? 'N/A',
        startDate: formatDate(start),
        endDate: formatDate(end),
        duration: `${durationDays} days`,
      },
    ];
    dayCursor += durationDays + 1;
  });
  return schedule;
}

const ScheduleView: React.FC<ScheduleViewProps> = ({ data, onBack }) => {
  const scheduleSections = generateScheduleSections(data);

  return (
    <div className="space-y-12 py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">Project Schedule</h2>
        <button className="btn-secondary" onClick={onBack}>Back to Data Review</button>
      </div>
      {Object.entries(scheduleSections).map(([section, rows]) => (
        <div key={section} className="rounded-xl shadow-md bg-white p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">{section}</h3>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sl. No.</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description of Work</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, idx) => (
                  <tr key={row.serial || idx} className="hover:bg-primary-50 transition-colors">
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 font-medium">{row.serial}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{row.description}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{row.quantity}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{row.startDate}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{row.endDate}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{row.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScheduleView; 