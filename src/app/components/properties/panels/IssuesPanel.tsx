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
import { useState } from "react";
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

  const filteredIssues = issues.filter((issue) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (
        !issue.title.toLowerCase().includes(query) &&
        !issue.description.toLowerCase().includes(query) &&
        !issue.reportedBy.toLowerCase().includes(query)
      ) {
        return false;
      }
    }
    if (statusFilter !== "all" && issue.status !== statusFilter) return false;
    if (priorityFilter !== "all" && issue.priority !== priorityFilter)
      return false;
    if (categoryFilter !== "all" && issue.category !== categoryFilter)
      return false;
    return true;
  });

  const getPriorityStyle = (priority: Issue["priority"]) => {
    switch (priority) {
      case "Urgent":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      case "High":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "Low":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  const getStatusStyle = (status: Issue["status"]) => {
    switch (status) {
      case "Open":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "In Progress":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400";
      case "Resolved":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "Closed":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  const getStatusIcon = (status: Issue["status"]) => {
    switch (status) {
      case "Open":
        return <ExclamationTriangleIcon className="h-4 w-4" />;
      case "In Progress":
        return <ClockIcon className="h-4 w-4" />;
      case "Resolved":
        return <CheckCircleIcon className="h-4 w-4" />;
      case "Closed":
        return <CheckCircleIcon className="h-4 w-4" />;
      default:
        return <ExclamationTriangleIcon className="h-4 w-4" />;
    }
  };

  const statusCounts = {
    open: issues.filter((i) => i.status === "Open").length,
    inProgress: issues.filter((i) => i.status === "In Progress").length,
    resolved: issues.filter((i) => i.status === "Resolved").length,
    closed: issues.filter((i) => i.status === "Closed").length,
  };

  const totalEstimatedCost = issues
    .filter((i) => i.estimatedCost && i.status !== "Closed")
    .reduce((sum, i) => sum + (i.estimatedCost || 0), 0);

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ExclamationTriangleIcon className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                Open
              </h3>
              <p className="text-2xl font-bold text-blue-600">
                {statusCounts.open}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ClockIcon className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                In Progress
              </h3>
              <p className="text-2xl font-bold text-purple-600">
                {statusCounts.inProgress}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CheckCircleIcon className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                Resolved
              </h3>
              <p className="text-2xl font-bold text-green-600">
                {statusCounts.resolved}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CheckCircleIcon className="h-8 w-8 text-gray-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                Closed
              </h3>
              <p className="text-2xl font-bold text-gray-600">
                {statusCounts.closed}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 text-emerald-600 font-bold text-xl">
                $
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                Est. Cost
              </h3>
              <p className="text-2xl font-bold text-emerald-600">
                ${totalEstimatedCost.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search issues, descriptions, or reporters..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white"
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

          <button className="flex items-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500">
            <PlusIcon className="h-4 w-4" />
            New Issue
          </button>
        </div>
      </div>

      {/* Issues List */}
      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredIssues.map((issue) => (
            <li key={issue.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <p className="text-lg font-medium text-blue-600 truncate">
                      {issue.title}
                    </p>
                    <div className="ml-3 flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(issue.status)}`}
                      >
                        {getStatusIcon(issue.status)}
                        {issue.status}
                      </span>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityStyle(issue.priority)}`}
                      >
                        {issue.priority}
                      </span>
                    </div>
                  </div>
                  <div className="ml-2 flex-shrink-0 flex items-center gap-4">
                    {issue.estimatedCost && (
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        ${issue.estimatedCost.toLocaleString()}
                      </p>
                    )}
                    {issue.unit && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                        Unit {issue.unit}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-2">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {issue.description}
                  </p>
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
                  <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
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

                <div className="mt-3 flex justify-end">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium mr-4">
                    View Details
                  </button>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Edit Issue
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

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
