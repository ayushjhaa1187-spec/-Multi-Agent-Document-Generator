'use client';

import { useChat } from 'ai/react';
import { useState, useEffect, useRef } from 'react';

function CopyButton({ content }: { content: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="p-1.5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-all"
      aria-label={copied ? "Copied" : "Copy to clipboard"}
      title={copied ? "Copied!" : "Copy content"}
    >
      {copied ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400"><polyline points="20 6 9 17 4 12"></polyline></svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
      )}
    </button>
  );
}

export default function BRDGenerator() {
  const [projectName, setProjectName] = useState('');
  const [projectNameInput, setProjectNameInput] = useState('');
  const [stage, setStage] = useState<'clarify' | 'generate'>('clarify');
  const [error, setError] = useState<string | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop, setMessages } = useChat({
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
      const errorMsg = error?.message || 'Failed to get response from API';

      // Provide user-friendly error messages
      if (errorMsg.includes('quota') || errorMsg.includes('exceeded')) {
        setError('💰 API Quota Exceeded: Please check your OpenAI account and billing. You may have hit your usage limit.');
      } else if (errorMsg.includes('API key')) {
        setError('🔑 API Key Error: Invalid or missing OpenAI API key. Please check your configuration.');
      } else {
        setError(`⚠️ Error: ${errorMsg}`);
      }
    },
  });

  useEffect(() => {
    if (isLoading) {
      setError(null);
    }
  }, [isLoading]);

  useEffect(() => {
    if (textareaRef.current) {
      const currentScrollTop = textareaRef.current.scrollTop;
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight + 2}px`;
      textareaRef.current.scrollTop = currentScrollTop;
    }
  }, [input]);

  const handleProjectNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = projectNameInput.trim();

    if (!trimmedName) {
      setError('Project name cannot be empty. Please enter a project name.');
      return;
    }

    if (trimmedName.length < 3) {
      setError('Project name must be at least 3 characters.');
      return;
    }

    if (trimmedName.length > 100) {
      setError('Project name must be 100 characters or less.');
      return;
    }

    setProjectName(trimmedName);
    setProjectNameInput('');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-900 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8 sm:mb-12">
          <div className="inline-block mb-4 px-4 py-2 bg-purple-500/20 border border-purple-400/30 rounded-full">
            <span className="text-purple-300 text-sm font-semibold">✨ AI-Powered Documentation</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-3">
            BRD Generator
          </h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
            Create professional Business Requirement Documents powered by AI agents. Define your project and get intelligent clarification questions.
          </p>
        </header>

        {/* Project Name Input Form */}
        {!projectName && (
          <div className="mb-8">
            <form onSubmit={handleProjectNameSubmit} className="glass-card p-6 sm:p-8 shadow-2xl">
              <div className="mb-6">
                <label className="block text-white text-lg sm:text-xl font-semibold mb-4">
                  📋 Project Name
                </label>
                <input
                  type="text"
                  value={projectNameInput}
                  onChange={(e) => setProjectNameInput(e.target.value)}
                  placeholder="Enter your project name (e.g., E-Commerce Platform)..."
                  minLength={3}
                  maxLength={100}
                  aria-required="true"
                  aria-describedby="project-name-helper project-name-counter"
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-sm sm:text-base"
                  autoFocus
                />
                <div className="flex justify-between items-center mt-2">
                  <p id="project-name-helper" className="text-gray-400 text-xs sm:text-sm">
                    Give your project a clear, descriptive name
                  </p>
                  <span
                    id="project-name-counter"
                    className={`text-xs sm:text-sm font-medium transition-colors duration-200 ${
                      projectNameInput.length >= 90 ? 'text-orange-400' : 'text-gray-500'
                    }`}
                  >
                    {projectNameInput.length}/100
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={projectNameInput.trim().length < 3 || projectNameInput.trim().length > 100}
                aria-disabled={projectNameInput.trim().length < 3 || projectNameInput.trim().length > 100}
                className="w-full px-6 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed disabled:opacity-60 text-white font-bold rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg text-sm sm:text-base"
              >
                Continue to Project Details →
              </button>
            </form>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="error-container backdrop-blur-md rounded-2xl p-4 sm:p-6 mb-6 shadow-xl animate-in">
            <p className="text-red-300 font-semibold text-sm sm:text-base mb-2">
              {error.includes('💰') ? '⚠️ API Issue' : error.includes('🔑') ? '⚠️ Configuration Issue' : '⚠️ Error'}
            </p>
            <p className="text-red-200 text-xs sm:text-sm leading-relaxed">
              {error}
            </p>
          </div>
        )}

        {/* Chat Messages Area */}
        {projectName && (
          <>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs sm:text-sm">Current Project</p>
                <p className="text-white font-semibold text-lg sm:text-xl">{projectName}</p>
              </div>
              <button
                onClick={() => {
                  setProjectName('');
                  setProjectNameInput('');
                  setStage('clarify');
                  setMessages([]);
                  stop();
                }}
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Change Project
              </button>
            </div>

            <div className="chat-container glass-card p-6 sm:p-8 mb-6 shadow-2xl min-h-[400px] sm:min-h-[500px] max-h-[600px] overflow-y-auto">
              {messages.length === 0 && !isLoading && (
                <div className="text-center text-gray-400 py-12 sm:py-20">
                  <p className="text-lg sm:text-xl mb-2 float">🎯 Describe Your Project Requirements</p>
                  <p className="text-sm sm:text-base">Get started by sharing what you want to build. Our AI will ask clarifying questions.</p>
                </div>
              )}

              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`p-4 sm:p-5 rounded-xl fade-in ${
                      message.role === 'user'
                        ? 'message-user ml-0 sm:ml-8 text-white'
                        : 'message-assistant mr-0 sm:mr-8 text-gray-100'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-semibold text-xs sm:text-sm text-gray-300">
                        {message.role === 'user' ? '😊 You' : stage === 'clarify' ? '🤔 BRD Planner' : '📝 Requirement Writer'}
                      </div>
                      {message.role !== 'user' && (
                        <CopyButton content={message.content} />
                      )}
                    </div>
                    <div className="whitespace-pre-wrap leading-relaxed text-sm sm:text-base">
                      {message.content}
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex items-center space-x-2 text-purple-400 animate-pulse p-4">
                    <div className="animate-spin h-5 w-5 border-2 border-purple-500 border-t-transparent rounded-full"></div>
                    <span>Generating response...</span>
                    <button
                      onClick={() => stop()}
                      className="text-xs ml-auto px-3 py-1 bg-red-500/30 hover:bg-red-500/50 rounded-lg text-red-300 transition-colors"
                    >
                      Stop
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="glass-card p-6 sm:p-8 shadow-2xl">
              <div className="flex items-end gap-2 sm:gap-4 mb-4">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
                      e.preventDefault();
                      if (input.trim() && !isLoading) {
                        e.currentTarget.form?.requestSubmit();
                      }
                    }
                  }}
                  placeholder={stage === 'clarify' ? 'Describe your requirements in detail...' : 'Provide additional implementation details...'}
                  className="flex-1 px-4 sm:px-6 py-3 sm:py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-sm sm:text-base min-w-0 resize-none max-h-60 min-h-[52px] overflow-y-auto"
                  disabled={isLoading}
                  rows={1}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-bold rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:scale-100 shadow-lg text-sm sm:text-base"
                >
                  {isLoading ? '⏳' : '📤'} {isLoading ? 'Sending' : 'Send'}
                </button>
              </div>

              {/* Stage Indicator */}
              <div className="flex items-center justify-center space-x-2 sm:space-x-3 text-xs sm:text-sm text-gray-400">
                <span
                  className={`px-3 sm:px-4 py-2 rounded-full font-semibold transition-all ${
                    stage === 'clarify'
                      ? 'bg-yellow-500/30 text-yellow-300 border border-yellow-400/50'
                      : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                  }`}
                >
                  1️⃣ Clarification
                </span>
                <span className="text-gray-500">→</span>
                <span
                  className={`px-3 sm:px-4 py-2 rounded-full font-semibold transition-all ${
                    stage === 'generate'
                      ? 'bg-green-500/30 text-green-300 border border-green-400/50'
                      : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                  }`}
                >
                  2️⃣ Generation
                </span>
              </div>
            </form>
          </>
        )}

        {/* Footer */}
        <div className="mt-8 sm:mt-12 text-center text-gray-500 text-xs sm:text-sm">
          <p>⚡ Powered by Vercel AI SDK • Multi-Agent Architecture</p>
          <p className="text-gray-600 text-xs mt-2">Create smart, detailed BRDs in minutes</p>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .fade-in {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-in {
          animation: fadeIn 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}
