"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon as SolidDownIcon,
} from "@heroicons/react/20/solid";
import {
  ChevronDownIcon as OutlineDownIcon,
  ChevronUpIcon as OutlineUpIcon,
} from "@heroicons/react/24/outline";
import React, { useMemo, useState } from "react";

/* =========================
   Types
   ========================= */
interface Column {
  field: string;
  headerName: string;
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
  align?: "left" | "center" | "right";
  type?: "string" | "number" | "date";
  render?: (value: any, row: any) => React.ReactNode;
}

interface Action {
  label: string;
  onClick: () => void;
  primary?: boolean;
}

interface DataGridProps {
  data?: any[];
  columns?: Column[];
  actions?: Action[];
  searchPlaceholder?: string;
  searchFields?: string[];
  itemsPerPage?: number; // initial
}

/* =========================
   Demo data (12 rows)
   ========================= */
const sampleData = [
  {
    id: "1",
    name: "4033 NW Yeon Avenue and 3610 & 3620 NW St. Helens Road",
    address: {
      lineOne: "4033 NW Yeon Ave.",
      city: "Portland",
      state: "Oregon",
      stateCode: "OR",
      postalCode: "97209",
    },
    email: "4033nwyeonavenue@mail.cardinal.wtf",
    type: "Industrial",
    leasableArea: 150680,
    leaseCount: 1,
    occupancy: 0,
    current: null,
    lastUpdated: "7/31/2025",
  },
  {
    id: "2",
    name: "Awesome Suggested Property Name",
    address: {
      lineOne: "5440 SW Westgate Dr.",
      city: "Portland",
      state: "Oregon",
      stateCode: "OR",
      postalCode: "97221",
    },
    email: "awesomesuggestedproperty@mail.cardinal.wtf",
    type: "Industrial",
    leasableArea: null,
    leaseCount: 1,
    occupancy: 0,
    current: null,
    lastUpdated: "7/31/2025",
  },
  {
    id: "3",
    name: "Completely QAed",
    address: {
      lineOne: "5440 SW Westgate Dr.",
      city: "Portland",
      state: "Washington",
      stateCode: "WA",
      postalCode: "98101",
    },
    email: "completelyqaed@mail.cardinal.wtf",
    type: "Industrial",
    leasableArea: null,
    leaseCount: 2,
    occupancy: 0,
    current: null,
    lastUpdated: "7/31/2025",
  },
  {
    id: "4",
    name: "4000Sth",
    address: {
      lineOne: "4000 NW StHelens Rd",
      city: "Portland",
      state: "Oregon",
      stateCode: "OR",
      postalCode: "97210",
    },
    email: "4000sth@mail.cardinal.wtf",
    type: "Industrial",
    leasableArea: null,
    leaseCount: 1,
    occupancy: 0,
    current: null,
    lastUpdated: "7/31/2025",
  },
  {
    id: "5",
    name: "PCCF",
    address: {
      lineOne: "2225 N. Vancouver Ave.",
      city: "Portland",
      state: "Oregon",
      stateCode: "OR",
      postalCode: "97227",
    },
    email: "pccf@mail.cardinal.wtf",
    type: "Industrial",
    leasableArea: 13440,
    leaseCount: 11,
    occupancy: 0,
    current: null,
    lastUpdated: "7/31/2025",
  },
  {
    id: "6",
    name: "Highlands at Sylvan Office Building",
    address: {
      lineOne: "5440 SW Westgate Dr.",
      city: "Portland",
      state: "Oregon",
      stateCode: "OR",
      postalCode: "97221",
    },
    email: "highlandsatsylvanofficebuild@mail.cardinal.wtf",
    type: "Industrial",
    leasableArea: null,
    leaseCount: 1,
    occupancy: 0,
    current: null,
    lastUpdated: "7/31/2025",
  },
  {
    id: "7",
    name: "4200 Northwest Yeon Avenue",
    address: {
      lineOne: "4200 Northwest Yeon Avenue",
      city: "Portland",
      state: "Oregon",
      stateCode: "OR",
      postalCode: "97210",
    },
    email: "4200northwestyeonavenue@mail.cardinal.wtf",
    type: "Industrial",
    leasableArea: null,
    leaseCount: 1,
    occupancy: 0,
    current: null,
    lastUpdated: "7/31/2025",
  },
  {
    id: "8",
    name: "The Pine Offices",
    address: {
      lineOne: "12 Pine St",
      city: "Seattle",
      state: "Washington",
      stateCode: "WA",
      postalCode: "98101",
    },
    email: "pineoffices@mail.cardinal.wtf",
    type: "Office",
    leasableArea: 42000,
    leaseCount: 5,
    occupancy: 87,
    current: null,
    lastUpdated: "7/31/2025",
  },
  {
    id: "9",
    name: "Riverfront Plaza",
    address: {
      lineOne: "99 Riverfront Dr",
      city: "Spokane",
      state: "Washington",
      stateCode: "WA",
      postalCode: "99201",
    },
    email: "riverfrontplaza@mail.cardinal.wtf",
    type: "Retail",
    leasableArea: 18200,
    leaseCount: 9,
    occupancy: 78,
    current: null,
    lastUpdated: "7/31/2025",
  },
  {
    id: "10",
    name: "Harbor Heights",
    address: {
      lineOne: "800 Harbor Ave",
      city: "Portland",
      state: "Oregon",
      stateCode: "OR",
      postalCode: "97205",
    },
    email: "harborheights@mail.cardinal.wtf",
    type: "Mixed-Use",
    leasableArea: 66500,
    leaseCount: 14,
    occupancy: 92,
    current: null,
    lastUpdated: "7/31/2025",
  },
  {
    id: "11",
    name: "Maple Row",
    address: {
      lineOne: "1400 Maple Row",
      city: "Portland",
      state: "Oregon",
      stateCode: "OR",
      postalCode: "97204",
    },
    email: "maplerow@mail.cardinal.wtf",
    type: "Industrial",
    leasableArea: 32000,
    leaseCount: 3,
    occupancy: 64,
    current: null,
    lastUpdated: "7/31/2025",
  },
  {
    id: "12",
    name: "Juniper Park",
    address: {
      lineOne: "77 Juniper Park",
      city: "Tacoma",
      state: "Washington",
      stateCode: "WA",
      postalCode: "98402",
    },
    email: "juniperpark@mail.cardinal.wtf",
    type: "Office",
    leasableArea: 50800,
    leaseCount: 7,
    occupancy: 71,
    current: null,
    lastUpdated: "7/31/2025",
  },
];

