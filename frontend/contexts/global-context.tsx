import React, { ReactNode } from "react";
import { TeamsContextProvider } from "./teams-context";
import { PlayerContextProvider } from "./players-context";

const GlobalContext = ({ children }: { children: ReactNode }) => {
  return (
    <TeamsContextProvider>
      <PlayerContextProvider>{children}</PlayerContextProvider>
    </TeamsContextProvider>
  );
};

export default GlobalContext;
