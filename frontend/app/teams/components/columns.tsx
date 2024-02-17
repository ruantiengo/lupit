"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "../../../components/ui/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Team } from "@/api/teams";
import Image from "next/image";

export const columns: ColumnDef<Team>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "badge",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Escudo" />
    ),
    cell: ({ row }) => (
      <Image src={row.getValue("badge")} alt="Escudo" width={35} height={35} />
    ),
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nome" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("name")}</div>,
    enableSorting: true,
    enableHiding: true,
  },

  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
