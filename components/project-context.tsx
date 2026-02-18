'use client';

import { useState, useEffect } from 'react';

export default function ProjectContext({ projectName }: { projectName: string }) {
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!projectName) return;

    const fetchDocs = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/documents?projectName=${encodeURIComponent(projectName)}`);
        const data = await res.json();
        if (data.documents) {
          setDocuments(data.documents);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchDocs();

    // Poll for updates every 5 seconds
    const interval = setInterval(fetchDocs, 5000);
    return () => clearInterval(interval);
  }, [projectName]);

  if (!projectName) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800">Ingested Data Context</h3>
        <button
          onClick={() => fetch('/api/documents?projectName=' + encodeURIComponent(projectName))}
          className="text-sm text-indigo-600 hover:text-indigo-800"
        >
          Refresh
        </button>
      </div>

      {loading && documents.length === 0 ? (
        <p className="text-gray-500 italic">Loading context...</p>
      ) : documents.length === 0 ? (
        <p className="text-gray-500 italic">No ingested data found. Upload or use the seed script.</p>
      ) : (
        <ul className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
          {documents.map((doc: any) => (
            <li key={doc.id} className={`border-b border-gray-100 pb-3 ${!doc.isRelevant ? 'opacity-60' : ''}`}>
              <div className="flex justify-between items-start mb-1">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded uppercase ${
                    doc.type === 'EMAIL' ? 'bg-blue-100 text-blue-800' :
                    doc.type === 'TRANSCRIPT' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {doc.type}
                  </span>
                  {doc.isRelevant && (
                     <span className="bg-green-50 text-green-700 text-xs px-1 rounded border border-green-200">
                       Relevant
                     </span>
                  )}
                </div>
                <span className="text-xs text-gray-400">
                  {new Date(doc.createdAt).toLocaleDateString()}
                </span>
              </div>

              <p className="text-sm text-gray-800 mt-1 font-medium">
                {doc.processedSummary ? (
                   <span>{doc.processedSummary}</span>
                ) : (
                   <span className="italic text-gray-500">Processing...</span>
                )}
              </p>

              {!doc.processedSummary && (
                 <p className="text-xs text-gray-400 mt-1 line-clamp-2">{doc.content}</p>
              )}

              {doc.extractedEntities && doc.extractedEntities.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {doc.extractedEntities.map((e: any) => (
                    <span key={e.id} className="text-xs bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded border border-indigo-100">
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
