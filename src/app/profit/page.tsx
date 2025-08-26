import { SiteHeader } from '@/components/site-header';
import { ProfitDashboard } from '@/components/profit-dashboard';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProfitPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader title="Profit" />
      <main className="flex-1 container max-w-screen-2xl p-4 md:p-8">
        <Suspense fallback={<DashboardSkeleton />}>
          <ProfitDashboard />
        </Suspense>
      </main>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-3">
        <Skeleton className="h-28 w-full rounded-lg" />
        <Skeleton className="h-28 w-full rounded-lg" />
        <Skeleton className="h-28 w-full rounded-lg" />
      </div>
      <Skeleton className="h-[350px] w-full rounded-lg" />
      <Skeleton className="h-48 w-full rounded-lg" />
    </div>
  )
}
