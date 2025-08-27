// src/app/(app)/inbox/page.tsx
"use client";

import {
  ArchiveBoxIcon,
  CheckIcon,
  EllipsisHorizontalIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  StarIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import { useState } from "react";

type Channel = "Email" | "SMS" | "WhatsApp" | "Phone";
type Priority = "High" | "Medium" | "Low";
type Status = "New" | "In Progress" | "Resolved" | "Pending";

type Thread = {
  id: string;
  from: string;
  org?: string;
  channel: Channel;
  date: string;
  time?: string;
  subject: string;
  snippet: string;
  unread?: boolean;
  starred?: boolean;
  priority?: Priority;
  status?: Status;
  avatar?: string;
  tag?: string;
  attachments?: number;
};

const THREADS: Thread[] = [
  {
    id: "1",
    from: "Lindsay Walton",
    org: "Harbor Heights",
    channel: "Email",
    date: "Aug 10",
    time: "2:30 PM",
    subject: "COI received — next steps",
    snippet:
      "We got the updated COI; sending it to ownership for sign-off. Should have approval by end of week.",
    unread: true,
    starred: true,
    priority: "High",
    status: "In Progress",
    avatar: "/avatars/1.png",
    tag: "New",
    attachments: 2,
  },
  {
    id: "2",
    from: "Courtney Henry",
    org: "Maple Row",
    channel: "SMS",
    date: "Aug 10",
    time: "11:45 AM",
    subject: "Keys for unit 4B",
    snippet:
      "I can swing by tomorrow morning around 9:30 if that works. Let me know!",
    unread: false,
    starred: false,
    priority: "Medium",
    status: "Pending",
    avatar: "/avatars/2.png",
  },
  {
    id: "3",
    from: "Marcus Johnson",
    org: "Sunset Plaza",
    channel: "Email",
    date: "Aug 9",
    time: "4:15 PM",
    subject: "Maintenance request update",
    snippet:
      "The HVAC repair has been completed. Tenant confirmed everything is working properly now.",
    unread: false,
    starred: false,
    priority: "Low",
    status: "Resolved",
    avatar: "/avatars/3.png",
  },
  {
    id: "4",
    from: "Sarah Chen",
    org: "Ocean View",
    channel: "WhatsApp",
    date: "Aug 9",
    time: "1:20 PM",
    subject: "Lease renewal discussion",
    snippet:
      "Would like to schedule a call to discuss the lease renewal terms for next year.",
    unread: false,
    starred: true,
    priority: "High",
    status: "New",
    avatar: "/avatars/4.png",
  },
  {
    id: "5",
    from: "Alex Rivera",
    org: "Pine Gardens",
    channel: "Phone",
    date: "Aug 8",
    time: "10:30 AM",
    subject: "Security deposit question",
    snippet:
      "Following up on our call about the security deposit refund process.",
    unread: false,
    starred: false,
    priority: "Medium",
    status: "In Progress",
    avatar: "/avatars/5.png",
  },
];

const FILTER_OPTIONS = [
  { value: "all", label: "All" },
  { value: "unread", label: "Unread" },
  { value: "starred", label: "Starred" },
  { value: "email", label: "Email" },
  { value: "sms", label: "SMS" },
  { value: "high", label: "High Priority" },
];

export default function InboxPage() {
  const [selectedThreads, setSelectedThreads] = useState<Set<string>>(
    new Set()
  );
  const [activeFilter, setActiveFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredThreads = THREADS.filter((thread) => {
    // Text search across key fields
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const haystack =
        `${thread.from} ${thread.subject} ${thread.snippet} ${thread.org ?? ""}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }

    // Quick filters
    switch (activeFilter) {
      case "unread":
        return !!thread.unread;
      case "starred":
        return !!thread.starred;
      case "email":
        return thread.channel === "Email";
      case "sms":
        return thread.channel === "SMS";
      case "high":
        return thread.priority === "High";
      default:
        return true;
    }
  });

  const toggleThreadSelection = (threadId: string) => {
    const next = new Set(selectedThreads);
    next.has(threadId) ? next.delete(threadId) : next.add(threadId);
    setSelectedThreads(next);
  };

  const toggleSelectAll = () => {
    if (selectedThreads.size === filteredThreads.length) {
      setSelectedThreads(new Set());
    } else {
      setSelectedThreads(new Set(filteredThreads.map((t) => t.id)));
    }
  };

  const getChannelStyle = (channel: Channel) => {
    switch (channel) {
      case "Email":
        return "border border-base-cloudy text-base-sea bg-base-white";
      case "SMS":
        return "bg-contextual-pumpkin/10 text-contextual-pumpkin border border-contextual-pumpkin/20";
      case "WhatsApp":
        return "bg-contextual-spruce/10 text-contextual-spruce border border-contextual-spruce/20";
      case "Phone":
        return "bg-brand-royal/10 text-brand-royal border border-brand-royal/20";
      default:
        return "border border-base-cloudy text-base-sea bg-base-white";
    }
  };

  const getPriorityStyle = (priority?: Priority) => {
    switch (priority) {
      case "High":
        return "bg-contextual-cardinal/10 text-contextual-cardinal border border-contextual-cardinal/20";
      case "Medium":
        return "bg-contextual-pumpkin/10 text-contextual-pumpkin border border-contextual-pumpkin/20";
      case "Low":
        return "bg-base-cloudy/50 text-typography-foggy border border-base-cloudy";
      default:
        return "";
    }
  };

  const getStatusStyle = (status?: Status) => {
    switch (status) {
      case "New":
        return "bg-brand-royal text-typography-white";
      case "In Progress":
        return "bg-contextual-pumpkin/10 text-contextual-pumpkin border border-contextual-pumpkin/20";
      case "Resolved":
        return "bg-contextual-spruce/10 text-contextual-spruce border border-contextual-spruce/20";
      case "Pending":
        return "bg-base-cloudy/50 text-typography-foggy border border-base-cloudy";
      default:
        return "";
    }
  };

  return (
    <main className="p-6">
      {/* Page header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3>Inbox</h3>
          <p className="small text-foggy mt-1">
            {filteredThreads.length} of {THREADS.length} conversations
            {selectedThreads.size > 0 && (
              <span className="ml-2 text-brand-royal">
                • {selectedThreads.size} selected
              </span>
            )}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 rounded-lg border border-base-cloudy bg-base-white px-3 py-2.5 text-sm text-typography-midnight hover:bg-base-faint"
            >
              <FunnelIcon className="h-4 w-4" />
              {FILTER_OPTIONS.find((f) => f.value === activeFilter)?.label}
            </button>

            {showFilters && (
              <div className="absolute right-0 top-full z-10 mt-1 w-48 rounded-lg border border-base-cloudy bg-base-white py-1 shadow-lg">
                {FILTER_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setActiveFilter(option.value);
                      setShowFilters(false);
                    }}
                    className={`block w-full px-3 py-2 text-left text-sm hover:bg-base-faint ${
                      activeFilter === option.value
                        ? "bg-brand-royal/5 text-brand-royal"
                        : "text-typography-midnight"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search bar */}
      <div className="mb-4">
        <div className="relative" role="search">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search issues, assignees, units, reporters…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-brand-royal focus:border-brand-royal text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
        </div>
      </div>

      {/* Bulk actions */}
      {selectedThreads.size > 0 && (
        <div className="mb-4 flex items-center justify-between rounded-lg border border-brand-royal/20 bg-brand-royal/5 px-4 py-3">
          <span className="text-sm text-typography-midnight">
            {selectedThreads.size} conversation
            {selectedThreads.size !== 1 ? "s" : ""} selected
          </span>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 rounded-md bg-base-white px-3 py-1.5 text-sm text-typography-midnight hover:bg-base-faint">
              <ArchiveBoxIcon className="h-4 w-4" />
              Archive
            </button>
            <button className="flex items-center gap-1 rounded-md bg-base-white px-3 py-1.5 text-sm text-typography-midnight hover:bg-base-faint">
              <CheckIcon className="h-4 w-4" />
              Mark Read
            </button>
            <button className="flex items-center gap-1 rounded-md bg-base-white px-3 py-1.5 text-sm text-contextual-cardinal hover:bg-base-faint">
              <TrashIcon className="h-4 w-4" />
              Delete
            </button>
          </div>
        </div>
      )}

      {/* Threads list */}
      <div className="overflow-hidden rounded-xl border border-base-cloudy bg-base-white">
        {/* Header */}
        <div className="border-b border-base-mist bg-base-white px-4 py-2.5">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSelectAll}
              className="flex h-5 w-5 items-center justify-center rounded border border-base-cloudy bg-base-white hover:bg-base-faint"
            >
              {selectedThreads.size === filteredThreads.length &&
                filteredThreads.length > 0 && (
                  <CheckIcon className="h-3 w-3 text-brand-royal" />
                )}
            </button>
            <span className="text-sm font-medium text-typography-midnight">
              Conversations
            </span>
          </div>
        </div>

        {/* Thread list */}
        <ul className="divide-y divide-base-mist">
          {filteredThreads.map((thread) => (
            <li key={thread.id} className="group">
              <div
                className={`space-y-2 px-4 py-2.5 hover:bg-base-white ${
                  thread.unread ? "bg-base-white" : ""
                } ${selectedThreads.has(thread.id) ? "bg-brand-royal/5" : ""}`}
              >
                {/* Top row */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {/* Checkbox */}
                    <button
                      onClick={() => toggleThreadSelection(thread.id)}
                      className="flex h-5 w-5 items-center justify-center rounded border border-base-cloudy bg-base-white hover:bg-base-faint"
                    >
                      {selectedThreads.has(thread.id) && (
                        <CheckIcon className="h-3 w-3 text-brand-royal" />
                      )}
                    </button>

                    {/* Name + badges */}
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-sm ${
                          thread.unread ? "font-semibold" : "font-medium"
                        } text-typography-midnight`}
                      >
                        {thread.from}
                      </span>

                      {thread.org && (
                        <span className="shrink-0 rounded border border-base-cloudy bg-base-white px-1.5 py-0.5 text-[10px] text-base-sea">
                          {thread.org}
                        </span>
                      )}

                      <span
                        className={`shrink-0 rounded px-1.5 py-0.5 text-[10px] ${getChannelStyle(
                          thread.channel
                        )}`}
                      >
                        {thread.channel}
                      </span>

                      {thread.priority && (
                        <span
                          className={`shrink-0 rounded px-1.5 py-0.5 text-[10px] ${getPriorityStyle(
                            thread.priority
                          )}`}
                        >
                          {thread.priority}
                        </span>
                      )}

                      {thread.status && (
                        <span
                          className={`shrink-0 rounded px-1.5 py-0.5 text-[10px] ${getStatusStyle(
                            thread.status
                          )}`}
                        >
                          {thread.status}
                        </span>
                      )}

                      {thread.attachments && (
                        <span className="shrink-0 text-[10px] text-typography-foggy">
                          📎 {thread.attachments}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right actions */}
                  <div className="flex items-center gap-2">
                    <span className="whitespace-nowrap text-xs text-typography-foggy">
                      {thread.date}
                      {thread.time && (
                        <span className="ml-1 text-typography-rainy">
                          {thread.time}
                        </span>
                      )}
                    </span>

                    <button
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      title={thread.starred ? "Unstar" : "Star"}
                    >
                      {thread.starred ? (
                        <StarIconSolid className="h-4 w-4 text-contextual-pumpkin" />
                      ) : (
                        <StarIcon className="h-4 w-4 text-typography-foggy hover:text-contextual-pumpkin" />
                      )}
                    </button>

                    {thread.unread && (
                      <span className="h-2 w-2 rounded-full bg-brand-royal" />
                    )}

                    <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <EllipsisHorizontalIcon className="h-4 w-4 text-typography-foggy hover:text-typography-midnight" />
                    </button>
                  </div>
                </div>

                {/* Bottom row */}
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-base-faint text-xs font-medium text-typography-midnight">
                    {initials(thread.from)}
                  </div>
                  <div className="min-w-0 space-y-1">
                    <div className="truncate text-[13px] font-medium text-typography-midnight">
                      {thread.subject}
                    </div>
                    <p className="truncate text-xs text-typography-rainy">
                      {thread.snippet}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {filteredThreads.length === 0 && (
          <div className="py-8 text-center">
            <div className="text-3xl mb-3">📭</div>
            <h3 className="text-base font-medium text-typography-midnight mb-1">
              No conversations found
            </h3>
            <p className="text-sm text-typography-foggy">
              {activeFilter !== "all"
                ? "Try adjusting your filters"
                : "You're all caught up!"}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts[1]?.[0] ?? "";
  return (first + last).toUpperCase();
}
