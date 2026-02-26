'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Analysis {
  id: string;
  original_text: string;
  summary: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  sentiment_score: number;
  key_topics: string[];
  readability_grade: string;
  word_count: number;
  created_at: string;
}

export default function HistoryPage() {
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  const sentimentColor = {
    positive: 'bg-green-500/20 text-green-400',
    negative: 'bg-red-500/20 text-red-400',
    neutral: 'bg-yellow-500/20 text-yellow-400',
  };

  useEffect(() => {
    async function fetchAnalyses() {
      const { data, error } = await supabase
        .from('analyses')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) setAnalyses(data);
      setLoading(false);
    }
    fetchAnalyses();
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="animate-pulse space-y-4">
          {[1,2,3].map(i => (
            <div key={i} className="bg-gray-900 rounded-2xl h-24"/>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Analysis History</h1>
        <p className="text-gray-400 mt-1">
          {analyses.length} total analyses
        </p>
      </div>

      {analyses.length === 0 ? (
        <div className="bg-gray-900 rounded-2xl p-12 text-center">
          <p className="text-gray-400 text-lg">No analyses yet</p>
          <p className="text-gray-600 text-sm mt-2">
            Go to Analyze Text to get started
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {analyses.map((analysis) => (
            <div
              key={analysis.id}
              className="bg-gray-900 rounded-2xl p-6 cursor-pointer hover:bg-gray-800 transition"
              onClick={() =>
                setExpanded(expanded === analysis.id ? null : analysis.id)
              }
            >
              {/* Row Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize shrink-0 ${sentimentColor[analysis.sentiment]}`}>
                    {analysis.sentiment}
                  </span>
                  <p className="text-gray-300 text-sm truncate">
                    {analysis.original_text.substring(0, 80)}...
                  </p>
                </div>
                <div className="flex items-center gap-4 ml-4 shrink-0">
                  <span className="text-gray-500 text-xs">
                    {analysis.word_count} words
                  </span>
                  <span className="text-gray-500 text-xs">
                    {new Date(analysis.created_at).toLocaleDateString()}
                  </span>
                  <span className="text-gray-600">
                    {expanded === analysis.id ? '▲' : '▼'}
                  </span>
                </div>
              </div>

              {/* Expanded Details */}
              {expanded === analysis.id && (
                <div className="mt-4 pt-4 border-t border-gray-700 space-y-3">
                  <div>
                    <p className="text-gray-500 text-xs mb-1">SUMMARY</p>
                    <p className="text-white text-sm">{analysis.summary}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs mb-2">KEY TOPICS</p>
                    <div className="flex flex-wrap gap-2">
                      {analysis.key_topics?.map((topic, i) => (
                        <span
                          key={i}
                          className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-xs"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div>
                      <p className="text-gray-500 text-xs mb-1">SCORE</p>
                      <p className="text-white text-sm font-semibold">
                        {(analysis.sentiment_score * 100).toFixed(0)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-1">READABILITY</p>
                      <p className="text-white text-sm font-semibold">
                        {analysis.readability_grade}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}