/* =========================
   Columns
   ========================= */
const defaultPropertyColumns: Column[] = [
  { field: "name", headerName: "NAME", sortable: true, width: "min-w-80" },
  {
    field: "address.lineOne",
    headerName: "STREET ADDRESS",
    sortable: true,
    width: "min-w-64",
  },
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
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        </button>
      </div>
    ),
  },
  {
    field: "address.city",
    headerName: "CITY",
    sortable: true,
    width: "min-w-32",
  },
  { field: "address.stateCode", headerName: "STATE", width: "min-w-24" },
  { field: "type", headerName: "TYPE", width: "min-w-32" },
  {
    field: "leasableArea",
    headerName: "LEASABLE..",
    width: "min-w-32",
    render: (value: number | null) =>
      value ? value.toLocaleString() : "no active ...",
  },
  {
    field: "leaseCount",
    headerName: "# LEAS..",
    sortable: true,
    type: "number",
    width: "min-w-24",
  },
  {
    field: "occupancy",
    headerName: "OCCUPAN..",
    width: "min-w-32",
    render: (value: number) => `${value ?? 0}%`,
  },
  {
    field: "current",
    headerName: "CURRENT..",
    width: "min-w-32",
    render: (value: any) => value || "-",
  },
  {
    field: "lastUpdated",
    headerName: "LAST..",
    type: "date",
    width: "min-w-32",
  },
];

/* =========================
   Actions
   ========================= */
const defaultActions: Action[] = [
  { label: "EXPORT", onClick: () => console.log("Export clicked") },
  { label: "ADD", onClick: () => console.log("Add clicked"), primary: true },
];

/* =========================
   Component
   ========================= */
