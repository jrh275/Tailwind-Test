// src/app/components/properties/panels/LeasesPanel.tsx
"use client";

import {
  ArrowDownTrayIcon,
  PaperClipIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import { useState } from "react";
import { DateInput, FieldInput, FieldSelect } from "../shared";

interface RentPeriod {
  id: string;
  startDate: string;
  endDate: string;
  monthlyRent: string;
  description?: string;
}

export default function LeasesPanel() {
  const [rentPeriods, setRentPeriods] = useState<RentPeriod[]>([
    {
      id: "1",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      monthlyRent: "8500",
      description: "Year 1 base rent",
    },
  ]);

  const leaseTypeOptions = [
    { label: "Full Service Gross", value: "full_service_gross" },
    { label: "NNN (Triple Net)", value: "nnn" },
    { label: "Percentage", value: "percentage" },
    { label: "Other", value: "other" },
    { label: "None", value: "none" },
  ];

  const unitOptions = [
    { label: "Unit 101 (1,200 sq ft)", value: "unit_101" },
    { label: "Unit 102 (1,500 sq ft)", value: "unit_102" },
    { label: "Unit 201 (2,000 sq ft)", value: "unit_201" },
    { label: "Unit 202 (1,800 sq ft)", value: "unit_202" },
    { label: "Warehouse A (10,000 sq ft)", value: "warehouse_a" },
  ];

  const rentStructureOptions = [
    { label: "Fixed Monthly", value: "fixed_monthly" },
    { label: "Graduated Increases", value: "graduated" },
    { label: "CPI Adjustments", value: "cpi" },
    { label: "Percentage of Sales", value: "percentage_sales" },
    { label: "Base + Percentage", value: "base_percentage" },
  ];

  const addRentPeriod = () => {
    const newPeriod: RentPeriod = {
      id: Date.now().toString(),
      startDate: "",
      endDate: "",
      monthlyRent: "",
      description: "",
    };
    setRentPeriods((prev) => [...prev, newPeriod]);
  };

  const removeRentPeriod = (id: string) => {
    setRentPeriods((prev) =>
      prev.length > 1 ? prev.filter((p) => p.id !== id) : prev
    );
  };

  const updateRentPeriod = (
    id: string,
    field: keyof RentPeriod,
    value: string
  ) => {
    setRentPeriods((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  return (
    <div className="space-y-6">
      {/* --- Lease Dates & Terms (match DetailsPanel line rhythm) --- */}
      <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
        {/* Line 1 */}
        <div className="px-0 py-3">
          <dt className="text-sm/6 font-medium text-gray-900 dark:text-white">
            Lease Start Date
          </dt>
          <dd className="mt-2">
            <DateInput id="leaseStartDate" />
          </dd>
        </div>
        <div className="px-0 py-3">
          <dt className="text-sm/6 font-medium text-gray-900 dark:text-white">
            Lease End Date
          </dt>
          <dd className="mt-2">
            <DateInput id="leaseEndDate" />
          </dd>
        </div>

        {/* Line 2 */}
        <div className="px-0 py-3">
          <dt className="text-sm/6 font-medium text-gray-900 dark:text-white">
            Security Deposit
          </dt>
          <dd className="mt-2">
            <FieldInput
              id="securityDeposit"
              type="number"
              placeholder="e.g., 17000"
            />
          </dd>
        </div>
        <div className="px-0 py-3">
          <dt className="text-sm/6 font-medium text-gray-900 dark:text-white">
            Rent Commencement Date
          </dt>
          <dd className="mt-2">
            <DateInput id="rentCommencementDate" />
          </dd>
        </div>

        {/* Line 3 */}
        <div className="px-0 py-3">
          <dt className="text-sm/6 font-medium text-gray-900 dark:text-white">
            Lease Type
          </dt>
          <dd className="mt-2">
            <FieldSelect
              id="leaseType"
              options={leaseTypeOptions}
              placeholder="Select lease type"
            />
          </dd>
        </div>
        <div className="px-0 py-3">
          <dt className="text-sm/6 font-medium text-gray-900 dark:text-white">
            Select Units
          </dt>
          <dd className="mt-2">
            <FieldSelect
              id="units"
              options={unitOptions}
              placeholder="Select one or more units"
              multiple
            />
          </dd>
        </div>
      </div>

      {/* Divider to match DetailsPanel */}
      <div className="border-t border-gray-200 dark:border-white/10" />

      {/* --- Tenant (same dt/dd pattern) --- */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
          Tenant
        </h3>
        <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
          <div className="px-0 py-3">
            <dt className="text-sm/6 font-medium text-gray-900 dark:text-white">
              Company Name
            </dt>
            <dd className="mt-2">
              <FieldInput
                id="tenantCompany"
                placeholder="e.g., Harbor Heights LLC"
              />
            </dd>
          </div>
          <div className="px-0 py-3">
            <dt className="text-sm/6 font-medium text-gray-900 dark:text-white">
              Contact Person
            </dt>
            <dd className="mt-2">
              <FieldInput id="tenantContact" placeholder="e.g., John Smith" />
            </dd>
          </div>
          <div className="px-0 py-3">
            <dt className="text-sm/6 font-medium text-gray-900 dark:text-white">
              Email Address
            </dt>
            <dd className="mt-2">
              <FieldInput
                id="tenantEmail"
                type="email"
                placeholder="e.g., john@company.com"
              />
            </dd>
          </div>
          <div className="px-0 py-3">
            <dt className="text-sm/6 font-medium text-gray-900 dark:text-white">
              Phone Number
            </dt>
            <dd className="mt-2">
              <FieldInput
                id="tenantPhone"
                type="tel"
                placeholder="e.g., (555) 123-4567"
              />
            </dd>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 dark:border-white/10" />

      {/* --- Lease Files (mirrors Attachments block) --- */}
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white">
            Lease Files
          </h3>
          <button
            type="button"
            className="rounded-full border-1 border-sea p-1 text-sea hover:bg-sea/20 dark:border-sea dark:text-sea dark:hover:bg-sea/30"
          >
            <PlusIcon aria-hidden="true" className="size-5" />
          </button>
        </div>

        <ul className="mt-4 divide-y divide-gray-200 dark:divide-white/10">
          <li className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <PaperClipIcon className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Signed_Lease_Agreement.pdf
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  3.2 MB • Uploaded on Jan 15, 2024
                </p>
              </div>
            </div>
            <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              <ArrowDownTrayIcon className="h-4 w-4" />
              Download
            </button>
          </li>

          <li className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <PaperClipIcon className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Tenant_Application.pdf
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  1.1 MB • Uploaded on Dec 20, 2023
                </p>
              </div>
            </div>
            <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              <ArrowDownTrayIcon className="h-4 w-4" />
              Download
            </button>
          </li>
        </ul>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 dark:border-white/10" />

      {/* --- Lease Rent --- */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
          Lease Rent
        </h3>
        <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
          <div className="px-0 py-3">
            <dt className="text-sm/6 font-medium text-gray-900 dark:text-white">
              Rent Structure
            </dt>
            <dd className="mt-2">
              <FieldSelect
                id="rentStructure"
                options={rentStructureOptions}
                placeholder="Select rent structure"
              />
            </dd>
          </div>
          <div className="px-0 py-3">
            <dt className="text-sm/6 font-medium text-gray-900 dark:text-white">
              Base Monthly Rent
            </dt>
            <dd className="mt-2">
              <FieldInput
                id="baseRent"
                type="number"
                placeholder="e.g., 8500"
              />
            </dd>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 dark:border-white/10" />

      {/* --- Rent Schedule (compact card style aligned with DetailsPanel density) --- */}
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white">
            Rent Schedule
          </h3>
          <button
            onClick={addRentPeriod}
            className="flex items-center gap-2 rounded-md bg-brand-royal px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-royal"
          >
            <PlusIcon className="h-4 w-4" />
            Add Period
          </button>
        </div>

        <div className="mt-4 space-y-4">
          {rentPeriods.map((period, idx) => (
            <div
              key={period.id}
              className="rounded-lg border border-gray-200 p-4 dark:border-white/10"
            >
              <div className="mb-3 flex items-center justify-between">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  Period {idx + 1}
                </h4>
                {rentPeriods.length > 1 && (
                  <button
                    onClick={() => removeRentPeriod(period.id)}
                    className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                    aria-label={`Remove Period ${idx + 1}`}
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Start Date
                  </label>
                  <DateInput
                    id={`startDate_${period.id}`}
                    value={period.startDate}
                    onChange={(e) =>
                      updateRentPeriod(period.id, "startDate", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    End Date
                  </label>
                  <DateInput
                    id={`endDate_${period.id}`}
                    value={period.endDate}
                    onChange={(e) =>
                      updateRentPeriod(period.id, "endDate", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Monthly Rent
                  </label>
                  <FieldInput
                    id={`monthlyRent_${period.id}`}
                    type="number"
                    placeholder="e.g., 8500"
                    value={period.monthlyRent}
                    onChange={(e) =>
                      updateRentPeriod(period.id, "monthlyRent", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Description
                  </label>
                  <FieldInput
                    id={`description_${period.id}`}
                    placeholder="e.g., Year 1 base rent"
                    value={period.description || ""}
                    onChange={(e) =>
                      updateRentPeriod(period.id, "description", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions (mirror DetailsPanel buttons: outline Cancel + royal Save) */}
      <div className="mt-8 flex justify-end gap-3">
        <button
          type="button"
          className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-white/10 dark:text-white dark:ring-white/20 dark:hover:bg-white/20"
        >
          Cancel
        </button>
        <button
          type="button"
          className="rounded-md bg-royal/10 px-3 py-2 text-sm font-semibold text-royal shadow-xs hover:bg-royal/20 dark:bg-royal/20 dark:text-royal dark:shadow-none dark:hover:bg-royal/30"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
