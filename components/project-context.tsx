'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function ProjectContext({ projectName }: { projectName: string }) {
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({ total: 0, relevant: 0, noiseFiltered: 0 });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchDocs = async () => {
    // Only fetch if projectName is set
    if (!projectName) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/documents?projectName=${encodeURIComponent(projectName)}`);
      const data = await res.json();
      if (data.documents) {
        setDocuments(data.documents);

        // Calculate Stats
        const total = data.documents.length;
        // Assume relevant if isRelevant is true.
        // Note: The processor might return false for isRelevant.
        const relevant = data.documents.filter((d: any) => d.isRelevant).length;

        // Noise is (Total - Relevant) / Total
        const noiseFiltered = total > 0 ? Math.round(((total - relevant) / total) * 100) : 0;

        setStats({ total, relevant, noiseFiltered });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocs();
    const interval = setInterval(fetchDocs, 5000);
    return () => clearInterval(interval);
  }, [projectName]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('projectName', projectName);

    try {
      // We use the file upload route
      const res = await fetch('/api/ingest/files', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
         const err = await res.json();
         throw new Error(err.error || 'Upload failed');
      }

      // Clear input
      if (fileInputRef.current) fileInputRef.current.value = '';

      // Refresh docs immediately
      fetchDocs();
      alert('File uploaded successfully. Processing started.');
    } catch (err: any) {
      console.error(err);
      alert(`Upload failed: ${err.message}`);
    }
  };

  if (!projectName) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800">Ingested Data Context</h3>
        <button
          onClick={fetchDocs}
          className="text-sm text-indigo-600 hover:text-indigo-800"
        >
          Refresh
        </button>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="bg-gray-50 p-2 rounded text-center border border-gray-100">
            <div className="text-2xl font-bold text-gray-800">{stats.total}</div>
            <div className="text-[10px] text-gray-500 uppercase tracking-wide">Total Docs</div>
        </div>
        <div className="bg-green-50 p-2 rounded text-center border border-green-100">
            <div className="text-2xl font-bold text-green-700">{stats.relevant}</div>
            <div className="text-[10px] text-green-600 uppercase tracking-wide">Relevant</div>
        </div>
        <div className="bg-red-50 p-2 rounded text-center border border-red-100">
            <div className="text-2xl font-bold text-red-700">{stats.noiseFiltered}%</div>
            <div className="text-[10px] text-red-600 uppercase tracking-wide">Noise Filtered</div>
        </div>
      </div>

      {/* Upload Section */}
      <div className="mb-4">
        <input
            type="file"
            accept=".csv,.txt"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
        />
        <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full py-2 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-lg hover:bg-indigo-100 transition-colors text-sm font-medium flex items-center justify-center gap-2"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Upload Dataset (CSV/TXT)
        </button>
        <p className="text-[10px] text-center text-gray-400 mt-1">
            Supports Enron CSV or AMI Transcripts
        </p>
      </div>

      {loading && documents.length === 0 ? (
        <p className="text-gray-500 italic text-center py-4">Loading context...</p>
      ) : documents.length === 0 ? (
        <p className="text-gray-500 italic text-sm text-center py-4">No ingested data found. Upload a file or use seed data.</p>
      ) : (
        <ul className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
          {documents.map((doc: any) => (
            <li key={doc.id} className={`border-b border-gray-100 pb-3 ${!doc.isRelevant ? 'opacity-60' : ''}`}>
              <div className="flex justify-between items-start mb-1">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                    doc.type === 'EMAIL' ? 'bg-blue-100 text-blue-800' :
                    doc.type === 'TRANSCRIPT' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {doc.type}
                  </span>
                  {doc.isRelevant && (
                     <span className="bg-green-50 text-green-700 text-[10px] px-1 rounded border border-green-200">
                       Relevance: {doc.relevanceScore}
                     </span>
                  )}
                </div>
                <span className="text-[10px] text-gray-400">
                  {new Date(doc.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div className="text-xs text-gray-800 mt-1 font-medium">
                {doc.processedSummary ? (
                   <span>{doc.processedSummary}</span>
                ) : (
                   <span className="italic text-gray-500 flex items-center gap-1">
                     <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></span>
                     Processing...
                   </span>
                )}
              </div>

              {doc.extractedEntities && doc.extractedEntities.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {doc.extractedEntities.map((e: any) => (
                    <span key={e.id} className="text-[10px] bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded border border-indigo-100">
                      <strong>{e.type}:</strong> {e.value}
                    </span>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
