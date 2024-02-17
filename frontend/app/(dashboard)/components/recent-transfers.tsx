import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useTransfers from "@/hooks/use-transfers";
import Transfer from "./transfer";
import { transferableAbortSignal } from "util";

export function RecentTransfers() {
  const { transfers } = useTransfers();
  return (
    <div className="space-y-8">
      {transfers?.map((transfer) => {
        return (
          <div className="flex items-center w-full" key={transfer.id}>
            <Avatar className="h-9 w-9">
              <AvatarImage src="/avatars/01.png" alt="Avatar" />
              <AvatarFallback>
                {transfer.player.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                {transfer.player.name}
              </p>
              <p className="text-sm text-muted-foreground">
                {transfer.player.position}
              </p>
            </div>
            <div className="ml-auto font-medium">
              <Transfer newTeam={transfer.newTeam} oldTeam={transfer.oldTeam} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
