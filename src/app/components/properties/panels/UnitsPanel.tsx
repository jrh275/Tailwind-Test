// src/app/components/properties/panels/UnitsPanel.tsx
"use client";

import {
  CheckCircleIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  PlusIcon,
  UserIcon,
  XCircleIcon,
} from "@heroicons/react/20/solid";
import { useState } from "react";
import { FieldSelect } from "../shared";

interface Unit {
  id: string;
  number: string;
  floor: number;
  type: string;
  size: number;
  monthlyRent: number;
  status: "Occupied" | "Vacant" | "Maintenance" | "Unavailable";
  tenant?: {
    name: string;
    company: string;
    leaseStart: string;
    leaseEnd: string;
    phone: string;
  };
  amenities: string[];
}

const sampleUnits: Unit[] = [
  {
    id: "1",
    number: "101",
    floor: 1,
    type: "1 Bedroom",
    size: 1200,
    monthlyRent: 2800,
    status: "Occupied",
    tenant: {
      name: "Sarah Johnson",
      company: "Tech Solutions Inc",
      leaseStart: "2024-01-01",
      leaseEnd: "2024-12-31",
      phone: "(555) 123-4567",
    },
    amenities: ["Parking", "Balcony", "In-unit Laundry"],
  },
  {
    id: "2",
    number: "102",
    floor: 1,
    type: "2 Bedroom",
    size: 1500,
    monthlyRent: 3200,
    status: "Vacant",
    amenities: ["Parking", "Balcony"],
  },
  {
    id: "3",
    number: "201",
    floor: 2,
    type: "Office",
    size: 2000,
    monthlyRent: 4500,
    status: "Occupied",
    tenant: {
      name: "Michael Chen",
      company: "Design Studio LLC",
      leaseStart: "2023-06-01",
      leaseEnd: "2025-05-31",
      phone: "(555) 987-6543",
    },
    amenities: ["Conference Room", "Parking", "Security Access"],
  },
  {
    id: "4",
    number: "202",
    floor: 2,
    type: "3 Bedroom",
    size: 1800,
    monthlyRent: 3800,
    status: "Maintenance",
    amenities: ["Parking", "Balcony", "Storage"],
  },
  {
    id: "5",
    number: "301",
    floor: 3,
    type: "Warehouse",
    size: 10000,
    monthlyRent: 8500,
    status: "Occupied",
    tenant: {
      name: "David Rodriguez",
      company: "Logistics Pro",
      leaseStart: "2024-03-01",
      leaseEnd: "2026-02-28",
      phone: "(555) 456-7890",
    },
    amenities: ["Loading Dock", "Security", "Office Space"],
  },
  {
    id: "6",
    number: "302",
    floor: 3,
    type: "Office",
    size: 1600,
    monthlyRent: 3600,
    status: "Vacant",
    amenities: ["Parking", "Conference Room"],
  },
];

