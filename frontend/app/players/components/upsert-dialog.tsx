"use client";
import { Player, savePlayer } from "@/api/player";
import { Team, saveTeam } from "@/api/teams";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useTeams } from "@/hooks/use-teams";
import { useEffect, useMemo, useState } from "react";
import { DatePicker } from "./date-picker";
import { SelectTeam } from "./select";
import { usePlayers } from "@/hooks/use-players";

interface UpsertTeamDialogProps {
  player?: Player;
}

export function UpsertPlayerDialog({ player }: UpsertTeamDialogProps) {
  const [name, setName] = useState(player?.name || "");
  const [team, setTeam] = useState(player?.teamId);
  const [birthDay, setBirthday] = useState(player?.birthDay);
  const [salary, setSalary] = useState(player?.salary);
  const [position, setPosition] = useState(player?.position);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { addPlayer, updatePlayer } = usePlayers();
  const [isOpen, setIsOpen] = useState(false);
  const formmatedDate = useMemo(() => {
    if (birthDay !== undefined) {
      const date = new Date(birthDay);
      const dd = String(date.getDate()).padStart(2, "0"); // Pad day with leading zero if needed
      const mm = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based, so add 1 and pad with leading zero if needed
      const yyyy = date.getFullYear();
      const formattedToday = yyyy + "-" + mm + "-" + dd;

      return formattedToday;
    }
  }, [birthDay]);
  const handlePlayerUpsert = async () => {
    setIsLoading(true);
    try {
      const result = await savePlayer({
        birthDay: birthDay!,
        name: name!,
        salary: salary!,
        teamId: team!,
        position: position!,
        id: player?.id,
      });

      if (result.status === 201 || result.status === 200) {
        if (player) {
          updatePlayer(result.data);
        } else {
          addPlayer(result.data);
        }
        setIsOpen(false);
        toast({
          variant: "default",
          title: "Salvo com sucesso",
          description: "",
        });
      }
    } catch (error) {
      // Lidar com erros
    }
    setIsLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen((old) => !old)}>
      <DialogTrigger asChild>
        <Button
          variant={player ? "ghost" : "outline"}
          className={
            player
              ? "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
              : ""
          }
        >
          {player !== undefined ? "Editar" : "Novo"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {player !== undefined ? "Editar jogador" : "Novo jogador"}
          </DialogTitle>
          <DialogDescription>
            Clique em salvar quando terminar
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await handlePlayerUpsert();
          }}
        >
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nome
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="salary" className="text-right">
                Salario
              </Label>
              <Input
                id="salary"
                value={salary}
                type="number"
                onChange={(e) => setSalary(Number(e.target.value))}
                className="col-span-3"
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="team" className="text-right">
                Time
              </Label>
              <SelectTeam setSelectedId={setTeam} selectedId={team} />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="position" className="text-right">
                Posição
              </Label>
              <Input
                id="position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="col-span-3"
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="birthday" className="text-right">
                Data de Nascimento
              </Label>
              <input
                type="date"
                onChange={(e) => {
                  setBirthday(new Date(e.target.value));
                }}
                value={formmatedDate}
                className="w-40 border border-gray-300 px-2 py-1 rounded-sm"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Carregando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
