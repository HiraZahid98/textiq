'use client';

import { useState } from 'react';

interface AnalysisResult {
  summary: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  sentiment_score: number;
  key_topics: string[];
  readability_grade: string;
}

export default function AnalyzePage() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState('');

  const sentimentColor = {
    positive: 'text-green-500',
    negative: 'text-red-500',
    neutral: 'text-yellow-500',
  };

  const sentimentEmoji = {
    positive: '😊',
    negative: '😞',
    neutral: '😐',
  };

  async function handleAnalyze() {
    if (text.trim().length < 50) {
      setError('Please enter at least 50 characters');
      return;
    }
    setError('');
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Analyze Text</h1>
        <p className="text-gray-400 mt-1">Paste any text below and get instant AI insights</p>
      </div>

      {/* Input Area */}
      <div className="bg-gray-900 rounded-2xl p-6 space-y-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your text here... (minimum 50 characters)"
          className="w-full h-48 bg-gray-800 text-white rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
        />
        <div className="flex items-center justify-between">
          <span className="text-gray-500 text-sm">
            {text.split(' ').filter(Boolean).length} words / {text.length} characters
          </span>
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-8 py-3 rounded-xl transition flex items-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                Analyzing...
              </>
            ) : (
              'Analyze with AI'
            )}
          </button>
        </div>
        {error && <p className="text-red-400 text-sm">{error}</p>}
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-4">
          {/* Sentiment */}
          <div className="bg-gray-900 rounded-2xl p-6">
            <h2 className="text-gray-400 text-sm font-medium mb-3">SENTIMENT</h2>
            <div className="flex items-center gap-3">
              <span className="text-4xl">{sentimentEmoji[result.sentiment]}</span>
              <div>
                <p className={`text-2xl font-bold capitalize ${sentimentColor[result.sentiment]}`}>
                  {result.sentiment}
                </p>
                <p className="text-gray-400 text-sm">Score: {(result.sentiment_score * 100).toFixed(0)}%</p>
              </div>
              {/* Score Bar */}
              <div className="flex-1 ml-4">
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-500 ${
                      result.sentiment === 'positive' ? 'bg-green-500' :
                      result.sentiment === 'negative' ? 'bg-red-500' : 'bg-yellow-500'
                    }`}
                    style={{ width: `${result.sentiment_score * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-gray-900 rounded-2xl p-6">
            <h2 className="text-gray-400 text-sm font-medium mb-3">AI SUMMARY</h2>
            <p className="text-white leading-relaxed">{result.summary}</p>
          </div>

          {/* Key Topics */}
          <div className="bg-gray-900 rounded-2xl p-6">
            <h2 className="text-gray-400 text-sm font-medium mb-3">KEY TOPICS</h2>
            <div className="flex flex-wrap gap-2">
              {result.key_topics.map((topic, i) => (
                <span key={i} className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
                  {topic}
                </span>
              ))}
            </div>
          </div>

          {/* Readability */}
          <div className="bg-gray-900 rounded-2xl p-6">
            <h2 className="text-gray-400 text-sm font-medium mb-3">READABILITY</h2>
            <p className="text-white text-xl font-semibold">{result.readability_grade}</p>
            <p className="text-gray-400 text-sm mt-1">Reading level of your text</p>
          </div>
        </div>
      )}
    </div>
  );
}