import { Skeleton } from "@/components/ui/skeleton";

export function AssetTableSkeleton() {
  return (
    <div className="flex flex-col h-full">
      {/* Search and Filters Skeleton */}
      <div className="p-3 border-b border-border space-y-3">
        <Skeleton className="h-9 w-full rounded-lg" />
        <Skeleton className="h-8 w-full rounded-lg" />
      </div>

      {/* Table Skeleton */}
      <div className="flex-1 overflow-hidden p-2 space-y-2">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 p-2 animate-pulse">
            <Skeleton className="w-6 h-6 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-3 w-24" />
            </div>
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-7 w-20" />
          </div>
        ))}
      </div>
    </div>
  );
}
