import React, { useState } from 'react';
import FileUploader from './components/FileUploader';
import EnhancedDataPreview from './components/EnhancedDataPreview';
import { AreaStatement, FileProcessingState } from './types';

function App() {
  const [fileState, setFileState] = useState<FileProcessingState>({
    isProcessing: false,
    progress: 0,
    error: null,
    data: null,
  });

  const handleFileProcessed = (data: AreaStatement) => {
    setFileState({
      isProcessing: false,
      progress: 100,
      error: null,
      data
    });
  };

  const handleFileError = (error: string) => {
    setFileState({
      isProcessing: false,
      progress: 0,
      error,
      data: null
    });
  };

  const handleReset = () => {
    setFileState({
      isProcessing: false,
      progress: 0,
      error: null,
      data: null
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-3">
              {/* Animated SVG logo with gradient */}
              <span className="inline-block h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-400 flex items-center justify-center animate-fade-in">
                <svg width="28" height="28" fill="none" viewBox="0 0 28 28">
                  <defs>
                    <linearGradient id="logo-gradient" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#2563eb" />
                      <stop offset="1" stopColor="#6366f1" />
                    </linearGradient>
                  </defs>
                  <rect width="28" height="28" rx="8" fill="url(#logo-gradient)" />
                  <path d="M9 19V9h10v10H9zm2-2h6v-6h-6v6z" fill="#fff"/>
                </svg>
              </span>
              <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Construction Planning & Scheduler</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleReset}
                className="btn-secondary"
                aria-label="Reset application"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!fileState.data ? (
          <>
            {/* Hero Section */}
            <section className="relative text-center py-12 animate-fade-in">
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 via-white to-indigo-50" aria-hidden="true" />
              <div className="flex flex-col items-center gap-6">
                <span className="inline-block h-24 w-24 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-400 flex items-center justify-center shadow-lg animate-fade-in">
                  <svg width="64" height="64" fill="none" viewBox="0 0 64 64">
                    <defs>
                      <linearGradient id="hero-gradient" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#2563eb" />
                        <stop offset="1" stopColor="#6366f1" />
                      </linearGradient>
                    </defs>
                    <rect width="64" height="64" rx="18" fill="url(#hero-gradient)" />
                    <path d="M20 44V20h24v24H20zm4-4h16V24H24v16z" fill="#fff"/>
                  </svg>
                </span>
                <h2 className="text-5xl font-extrabold text-gray-900 mb-2 tracking-tight drop-shadow-sm">Plan. Analyze. Schedule.</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 font-medium">Upload your construction project's Area Statement JSON file to instantly review, analyze, and generate a professional construction schedule. Fast, accurate, and export-ready.</p>
                <div className="w-full max-w-md mx-auto">
                  <div className="bg-white/90 rounded-2xl shadow-xl border border-gray-100 p-6 transition hover:shadow-2xl animate-fade-in">
                    <FileUploader
                      onFileProcessed={handleFileProcessed}
                      onFileError={handleFileError}
                      isProcessing={fileState.isProcessing}
                      progress={fileState.progress}
                      error={fileState.error}
                    />
                  </div>
                </div>
              </div>
            </section>
            {/* Divider */}
            <div className="my-12 border-t border-gray-200" />
            {/* Workflow Steps */}
            <section className="max-w-4xl mx-auto py-12 animate-fade-in">
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">How It Works</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-6">
                {[
                  { icon: '⬆️', label: 'Upload', desc: 'Upload your Area Statement JSON.' },
                  { icon: '📝', label: 'Review/Edit', desc: 'Review and edit your data in a smart table.' },
                  { icon: '📊', label: 'Analyze', desc: 'Get instant analytics and compliance checks.' },
                  { icon: '🗓️', label: 'Generate Schedule', desc: 'Create a detailed, sectioned schedule.' },
                  { icon: '⬇️', label: 'Export', desc: 'Export your schedule as JSON, CSV, or PDF.' },
                ].map((step, i) => (
                  <div key={step.label} className="relative flex flex-col items-center bg-white rounded-xl shadow p-6 border border-gray-100 transition hover:shadow-lg hover:-translate-y-1 duration-200">
                    <span className="text-3xl mb-2">{step.icon}</span>
                    <span className="font-semibold text-gray-900 mb-1">{step.label}</span>
                    <span className="text-sm text-gray-500 text-center">{step.desc}</span>
                    {i < 4 && <span className="hidden sm:block absolute right-0 top-1/2 transform -translate-y-1/2 text-2xl text-primary-200">→</span>}
                  </div>
                ))}
              </div>
            </section>
            {/* Divider */}
            <div className="my-12 border-t border-gray-200" />
            {/* Features Grid */}
            <section className="max-w-5xl mx-auto py-12 animate-fade-in">
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { icon: '⚡', title: 'Instant Validation', desc: 'Smart format detection and data validation.' },
                  { icon: '📈', title: 'Analytics Dashboard', desc: 'Visualize blocks, floors, and compliance.' },
                  { icon: '🧠', title: 'AI-Powered Scheduling', desc: 'Generate schedules with OpenAI integration.' },
                  { icon: '📤', title: 'Export Ready', desc: 'Export your data and schedules in multiple formats.' },
                ].map((feature) => (
                  <div key={feature.title} className="flex flex-col items-center bg-white rounded-xl shadow p-6 border border-gray-100 transition hover:shadow-lg hover:-translate-y-1 duration-200">
                    <span className="text-3xl mb-2">{feature.icon}</span>
                    <span className="font-semibold text-gray-900 mb-1">{feature.title}</span>
                    <span className="text-sm text-gray-500 text-center">{feature.desc}</span>
                  </div>
                ))}
              </div>
            </section>
            {/* Divider */}
            <div className="my-12 border-t border-gray-200" />
            {/* Testimonials/Trust Section */}
            <section className="max-w-3xl mx-auto py-12 animate-fade-in">
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Trusted by Professionals</h3>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                <blockquote className="flex flex-col items-center bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-xl shadow p-6 max-w-xs">
                  <span className="text-2xl mb-2">🏗️</span>
                  <span className="text-gray-700 font-medium mt-2 italic">“A game-changer for our project planning.”</span>
                  <span className="text-xs text-gray-400 mt-1">— Project Manager, UrbanSky</span>
                </blockquote>
                <blockquote className="flex flex-col items-center bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 rounded-xl shadow p-6 max-w-xs">
                  <span className="text-2xl mb-2">🏢</span>
                  <span className="text-gray-700 font-medium mt-2 italic">“The analytics and schedule export are top-notch.”</span>
                  <span className="text-xs text-gray-400 mt-1">— Lead Engineer, KPMA</span>
                </blockquote>
              </div>
            </section>
          </>
        ) : (
          <EnhancedDataPreview
            data={fileState.data}
            onReset={handleReset}
          />
        )}
      </main>
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500">
            <p>&copy; 2024 Construction Planning & Scheduler. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App; 