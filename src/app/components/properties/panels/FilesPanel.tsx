// src/app/components/properties/panels/FilesPanel.tsx
"use client";

import {
  ArrowDownTrayIcon,
  DocumentIcon,
  EyeIcon,
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

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "pdf":
        return <DocumentIcon className="h-8 w-8 text-red-500" />;
      case "excel":
      case "xlsx":
        return <DocumentIcon className="h-8 w-8 text-green-500" />;
      case "word":
      case "docx":
        return <DocumentIcon className="h-8 w-8 text-blue-500" />;
      case "zip":
        return <FolderIcon className="h-8 w-8 text-yellow-500" />;
      case "cad":
      case "dwg":
        return <DocumentIcon className="h-8 w-8 text-purple-500" />;
      default:
        return <DocumentIcon className="h-8 w-8 text-gray-500" />;
    }
  };

  const getCategoryStyle = (category: string) => {
    switch (category) {
      case "Legal":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      case "Insurance":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "Permits":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "Financial":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "Photos":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400";
      case "Contracts":
        return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400";
      case "Maintenance":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400";
      case "Plans":
        return "bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  const toggleFileSelection = (fileId: string) => {
    const newSelected = new Set(selectedFiles);
    if (newSelected.has(fileId)) {
      newSelected.delete(fileId);
    } else {
      newSelected.add(fileId);
    }
    setSelectedFiles(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedFiles.size === filteredFiles.length) {
      setSelectedFiles(new Set());
    } else {
      setSelectedFiles(new Set(filteredFiles.map((f) => f.id)));
    }
  };

  // Get category counts for overview
  const categoryStats = files.reduce(
    (acc, file) => {
      acc[file.category] = (acc[file.category] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <div className="space-y-6">
      {/* Category Overview */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Object.entries(categoryStats).map(([category, count]) => (
          <div
            key={category}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FolderIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                  {category}
                </h3>
                <p className="text-lg font-bold text-blue-600">{count}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search and Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search files by name, description, or uploader..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div className="flex items-center gap-3">
          <FieldSelect
            id="categoryFilter"
            options={categoryOptions}
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          />

          <button className="flex items-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500">
            <PlusIcon className="h-4 w-4" />
            Upload File
          </button>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedFiles.size > 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-blue-900 dark:text-blue-100">
              {selectedFiles.size} file{selectedFiles.size !== 1 ? "s" : ""}{" "}
              selected
            </span>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1 rounded-md bg-white px-3 py-1.5 text-sm text-blue-900 hover:bg-blue-50">
                <ArrowDownTrayIcon className="h-4 w-4" />
                Download
              </button>
              <button className="flex items-center gap-1 rounded-md bg-white px-3 py-1.5 text-sm text-red-600 hover:bg-red-50">
                <TrashIcon className="h-4 w-4" />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Files Table */}
      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
        {/* Header */}
        <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 border-b border-gray-200 dark:border-gray-600">
          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              checked={
                selectedFiles.size === filteredFiles.length &&
                filteredFiles.length > 0
              }
              onChange={toggleSelectAll}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              Files ({filteredFiles.length})
            </span>
          </div>
        </div>

        {/* Files List */}
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
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />

                    <div className="flex items-center gap-3">
                      {getFileIcon(file.type)}
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
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryStyle(file.category)}`}
                    >
                      {file.category}
                    </span>

                    <div className="text-right">
                      <p className="text-sm text-gray-900 dark:text-white">
                        {formatFileSize(file.size)}
                      </p>
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

                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800">
                      <EyeIcon className="h-4 w-4" />
                      Preview
                    </button>
                    <button className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800">
                      <ArrowDownTrayIcon className="h-4 w-4" />
                      Download
                    </button>
                    <button className="flex items-center gap-1 text-sm text-red-600 hover:text-red-800">
                      <TrashIcon className="h-4 w-4" />
                      Delete
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
          <DocumentIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
            No files found
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {searchQuery || categoryFilter !== "all"
              ? "Try adjusting your search or filters."
              : "Upload your first file to get started."}
          </p>
          <div className="mt-6">
            <button className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500">
              <PlusIcon className="h-4 w-4" />
              Upload File
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
