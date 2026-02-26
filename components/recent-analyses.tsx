'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Analysis {
  id: string;
  original_text: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  sentiment_score: number;
  created_at: string;
}

const sentimentConfig = {
  positive: { bg: 'bg-green-100', text: 'text-green-800', label: 'Positive' },
  neutral: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Neutral' },
  negative: { bg: 'bg-red-100', text: 'text-red-800', label: 'Negative' },
};

export function RecentAnalyses() {
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecent() {
      const { data, error } = await supabase
        .from('analyses')
        .select('id, original_text, sentiment, sentiment_score, created_at')
        .order('created_at', { ascending: false })
        .limit(5);

      if (!error && data) setAnalyses(data);
      setLoading(false);
    }
    fetchRecent();
  }, []);

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHrs / 24);

    if (diffHrs < 1) return 'Just now';
    if (diffHrs < 24) return `Today at ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
    if (diffDays === 1) return `Yesterday at ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
    return `${diffDays} days ago`;
  }

  return (
    <Card className="border border-border bg-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Recent Analyses</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse h-12 bg-muted rounded-lg" />
            ))}
          </div>
        ) : analyses.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No analyses yet — go to Analyze Text to get started!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-border hover:bg-transparent">
                  <TableHead className="text-foreground font-semibold">Text Preview</TableHead>
                  <TableHead className="text-foreground font-semibold">Sentiment</TableHead>
                  <TableHead className="text-foreground font-semibold text-right">Score</TableHead>
                  <TableHead className="text-foreground font-semibold text-right">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {analyses.map((analysis) => {
                  const config = sentimentConfig[analysis.sentiment];
                  return (
                    <TableRow
                      key={analysis.id}
                      className="border-b border-border hover:bg-muted/50 transition-colors"
                    >
                      <TableCell className="text-foreground max-w-xs truncate">
                        {analysis.original_text.substring(0, 60)}...
                      </TableCell>
                      <TableCell>
                        <Badge className={`${config.bg} ${config.text} hover:${config.bg} border-0`}>
                          {config.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right text-foreground font-medium">
                        {(analysis.sentiment_score * 100).toFixed(0)}%
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground text-sm">
                        {formatDate(analysis.created_at)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}