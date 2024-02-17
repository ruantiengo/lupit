import { Dispatch, SetStateAction, useEffect } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTeams } from "@/hooks/use-teams";

interface SelectTeamProps {
  selectedId: string | undefined;
  setSelectedId: Dispatch<SetStateAction<string | undefined>>;
}
export function SelectTeam({ selectedId, setSelectedId }: SelectTeamProps) {
  const { teams } = useTeams();
  const handleTeamChange = (value: any) => {
    setSelectedId(value);
  };

  return (
    <Select value={selectedId} onValueChange={handleTeamChange} required>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Selecione uma equipe" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Times</SelectLabel>
          {teams?.map((team) => (
            <SelectItem value={team.id} key={team.id}>
              {team.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
