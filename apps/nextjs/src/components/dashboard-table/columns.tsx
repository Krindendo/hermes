"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@hermes/ui/components/checkbox";

import type { File } from "~/utils/validations/files";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns: ColumnDef<File>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
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
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="w-full max-w-[500px] truncate font-medium">
            {row.getValue("name")}
          </span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "dateToShow",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => (
      <div className="w-[120px]">{row.getValue("dateToShow")}</div>
    ),
  },
  {
    accessorKey: "size",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Size" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("size")}</div>,
  },
  {
    accessorKey: "extension",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Extension" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("extension")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "actions",
    cell: () => <DataTableRowActions />,
  },
];
