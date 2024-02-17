"use client";
import { Team, getTeams } from "@/api/teams";
import React, {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export interface TeamsContextValue {
  teams: Team[] | null;
  addTeam: (novoTime: Team) => void;
  updateTeam: (team: Team) => void;
  removeTeam: (id: string) => void;
  setTeams: Dispatch<React.SetStateAction<Team[] | null>>;
}

const TeamsContext = createContext<TeamsContextValue>({} as TeamsContextValue);

export const TeamsContextProvider = ({ children }: { children: ReactNode }) => {
  const [teams, setTeams] = useState<Team[] | null>(null);

  const addTeam = (newTeam: Team) => {
    if (teams) setTeams([...teams, newTeam]);
  };
  const updateTeam = (team: Team) => {
    if (teams) {
      const filteredTeams = teams?.filter((t) => t.id !== team.id);
      setTeams([...filteredTeams, team]);
    }
  };
  const removeTeam = (id: string) => {
    if (teams) {
      setTeams((old) => [...old!.filter((team) => team.id !== id)]);
    }
  };

  const contextValue: TeamsContextValue = {
    teams,
    addTeam,
    removeTeam,
    setTeams,
    updateTeam,
  };

  return (
    <TeamsContext.Provider value={contextValue}>
      {children}
    </TeamsContext.Provider>
  );
};
export default TeamsContext;
