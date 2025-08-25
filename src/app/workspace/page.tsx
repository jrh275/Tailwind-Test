// src/app/workspace/page.tsx
"use client";

import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon,
  MapPinIcon,
} from "@heroicons/react/20/solid";
import {
  ClockIcon,
  DocumentTextIcon,
  EllipsisHorizontalIcon as EllipsisOutline,
  FolderIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import { useMemo, useState } from "react";

// Import the separated components
import AddIssueToCalendarModal from "../components/workspace/modals/AddIssueToCalendarModal";
import CreateNewModal, {
  CreateNewKind,
} from "../components/workspace/modals/CreateNewModal";
import {
  CalendarDay,
  Issue,
  Meeting,
  RecentFile,
} from "../components/workspace/types";

// Sample data
const topIssues: Issue[] = [
  {
    id: "1",
    title: "HVAC System Not Working",
    priority: "High",
    status: "Open",
    property: "Maple Heights",
    unit: "101",
    reportedDate: "2024-08-20",
  },
  {
    id: "2",
    title: "Parking Lot Pothole Repair",
    priority: "Medium",
    status: "In Progress",
    property: "Downtown Plaza",
    reportedDate: "2024-08-18",
  },
  {
    id: "3",
    title: "Leaky Faucet in Kitchen",
    priority: "Low",
    status: "Resolved",
    property: "Riverside Gardens",
    unit: "202",
    reportedDate: "2024-08-15",
  },
  {
    id: "4",
    title: "Security Camera Malfunction",
    priority: "Medium",
    status: "Open",
    property: "Oak Street Complex",
    reportedDate: "2024-08-19",
  },
  {
    id: "5",
    title: "Elevator Maintenance",
    priority: "Urgent",
    status: "In Progress",
    property: "Metro Tower",
    reportedDate: "2024-08-21",
  },
];

const meetings: Meeting[] = [
  {
    id: 1,
    date: "01/10/2022",
    time: "5:00 PM",
    datetime: "2022-01-10T17:00",
    name: "Leslie Alexander",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    location: "Starbucks",
  },
  {
    id: 2,
    date: "01/12/2022",
    time: "3:00 PM",
    datetime: "2022-01-12T15:00",
    name: "Michael Foster",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    location: "Tim Hortons",
  },
  {
    id: 3,
    date: "01/12/2022",
    time: "5:00 PM",
    datetime: "2022-01-12T17:00",
    name: "Dries Vincent",
    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    location: "Costa Coffee at Braehead",
  },
  {
    id: 4,
    date: "01/14/2022",
    time: "10:00 AM",
    datetime: "2022-01-14T10:00",
    name: "Lindsay Walton",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    location: "Silverburn",
  },
  {
    id: 5,
    date: "01/14/2022",
    time: "12:00 PM",
    datetime: "2022-01-14T12:00",
    name: "Courtney Henry",
    imageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    location: "The Glasgow Green",
  },
];

const recentFiles: RecentFile[] = [
  {
    id: 1,
    name: "Q4 Financial Report",
    type: "PDF",
    lastModified: "2 hours ago",
    size: "2.4 MB",
    starred: true,
    icon: DocumentTextIcon,
  },
  {
    id: 2,
    name: "Property Analysis Spreadsheet",
    type: "Excel",
    lastModified: "1 day ago",
    size: "1.8 MB",
    starred: false,
    icon: DocumentTextIcon,
  },
  {
    id: 3,
    name: "Client Meeting Notes",
    type: "Document",
    lastModified: "3 days ago",
    size: "245 KB",
    starred: true,
    icon: DocumentTextIcon,
  },
  {
    id: 4,
    name: "Marketing Materials",
    type: "Folder",
    lastModified: "1 week ago",
    size: "—",
    starred: false,
    icon: FolderIcon,
  },
];

const days: CalendarDay[] = [
  { date: "2021-12-27" },
  { date: "2021-12-28" },
  { date: "2021-12-29" },
  { date: "2021-12-30" },
  { date: "2021-12-31" },
  { date: "2022-01-01", isCurrentMonth: true },
  { date: "2022-01-02", isCurrentMonth: true },
  { date: "2022-01-03", isCurrentMonth: true },
  { date: "2022-01-04", isCurrentMonth: true },
  { date: "2022-01-05", isCurrentMonth: true },
  { date: "2022-01-06", isCurrentMonth: true },
  { date: "2022-01-07", isCurrentMonth: true },
  { date: "2022-01-08", isCurrentMonth: true },
  { date: "2022-01-09", isCurrentMonth: true },
  { date: "2022-01-10", isCurrentMonth: true },
  { date: "2022-01-11", isCurrentMonth: true },
  { date: "2022-01-12", isCurrentMonth: true, isToday: true },
  { date: "2022-01-13", isCurrentMonth: true },
  { date: "2022-01-14", isCurrentMonth: true },
  { date: "2022-01-15", isCurrentMonth: true },
  { date: "2022-01-16", isCurrentMonth: true },
  { date: "2022-01-17", isCurrentMonth: true },
  { date: "2022-01-18", isCurrentMonth: true },
  { date: "2022-01-19", isCurrentMonth: true },
  { date: "2022-01-20", isCurrentMonth: true },
  { date: "2022-01-21", isCurrentMonth: true },
  { date: "2022-01-22", isCurrentMonth: true, isSelected: true },
  { date: "2022-01-23", isCurrentMonth: true },
  { date: "2022-01-24", isCurrentMonth: true },
  { date: "2022-01-25", isCurrentMonth: true },
  { date: "2022-01-26", isCurrentMonth: true },
  { date: "2022-01-27", isCurrentMonth: true },
  { date: "2022-01-28", isCurrentMonth: true },
  { date: "2022-01-29", isCurrentMonth: true },
  { date: "2022-01-30", isCurrentMonth: true },
  { date: "2022-01-31", isCurrentMonth: true },
  { date: "2022-02-01" },
  { date: "2022-02-02" },
  { date: "2022-02-03" },
  { date: "2022-02-04" },
  { date: "2022-02-05" },
  { date: "2022-02-06" },
];

function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function WorkspacePage() {
  const [createOpen, setCreateOpen] = useState(false);
  const [addToCalendarOpen, setAddToCalendarOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [starredFiles, setStarredFiles] = useState(
    new Set(recentFiles.filter((file) => file.starred).map((file) => file.id))
  );

  const toggleStar = (fileId: number) => {
    setStarredFiles((prev) => {
      const s = new Set(prev);
      s.has(fileId) ? s.delete(fileId) : s.add(fileId);
      return s;
    });
  };

  const issueChip =
    "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-800";

  const propertyChip =
    "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-50 text-blue-700";

  // group urgent/high first for display flair
  const topIssuesSorted = useMemo(() => {
    const order = { Urgent: 0, High: 1, Medium: 2, Low: 3 } as const;
    return [...topIssues].sort((a, b) => order[a.priority] - order[b.priority]);
  }, []);

  const handleCreateSelect = (kind: CreateNewKind) => {
    console.log("create:", kind);
    setCreateOpen(false);

    // Handle navigation to different creation flows
    // e.g., router.push(`/${kind}/new`)
    console.log(`Navigate to create ${kind}`);
  };

  const handleAddToCalendar = (issue: Issue) => {
    setSelectedIssue(issue);
    setAddToCalendarOpen(true);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">My Workspace</h1>
          <p className="mt-1 text-gray-500">
            Dashboards, quick actions, and your latest activity
          </p>
        </div>
        <button
          onClick={() => setCreateOpen(true)}
          className="rounded-md bg-royal/10 px-3 py-2 text-sm font-semibold text-royal shadow-xs hover:bg-royal/20 dark:bg-royal/20 dark:text-royal dark:shadow-none dark:hover:bg-royal/30"
        >
          Create New
        </button>
      </div>

      {/* Top 5 Issues */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-medium text-gray-900">Top 5 Issues</h2>
          <a href="/issues" className="text-sm text-sea hover:text-sea/80">
            View all
          </a>
        </div>
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
          <ul className="divide-y divide-gray-200">
            {topIssuesSorted.map((issue) => (
              <li key={issue.id} className="px-4 py-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-gray-900">
                      {issue.title}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      Reported {issue.reportedDate}
                      {issue.unit ? ` • Unit ${issue.unit}` : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={propertyChip}>{issue.property}</span>
                    <span className={issueChip}>{issue.status}</span>
                    <span className={issueChip}>{issue.priority}</span>
                    <button
                      onClick={() => handleAddToCalendar(issue)}
                      className="inline-flex items-center gap-1 rounded-md bg-sea/10 px-2 py-1 text-xs font-medium text-sea hover:bg-sea/20"
                      title="Add to Calendar"
                    >
                      <CalendarIcon className="h-3 w-3" />
                      Calendar
                    </button>
                    <button className="text-gray-400 hover:text-gray-600">
                      <EllipsisOutline className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Calendar - Horizontal Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-x-8">
        {/* Left: Calendar Grid */}
        <div className="lg:col-span-7 xl:col-span-8">
          <div className="flex items-center text-gray-900 mb-6">
            <button
              type="button"
              className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Previous month</span>
              <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
            </button>
            <div className="flex-auto text-lg font-medium">January</div>
            <button
              type="button"
              className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Next month</span>
              <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>
          <div className="grid grid-cols-7 text-xs leading-6 text-gray-500 mb-2">
            <div>M</div>
            <div>T</div>
            <div>W</div>
            <div>T</div>
            <div>F</div>
            <div>S</div>
            <div>S</div>
          </div>
          <div className="isolate grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow-sm ring-1 ring-gray-200">
            {days.map((day, idx) => (
              <button
                key={day.date}
                type="button"
                className={classNames(
                  "py-4 hover:bg-gray-100 focus:z-10",
                  day.isCurrentMonth ? "bg-white" : "bg-gray-50",
                  (day.isSelected || day.isToday) && "font-semibold",
                  day.isSelected && "text-white",
                  !day.isSelected && day.isToday && "text-sea",
                  !day.isSelected &&
                    day.isCurrentMonth &&
                    !day.isToday &&
                    "text-gray-900",
                  !day.isSelected &&
                    !day.isCurrentMonth &&
                    !day.isToday &&
                    "text-gray-500",
                  idx === 0 && "rounded-tl-lg",
                  idx === 6 && "rounded-tr-lg",
                  idx === days.length - 7 && "rounded-bl-lg",
                  idx === days.length - 1 && "rounded-br-lg"
                )}
              >
                <time
                  dateTime={day.date}
                  className={classNames(
                    "mx-auto flex h-12 w-12 items-center justify-center rounded-full text-base",
                    day.isSelected && day.isToday && "bg-sea",
                    day.isSelected && !day.isToday && "bg-gray-900"
                  )}
                >
                  {day.date.split("-").pop()!.replace(/^0/, "")}
                </time>
              </button>
            ))}
          </div>
          <button
            type="button"
            className="mt-4 w-full rounded-md bg-royal/10 px-3 py-2 text-sm font-semibold text-royal shadow-xs hover:bg-royal/20 dark:bg-royal/20 dark:text-royal dark:shadow-none dark:hover:bg-royal/30"
          >
            Add event
          </button>
        </div>

        {/* Right: Meetings list */}
        <div className="lg:col-start-8 lg:col-end-13 xl:col-start-9">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Upcoming Meetings
          </h2>
          <ol className="divide-y divide-gray-100 text-sm leading-6">
            {meetings.map((meeting) => (
              <li
                key={meeting.id}
                className="relative flex gap-x-6 py-4 xl:static"
              >
                <img
                  alt=""
                  src={meeting.imageUrl}
                  className="h-8 w-8 flex-none rounded-full"
                />
                <div className="flex-auto">
                  <h3 className="pr-10 font-semibold text-gray-900 xl:pr-0">
                    {meeting.name}
                  </h3>
                  <dl className="mt-1 flex flex-col text-gray-500 xl:flex-row xl:items-center">
                    <div className="flex items-center gap-x-2">
                      <CalendarIcon
                        aria-hidden="true"
                        className="h-4 w-4 text-gray-400"
                      />
                      <dd className="xl:min-w-[100px]">
                        <time dateTime={meeting.datetime}>
                          {meeting.date} {meeting.time}
                        </time>
                      </dd>
                    </div>
                    <div className="mt-1 flex items-center gap-x-2 xl:mt-0 xl:ml-4 xl:border-l xl:border-gray-400 xl:pl-4">
                      <MapPinIcon
                        aria-hidden="true"
                        className="h-4 w-4 text-gray-400"
                      />
                      <dd>{meeting.location}</dd>
                    </div>
                  </dl>
                </div>
                <button className="absolute right-0 top-4 text-gray-400 hover:text-gray-500 xl:relative xl:top-auto xl:right-auto xl:self-center">
                  <EllipsisHorizontalIcon
                    aria-hidden="true"
                    className="h-5 w-5"
                  />
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Recent Files */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900">Recent Files</h2>
          <a href="#" className="text-sm text-sea hover:text-sea/80">
            View all
          </a>
        </div>
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
          <ul className="divide-y divide-gray-200">
            {recentFiles.map((file) => (
              <li
                key={file.id}
                className="flex items-center justify-between px-4 py-4 hover:bg-gray-50"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <file.icon className="h-8 w-8 text-gray-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900">
                      {file.name}
                    </p>
                    <div className="mt-1 flex items-center space-x-2">
                      <span className="text-xs text-gray-500">{file.type}</span>
                      <span className="text-xs text-gray-500">•</span>
                      <span className="text-xs text-gray-500">{file.size}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <ClockIcon className="h-4 w-4" />
                    <span>{file.lastModified}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleStar(file.id)}
                      className="text-gray-400 hover:text-amber-500"
                    >
                      {starredFiles.has(file.id) ? (
                        <StarIconSolid className="h-5 w-5 text-amber-500" />
                      ) : (
                        <StarIcon className="h-5 w-5" />
                      )}
                    </button>
                    <button className="text-gray-400 hover:text-gray-600">
                      <EllipsisOutline className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Modals */}
      <AddIssueToCalendarModal
        open={addToCalendarOpen}
        onClose={() => setAddToCalendarOpen(false)}
        issue={selectedIssue}
      />

      <CreateNewModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onSelect={handleCreateSelect}
      />
    </div>
  );
}