export default function UnitsPanel() {
  const [units] = useState<Unit[]>(sampleUnits);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const statusOptions = [
    { label: "All Statuses", value: "all" },
    { label: "Occupied", value: "Occupied" },
    { label: "Vacant", value: "Vacant" },
    { label: "Maintenance", value: "Maintenance" },
    { label: "Unavailable", value: "Unavailable" },
  ];

  const typeOptions = [
    { label: "All Types", value: "all" },
    { label: "1 Bedroom", value: "1 Bedroom" },
    { label: "2 Bedroom", value: "2 Bedroom" },
    { label: "3 Bedroom", value: "3 Bedroom" },
    { label: "Office", value: "Office" },
    { label: "Warehouse", value: "Warehouse" },
  ];

  const filteredUnits = units.filter((unit) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (
        !unit.number.toLowerCase().includes(query) &&
        !unit.tenant?.name.toLowerCase().includes(query) &&
        !unit.tenant?.company.toLowerCase().includes(query)
      ) {
        return false;
      }
    }
    if (statusFilter !== "all" && unit.status !== statusFilter) return false;
    if (typeFilter !== "all" && unit.type !== typeFilter) return false;
    return true;
  });

  const getStatusStyle = (status: Unit["status"]) => {
    switch (status) {
      case "Occupied":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "Vacant":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "Maintenance":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "Unavailable":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  const getStatusIcon = (status: Unit["status"]) => {
    switch (status) {
      case "Occupied":
        return <CheckCircleIcon className="h-4 w-4" />;
      case "Vacant":
        return <HomeIcon className="h-4 w-4" />;
      case "Maintenance":
        return <PencilIcon className="h-4 w-4" />;
      case "Unavailable":
        return <XCircleIcon className="h-4 w-4" />;
      default:
        return <HomeIcon className="h-4 w-4" />;
    }
  };

  const totalUnits = units.length;
  const occupiedUnits = units.filter((u) => u.status === "Occupied").length;
  const occupancyRate = Math.round((occupiedUnits / totalUnits) * 100);
  const totalRevenue = units
    .filter((u) => u.status === "Occupied")
    .reduce((sum, u) => sum + u.monthlyRent, 0);

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <HomeIcon className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Total Units
              </h3>
              <p className="text-2xl font-bold text-blue-600">{totalUnits}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <UserIcon className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Occupied
              </h3>
              <p className="text-2xl font-bold text-green-600">
                {occupiedUnits}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CheckCircleIcon className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Occupancy
              </h3>
              <p className="text-2xl font-bold text-purple-600">
                {occupancyRate}%
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
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Revenue
              </h3>
              <p className="text-2xl font-bold text-emerald-600">
                ${totalRevenue.toLocaleString()}
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
            placeholder="Search units, tenants, or companies..."
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
            id="typeFilter"
            options={typeOptions}
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          />

          <div className="flex items-center gap-1 border border-gray-300 rounded-md">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-2 text-sm font-medium rounded-l-md ${
                viewMode === "grid"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-3 py-2 text-sm font-medium rounded-r-md ${
                viewMode === "list"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              List
            </button>
          </div>

          <button className="flex items-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500">
            <PlusIcon className="h-4 w-4" />
            Add Unit
          </button>
        </div>
      </div>

      {/* Units Display */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredUnits.map((unit) => (
            <div
              key={unit.id}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Unit {unit.number}
                </h3>
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(unit.status)}`}
                >
                  {getStatusIcon(unit.status)}
                  {unit.status}
                </span>
              </div>

              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <p>
                  <span className="font-medium">Floor:</span> {unit.floor}
                </p>
                <p>
                  <span className="font-medium">Type:</span> {unit.type}
                </p>
                <p>
                  <span className="font-medium">Size:</span>{" "}
                  {unit.size.toLocaleString()} sq ft
                </p>
                <p>
                  <span className="font-medium">Rent:</span> $
                  {unit.monthlyRent.toLocaleString()}/month
                </p>
              </div>

              {unit.tenant && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    Tenant
                  </h4>
                  <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                    <p>
                      <span className="font-medium">Name:</span>{" "}
                      {unit.tenant.name}
                    </p>
                    <p>
                      <span className="font-medium">Company:</span>{" "}
                      {unit.tenant.company}
                    </p>
                    <p>
                      <span className="font-medium">Lease:</span>{" "}
                      {unit.tenant.leaseStart} - {unit.tenant.leaseEnd}
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  Amenities
                </h4>
                <div className="flex flex-wrap gap-1">
                  {unit.amenities.map((amenity, index) => (
                    <span
                      key={index}
                      className="inline-block px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Edit Unit
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredUnits.map((unit) => (
              <li key={unit.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <p className="text-lg font-medium text-blue-600 truncate">
                        Unit {unit.number}
                      </p>
                      <span
                        className={`ml-3 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(unit.status)}`}
                      >
                        {getStatusIcon(unit.status)}
                        {unit.status}
                      </span>
                    </div>
                    <div className="ml-2 flex-shrink-0">
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        ${unit.monthlyRent.toLocaleString()}/mo
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        Floor {unit.floor} • {unit.type} •{" "}
                        {unit.size.toLocaleString()} sq ft
                      </p>
                    </div>
                    {unit.tenant && (
                      <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                        <UserIcon className="flex-shrink-0 mr-1.5 h-4 w-4" />
                        <p>
                          {unit.tenant.name} ({unit.tenant.company})
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="mt-2">
                    <div className="flex flex-wrap gap-1">
                      {unit.amenities.map((amenity, index) => (
                        <span
                          key={index}
                          className="inline-block px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {filteredUnits.length === 0 && (
        <div className="text-center py-12">
          <HomeIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
            No units found
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Try adjusting your search or filters.
          </p>
        </div>
      )}
    </div>
  );
}
