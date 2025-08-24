// src/app/components/properties/panels/FilesPanel.tsx
"use client";

import {
  ArrowDownTrayIcon,
  FolderIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import { useState } from "react";
import { FieldSelect } from "../shared";

interface FileItem {
  id: string;
  name: string;
  category: string;
  type: string;
  size: number;
  uploadedBy: string;
  uploadedDate: string;
  description?: string;
  url?: string;
}

/** Custom Icons (from user) */
function DocumentOutlineIcon(props: React.SVGProps<SVGSVGElement>) {
  const { className, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className ?? "h-6 w-6"}
      {...rest}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
      />
    </svg>
  );
}

function PhotoOutlineIcon(props: React.SVGProps<SVGSVGElement>) {
  const { className, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className ?? "h-6 w-6"}
      {...rest}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
      />
    </svg>
  );
}

const sampleFiles: FileItem[] = [
  {
    id: "1",
    name: "Property_Deed_4033_NW_Yeon.pdf",
    category: "Legal",
    type: "PDF",
    size: 2440000,
    uploadedBy: "Property Manager",
    uploadedDate: "2024-08-15",
    description: "Original property deed and title documents",
  },
  {
    id: "2",
    name: "Insurance_Policy_2024.pdf",
    category: "Insurance",
    type: "PDF",
    size: 1800000,
    uploadedBy: "Admin",
    uploadedDate: "2024-07-22",
    description: "Commercial property insurance policy for 2024",
  },
  {
    id: "3",
    name: "Property_Survey_2023.pdf",
    category: "Permits",
    type: "PDF",
    size: 3200000,
    uploadedBy: "Surveyor",
    uploadedDate: "2024-03-10",
    description: "Professional land survey conducted in 2023",
  },
  {
    id: "4",
    name: "Financial_Report_Q2_2024.xlsx",
    category: "Financial",
    type: "Excel",
    size: 890000,
    uploadedBy: "Accountant",
    uploadedDate: "2024-07-01",
    description: "Quarterly financial performance report",
  },
  {
    id: "5",
    name: "Building_Inspection_Report.pdf",
    category: "Permits",
    type: "PDF",
    size: 1560000,
    uploadedBy: "Inspector",
    uploadedDate: "2024-06-15",
    description: "Annual building safety inspection report",
  },
  {
    id: "6",
    name: "Property_Photos_Exterior.zip",
    category: "Photos",
    type: "ZIP",
    size: 15600000,
    uploadedBy: "Photographer",
    uploadedDate: "2024-05-20",
    description: "High-resolution exterior photos for marketing",
  },
  {
    id: "7",
    name: "Lease_Template_Commercial.docx",
    category: "Contracts",
    type: "Word",
    size: 340000,
    uploadedBy: "Legal Team",
    uploadedDate: "2024-04-12",
    description: "Standard commercial lease agreement template",
  },
  {
    id: "8",
    name: "Maintenance_Schedule_2024.pdf",
    category: "Maintenance",
    type: "PDF",
    size: 420000,
    uploadedBy: "Maintenance Supervisor",
    uploadedDate: "2024-01-15",
    description: "Annual preventive maintenance schedule",
  },
  {
    id: "9",
    name: "Tax_Assessment_2024.pdf",
    category: "Financial",
    type: "PDF",
    size: 680000,
    uploadedBy: "Tax Assessor",
    uploadedDate: "2024-02-28",
    description: "Property tax assessment for 2024",
  },
  {
    id: "10",
    name: "Floor_Plans_Updated.dwg",
    category: "Plans",
    type: "CAD",
    size: 2100000,
    uploadedBy: "Architect",
    uploadedDate: "2024-08-05",
    description: "Updated architectural floor plans with recent modifications",
  },
];

