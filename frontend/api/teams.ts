import { setTimeout } from "timers/promises";
import api from "./api";

export interface Team {
  id: string;
  name: string;
  badge: string;
  allSalary: number;
}
export interface CreateUpdateTeam {
  id?: string;
  name: string;
  badge: File;
}

export const saveTeam = async (team: CreateUpdateTeam): Promise<any> => {
  const formData = new FormData();
  formData.append("file", team.badge);
  formData.append("name", team.name);
  if (team.id) {
    formData.append("id", team.id ?? "");
    return await api.patch(`/teams/${team.id}`, formData, {});
  }
  return await api.post("/teams", formData, {});
};

export const getTeams = async () => {
  return (await api.get("/teams")).data;
};

export const deleteTeam = async (id: string) => {
  return await api.delete(`teams/${id}`);
};
