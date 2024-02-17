import { deletePlayer } from "@/api/player";
import { toastMessages } from "@/components/toast-messages";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { usePlayers } from "@/hooks/use-players";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface DeleteDialogProps {
  id: string;
}
export function DeleteDialog({ id }: DeleteDialogProps) {
  const { removePlayer } = usePlayers();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
          )}
        >
          Deletar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              setIsLoading(true);
              const res = await deletePlayer(id);
              if (res.status === 200) {
                removePlayer(id);
                toastMessages(toast, "default", "Jogador deletado com sucesso");
              } else {
                toastMessages(
                  toast,
                  "destructive",
                  "Erro!",
                  "Erro ao deletar o jogador, por favor tente novamente mais tarde"
                );
              }
              setIsLoading(false);
            }}
          >
            {isLoading ? "Carregando..." : "Deletar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
