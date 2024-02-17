import api from "./api";

export interface Player {
  id?: string;
  name: string;
  team: string;
  teamId: string;
  salary: number;
  position: string;
  age?: number;
  birthDay: Date;
  createdAt: Date;
}

export type UpsertPlayer = Omit<Player, "createdAt" | "age" | "team">;

export const getPlayers = async () => {
  return await api.get("/players");
};

export const deletePlayer = async (id: string) => {
  return await api.delete(`/players/${id}`);
};

export const savePlayer = async (player: UpsertPlayer) => {
  if (player.id) {
    return await api.patch(`/players/${player.id}`, player);
  }
  return await api.post("/players", player);
};
