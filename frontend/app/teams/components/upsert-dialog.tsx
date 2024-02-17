import { Team, saveTeam } from "@/api/teams";
import { Button } from "@/components/ui/button";
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
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface UpsertTeamDialogProps {
  team?: Team;
}

export function UpsertTeamDialog({ team }: UpsertTeamDialogProps) {
  const [name, setName] = useState(team?.name || "");
  const [badge, setBadge] = useState<File | null>(new File([], "Foto")); // Armazena o arquivo de imagem
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { addTeam, updateTeam } = useTeams();
  const [isOpen, setIsOpen] = useState(false);
  const route = useRouter();
  const fetchUpsert = async () => {
    setIsLoading(true);
    try {
      const result = await saveTeam({
        badge: badge!,
        name: name,
        id: team?.id,
      });

      if (result.status === 201 || result.status === 200) {
        if (team) {
          updateTeam(result.data);
        } else {
          addTeam(result.data);
        }

        toast({
          variant: "default",
          title: "Time salvo com sucesso.",
          description: "",
        });
      }
      setIsOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Erro ao salvar o time, por favor tente mais tarde",
      });
    }
    setIsLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen((old) => !old)}>
      <DialogTrigger asChild>
        <Button
          variant={team !== null ? "ghost" : "outline"}
          className={
            team
              ? "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
              : ""
          }
        >
          {team ? "Editar" : "Novo"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{team ? "Editar time" : "Novo time"}</DialogTitle>
          <DialogDescription>
            Clique em salvar quando terminar
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await fetchUpsert();
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
              <Label htmlFor="badge" className="text-right">
                {team ? "Novo escudo" : "Escudo"}
              </Label>
              <Input
                id="badge"
                type="file"
                accept="image/*"
                className="col-span-3"
                required={team === null}
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setBadge(e.target.files[0]); // Armazena o arquivo selecionado
                  }
                }}
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
