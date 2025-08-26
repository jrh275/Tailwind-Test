// src/app/components/properties/panels/IssuesPanel.tsx
"use client";

import {
  ExclamationTriangleIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  PlusIcon,
  UserIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/20/solid";
import { useMemo, useState } from "react";
import { FieldSelect } from "../shared";
import CreateIssueModal from "./CreateIssueModal";

interface Issue {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: "Urgent" | "High" | "Medium" | "Low";
  status: "Open" | "In Progress" | "Resolved" | "Closed";
  reportedBy: string;
  assignedTo?: string;
  reportedDate: string;
  dueDate?: string;
  estimatedCost?: number;
  unit?: string;
  completedDate?: string;
}

const sampleIssues: Issue[] = [
  {
    id: "1",
    title: "HVAC System Not Working",
    description:
      "Air conditioning unit in Unit 101 is not cooling properly. Tenant reports room temperature remains at 78°F despite thermostat set to 72°F.",
    category: "HVAC",
    priority: "High",
    status: "Open",
    reportedBy: "Sarah Johnson",
    reportedDate: "2024-08-20",
    dueDate: "2024-08-22",
    estimatedCost: 350,
    unit: "101",
  },
  {
    id: "2",
    title: "Parking Lot Pothole Repair",
    description:
      "Large pothole in parking lot near entrance causing damage to vehicles. Multiple tenants have reported concerns.",
    category: "Exterior",
    priority: "Medium",
    status: "In Progress",
    reportedBy: "Property Manager",
    assignedTo: "ABC Paving Co.",
    reportedDate: "2024-08-18",
    dueDate: "2024-08-25",
    estimatedCost: 1200,
  },
  {
    id: "3",
    title: "Leaky Faucet in Bathroom",
    description:
      "Kitchen faucet in Unit 202 has been dripping constantly. Tenant estimates 2-3 drops per minute.",
    category: "Plumbing",
    priority: "Low",
    status: "Resolved",
    reportedBy: "Michael Chen",
    assignedTo: "City Plumbers",
    reportedDate: "2024-08-15",
    completedDate: "2024-08-17",
    estimatedCost: 125,
    unit: "202",
  },
  {
    id: "4",
    title: "Security Camera Malfunction",
    description:
      "Camera #3 in lobby is not recording. Display shows static feed. May need replacement.",
    category: "Security",
    priority: "Medium",
    status: "Open",
    reportedBy: "Security Guard",
    reportedDate: "2024-08-19",
    dueDate: "2024-08-24",
    estimatedCost: 450,
  },
  {
    id: "5",
    title: "Elevator Maintenance",
    description:
      "Scheduled quarterly maintenance for main elevator. Includes inspection, lubrication, and safety checks.",
    category: "Elevator",
    priority: "Urgent",
    status: "In Progress",
    reportedBy: "Maintenance Team",
    assignedTo: "Otis Service",
    reportedDate: "2024-08-21",
    dueDate: "2024-08-21",
    estimatedCost: 800,
  },
];

export default function IssuesPanel() {
  const [issues, setIssues] = useState<Issue[]>(sampleIssues);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [createOpen, setCreateOpen] = useState(false);

  const statusOptions = [
    { label: "All Statuses", value: "all" },
    { label: "Open", value: "Open" },
    { label: "In Progress", value: "In Progress" },
    { label: "Resolved", value: "Resolved" },
    { label: "Closed", value: "Closed" },
  ];

  const priorityOptions = [
    { label: "All Priorities", value: "all" },
    { label: "Urgent", value: "Urgent" },
    { label: "High", value: "High" },
    { label: "Medium", value: "Medium" },
    { label: "Low", value: "Low" },
  ];

  const categoryOptions = [
    { label: "All Categories", value: "all" },
    { label: "HVAC", value: "HVAC" },
    { label: "Plumbing", value: "Plumbing" },
    { label: "Electrical", value: "Electrical" },
    { label: "Security", value: "Security" },
    { label: "Elevator", value: "Elevator" },
    { label: "Exterior", value: "Exterior" },
    { label: "Interior", value: "Interior" },
  ];

  const filteredIssues = useMemo(
    () =>
      issues.filter((issue) => {
        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          if (
            !issue.title.toLowerCase().includes(q) &&
            !issue.description.toLowerCase().includes(q) &&
            !issue.reportedBy.toLowerCase().includes(q) &&
            !(issue.assignedTo || "").toLowerCase().includes(q) &&
            !(issue.unit || "").toLowerCase().includes(q)
          ) {
            return false;
          }
        }
        if (statusFilter !== "all" && issue.status !== statusFilter)
          return false;
        if (priorityFilter !== "all" && issue.priority !== priorityFilter)
          return false;
        if (categoryFilter !== "all" && issue.category !== categoryFilter)
          return false;
        return true;
      }),
    [issues, searchQuery, statusFilter, priorityFilter, categoryFilter]
  );

  // --- Grey chips (status + priority) ---
  const chipClass =
    "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-cloudy/50 text-midnight hover:bg-cloudy dark:bg-cloudy/20 dark:text-cloudy dark:hover:bg-cloudy/30";

  const getStatusStyle = (_status: Issue["status"]) => chipClass;
  const getStatusIcon = (_status: Issue["status"]) => (
    <ExclamationTriangleIcon className="h-4 w-4 text-gray-400 dark:text-gray-500" />
  );
  const getPriorityStyle = (_priority: Issue["priority"]) => chipClass;

  function handleCreate(newIssue: Omit<Issue, "id">) {
    setIssues((prev) => {
      const nextId =
        String(
          prev.reduce((max, i) => Math.max(max, Number(i.id) || 0), 0) + 1
        ) || String(Date.now());
      return [{ id: nextId, ...newIssue }, ...prev];
    });
    setCreateOpen(false);
  }

  return (
    <div className="space-y-6">
      {/* Row 1: Full-width Search */}
      <div className="w-full">
        <div className="relative" role="search">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search issues, assignees, units, reporters…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-royal focus:border-royal text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
        </div>
      </div>

      {/* Row 2: Filters + View Toggle + New Issue */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-4">
        <FieldSelect
          id="statusFilter"
          options={statusOptions}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        />
        <FieldSelect
          id="priorityFilter"
          options={priorityOptions}
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        />
        <FieldSelect
          id="categoryFilter"
          options={categoryOptions}
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        />

        <div className="ml-auto flex items-center gap-2">
          {/* Grid/List Toggle */}
          <div className="flex items-center overflow-hidden rounded-md border border-gray-300 dark:border-gray-600">
            <button
              onClick={() => setViewMode("list")}
              className={`px-3 py-2 text-sm font-medium ${
                viewMode === "list"
                  ? "bg-royal/10 text-royal hover:bg-royal/20 dark:bg-royal/20 dark:text-royal dark:hover:bg-royal/30"
                  : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              List
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-2 text-sm font-medium ${
                viewMode === "grid"
                  ? "bg-royal/10 text-royal hover:bg-royal/20 dark:bg-royal/20 dark:text-royal dark:hover:bg-royal/30"
                  : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              Grid
            </button>
          </div>

          {/* New Issue */}
          <button
            onClick={() => setCreateOpen(true)}
            className="flex items-center gap-2 rounded-md bg-royal/10 px-3 py-2 text-sm font-semibold text-royal shadow-xs hover:bg-royal/20 dark:bg-royal/20 dark:text-royal dark:shadow-none dark:hover:bg-royal/30"
          >
            <PlusIcon className="h-4 w-4" />
            New Issue
          </button>
        </div>
      </div>

      {/* Issues Display */}
      {viewMode === "grid" ? (
        // GRID VIEW
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredIssues.map((issue) => (
            <div
              key={issue.id}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold text-sea">
                    {issue.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className={getStatusStyle(issue.status)}>
                      {getStatusIcon(issue.status)}
                      {issue.status}
                    </span>
                    <span className={getPriorityStyle(issue.priority)}>
                      {issue.priority}
                    </span>
                  </div>
                </div>

                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                  {issue.description}
                </p>

                <div className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <p>
                    <span className="font-medium">Category:</span>{" "}
                    {issue.category}
                  </p>
                  <p className="flex items-center">
                    <UserIcon className="mr-1.5 h-4 w-4" />
                    <span>
                      <span className="font-medium">Reported by:</span>{" "}
                      {issue.reportedBy}
                    </span>
                  </p>
                  {issue.assignedTo && (
                    <p className="flex items-center">
                      <WrenchScrewdriverIcon className="mr-1.5 h-4 w-4" />
                      <span>
                        <span className="font-medium">Assigned to:</span>{" "}
                        {issue.assignedTo}
                      </span>
                    </p>
                  )}
                  <p>
                    <span className="font-medium">Reported:</span>{" "}
                    {issue.reportedDate}
                    {issue.dueDate && (
                      <span className="ml-3">
                        <span className="font-medium">Due:</span>{" "}
                        {issue.dueDate}
                      </span>
                    )}
                    {issue.completedDate && (
                      <span className="ml-3">
                        <span className="font-medium">Completed:</span>{" "}
                        {issue.completedDate}
                      </span>
                    )}
                  </p>
                </div>

                {(issue.unit || issue.estimatedCost) && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600 flex items-center justify-between">
                    {issue.unit ? (
                      <span className={chipClass}>Unit {issue.unit}</span>
                    ) : (
                      <span />
                    )}
                    {issue.estimatedCost && (
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        ${issue.estimatedCost.toLocaleString()}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Actions (Heroicons components) */}
              <div className="mt-4 flex items-center justify-end gap-4">
                <button
                  className="text-sea hover:text-sea"
                  aria-label="View Details"
                >
                  <EyeIcon className="size-5" aria-hidden="true" />
                </button>

                <button
                  className="text-red hover:text-sea"
                  aria-label="Edit Issue"
                >
                  <PencilIcon className="size-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // LIST VIEW
        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredIssues.map((issue) => (
              <li key={issue.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <p className="text-lg font-medium text-sea truncate">
                        {issue.title}
                      </p>
                      <span className={getStatusStyle(issue.status)}>
                        {getStatusIcon(issue.status)}
                        {issue.status}
                      </span>
                      <span className={getPriorityStyle(issue.priority)}>
                        {issue.priority}
                      </span>
                    </div>

                    <div className="ml-2 flex items-center gap-3">
                      {issue.estimatedCost && (
                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                          ${issue.estimatedCost.toLocaleString()}
                        </p>
                      )}
                      {issue.unit && (
                        <span className={chipClass}>Unit {issue.unit}</span>
                      )}
                    </div>
                  </div>

                  <div className="mt-2 sm:flex sm:justify-between">
                    <p className="text-sm text-gray-600 dark:text-gray-300 sm:max-w-3xl">
                      {issue.description}
                    </p>
                    <div className="mt-2 text-sm text-gray-500 dark:text-gray-400 sm:mt-0 sm:text-right">
                      <p>
                        <span className="font-medium">Reported:</span>{" "}
                        {issue.reportedDate}
                        {issue.dueDate && (
                          <span className="ml-3">
                            <span className="font-medium">Due:</span>{" "}
                            {issue.dueDate}
                          </span>
                        )}
                        {issue.completedDate && (
                          <span className="ml-3">
                            <span className="font-medium">Completed:</span>{" "}
                            {issue.completedDate}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex sm:items-center sm:gap-6">
                      <p className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <UserIcon className="flex-shrink-0 mr-1.5 h-4 w-4" />
                        Reported by {issue.reportedBy}
                      </p>
                      {issue.assignedTo && (
                        <p className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-2 sm:mt-0">
                          <WrenchScrewdriverIcon className="flex-shrink-0 mr-1.5 h-4 w-4" />
                          Assigned to {issue.assignedTo}
                        </p>
                      )}
                      <p className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-2 sm:mt-0">
                        <span className="font-medium">Category:</span>
                        <span className="ml-1">{issue.category}</span>
                      </p>
                    </div>

                    {/* Actions (Heroicons components) */}
                    <div className="mt-3 flex justify-end gap-4 sm:mt-0">
                      <button
                        className="text-red hover:text-sea"
                        aria-label="View Details"
                      >
                        <EyeIcon className="size-5" aria-hidden="true" />
                      </button>

                      <button
                        className="text-sea hover:text-sea"
                        aria-label="Edit Issue"
                      >
                        <PencilIcon className="size-5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {filteredIssues.length === 0 && (
        <div className="text-center py-12">
          <WrenchScrewdriverIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
            No issues found
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Try adjusting your search or filters.
          </p>
        </div>
      )}

      {/* Create Issue Modal */}
      {createOpen && (
        <CreateIssueModal
          open={createOpen}
          onClose={() => setCreateOpen(false)}
          onCreate={handleCreate}
          categoryOptions={categoryOptions.filter((o) => o.value !== "all")}
          priorityOptions={priorityOptions.filter((o) => o.value !== "all")}
          statusOptions={statusOptions.filter((o) => o.value !== "all")}
        />
      )}
    </div>
  );
}
