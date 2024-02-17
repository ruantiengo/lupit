import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const LoadingTransfers = () => {
  return (
    <div className="space-y-8">
      {Array.from({ length: 5 }).map((_, i) => (
        <div className="flex items-center" key={i}>
          <Skeleton className="h-9 w-9 rounded-full" />
          <div className="ml-4 space-y-1">
            <Skeleton className="w-32 h-3"></Skeleton>
            <Skeleton className="w-32 h-3"></Skeleton>
          </div>
          <div className=" flex ml-auto items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="w-8 h-2" />
            <Skeleton className="w-8 h-8 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingTransfers;
