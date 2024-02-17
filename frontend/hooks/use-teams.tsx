import { useContext, useEffect } from "react";
import TeamsContext, { TeamsContextValue } from "../contexts/teams-context";
import { getTeams } from "@/api/teams";

export const useTeams = (): TeamsContextValue => {
  const context = useContext(TeamsContext);
  const { teams, setTeams } = context;
  useEffect(() => {
    const getAllTeams = async () => {
      setTimeout(async () => {
        const data = await getTeams();
        setTeams(data);
      }, 0);
    };
    if (teams === null) {
      getAllTeams();
    }
  }, []);
  return context;
};
