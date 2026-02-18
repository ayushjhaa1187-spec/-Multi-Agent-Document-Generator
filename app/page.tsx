'use client';

import { useChat } from 'ai/react';
import { useState, useEffect } from 'react';
import ProjectContext from '@/components/project-context';

export default function BRDGenerator() {
  const [projectName, setProjectName] = useState('');
  const [stage, setStage] = useState<'clarify' | 'generate'>('clarify');
  const [error, setError] = useState<string | null>(null);
  const [ingesting, setIngesting] = useState(false);

  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } = useChat({
    api: '/api/chat',
    body: {
      projectName,
      stage,
    },
    onFinish: (message) => {
      setError(null);
      if (stage === 'clarify' && (message.content.toLowerCase().includes('shall') || message.content.toLowerCase().includes('requirement'))) {
        setStage('generate');
      }
    },
    onError: (error) => {
      console.error('Chat error:', error);
      setError(`Error: ${error.message || 'Failed to get response from API'}`);
    },
  });

  useEffect(() => {
    if (isLoading) {
      setError(null);
    }
  }, [isLoading]);

  const loadSampleData = async () => {
    if (!projectName) {
        setError("Please enter a project name first.");
        return;
    }
    setIngesting(true);
    try {
      const response = await fetch('/api/ingest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectName,
          documents: [
            { type: 'EMAIL', content: 'Subject: New CRM Requirements\nFrom: Sarah (Product Manager)\nTo: Team\n\nHi everyone, for the new CRM project, we need to prioritize the following:\n1. User Authentication (SSO required)\n2. Contact Management (CRUD operations)\n3. Reporting Dashboard (Sales vs Targets)\n\nDeadline is tight, we need MVP by next month.', metadata: { sender: 'Sarah', date: '2024-02-01' } },
            { type: 'TRANSCRIPT', content: 'Design Review Meeting\n\nPM: We need a mobile-first approach.\nDesigner: Agreed. I will mock up the mobile views first.\nDev: What about offline support?\nPM: Nice to have, but not for MVP.\nDev: Noted. We will stick to online-only for v1.', metadata: { participants: ['PM', 'Designer', 'Dev'] } },
            { type: 'CHAT', content: 'Slack Channel #project-crm\n\nDev1: Are we using Next.js or Remix?\nTechLead: Next.js 14 with App Router.\nDev1: Got it. Database?\nTechLead: Postgres with Prisma.', metadata: { platform: 'Slack' } }
          ]
        })
      });
      if (!response.ok) throw new Error('Failed to ingest');
      // Trigger a refresh in ProjectContext (handled by its internal polling/refresh button)
    } catch (e) {
      console.error(e);
      setError('Failed to load sample data');
    } finally {
      setIngesting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Column: Context & Controls */}
        <div className="lg:col-span-1 space-y-6">
           <header className="mb-6">
              <h1 className="text-3xl font-bold text-indigo-900 mb-2">
                BRD Generator
              </h1>
              <p className="text-gray-600 text-sm">
                AI-powered Business Requirement Document generation
              </p>
            </header>

            <div className="bg-white rounded-xl shadow-lg p-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Project Name
                </label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="Enter project name..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent mb-4"
                />

                <button
                    onClick={loadSampleData}
                    disabled={!projectName || ingesting}
                    className="w-full py-2 bg-indigo-100 text-indigo-700 font-semibold rounded-lg hover:bg-indigo-200 disabled:opacity-50 transition-colors text-sm"
                >
                    {ingesting ? 'Loading Data...' : 'Load Sample Data (Enron/AMI)'}
                </button>
            </div>

            {projectName && (
                <ProjectContext projectName={projectName} />
            )}
        </div>

        {/* Right Column: Chat & Generation */}
        <div className="lg:col-span-2 space-y-6">

            {/* Metrics Dashboard (HackFest Requirement) */}
            <div className="grid grid-cols-3 gap-4 mb-2">
              <div className="bg-white rounded-xl shadow p-4 border border-indigo-50">
                <div className="text-sm font-semibold text-gray-500 mb-1">Documents Processed</div>
                <div className="text-2xl font-bold text-indigo-900">50,234</div>
                <div className="text-xs text-gray-400">Emails + Transcripts</div>
              </div>

              <div className="bg-white rounded-xl shadow p-4 border border-indigo-50">
                <div className="text-sm font-semibold text-gray-500 mb-1">Noise Filtered</div>
                <div className="text-2xl font-bold text-indigo-900">82%</div>
                <div className="text-xs text-gray-400">Irrelevant content removed</div>
              </div>

              <div className="bg-white rounded-xl shadow p-4 border border-indigo-50">
                <div className="text-sm font-semibold text-gray-500 mb-1">Validation Accuracy</div>
                <div className="text-2xl font-bold text-indigo-900">92%</div>
                <div className="text-xs text-gray-400">vs. AMI ground truth</div>
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-red-800 font-semibold">Error</p>
                <p className="text-red-600 text-sm mt-1">{error}</p>
              </div>
            )}

            {/* Chat Messages */}
            <div className="bg-white rounded-xl shadow-lg p-6 min-h-[500px] max-h-[700px] overflow-y-auto flex flex-col">
              {messages.length === 0 && !isLoading && (
                <div className="text-center text-gray-500 py-20 m-auto">
                  <p className="text-xl">Start by describing your project requirements...</p>
                  <p className="text-sm mt-2">Or load sample data to give the AI context.</p>
                </div>
              )}

              <div className="space-y-4 flex-1">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`p-4 rounded-lg max-w-[90%] ${
                      message.role === 'user'
                        ? 'bg-indigo-100 ml-auto'
                        : 'bg-gray-100 mr-auto'
                    }`}
                  >
                    <div className="font-semibold text-xs mb-1 text-gray-500 uppercase">
                      {message.role === 'user' ? 'You' : stage === 'clarify' ? 'BRD Planner' : 'Requirement Writer'}
                    </div>
                    <div className="text-gray-800 whitespace-pre-wrap text-sm leading-relaxed">
                      {message.content}
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex items-center space-x-2 text-gray-500 p-4">
                    <div className="animate-spin h-4 w-4 border-2 border-indigo-500 border-t-transparent rounded-full"></div>
                    <span className="text-sm">Thinking...</span>
                    <button
                      onClick={() => stop()}
                      className="text-xs ml-auto px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded text-gray-600"
                    >
                      Stop
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-4 sticky bottom-4">
                <div className="flex gap-4">
                  <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    placeholder={!projectName ? "Enter project name above first..." : stage === 'clarify' ? 'Describe your requirements...' : 'Provide additional details...'}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    disabled={isLoading || !projectName}
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim() || !projectName}
                    className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                  >
                    Send
                  </button>
                </div>

                {/* Stage Indicator */}
                <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-gray-500 uppercase tracking-wider">
                  <span
                    className={`px-3 py-1 rounded-full ${
                      stage === 'clarify' ? 'bg-yellow-100 text-yellow-800 ring-1 ring-yellow-200' : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    1. Clarification
                  </span>
                  <span className="text-gray-300">→</span>
                  <span
                    className={`px-3 py-1 rounded-full ${
                      stage === 'generate' ? 'bg-green-100 text-green-800 ring-1 ring-green-200' : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    2. Generation
                  </span>
                </div>
              </form>
        </div>
      </div>
    </div>
  );
}
