import api from "./api";

export interface Transfer {
  id: string;
  oldTeam: string;
  newTeam: string;
  player: {
    name: string;
    position: string;
  };
}

export const getTransfers = async () => {
  return await api.get("/transfers");
};
