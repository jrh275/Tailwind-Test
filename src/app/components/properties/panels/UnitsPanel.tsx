// src/app/components/properties/panels/UnitsPanel.tsx
"use client";

import { Button } from "@/components/ui/button"; // ← keep your Button
import {
  HomeIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import { useState } from "react";
import { FieldSelect } from "../shared";
import AddUnitModal from "./AddUnitModal";

interface Unit {
  id: string;
  number: string;
  floor: number;
  type: string;
  size: number;
  monthlyRent: number;
  status: "Occupied" | "Vacant" | "Unavailable";
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
    type: "Retail",
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
    type: "Warehouse",
    size: 15000,
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
    type: "Warehouse",
    size: 18000,
    monthlyRent: 3800,
    status: "Unavailable",
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
  const [units, setUnits] = useState<Unit[]>(sampleUnits); // ← enable updates
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  // NEW: Add Unit modal state
  const [openAdd, setOpenAdd] = useState(false);

  const statusOptions = [
    { label: "All Statuses", value: "all" },
    { label: "Occupied", value: "Occupied" },
    { label: "Vacant", value: "Vacant" },
    { label: "Unavailable", value: "Unavailable" },
  ];

  const typeOptions = [
    { label: "All Types", value: "all" },
    { label: "Office", value: "Office" },
    { label: "Retail", value: "Retail" },
    { label: "Warehouse", value: "Warehouse" },
  ];

  const filteredUnits = units.filter((unit) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const numberMatch = unit.number.toLowerCase().includes(query);
      const nameMatch = unit.tenant?.name?.toLowerCase().includes(query);
      const companyMatch = unit.tenant?.company?.toLowerCase().includes(query);
      if (!numberMatch && !nameMatch && !companyMatch) return false;
    }
    if (statusFilter !== "all" && unit.status !== statusFilter) return false;
    if (typeFilter !== "all" && unit.type !== typeFilter) return false;
    return true;
  });

  // --- Grey chips (status pills) ---
  const getStatusStyle = (_status: Unit["status"]) =>
    "bg-cloudy/50 text-midnight dark:bg-cloudy/20 dark:text-cloudy";

  const getStatusIcon = (_status: Unit["status"]) => (
    <HomeIcon className="h-4 w-4 text-gray-400 dark:text-gray-500" />
  );

  const handlePastLeases = (unit: Unit) =>
    console.log("Open Past Leases for Unit", unit.number, unit.id);

  // NEW: Create handler maps modal data onto your Unit shape
  function handleCreateUnit(data: {
    unitName: string;
    totalSqFt?: number;
    address1?: string;
    address2?: string;
  }) {
    const newUnit: Unit = {
      id: crypto.randomUUID(),
      number: data.unitName, // map Unit Name -> number
      floor: 1,
      type: "Office", // default; adjust if you later add a selector
      size: data.totalSqFt ?? 0, // map Total SF
      monthlyRent: 0,
      status: "Vacant",
      amenities: [],
    };
    setUnits((prev) => [newUnit, ...prev]);
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
            placeholder="Search units, tenants, or companies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-royal focus:border-royal text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
        </div>
      </div>

      {/* Row 2: Filters + View Toggle + Add Button */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-4">
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

        <div className="ml-auto flex items-center gap-2">
          {/* Toggle: List first, then Grid */}
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

          {/* Add Unit */}
          <Button variant="cta" onClick={() => setOpenAdd(true)}>
            Add Unit
          </Button>
        </div>
      </div>

      {/* Units Display */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredUnits.map((unit) => (
            <div
              key={unit.id}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Unit {unit.number}
                  </h3>
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(
                      unit.status
                    )}`}
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
              </div>

              {/* Bottom row: Past Leases + Edit */}
              <div className="mt-4 flex items-center justify-between">
                <button
                  onClick={() => handlePastLeases(unit)}
                  className="inline-flex items-center rounded-full bg-cloudy/50 px-3 py-1 text-xs font-medium text-midnight hover:bg-cloudy dark:bg-cloudy/20 dark:text-cloudy dark:hover:bg-cloudy/30"
                  aria-label={`View past leases for Unit ${unit.number}`}
                >
                  Past Leases
                </button>

                <button
                  className="text-sea hover:text-sea"
                  aria-label={`Edit Unit ${unit.number}`}
                >
                  <PencilIcon className="size-5" aria-hidden="true" />
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
                      <p className="text-lg font-medium text-sea truncate">
                        Unit {unit.number}
                      </p>
                      <span
                        className={`ml-3 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(
                          unit.status
                        )}`}
                      >
                        {getStatusIcon(unit.status)}
                        {unit.status}
                      </span>
                    </div>

                    <div className="ml-2 flex items-center gap-3">
                      <p className="text-md font-bold text-gray-900 dark:text-white">
                        ${unit.monthlyRent.toLocaleString()}/mo
                      </p>

                      {/* Past Leases chip */}
                      <button
                        onClick={() => handlePastLeases(unit)}
                        className="inline-flex items-center rounded-full bg-cloudy/50 px-3 py-1 text-xs font-medium text-midnight hover:bg-cloudy dark:bg-cloudy/20 dark:text-cloudy dark:hover:bg-cloudy/30"
                        aria-label={`View past leases for Unit ${unit.number}`}
                      >
                        Past Leases
                      </button>

                      <button
                        className="text-sea hover:text-sea"
                        aria-label={`Edit Unit ${unit.number}`}
                      >
                        <PencilIcon className="size-5" aria-hidden="true" />
                      </button>
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

      {/* NEW: Add Unit Modal mount */}
      <AddUnitModal
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onCreate={(data) => {
          handleCreateUnit(data);
          setOpenAdd(false);
        }}
      />
    </div>
  );
}
