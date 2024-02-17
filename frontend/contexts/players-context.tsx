"use client";
import { Player } from "@/api/player";
import { Team } from "@/api/teams";
import React, { Dispatch, ReactNode, createContext, useState } from "react";

export interface PlayersContextValue {
  players: Player[] | null;
  addPlayer: (newPlayer: Player) => void;
  updatePlayer: (player: Player) => void;
  removePlayer: (id: string) => void;
  setPlayers: Dispatch<React.SetStateAction<Player[] | null>>;
}

const PlayerContext = createContext<PlayersContextValue>(
  {} as PlayersContextValue
);

export const PlayerContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [players, setPlayers] = useState<Player[] | null>(null);

  const addPlayer = (newPlayer: Player) => {
    if (players) setPlayers([...players, newPlayer]);
  };

  const updatePlayer = (player: Player) => {
    if (players) {
      const filteredPlayers = players.filter((p) => p.id !== player.id);
      setPlayers([...filteredPlayers, player]);
    }
  };

  const removePlayer = (id: string) => {
    if (players) setPlayers(players.filter((time) => time.id !== id));
  };

  const contextValue: PlayersContextValue = {
    players,
    addPlayer,
    removePlayer,
    setPlayers,
    updatePlayer,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {children}
    </PlayerContext.Provider>
  );
};
export default PlayerContext;
