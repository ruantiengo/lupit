"use client";

import "@/app/globals.css";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import { MainNav } from "./(dashboard)/components/main-nav";
import { UserNav } from "./(dashboard)/components/user-nav";
import Image from "next/image";
import { TeamsContextProvider } from "@/contexts/teams-context";
import GlobalContext from "@/contexts/global-context";
import { Toaster } from "@/components/ui/toaster";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({ children }: any) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <div className="hidden flex-col md:flex">
          <div className="border-b px-4 sticky top-0 z-20 bg-white">
            <div className="flex h-16 items-center ">
              <MainNav className="mx-6 " />
              <div className="ml-auto flex items-center space-x-4">
                <UserNav />
              </div>
            </div>
          </div>
          <GlobalContext>{children}</GlobalContext>
          <Toaster />
        </div>
      </body>
    </html>
  );
}