export default function FilesPanel() {
  const [files] = useState<FileItem[]>(sampleFiles);
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const categoryOptions = [
    { label: "All Categories", value: "all" },
    { label: "Legal", value: "Legal" },
    { label: "Insurance", value: "Insurance" },
    { label: "Permits", value: "Permits" },
    { label: "Financial", value: "Financial" },
    { label: "Photos", value: "Photos" },
    { label: "Contracts", value: "Contracts" },
    { label: "Maintenance", value: "Maintenance" },
    { label: "Plans", value: "Plans" },
  ];

  const filteredFiles = files.filter((file) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (
        !file.name.toLowerCase().includes(query) &&
        !file.description?.toLowerCase().includes(query) &&
        !file.uploadedBy.toLowerCase().includes(query)
      ) {
        return false;
      }
    }
    if (categoryFilter !== "all" && file.category !== categoryFilter)
      return false;
    return true;
  });

  /** Neutral grey chip */
  const chipClass =
    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cloudy/50 text-midnight hover:bg-cloudy dark:bg-cloudy/20 dark:text-cloudy dark:hover:bg-cloudy/30";
  const getCategoryStyle = (_category: string) => chipClass;

  const toggleFileSelection = (fileId: string) => {
    const next = new Set(selectedFiles);
    if (next.has(fileId)) next.delete(fileId);
    else next.add(fileId);
    setSelectedFiles(next);
  };

  const toggleSelectAll = () => {
    if (selectedFiles.size === filteredFiles.length) {
      setSelectedFiles(new Set());
    } else {
      setSelectedFiles(new Set(filteredFiles.map((f) => f.id)));
    }
  };

  // Category counts
  const categoryStats = files.reduce(
    (acc, file) => {
      acc[file.category] = (acc[file.category] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  /** Decide which icon to show for a file */
  const getFileIcon = (file: FileItem) => {
    const type = file.type?.toLowerCase() ?? "";
    const name = file.name?.toLowerCase() ?? "";

    const photoExts = [
      "jpg",
      "jpeg",
      "png",
      "gif",
      "webp",
      "tif",
      "tiff",
      "svg",
      "heic",
    ];

    const isPhotoCategory = file.category === "Photos";
    const isPhotoByExt = photoExts.some((ext) => name.endsWith("." + ext));
    if (isPhotoCategory || isPhotoByExt) {
      return <PhotoOutlineIcon className="h-6 w-6 text-sea" />;
    }

    if (type === "zip") {
      return <FolderIcon className="h-6 w-6 text-sea" />;
    }

    // Default to document icon for everything else (PDF, Word, Excel, CAD, etc.)
    return <DocumentOutlineIcon className="h-6 w-6 text-sea" />;
  };

  return (
    <div className="space-y-6">
      {/* Row 1: Search */}
      <div className="w-full">
        <div className="relative" role="search">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search files by name, description, or uploader..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-royal focus:border-royal text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
        </div>
      </div>

      {/* Row 2: Filter + Upload */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-4">
        <FieldSelect
          id="categoryFilter"
          options={categoryOptions}
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        />

        <div className="ml-auto flex items-center gap-2">
          <button className="flex items-center gap-2 rounded-md bg-royal/10 px-3 py-2 text-sm font-semibold text-royal shadow-xs hover:bg-royal/20 dark:bg-royal/20 dark:text-royal dark:shadow-none dark:hover:bg-royal/30">
            <PlusIcon className="h-4 w-4" />
            Upload File
          </button>
        </div>
      </div>

      {/* Category Overview */}
      <div className="flex flex-wrap gap-x-6 gap-y-3">
        {Object.entries(categoryStats).map(([category, count]) => (
          <div key={category} className="flex items-center gap-2 text-sm">
            <FolderIcon className="h-4 w-4 text-gray-500" />
            <span className="text-gray-900 dark:text-white">{category}</span>
            <span className="text-gray-500 dark:text-gray-400">({count})</span>
          </div>
        ))}
      </div>

      {/* Bulk Actions */}
      {selectedFiles.size > 0 && (
        <div className="rounded-lg border border-cloudy bg-cloudy/20 dark:border-cloudy/30 dark:bg-cloudy/10 p-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-sea">
              {selectedFiles.size} file{selectedFiles.size !== 1 ? "s" : ""}{" "}
              selected
            </span>
            <div className="flex items-center gap-2">
              <button
                className="text-sea hover:text-sea"
                aria-label="Download Selected"
                title="Download"
              >
                <ArrowDownTrayIcon className="h-4 w-4" />
              </button>
              <button
                className="text-sea hover:text-sea"
                aria-label="Delete Selected"
                title="Delete"
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Files Table */}
      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
        <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 border-b border-gray-200 dark:border-gray-600">
          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              checked={
                selectedFiles.size === filteredFiles.length &&
                filteredFiles.length > 0
              }
              onChange={toggleSelectAll}
              className="h-4 w-4 text-royal focus:ring-royal border-gray-300 rounded"
            />
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              Files ({filteredFiles.length})
            </span>
          </div>
        </div>

        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredFiles.map((file) => (
            <li
              key={file.id}
              className="hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <div className="px-4 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      checked={selectedFiles.has(file.id)}
                      onChange={() => toggleFileSelection(file.id)}
                      className="h-4 w-4 text-royal focus:ring-royal border-gray-300 rounded"
                    />

                    <div className="flex items-center gap-3">
                      {getFileIcon(file)}
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {file.name}
                        </p>
                        {file.description && (
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {file.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className={getCategoryStyle(file.category)}>
                      {file.category}
                    </span>

                    <div className="text-right">
                      {/* Removed file size per request */}
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {file.type}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <span>Uploaded by {file.uploadedBy}</span>
                    <span>•</span>
                    <span>{file.uploadedDate}</span>
                  </div>

                  {/* Icon-only actions */}
                  <div className="flex items-center gap-2">
                    <button
                      className="text-sea hover:text-sea"
                      aria-label="Preview File"
                      title="Preview"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-4 w-4"
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
                      aria-label="Download File"
                      title="Download"
                    >
                      <ArrowDownTrayIcon className="h-4 w-4" />
                    </button>
                    <button
                      className="text-sea hover:text-sea"
                      aria-label="Delete File"
                      title="Delete"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {filteredFiles.length === 0 && (
        <div className="text-center py-12">
          <DocumentOutlineIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
            No files found
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {searchQuery || categoryFilter !== "all"
              ? "Try adjusting your search or filters."
              : "Upload your first file to get started."}
          </p>
          <div className="mt-6">
            <button className="inline-flex items-center gap-2 rounded-md bg-royal/10 px-3 py-2 text-sm font-semibold text-royal shadow-xs hover:bg-royal/20 dark:bg-royal/20 dark:text-royal dark:shadow-none dark:hover:bg-royal/30">
              <PlusIcon className="h-4 w-4" />
              Upload File
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
