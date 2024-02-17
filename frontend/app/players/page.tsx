"use client";
import React from "react";
import { columns } from "./components/columns";
import { UpsertPlayerDialog } from "./components/upsert-dialog";
import { usePlayers } from "@/hooks/use-players";
import { DataTable } from "@/components/ui/data-table";

const TeamsPage = () => {
  const { players } = usePlayers();

  if (players === null)
    return (
      <div className="flex items-center justify-center">Carregando...</div>
    );
  return (
    <div className="container pt-8">
      <div className="w-full text-right">
        <UpsertPlayerDialog />
      </div>
      <DataTable data={players} columns={columns} />
    </div>
  );
};

export default TeamsPage;
