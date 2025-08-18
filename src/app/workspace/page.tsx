// src/app/workspace/page.tsx
"use client";

import {
  ClockIcon,
  DocumentTextIcon,
  EllipsisHorizontalIcon,
  FolderIcon,
  PlusIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import { useState } from "react";

// Sample data for the workspace
const recentFiles = [
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

const quickActions = [
  {
    name: "Create Document",
    description: "Start a new document",
    icon: DocumentTextIcon,
    color: "bg-brand-royal",
  },
  {
    name: "New Folder",
    description: "Organize your files",
    icon: FolderIcon,
    color: "bg-contextual-spruce",
  },
  {
    name: "Upload Files",
    description: "Add files to workspace",
    icon: PlusIcon,
    color: "bg-contextual-amber",
  },
];

const workspaceStats = [
  { name: "Total Files", value: "1,247", icon: DocumentTextIcon },
  { name: "Storage Used", value: "68.2 GB", icon: FolderIcon },
  { name: "Shared Items", value: "23", icon: StarIcon },
];

function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function WorkspacePage() {
  const [starredFiles, setStarredFiles] = useState(
    new Set(recentFiles.filter((file) => file.starred).map((file) => file.id))
  );

  const toggleStar = (fileId: number) => {
    setStarredFiles((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(fileId)) {
        newSet.delete(fileId);
      } else {
        newSet.add(fileId);
      }
      return newSet;
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-typography-midnight">
            My Workspace
          </h1>
          <p className="text-base-foggy mt-1">
            Manage your files, documents, and recent activity
          </p>
        </div>
        <button className="inline-flex items-center rounded-md bg-brand-royal px-3 py-2 text-sm font-semibold text-typography-white shadow-sm hover:bg-brand-royal/90">
          <PlusIcon className="-ml-0.5 mr-1.5 h-4 w-4" />
          New Item
        </button>
      </div>

      {/* Workspace Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {workspaceStats.map((stat) => (
          <div
            key={stat.name}
            className="overflow-hidden rounded-lg border border-base-cloudy bg-base-white px-4 py-5 shadow-xs"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <stat.icon className="h-6 w-6 text-base-foggy" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-typography-foggy truncate">
                    {stat.name}
                  </dt>
                  <dd className="text-lg font-semibold text-typography-midnight">
                    {stat.value}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-medium text-typography-midnight mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {quickActions.map((action) => (
            <button
              key={action.name}
              className="relative group rounded-lg border border-base-cloudy bg-base-white p-6 text-left shadow-xs hover:shadow-sm transition-shadow"
            >
              <div>
                <span
                  className={classNames(
                    action.color,
                    "rounded-lg inline-flex p-3 text-white"
                  )}
                >
                  <action.icon className="h-6 w-6" />
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-base font-semibold text-typography-midnight group-hover:text-brand-royal">
                  {action.name}
                </h3>
                <p className="mt-1 text-sm text-typography-foggy">
                  {action.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Files */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-typography-midnight">
            Recent Files
          </h2>
          <button className="text-sm text-brand-royal hover:text-brand-royal/80">
            View all
          </button>
        </div>

        <div className="overflow-hidden rounded-lg border border-base-cloudy bg-base-white shadow-xs">
          <ul className="divide-y divide-base-cloudy">
            {recentFiles.map((file) => (
              <li
                key={file.id}
                className="flex items-center justify-between px-4 py-4 hover:bg-base-faint"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <file.icon className="h-8 w-8 text-base-foggy" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-typography-midnight truncate">
                      {file.name}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-typography-foggy">
                        {file.type}
                      </span>
                      <span className="text-xs text-typography-foggy">•</span>
                      <span className="text-xs text-typography-foggy">
                        {file.size}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1 text-xs text-typography-foggy">
                    <ClockIcon className="h-4 w-4" />
                    <span>{file.lastModified}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleStar(file.id)}
                      className="text-base-foggy hover:text-contextual-amber"
                    >
                      {starredFiles.has(file.id) ? (
                        <StarIconSolid className="h-5 w-5 text-contextual-amber" />
                      ) : (
                        <StarIcon className="h-5 w-5" />
                      )}
                    </button>

                    <button className="text-base-foggy hover:text-typography-midnight">
                      <EllipsisHorizontalIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
