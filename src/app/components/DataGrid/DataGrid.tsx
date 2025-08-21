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

import { defaultActions } from "./DataGrid.actions";
import { defaultPropertyColumns } from "./DataGrid.columns";
import { sampleData } from "./DataGrid.data";
import type { DataGridProps } from "./DataGrid.types";

const DataGrid: React.FC<DataGridProps> = (props) => {
  const data = props.data ?? sampleData;
  const columns = props.columns ?? defaultPropertyColumns;
  const actions = props.actions ?? defaultActions;
  const searchPlaceholder =
    props.searchPlaceholder ?? "Search Properties by name or address.";
  const searchFields = props.searchFields ?? ["name", "address.lineOne"];

  const [ipp, setIpp] = useState<number>(props.itemsPerPage ?? 10);
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const getNestedValue = (obj: any, path: string) =>
    path.split(".").reduce((cur, key) => cur?.[key], obj);

  const handleSort = (field: string) =>
    setSortConfig((prev) => ({
      key: field,
      direction:
        prev.key === field && prev.direction === "asc" ? "desc" : "asc",
    }));

  const filteredAndSortedData = useMemo(() => {
    let filtered = [...data];
    if (searchQuery) {
      filtered = filtered.filter((item) =>
        searchFields.some((field) =>
          getNestedValue(item, field)
            ?.toString()
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      );
    }
    if (sortConfig.key) {
      filtered = filtered.sort((a, b) => {
        let aValue: any = getNestedValue(a, sortConfig.key!);
        let bValue: any = getNestedValue(b, sortConfig.key!);
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
    <div className="bg-white rounded-t-lg">
      {/* Top controls */}
      <div className="py-4">
        <div className="flex items-center gap-3">
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
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-brand-royal focus:border-brand-royal text-sm"
            />
          </div>

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
                    ? "text-brand-royal bg-brand-royal/10 hover:bg-brand-royal/20"
                    : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto [scrollbar-width:thin] [scrollbar-color:rgba(0,0,0,0.35)_transparent]">
        <table className="min-w-max">
          <thead className="bg-white border-b border-typography-red">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.field}
                  className={`${column.field === "name" ? "pl-0 pr-6" : "px-6"} py-3 text-left text-xs font-medium uppercase tracking-wide text-typography-foggy ${column.width || ""} ${
                    column.sortable
                      ? "cursor-pointer hover:bg-base-faint/50"
                      : ""
                  } ${column.align === "center" ? "text-center" : column.align === "right" ? "text-right" : ""}`}
                  onClick={() => column.sortable && handleSort(column.field)}
                >
                  <div
                    className={`flex items-center ${column.align === "center" ? "justify-center" : column.align === "right" ? "justify-end" : ""}`}
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

          <tbody>
            {paginatedData.map((row, rowIndex) => (
              <tr key={row.id || rowIndex} className="hover:bg-base-faint/50">
                {columns.map((column) => {
                  const value = getNestedValue(row, column.field);
                  const cellContent = column.render
                    ? column.render(value, row)
                    : value;
                  return (
                    <td
                      key={`${row.id || rowIndex}-${column.field}`}
                      className={`${column.field === "name" ? "pl-0 pr-6" : "px-6"} py-4 whitespace-nowrap text-sm text-typography-midnight ${column.width || ""} ${
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

      {/* Pagination */}
      <div className="flex items-center justify-between py-3">
        <div className="hidden sm:flex items-center">
          <Menu as="div" className="relative inline-block">
            <MenuButton className="inline-flex items-center justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs border border-gray-300 hover:bg-gray-50">
              Properties per page: {ipp}
              <SolidDownIcon
                aria-hidden="true"
                className="-mr-1 size-5 text-gray-400"
              />
            </MenuButton>
            <MenuItems className="absolute left-0 z-10 mt-2 w-44 origin-top-left rounded-md bg-white shadow-lg outline-1 outline-black/5">
              <div className="py-1">
                {([10, 25, 50] as const).map((n) => (
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

        <nav
          aria-label="Pagination"
          className="isolate inline-flex -space-x-px rounded-md"
        >
          <button
            onClick={() => goToPage(current - 1)}
            disabled={current <= 1}
            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 bg-white hover:bg-gray-50 disabled:opacity-40"
          >
            <span className="sr-only">Previous</span>
            <ChevronLeftIcon aria-hidden="true" className="size-5" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
            const isCurrent = p === current;
            return (
              <button
                key={p}
                onClick={() => goToPage(p)}
                aria-current={isCurrent ? "page" : undefined}
                className={
                  isCurrent
                    ? "relative z-10 inline-flex items-center rounded-md bg-brand-royal/10 px-4 py-2 text-sm font-semibold text-brand-royal"
                    : "relative inline-flex items-center rounded-md px-4 py-2 text-sm font-semibold text-gray-900 bg-white hover:bg-gray-50"
                }
              >
                {p}
              </button>
            );
          })}

          <button
            onClick={() => goToPage(current + 1)}
            disabled={current >= totalPages}
            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 bg-white hover:bg-gray-50 disabled:opacity-40"
          >
            <span className="sr-only">Next</span>
            <ChevronRightIcon aria-hidden="true" className="size-5" />
          </button>
        </nav>
      </div>
    </div>
  );
};

export default DataGrid;
