'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function AnalyticsChart() {
  const data = [
    { day: 'Mon', analyses: 120, sentiment: 65 },
    { day: 'Tue', analyses: 150, sentiment: 72 },
    { day: 'Wed', analyses: 180, sentiment: 68 },
    { day: 'Thu', analyses: 140, sentiment: 75 },
    { day: 'Fri', analyses: 200, sentiment: 80 },
    { day: 'Sat', analyses: 90, sentiment: 70 },
    { day: 'Sun', analyses: 110, sentiment: 74 },
  ];

  return (
    <Card className="border border-border bg-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Analysis Trends</CardTitle>
        <p className="text-sm text-muted-foreground mt-1">Last 7 days performance</p>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="day" stroke="#64748B" />
              <YAxis stroke="#64748B" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                }}
              />
              <Line
                type="monotone"
                dataKey="analyses"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={{ fill: '#3B82F6', r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="sentiment"
                stroke="#06B6D4"
                strokeWidth={2}
                dot={{ fill: '#06B6D4', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
