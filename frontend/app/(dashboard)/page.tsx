"use client";
import { Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RecentTransfers } from "./components/recent-transfers";
import { Overview } from "./components/overview";
import { Suspense } from "react";
import LoadingTransfers from "./components/loading-transfers";
import { useTeams } from "@/hooks/use-teams";
import CardTotalAmount from "./components/card-amount-total";
import CardTotalAmountSkeleton from "./components/card-amount-total-skeleton";
import { usePlayers } from "@/hooks/use-players";

export default function DashboardPage() {
  const { teams } = useTeams();
  const { players } = usePlayers();
  return (
    <main>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Home</h2>
          <div className="flex items-center space-x-2"></div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics" disabled>
              Analises
            </TabsTrigger>
            <TabsTrigger value="reports" disabled>
              Relatorios
            </TabsTrigger>
            <TabsTrigger value="notifications" disabled>
              Notificações
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
              {teams ? (
                <CardTotalAmount
                  title="Times"
                  text={teams.length.toString()}
                  subText="10,32% a mais no ultimo mês"
                />
              ) : (
                <CardTotalAmountSkeleton />
              )}

              {players ? (
                <CardTotalAmount
                  title="Jogadores"
                  text={players.length.toString()}
                  subText="10,32% a mais no ultimo mês"
                />
              ) : (
                <CardTotalAmountSkeleton />
              )}
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4 ">
                <CardHeader className="blur-sm">
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2 blur-sm">
                  <Overview />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Ultimas transferencias</CardTitle>
                </CardHeader>
                <CardContent>
                  <Suspense fallback={<LoadingTransfers />}>
                    <RecentTransfers />
                  </Suspense>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
