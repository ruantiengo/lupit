import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const CardTotalAmountSkeleton = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          <Skeleton className="h-2 w-16" />
        </CardTitle>
        <Skeleton className="h-8 w-8 rounded-full" />
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-3 w-32" />
      </CardContent>
    </Card>
  );
};

export default CardTotalAmountSkeleton;
