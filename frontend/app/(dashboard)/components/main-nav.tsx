import Link from "next/link";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const path = usePathname();
  useEffect(() => {
    console.log(path);
  }, []);

  const routes = [
    { link: "/", title: "Dashboard" },
    { link: "/teams", title: "Times" },
    { link: "/players", title: "Jogadore" },
  ];
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {routes.map((r) => (
        <Link
          href={r.link}
          className={`text-sm font-medium transition-colors hover:text-primary ${
            path === r.link ? "" : "text-muted-foreground"
          } `}
        >
          {r.title}
        </Link>
      ))}
    </nav>
  );
}
