import React, { useState } from 'react';
import { Download, BarChart3, Building2, CheckCircle, Clock, Loader2, XCircle } from 'lucide-react';
import { AreaStatement, DashboardTab, ExportOptions } from '../types';
import { calculateAnalytics } from '../utils/analytics';
import { exportAreaStatementToCSV, generateDefaultFilename } from '../utils/export';
import OverviewTab from './tabs/OverviewTab';
import BlocksTab from './tabs/BlocksTab.tsx';
import AnalyticsTab from './tabs/AnalyticsTab.tsx';
import ComplianceTab from './tabs/ComplianceTab.tsx';
import DataReviewTable from './DataReviewTable';
import ScheduleView from './ScheduleView';
import { generateScheduleWithOpenAI } from '../utils/openai';

interface EnhancedDataPreviewProps {
  data: AreaStatement;
  onReset: () => void;
}

const EnhancedDataPreview: React.FC<EnhancedDataPreviewProps> = ({
  data,
  onReset
}) => {
  const [activeTab, setActiveTab] = useState<string>('datareview');
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    format: 'json',
    includeMetadata: true,
    filename: generateDefaultFilename(data)
  });
  const [editedData, setEditedData] = useState<AreaStatement>(data);
  const [showSchedule, setShowSchedule] = useState(false);
  const [openaiApiKey, setOpenaiApiKey] = useState('');
  const [showApiKeyPrompt, setShowApiKeyPrompt] = useState(false);
  const [schedule, setSchedule] = useState<any>(null);
  const [loadingSchedule, setLoadingSchedule] = useState(false);
  const [scheduleError, setScheduleError] = useState<string | null>(null);

  const analytics = calculateAnalytics(editedData);

  const tabs: { id: DashboardTab; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 className="h-4 w-4" /> },
    { id: 'blocks', label: 'Blocks', icon: <Building2 className="h-4 w-4" /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="h-4 w-4" /> },
    { id: 'compliance', label: 'Compliance', icon: <CheckCircle className="h-4 w-4" /> }
  ];

  const allTabs = [
    { id: 'datareview', label: 'Data Review', icon: <BarChart3 className="h-4 w-4" /> },
    ...tabs // overview, blocks, analytics, compliance
  ];

  const handleExport = (type: 'json' | 'csv') => {
    if (type === 'csv') {
      const csv = exportAreaStatementToCSV(editedData);
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = exportOptions.filename + '.csv';
      a.click();
      URL.revokeObjectURL(url);
    } else {
      const jsonString = JSON.stringify(editedData, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = exportOptions.filename + '.json';
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleGenerateSchedule = async () => {
    setShowApiKeyPrompt(true);
  };

  const handleSubmitApiKey = async () => {
    setLoadingSchedule(true);
    setScheduleError(null);
    try {
      const result = await generateScheduleWithOpenAI({ areaStatement: editedData, apiKey: openaiApiKey });
      setSchedule(result);
      setShowSchedule(true);
      setShowApiKeyPrompt(false);
    } catch (err: any) {
      setScheduleError(err.message || 'Failed to generate schedule.');
    } finally {
      setLoadingSchedule(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab data={editedData} analytics={analytics} />;
      case 'blocks':
        return <BlocksTab data={editedData} />;
      case 'analytics':
        return <AnalyticsTab data={editedData} analytics={analytics} />;
      case 'compliance':
        return <ComplianceTab data={editedData} />;
      default:
        return <OverviewTab data={editedData} analytics={analytics} />;
    }
  };

  if (showSchedule && schedule) {
    return (
      <div className="space-y-8">
        {/* Sticky header for actions */}
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-gray-200 flex items-center justify-between px-2 py-4 shadow-sm">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-green-600" aria-label="Schedule generated" />
            <h2 className="text-2xl font-bold text-gray-900">Generated Schedule</h2>
          </div>
          <div className="flex gap-3">
            <button className="btn-secondary" onClick={() => setShowSchedule(false)} aria-label="Back to Data Review">Back to Data Review</button>
            <button className="btn-primary" onClick={() => {
              const json = JSON.stringify(schedule, null, 2);
              const blob = new Blob([json], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'generated-schedule.json';
              a.click();
              URL.revokeObjectURL(url);
            }} aria-label="Export JSON">Export JSON</button>
          </div>
        </div>
        {/* Schedule Sections */}
        <div className="space-y-8">
          {schedule.map((section: any, i: number) => (
            <div key={section.section || section.name} className="rounded-xl shadow-md bg-white p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 tracking-tight">{section.section || section.name}</h3>
                <span className="ml-2 text-xs text-gray-400">Section {i + 1}</span>
              </div>
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 sticky top-0 z-5">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Sl. No.</th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Description of Work</th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Quantity</th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Start Date</th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">End Date</th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {section.tasks && section.tasks.map((row: any, idx: number) => (
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
      </div>
    );
  }

  if (showSchedule) {
    return (
      <ScheduleView data={editedData} onBack={() => setShowSchedule(false)} />
    );
  }

  return (
    <div className="space-y-12 py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-gray-100 mb-8">
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Data Review & Analysis</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleExport('json')}
            className="btn-secondary flex items-center gap-2"
            aria-label="Export JSON"
          >
            <Download className="h-4 w-4" /> JSON
          </button>
          <button
            onClick={() => handleExport('csv')}
            className="btn-secondary flex items-center gap-2"
            aria-label="Export CSV"
          >
            <Download className="h-4 w-4" /> CSV
          </button>
          <button
            onClick={handleGenerateSchedule}
            className="btn-primary flex items-center gap-2"
            aria-label="Generate Schedule"
          >
            <BarChart3 className="h-4 w-4" /> Generate Schedule
          </button>
          <button
            onClick={onReset}
            className="btn-secondary flex items-center gap-2"
            aria-label="Upload new file"
          >
            <XCircle className="h-4 w-4" /> New Upload
          </button>
        </div>
      </div>
      {/* Top-level Tabs */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-gray-100">
        <nav className="flex space-x-2 px-2 pt-2" aria-label="Tabs">
          {allTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-full text-base font-medium transition-colors
                ${activeTab === tab.id
                  ? 'bg-primary-100 text-primary-700 shadow'
                  : 'bg-gray-100 text-gray-500 hover:bg-primary-50 hover:text-primary-700'}
              `}
              aria-label={`Switch to ${tab.label} tab`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>
      {/* Tab Content */}
      <div className="pt-8">
        {activeTab === 'datareview' && (
          <div className="rounded-xl shadow bg-white p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Review & Edit Data</h3>
              <div className="flex items-center space-x-3 text-xs text-gray-500">
                <CheckCircle className="h-4 w-4 text-success-500" />
                <span>Format: Area Statement</span>
                <Clock className="h-4 w-4 ml-4" />
                <span>Processed: {new Date().toLocaleTimeString()}</span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <DataReviewTable data={editedData} onChange={setEditedData} />
            </div>
          </div>
        )}
        {activeTab === 'overview' && (
          <div className="space-y-12">
            <div className="rounded-xl bg-blue-50 border border-blue-100 shadow p-6 flex flex-col gap-2 mb-8">
              <div className="flex items-center gap-2 mb-1">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                <span className="font-semibold text-blue-900">Analytics Summary</span>
              </div>
              <div className="flex flex-col gap-1 text-sm">
                <div>Total Area: <span className="font-semibold text-blue-800">{analytics.totalArea ?? '—'} sqm</span></div>
                <div>Blocks: <span className="font-semibold text-blue-800">{analytics.totalBlocks ?? '—'}</span></div>
                <div>Floors: <span className="font-semibold text-blue-800">{analytics.totalFloors ?? '—'}</span></div>
              </div>
            </div>
            <div className="rounded-xl bg-white border border-gray-100 shadow-sm p-6">
              <OverviewTab data={editedData} analytics={analytics} />
            </div>
          </div>
        )}
        {activeTab === 'blocks' && (
          <div className="rounded-xl bg-white border border-gray-100 shadow-sm p-6">
            <BlocksTab data={editedData} />
          </div>
        )}
        {activeTab === 'analytics' && (
          <div className="space-y-12">
            <div className="rounded-xl bg-blue-50 border border-blue-100 shadow p-6 flex flex-col gap-2 mb-8">
              <div className="flex items-center gap-2 mb-1">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                <span className="font-semibold text-blue-900">Analytics Summary</span>
              </div>
              <div className="flex flex-col gap-1 text-sm">
                <div>Total Area: <span className="font-semibold text-blue-800">{analytics.totalArea ?? '—'} sqm</span></div>
                <div>Blocks: <span className="font-semibold text-blue-800">{analytics.totalBlocks ?? '—'}</span></div>
                <div>Floors: <span className="font-semibold text-blue-800">{analytics.totalFloors ?? '—'}</span></div>
              </div>
            </div>
            <div className="rounded-xl bg-white border border-gray-100 shadow-sm p-6">
              <AnalyticsTab data={editedData} analytics={analytics} />
            </div>
          </div>
        )}
        {activeTab === 'compliance' && (
          <div className="rounded-xl bg-white border border-gray-100 shadow-sm p-6">
            <ComplianceTab data={editedData} />
          </div>
        )}
      </div>
      {/* API Key Prompt Modal/Inline */}
      {showApiKeyPrompt && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-200 relative animate-fade-in">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 focus:outline-none"
              onClick={() => setShowApiKeyPrompt(false)}
              aria-label="Close API Key Prompt"
            >
              <XCircle className="h-6 w-6" />
            </button>
            <h3 className="text-xl font-bold mb-2 text-gray-900 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary-600" /> Enter OpenAI API Key
            </h3>
            <input
              type="password"
              className="input w-full mb-3 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:outline-none transition"
              placeholder="sk-..."
              value={openaiApiKey}
              onChange={e => setOpenaiApiKey(e.target.value)}
              autoFocus
              aria-label="OpenAI API Key"
            />
            {scheduleError && <div className="text-red-600 mb-2 flex items-center gap-2"><XCircle className="h-4 w-4" />{scheduleError}</div>}
            <div className="flex gap-3 mt-2">
              <button
                className="btn-primary flex items-center gap-2"
                onClick={handleSubmitApiKey}
                disabled={loadingSchedule || !openaiApiKey}
                aria-label="Generate Schedule"
              >
                {loadingSchedule ? <Loader2 className="h-4 w-4 animate-spin" /> : <BarChart3 className="h-4 w-4" />} {loadingSchedule ? 'Generating...' : 'Generate Schedule'}
              </button>
              <button
                className="btn-secondary"
                onClick={() => setShowApiKeyPrompt(false)}
                disabled={loadingSchedule}
                aria-label="Cancel"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedDataPreview; 