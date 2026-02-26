import { StatCards } from '@/components/stat-cards';
import { AnalyticsChart } from '@/components/analytics-chart';
import { RecentAnalyses } from '@/components/recent-analyses';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-8 p-4 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's your analytics overview.
          </p>
        </div>
        <Link href="/dashboard/analyze">
          <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
            New Analysis
            <ArrowRight size={18} />
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <section>
        <StatCards />
      </section>

      {/* Chart */}
      <section>
        <AnalyticsChart />
      </section>

      {/* Recent Analyses Table */}
      <section>
        <RecentAnalyses />
      </section>
    </div>
  );
}