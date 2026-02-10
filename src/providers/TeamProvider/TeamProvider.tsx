import React, { createContext, useEffect, useMemo, useState } from "react";

export const TeamProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [team, setTeam] = useState<"FSE" | "BSE">("FSE");

  const handleSetTeam = (team: "FSE" | "BSE") => {
    setTeam(team);
    localStorage.setItem("@engineering-metrics/team", team);
  };

  useEffect(() => {
    const storedTeam = localStorage.getItem("@engineering-metrics/team");
    if (storedTeam) {
      setTeam(storedTeam as "FSE" | "BSE");
    }
  }, []);

  const contextValue = useMemo(() => ({ team, handleSetTeam }), [team]);

  return (
    <TeamContext.Provider value={contextValue}>{children}</TeamContext.Provider>
  );
};

const TeamContext = createContext<ITeamContextValue | null>(null);

export const useTeam = () => {
  const context = React.useContext(TeamContext);
  if (!context) {
    throw new Error("useTeam must be used within a TeamProvider");
  }
  return context;
};

interface ITeamContextValue {
  team: "FSE" | "BSE";
  handleSetTeam: (team: "FSE" | "BSE") => void;
}
