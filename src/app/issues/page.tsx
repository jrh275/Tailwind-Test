// ==============================
// File: src/app/issues/page.tsx
// Description: Issues page w/ full-width search, filters below,
// right-aligned list/grid selector (panel-style), Add button,
// and Heroicons component imports for actions.
// ==============================
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

// 20/solid icons you’re already using
import {
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  ListBulletIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  Squares2X2Icon,
  UserIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/20/solid";

// 24/outline for the action icons (was inline <svg>)
import {
  EyeIcon,
  PencilIcon,
  PencilSquareIcon,
} from "@heroicons/react/20/solid";

type Issue = {
  id: string;
  title: string;
  description: string;
  category: string; // "Maintenance" | "Compliance" | "Inquiry" | "Lease" | "Other"
  priority: "Urgent" | "High" | "Medium" | "Low";
  status: "Open" | "In Progress" | "Resolved" | "Closed";
  reportedBy: string;
  assignedTo?: string;
  reportedDate: string; // yyyy-mm-dd
  dueDate?: string; // yyyy-mm-dd
  estimatedCost?: number;
  unit?: string;
  completedDate?: string; // yyyy-mm-dd
  property?: string;
};

const sampleIssues: Issue[] = [
  {
    id: "1",
    title: "HVAC System Not Working",
    description:
      "Unit 101 A/C not cooling. Tenant reports the room stays near 78° even when set to 70°.",
    category: "Maintenance",
    priority: "High",
    status: "In Progress",
    reportedBy: "Sarah Johnson",
    assignedTo: "Derek (Maintenance)",
    reportedDate: "2025-08-10",
    dueDate: "2025-08-28",
    estimatedCost: 650,
    unit: "101",
    property: "4033 NW Yeon Ave",
  },
  {
    id: "2",
    title: "Exterior Lighting Out",
    description:
      "Parking lot pole light near north entrance is out. Safety concern at night.",
    category: "Maintenance",
    priority: "Urgent",
    status: "Open",
    reportedBy: "Security Team",
    assignedTo: "Northwest Electric",
    reportedDate: "2025-08-21",
    dueDate: "2025-08-26",
    estimatedCost: 300,
    property: "4033 NW Yeon Ave",
  },
  {
    id: "3",
    title: "Certificate of Insurance Expiring",
    description:
      "Vendor COI expires next month. Request updated documents for compliance.",
    category: "Compliance",
    priority: "Medium",
    status: "Open",
    reportedBy: "Property Manager",
    assignedTo: "Admin",
    reportedDate: "2025-08-01",
    dueDate: "2025-09-01",
    property: "Sunset Commerce Park",
  },
  {
    id: "4",
    title: "Tenant Inquiry: Signage Guidelines",
    description:
      "New retail tenant asking about permitted signage dimensions & placement.",
    category: "Inquiry",
    priority: "Low",
    status: "Resolved",
    reportedBy: "Leasing",
    assignedTo: "Property Manager",
    reportedDate: "2025-07-15",
    completedDate: "2025-07-19",
    property: "Pioneer Retail Center",
  },
  {
    id: "5",
    title: "Lease Amendment Draft",
    description:
      "Draft amendment for storage addendum; tenant requests additional 200 sq ft.",
    category: "Lease",
    priority: "Medium",
    status: "In Progress",
    reportedBy: "Leasing",
    assignedTo: "Legal",
    reportedDate: "2025-08-05",
    property: "Sunset Commerce Park",
  },
  {
    id: "6",
    title: "Roof Drain Cleaning",
    description: "Schedule seasonal roof drain cleaning before fall rains.",
    category: "Maintenance",
    priority: "Low",
    status: "Open",
    reportedBy: "Facilities",
    assignedTo: "BlueSky Roofing",
    reportedDate: "2025-08-12",
    dueDate: "2025-09-10",
    estimatedCost: 950,
    property: "4033 NW Yeon Ave",
  },
];

const categoryOptions = [
  { label: "All categories", value: "" },
  { label: "Maintenance", value: "Maintenance" },
  { label: "Compliance", value: "Compliance" },
  { label: "Inquiry", value: "Inquiry" },
  { label: "Lease", value: "Lease" },
  { label: "Other", value: "Other" },
];

const priorityOptions: Array<Issue["priority"] | "Any"> = [
  "Any",
  "Urgent",
  "High",
  "Medium",
  "Low",
];

const statusOptions: Array<Issue["status"] | "Any"> = [
  "Any",
  "Open",
  "In Progress",
  "Resolved",
  "Closed",
];

function Badge({
  tone = "gray",
  children,
  title,
}: {
  tone?: "gray" | "green" | "yellow" | "red" | "blue";
  children: React.ReactNode;
  title?: string;
}) {
  const tones: Record<string, string> = {
    gray: "bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-white border border-gray-200/70 dark:border-white/10",
    green:
      "bg-emerald-50 text-emerald-700 border border-emerald-200/70 dark:bg-emerald-900/10 dark:text-emerald-300 dark:border-emerald-800/30",
    yellow:
      "bg-amber-50 text-amber-800 border border-amber-200/70 dark:bg-amber-900/10 dark:text-amber-300 dark:border-amber-800/30",
    red: "bg-rose-50 text-rose-700 border border-rose-200/70 dark:bg-rose-900/10 dark:text-rose-300 dark:border-rose-800/30",
    blue: "bg-blue-50 text-blue-700 border border-blue-200/70 dark:bg-blue-900/10 dark:text-blue-300 dark:border-blue-800/30",
  };
  return (
    <span
      title={title}
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

function StatusBadge({ status }: { status: Issue["status"] }) {
  if (status === "Closed")
    return (
      <Badge tone="gray" title="Closed">
        <CheckCircleIcon className="mr-1 size-4" />
        Closed
      </Badge>
    );
  if (status === "Resolved")
    return (
      <Badge tone="green" title="Resolved">
        <CheckCircleIcon className="mr-1 size-4" />
        Resolved
      </Badge>
    );
  if (status === "In Progress")
    return (
      <Badge tone="blue" title="In Progress">
        <ClockIcon className="mr-1 size-4" />
        In Progress
      </Badge>
    );
  return (
    <Badge tone="yellow" title="Open">
      <ExclamationTriangleIcon className="mr-1 size-4" />
      Open
    </Badge>
  );
}

function PriorityBadge({ priority }: { priority: Issue["priority"] }) {
  if (priority === "Urgent") return <Badge tone="red">Urgent</Badge>;
  if (priority === "High") return <Badge tone="yellow">High</Badge>;
  if (priority === "Medium") return <Badge tone="blue">Medium</Badge>;
  return <Badge tone="gray">Low</Badge>;
}

function CategoryPill({ category }: { category: string }) {
  const icon =
    category === "Maintenance" ? (
      <WrenchScrewdriverIcon className="size-4" />
    ) : category === "Compliance" ? (
      <CheckCircleIcon className="size-4" />
    ) : category === "Inquiry" ? (
      <UserIcon className="size-4" />
    ) : (
      <ExclamationTriangleIcon className="size-4" />
    );
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-gray-200/70 px-2 py-0.5 text-xs text-gray-700 dark:border-white/10 dark:text-white">
      {icon}
      {category}
    </span>
  );
}

type ViewMode = "list" | "grid";

export default function IssuesPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<Issue["status"] | "Any">("Any");
  const [priority, setPriority] = useState<Issue["priority"] | "Any">("Any");
  const [category, setCategory] = useState<string>("");
  const [view, setView] = useState<ViewMode>("list");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sampleIssues.filter((i) => {
      const matchesQuery =
        !q ||
        i.title.toLowerCase().includes(q) ||
        i.description.toLowerCase().includes(q) ||
        (i.property || "").toLowerCase().includes(q) ||
        (i.assignedTo || "").toLowerCase().includes(q) ||
        (i.unit || "").toLowerCase().includes(q);
      const matchesStatus = status === "Any" || i.status === status;
      const matchesPriority = priority === "Any" || i.priority === priority;
      const matchesCategory = !category || i.category === category;
      return (
        matchesQuery && matchesStatus && matchesPriority && matchesCategory
      );
    });
  }, [query, status, priority, category]);

  return (
    <div className="px-4 pb-8 pt-6 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Issues
        </h1>

        {/* Add Issue (your exact styles) */}
        <button
          type="button"
          className="rounded-md bg-royal/10 px-3 py-2 text-sm font-semibold text-royal shadow-xs hover:bg-royal/20 dark:bg-royal/20 dark:text-royal dark:shadow-none dark:hover:bg-royal/30"
        >
          <PlusIcon className="mr-1 inline size-5" />
          Add Issue
        </button>
      </div>

      {/* Full-width Search */}
      <div className="mb-3">
        <div className="relative">
          <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-2.5 size-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search issues..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="block w-full rounded-md border border-gray-200 bg-white py-2 pl-10 pr-3 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-brand-royal dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Filters + View Toggle (below search). 
          On large screens it's a 4-col grid; the selector sits to the far right. */}
      <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as any)}
          className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-brand-royal dark:bg-white/5 dark:text-white dark:outline-white/10"
        >
          {statusOptions.map((s) => (
            <option key={s} value={s}>
              Status: {s}
            </option>
          ))}
        </select>

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as any)}
          className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-brand-royal dark:bg-white/5 dark:text-white dark:outline-white/10"
        >
          {priorityOptions.map((p) => (
            <option key={p} value={p}>
              Priority: {p}
            </option>
          ))}
        </select>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-brand-royal dark:bg-white/5 dark:text-white dark:outline-white/10"
        >
          {categoryOptions.map((c) => (
            <option key={c.value} value={c.value}>
              Category: {c.label}
            </option>
          ))}
        </select>

        {/* Panel-style segmented control for List/Grid; right-aligned */}
        <div className="flex items-center justify-end">
          <div className="inline-flex overflow-hidden rounded-md border border-gray-200 bg-white text-sm dark:border-white/10 dark:bg-white/5">
            <button
              type="button"
              onClick={() => setView("list")}
              className={`flex items-center gap-1 px-3 py-2 ${
                view === "list"
                  ? "bg-gray-100 text-gray-900 dark:bg-white/20 dark:text-white"
                  : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-white/10"
              }`}
              title="List view"
            >
              <ListBulletIcon className="size-4" />
              <span className="hidden sm:inline">List</span>
            </button>
            <div className="h-6 w-px self-center bg-gray-200 dark:bg-white/10" />
            <button
              type="button"
              onClick={() => setView("grid")}
              className={`flex items-center gap-1 px-3 py-2 ${
                view === "grid"
                  ? "bg-gray-100 text-gray-900 dark:bg-white/20 dark:text-white"
                  : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-white/10"
              }`}
              title="Grid view"
            >
              <Squares2X2Icon className="size-4" />
              <span className="hidden sm:inline">Grid</span>
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      {view === "list" ? (
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-white/10 dark:bg-white/5">
          <ul
            role="list"
            className="divide-y divide-gray-100 dark:divide-white/10"
          >
            {filtered.map((issue) => (
              <li key={issue.id} className="p-4 sm:p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  {/* Left: Title + meta */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Link
                        href={`/issues/${issue.id}`}
                        className="truncate text-base font-semibold text-brand-royal hover:underline"
                      >
                        {issue.title}
                      </Link>
                      <StatusBadge status={issue.status} />
                      <PriorityBadge priority={issue.priority} />
                      <CategoryPill category={issue.category} />
                    </div>
                    <p className="mt-1 line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
                      {issue.description}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
                      <span>
                        <span className="font-medium">Reported:</span>{" "}
                        {issue.reportedDate}
                      </span>
                      {issue.dueDate && (
                        <span>
                          <span className="font-medium">Due:</span>{" "}
                          {issue.dueDate}
                        </span>
                      )}
                      {issue.completedDate && (
                        <span>
                          <span className="font-medium">Completed:</span>{" "}
                          {issue.completedDate}
                        </span>
                      )}
                      {issue.property && (
                        <span>
                          <span className="font-medium">Property:</span>{" "}
                          <span className="text-brand-royal">
                            {issue.property}
                          </span>
                        </span>
                      )}
                      {issue.unit && (
                        <span>
                          <span className="font-medium">Unit:</span>{" "}
                          {issue.unit}
                        </span>
                      )}
                      {typeof issue.estimatedCost === "number" && (
                        <span>
                          <span className="font-medium">Est. Cost:</span> $
                          {issue.estimatedCost.toLocaleString()}
                        </span>
                      )}
                      {issue.assignedTo && (
                        <span>
                          <span className="font-medium">Assigned:</span>{" "}
                          {issue.assignedTo}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right: Actions (Heroicons components) */}
                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      type="button"
                      className="inline-flex items-center rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm text-gray-700 shadow-sm hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-300 dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
                      title="View details"
                      aria-label="View details"
                      onClick={() =>
                        (window.location.href = `/issues/${issue.id}`)
                      }
                    >
                      <EyeIcon className="size-5 shrink-0" aria-hidden="true" />
                    </button>

                    <button
                      type="button"
                      className="inline-flex items-center rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm text-gray-700 shadow-sm hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-300 dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
                      title="Edit issue"
                      aria-label="Edit issue"
                    >
                      <PencilSquareIcon
                        className="size-5 shrink-0"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </div>
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="p-8 text-center text-sm text-gray-500 dark:text-gray-400">
                No issues match your filters.
              </li>
            )}
          </ul>
        </div>
      ) : (
        // GRID VIEW
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((issue) => (
            <div
              key={issue.id}
              className="rounded-lg border border-gray-200 bg-white p-4 dark:border-white/10 dark:bg-white/5"
            >
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <Link
                  href={`/issues/${issue.id}`}
                  className="truncate text-base font-semibold text-brand-royal hover:underline"
                >
                  {issue.title}
                </Link>
                <StatusBadge status={issue.status} />
                <PriorityBadge priority={issue.priority} />
              </div>
              <p className="line-clamp-3 text-sm text-gray-600 dark:text-gray-300">
                {issue.description}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <CategoryPill category={issue.category} />
                {issue.property && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    <span className="font-medium">Property:</span>{" "}
                    <span className="text-brand-royal">{issue.property}</span>
                  </span>
                )}
                {issue.unit && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    <span className="font-medium">Unit:</span> {issue.unit}
                  </span>
                )}
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  <span className="font-medium">Reported:</span>{" "}
                  {issue.reportedDate}
                  {issue.dueDate && (
                    <>
                      {" "}
                      • <span className="font-medium">Due:</span>{" "}
                      {issue.dueDate}
                    </>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md border border-gray-300 bg-white px-2 py-1 text-xs text-gray-700 shadow-sm hover:bg-gray-50 dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
                    title="View details"
                    aria-label="View details"
                    onClick={() =>
                      (window.location.href = `/issues/${issue.id}`)
                    }
                  >
                    <EyeIcon className="size-4 shrink-0" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md border border-gray-300 bg-white px-2 py-1 text-xs text-gray-700 shadow-sm hover:bg-gray-50 dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
                    title="Edit issue"
                    aria-label="Edit issue"
                  >
                    <PencilIcon
                      className="size-4 shrink-0"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-sm text-gray-500 dark:border-white/10 dark:text-gray-400">
              No issues match your filters.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