const DataGrid: React.FC<DataGridProps> = (props) => {
  const data = props.data ?? sampleData;
  const columns = props.columns ?? defaultPropertyColumns;
  const actions = props.actions ?? defaultActions;
  const searchPlaceholder =
    props.searchPlaceholder ?? "Search Properties by name or address.";
  const searchFields = props.searchFields ?? ["name", "address.lineOne"];

  const [ipp, setIpp] = useState<number>(props.itemsPerPage ?? 10);
  const ippOptions = [10, 25, 50] as const;

  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const getNestedValue = (obj: any, path: string) =>
    path.split(".").reduce((current, key) => current?.[key], obj);

  const handleSort = (field: string) => {
    setSortConfig((prev) => ({
      key: field,
      direction:
        prev.key === field && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  // Filter + sort
  const filteredAndSortedData = useMemo(() => {
    let filtered = [...data];

    if (searchQuery) {
      filtered = filtered.filter((item) =>
        searchFields.some((field) => {
          const value = getNestedValue(item, field);
          return value
            ?.toString()
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        })
      );
    }

    if (sortConfig.key) {
      filtered = filtered.sort((a, b) => {
        let aValue = getNestedValue(a, sortConfig.key!);
        let bValue = getNestedValue(b, sortConfig.key!);
        if (typeof aValue === "string") {
          aValue = aValue.toLowerCase();
          bValue = bValue?.toLowerCase();
        }
        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [data, searchQuery, sortConfig, searchFields]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredAndSortedData.length / ipp));
  const current = Math.min(currentPage, totalPages);
  const startIndex = (current - 1) * ipp;
  const endIndex = Math.min(startIndex + ipp, filteredAndSortedData.length);
  const paginatedData = filteredAndSortedData.slice(startIndex, endIndex);

  const goToPage = (page: number) =>
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
  const onChangeIpp = (value: number) => {
    setIpp(value);
    setCurrentPage(1);
  };

  return (
    <div className="bg-white border-t border-gray-200 rounded-lg shadow-sm">
      {/* Top controls */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-4 w-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500
                         focus:outline-none focus:ring-1 focus:ring-brand-royal focus:border-brand-royal text-sm"
            />
          </div>

          {/* Filter + actions */}
          <div className="flex gap-2">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4h18v2.586L15 13v4l-4 4v-8L3 6.707V4z"
                />
              </svg>
              FILTER
            </button>

            {actions.map((action, idx) => (
              <button
                key={idx}
                onClick={action.onClick}
                className={`px-4 py-2 text-sm font-medium rounded-md focus:outline-none ${
                  action.primary
                    ? "text-typography-white bg-brand-royal hover:bg-brand-royal-hover"
                    : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {action.label}
              </button>
            ))}
          </div>

          {/* Items per page */}
          <Menu as="div" className="relative inline-block">
            <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs border border-gray-300 hover:bg-gray-50">
              Items per page: {ipp}
              <SolidDownIcon
                aria-hidden="true"
                className="-mr-1 size-5 text-gray-400"
              />
            </MenuButton>

            <MenuItems className="absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-md bg-white shadow-lg outline-1 outline-black/5">
              <div className="py-1">
                {ippOptions.map((n) => (
                  <MenuItem key={n}>
                    <button
                      type="button"
                      onClick={() => onChangeIpp(n)}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {n}
                    </button>
                  </MenuItem>
                ))}
              </div>
            </MenuItems>
          </Menu>
        </div>
      </div>

      {/* Table (rounded bottom via wrapper) */}
      <div className="overflow-hidden rounded-b-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.field}
                    className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${column.width || ""} ${
                      column.sortable ? "cursor-pointer hover:bg-gray-100" : ""
                    } ${column.align === "center" ? "text-center" : column.align === "right" ? "text-right" : ""}`}
                    onClick={() => column.sortable && handleSort(column.field)}
                  >
                    <div
                      className={`flex items-center ${
                        column.align === "center"
                          ? "justify-center"
                          : column.align === "right"
                            ? "justify-end"
                            : ""
                      }`}
                    >
                      {column.headerName}
                      {column.sortable && (
                        <span className="ml-1">
                          {sortConfig.key === column.field ? (
                            sortConfig.direction === "asc" ? (
                              <OutlineUpIcon className="w-3 h-3 text-gray-600" />
                            ) : (
                              <OutlineDownIcon className="w-3 h-3 text-gray-600" />
                            )
                          ) : (
                            <div className="w-3 h-3" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedData.map((row, rowIndex) => (
                <tr key={row.id || rowIndex} className="hover:bg-gray-50">
                  {columns.map((column) => {
                    const value = getNestedValue(row, column.field);
                    const cellContent = column.render
                      ? column.render(value, row)
                      : value;
                    return (
                      <td
                        key={`${row.id || rowIndex}-${column.field}`}
                        className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${column.width || ""} ${
                          column.align === "center"
                            ? "text-center"
                            : column.align === "right"
                              ? "text-right"
                              : ""
                        }`}
                      >
                        {cellContent ?? "-"}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination (rounded bottom to match) */}
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-6 py-3 rounded-b-lg">
        {/* Mobile Prev/Next */}
        <div className="flex flex-1 justify-between sm:hidden">
          <button
            onClick={() => goToPage(current - 1)}
            disabled={current <= 1}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => goToPage(current + 1)}
            disabled={current >= totalPages}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>

        {/* Desktop detailed pagination */}
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-medium">
                {filteredAndSortedData.length === 0 ? 0 : startIndex + 1}
              </span>{" "}
              to <span className="font-medium">{endIndex}</span> of{" "}
              <span className="font-medium">
                {filteredAndSortedData.length}
              </span>{" "}
              results
            </p>
          </div>
          <div>
            <nav
              aria-label="Pagination"
              className="isolate inline-flex -space-x-px rounded-md shadow-xs"
            >
              {/* Prev */}
              <button
                onClick={() => goToPage(current - 1)}
                disabled={current <= 1}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 border border-gray-300 bg-white hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-40"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon aria-hidden="true" className="size-5" />
              </button>

              {/* Page numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
                const isCurrent = p === current;
                return (
                  <button
                    key={p}
                    onClick={() => goToPage(p)}
                    aria-current={isCurrent ? "page" : undefined}
                    className={
                      isCurrent
                        ? "relative z-10 inline-flex items-center bg-brand-royal px-4 py-2 text-sm font-semibold text-typography-white focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-royal"
                        : "relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 border border-gray-300 bg-white hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    }
                  >
                    {p}
                  </button>
                );
              })}

              {/* Next */}
              <button
                onClick={() => goToPage(current + 1)}
                disabled={current >= totalPages}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 border border-gray-300 bg-white hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-40"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon aria-hidden="true" className="size-5" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataGrid;
