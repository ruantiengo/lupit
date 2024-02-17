import { deleteTeam } from "@/api/teams";
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
import { useTeams } from "@/hooks/use-teams";
import { cn } from "@/lib/utils";

interface DeleteDialogProps {
  id: string;
}
export function DeleteDialog({ id }: DeleteDialogProps) {
  const { removeTeam } = useTeams();
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
              const res = await deleteTeam(id);

              if (res.status === 200) {
                removeTeam(id);
                toastMessages(toast, "default", "Time deletado com sucesso.");
              } else {
                toastMessages(
                  toast,
                  "destructive",
                  "Erro!",
                  "Erro ao deletar o time, por favor tente novamente mais tarde"
                );
              }
            }}
          >
            Deletar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
