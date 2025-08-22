// src/app/components/properties/panels/IssuesPanel.tsx
"use client";

import {
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  UserIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/20/solid";
import { useMemo, useState } from "react";
import { FieldSelect } from "../shared";

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
  const [issues] = useState<Issue[]>(sampleIssues);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

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

  // THEME-ALIGNED STATUS PILL COLORS
  const getStatusStyle = (status: Issue["status"]) => {
    switch (status) {
      case "Open":
        return "bg-royal/10 text-royal dark:bg-royal/20 dark:text-royal";
      case "In Progress":
        return "bg-rainy/20 text-sea dark:bg-rainy/30 dark:text-sea";
      case "Resolved":
        return "bg-spruce/10 text-spruce dark:bg-spruce/20 dark:text-spruce";
      case "Closed":
        return "bg-cloudy text-midnight dark:bg-cloudy/20 dark:text-cloudy";
      default:
        return "bg-cloudy text-midnight dark:bg-cloudy/20 dark:text-cloudy";
    }
  };

  const getStatusIcon = (status: Issue["status"]) => {
    switch (status) {
      case "Open":
        return <ExclamationTriangleIcon className="h-4 w-4 text-royal" />;
      case "In Progress":
        return <ClockIcon className="h-4 w-4 text-sea" />;
      case "Resolved":
        return <CheckCircleIcon className="h-4 w-4 text-spruce" />;
      case "Closed":
        return <CheckCircleIcon className="h-4 w-4 text-cloudy" />;
      default:
        return <ExclamationTriangleIcon className="h-4 w-4 text-cloudy" />;
    }
  };

  // THEME-ALIGNED PRIORITY PILL COLORS
  const getPriorityStyle = (priority: Issue["priority"]) => {
    switch (priority) {
      case "Urgent":
        return "bg-cardinal/10 text-cardinal dark:bg-cardinal/20 dark:text-cardinal";
      case "High":
        return "bg-pumpkin/10 text-pumpkin dark:bg-pumpkin/20 dark:text-pumpkin";
      case "Medium":
        return "bg-rainy/20 text-sea dark:bg-rainy/30 dark:text-sea";
      case "Low":
        return "bg-spruce/10 text-spruce dark:bg-spruce/20 dark:text-spruce";
      default:
        return "bg-cloudy text-midnight dark:bg-cloudy/20 dark:text-cloudy";
    }
  };

  const statusCounts = useMemo(
    () => ({
      open: issues.filter((i) => i.status === "Open").length,
      inProgress: issues.filter((i) => i.status === "In Progress").length,
      resolved: issues.filter((i) => i.status === "Resolved").length,
      closed: issues.filter((i) => i.status === "Closed").length,
    }),
    [issues]
  );

  const totalEstimatedCost = useMemo(
    () =>
      issues
        .filter((i) => i.estimatedCost && i.status !== "Closed")
        .reduce((sum, i) => sum + (i.estimatedCost || 0), 0),
    [issues]
  );

  const OverviewCard = ({
    icon,
    label,
    value,
    accentClass,
  }: {
    icon: React.ReactNode;
    label: string;
    value: number | string;
    accentClass: string;
  }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-center">
        <div className="flex-shrink-0">{icon}</div>
        <div className="ml-4">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white">
            {label}
          </h3>
          <p className={`text-2xl font-bold ${accentClass}`}>{value}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <OverviewCard
          icon={<ExclamationTriangleIcon className="h-8 w-8 text-royal" />}
          label="Open"
          value={statusCounts.open}
          accentClass="text-royal"
        />
        <OverviewCard
          icon={<ClockIcon className="h-8 w-8 text-sea" />}
          label="In Progress"
          value={statusCounts.inProgress}
          accentClass="text-sea"
        />
        <OverviewCard
          icon={<CheckCircleIcon className="h-8 w-8 text-spruce" />}
          label="Resolved"
          value={statusCounts.resolved}
          accentClass="text-spruce"
        />
        <OverviewCard
          icon={<CheckCircleIcon className="h-8 w-8 text-cloudy" />}
          label="Closed"
          value={statusCounts.closed}
          accentClass="text-cloudy"
        />
        <OverviewCard
          icon={
            <div className="h-8 w-8 font-bold text-xl text-spruce leading-8">
              $
            </div>
          }
          label="Est. Cost"
          value={`$${totalEstimatedCost.toLocaleString()}`}
          accentClass="text-spruce"
        />
      </div>

      {/* Search + Filters + Grid/List Toggle + New Issue */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1 relative">
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

        <div className="flex items-center gap-3">
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

          {/* Grid/List Toggle */}
          <div className="flex items-center gap-1 border border-gray-300 rounded-md">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-2 text-sm font-medium rounded-l-md ${
                viewMode === "grid"
                  ? "bg-royal/10 text-royal hover:bg-royal/20 dark:bg-royal/20 dark:text-royal dark:hover:bg-royal/30"
                  : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-3 py-2 text-sm font-medium rounded-r-md ${
                viewMode === "list"
                  ? "bg-royal/10 text-royal hover:bg-royal/20 dark:bg-royal/20 dark:text-royal dark:hover:bg-royal/30"
                  : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              List
            </button>
          </div>

          {/* New Issue */}
          <button className="flex items-center gap-2 rounded-md bg-royal/10 px-3 py-2 text-sm font-semibold text-royal shadow-xs hover:bg-royal/20 dark:bg-royal/20 dark:text-royal dark:shadow-none dark:hover:bg-royal/30">
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
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(
                        issue.status
                      )}`}
                    >
                      {getStatusIcon(issue.status)}
                      {issue.status}
                    </span>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityStyle(
                        issue.priority
                      )}`}
                    >
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
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cloudy text-midnight dark:bg-gray-700 dark:text-gray-200">
                        Unit {issue.unit}
                      </span>
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

              {/* Actions: icons only, sea color */}
              <div className="mt-4 flex items-center justify-end gap-4">
                <button
                  className="text-sea hover:text-sea"
                  aria-label="View Details"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </button>

                <button
                  className="text-sea hover:text-sea"
                  aria-label="Edit Issue"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                    />
                  </svg>
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
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(
                          issue.status
                        )}`}
                      >
                        {getStatusIcon(issue.status)}
                        {issue.status}
                      </span>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityStyle(
                          issue.priority
                        )}`}
                      >
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
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cloudy text-midnight dark:bg-gray-700 dark:text-gray-200">
                          Unit {issue.unit}
                        </span>
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

                    {/* Actions: icons only, sea color */}
                    <div className="mt-3 flex justify-end gap-4 sm:mt-0">
                      <button
                        className="text-sea hover:text-sea"
                        aria-label="View Details"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                        </svg>
                      </button>

                      <button
                        className="text-sea hover:text-sea"
                        aria-label="Edit Issue"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                          />
                        </svg>
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
    </div>
  );
}
