import { useContext, useEffect } from "react";
import { getTeams } from "@/api/teams";
import PlayerContext, { PlayersContextValue } from "@/contexts/players-context";
import { getPlayers } from "@/api/player";

export const usePlayers = (): PlayersContextValue => {
  const context = useContext(PlayerContext);
  const { players, setPlayers } = context;
  useEffect(() => {
    const getAllPlayers = async () => {
      const { data } = await getPlayers();
      setPlayers(data);
    };
    if (!players) {
      getAllPlayers();
    }
  }, []);
  return context;
};
