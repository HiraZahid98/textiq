'use client';

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
} from 'recharts';

interface DataPoint {
  date: string;
  score: number;
  sentiment: 'positive' | 'negative' | 'neutral';
}

interface Props {
  data: DataPoint[];
}

const sentimentColor = {
  positive: '#22c55e',
  negative: '#ef4444',
  neutral: '#eab308',
};

export default function SentimentChart({ data }: Props) {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-gray-500">
        No data yet — analyze some text to see your chart
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
        <XAxis
          dataKey="date"
          stroke="#4B5563"
          tick={{ fill: '#9CA3AF', fontSize: 12 }}
        />
        <YAxis
          domain={[0, 1]}
          stroke="#4B5563"
          tick={{ fill: '#9CA3AF', fontSize: 12 }}
          tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#111827',
            border: '1px solid #374151',
            borderRadius: '8px',
          }}
          labelStyle={{ color: '#F9FAFB' }}
          formatter={(value: number, _: string, props: any) => [
            `${(value * 100).toFixed(0)}%`,
            `Sentiment (${props.payload.sentiment})`,
          ]}
        />
        <ReferenceLine
          y={0.5}
          stroke="#374151"
          strokeDasharray="4 4"
          label={{ value: 'Neutral', fill: '#6B7280', fontSize: 11 }}
        />
        <Line
          type="monotone"
          dataKey="score"
          stroke="#3B82F6"
          strokeWidth={2}
          dot={(props: any) => {
            const color = sentimentColor[props.payload.sentiment as keyof typeof sentimentColor];
            return (
              <circle
                key={props.key}
                cx={props.cx}
                cy={props.cy}
                r={5}
                fill={color}
                stroke={color}
              />
            );
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}