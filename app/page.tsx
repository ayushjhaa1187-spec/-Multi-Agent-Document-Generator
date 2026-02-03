'use client';

import { useChat } from 'ai/react';
import { useState, useEffect } from 'react';

export default function BRDGenerator() {
  const [projectName, setProjectName] = useState('');
  const [stage, setStage] = useState<'clarify' | 'generate'>('clarify');
  const [error, setError] = useState<string | null>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } = useChat({
    api: '/api/chat',
    body: {
      projectName,
      stage,
    },
    onFinish: (message) => {
      setError(null);
      if (stage === 'clarify' && message.content.toLowerCase().includes('shall') || message.content.toLowerCase().includes('requirement')) {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-5xl font-bold text-indigo-900 mb-2">
            Multi-Agent BRD Generator
          </h1>
          <p className="text-gray-600 text-lg">
            AI-powered Business Requirement Document generation
          </p>
        </header>

        {/* Project Name Input */}
        {!projectName && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
            <label className="block text-lg font-semibold text-gray-700 mb-3">
              Project Name
            </label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Enter your project name..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <p className="text-red-800 font-semibold">Error</p>
            <p className="text-red-600 text-sm mt-1">{error}</p>
          </div>
        )}

        {/* Chat Messages */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 min-h-[400px] max-h-[600px] overflow-y-auto">
          {messages.length === 0 && projectName && !isLoading && (
            <div className="text-center text-gray-500 py-20">
              <p className="text-xl">Start by describing your project requirements...</p>
            </div>
          )}

          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`p-4 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-indigo-100 ml-8'
                    : 'bg-gray-100 mr-8'
                }`}
              >
                <div className="font-semibold text-sm mb-1 text-gray-600">
                  {message.role === 'user' ? 'You' : stage === 'clarify' ? 'BRD Planner' : 'Requirement Writer'}
                </div>
                <div className="text-gray-800 whitespace-pre-wrap">
                  {message.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center space-x-2 text-gray-500">
                <div className="animate-spin h-5 w-5 border-2 border-indigo-500 border-t-transparent rounded-full"></div>
                <span>Generating...</span>
                <button
                  onClick={() => stop()}
                  className="text-xs ml-auto px-2 py-1 bg-gray-300 hover:bg-gray-400 rounded text-gray-700"
                >
                  Stop
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Input Form */}
        {projectName && (
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex gap-4">
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder={stage === 'clarify' ? 'Describe your requirements...' : 'Provide additional details...'}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? 'Sending...' : 'Send'}
              </button>
            </div>

            {/* Stage Indicator */}
            <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-gray-600">
              <span
                className={`px-3 py-1 rounded-full ${
                  stage === 'clarify' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-200 text-gray-600'
                }`}
              >
                1. Clarification
              </span>
              <span className="text-gray-400">→</span>
              <span
                className={`px-3 py-1 rounded-full ${
                  stage === 'generate' ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-600'
                }`}
              >
                2. Generation
              </span>
            </div>
          </form>
        )}

        {/* Info Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Powered by Vercel AI SDK • Multi-Agent Architecture</p>
        </div>
      </div>
    </div>
  );
}
