import type { Column } from "./DataGrid.types";

export const defaultPropertyColumns: Column[] = [
  { field: "name", headerName: "NAME", sortable: true, width: "min-w-80" },
  { field: "address.lineOne", headerName: "STREET ADDRESS", sortable: true, width: "min-w-64" },
  {
    field: "email",
    headerName: "EMAIL",
    width: "min-w-80",
    render: (value: string) => (
      <div className="flex items-center gap-2">
        <span>{value}</span>
        <button
          onClick={() => navigator.clipboard.writeText(value)}
          className="text-gray-400 hover:text-gray-600"
          aria-label="Copy email"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
      </div>
    ),
  },
  { field: "address.city", headerName: "CITY", sortable: true, width: "min-w-32" },
  { field: "address.stateCode", headerName: "STATE", width: "min-w-24" },
  { field: "type", headerName: "TYPE", width: "min-w-32" },
  {
    field: "leasableArea",
    headerName: "LEASABLE..",
    width: "min-w-32",
    render: (value: number | null) => (value ? value.toLocaleString() : "no active ..."),
  },
  { field: "leaseCount", headerName: "# LEAS..", sortable: true, type: "number", width: "min-w-24" },
  { field: "occupancy", headerName: "OCCUPAN..", width: "min-w-32", render: (v: number) => `${v ?? 0}%` },
  { field: "current", headerName: "CURRENT..", width: "min-w-32", render: (v: any) => v || "-" },
  { field: "lastUpdated", headerName: "LAST..", type: "date", width: "min-w-32" },
];
