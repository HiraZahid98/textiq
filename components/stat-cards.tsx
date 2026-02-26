'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Stats {
  totalAnalyses: number;
  positiveSentimentPercent: number;
  totalWordsAnalyzed: number;
  thisWeekCount: number;
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
}

function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <Card className="border border-border bg-card hover:shadow-sm transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <span className="text-2xl">{icon}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-2xl md:text-3xl font-bold text-foreground">{value}</p>
          <div className="flex items-center gap-1 text-sm text-green-600">
            <TrendingUp size={16} />
            <span>Live data</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function StatCards() {
  const [stats, setStats] = useState<Stats>({
    totalAnalyses: 0,
    positiveSentimentPercent: 0,
    totalWordsAnalyzed: 0,
    thisWeekCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      // Get all analyses
      const { data, error } = await supabase
        .from('analyses')
        .select('sentiment, word_count, created_at');

      if (!error && data) {
        const total = data.length;

        // Positive sentiment %
        const positive = data.filter((a) => a.sentiment === 'positive').length;
        const posPercent = total > 0 ? Math.round((positive / total) * 100) : 0;

        // Total words
        const totalWords = data.reduce((sum, a) => sum + (a.word_count || 0), 0);

        // This week
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        const thisWeek = data.filter(
          (a) => new Date(a.created_at) >= oneWeekAgo
        ).length;

        setStats({
          totalAnalyses: total,
          positiveSentimentPercent: posPercent,
          totalWordsAnalyzed: totalWords,
          thisWeekCount: thisWeek,
        });
      }
      setLoading(false);
    }

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="border border-border bg-card">
            <CardContent className="p-6">
              <div className="animate-pulse space-y-3">
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-8 bg-muted rounded w-1/2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const cards = [
    {
      title: 'Total Analyses',
      value: stats.totalAnalyses,
      icon: '📊',
    },
    {
      title: 'Positive Sentiment %',
      value: `${stats.positiveSentimentPercent}%`,
      icon: '😊',
    },
    {
      title: 'Words Analyzed',
      value: stats.totalWordsAnalyzed.toLocaleString(),
      icon: '📝',
    },
    {
      title: 'This Week',
      value: stats.thisWeekCount,
      icon: '📈',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <StatCard
          key={card.title}
          title={card.title}
          value={card.value}
          icon={card.icon}
        />
      ))}
    </div>
  );
}