"use client";

import { useTeams } from "@/hooks/use-teams";
import { DataTable } from "../../components/ui/data-table";
import { columns } from "./components/columns";
import { UpsertTeamDialog } from "./components/upsert-dialog";

const TeamsPage = () => {
  const { teams } = useTeams();

  if (teams === null)
    return (
      <div className="flex items-center justify-center">Carregando...</div>
    );
  return (
    <div className="container pt-8">
      <div className="w-full text-right">
        <UpsertTeamDialog />
      </div>
      <DataTable data={teams} columns={columns} />
    </div>
  );
};

export default TeamsPage;
