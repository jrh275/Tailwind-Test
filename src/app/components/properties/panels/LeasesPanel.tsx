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
    setRentPeriods([...rentPeriods, newPeriod]);
  };

  const removeRentPeriod = (id: string) => {
    if (rentPeriods.length > 1) {
      setRentPeriods(rentPeriods.filter((period) => period.id !== id));
    }
  };

  const updateRentPeriod = (
    id: string,
    field: keyof RentPeriod,
    value: string
  ) => {
    setRentPeriods(
      rentPeriods.map((period) =>
        period.id === id ? { ...period, [field]: value } : period
      )
    );
  };

  return (
    <div className="space-y-8">
      {/* Lease Dates and Terms */}
      <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
        {/* Line 1: Lease Start Date & Lease End Date */}
        <div className="px-4 py-6 sm:px-0">
          <dt className="text-sm/6 font-medium text-gray-900 dark:text-white">
            Lease Start Date
          </dt>
          <dd className="mt-2">
            <DateInput id="leaseStartDate" />
          </dd>
        </div>

        <div className="px-4 py-6 sm:px-0">
          <dt className="text-sm/6 font-medium text-gray-900 dark:text-white">
            Lease End Date
          </dt>
          <dd className="mt-2">
            <DateInput id="leaseEndDate" />
          </dd>
        </div>

        {/* Line 2: Security Deposit & Rent Commencement Date */}
        <div className="px-4 py-6 sm:px-0">
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

        <div className="px-4 py-6 sm:px-0">
          <dt className="text-sm/6 font-medium text-gray-900 dark:text-white">
            Rent Commencement Date
          </dt>
          <dd className="mt-2">
            <DateInput id="rentCommencementDate" />
          </dd>
        </div>

        {/* Line 3: Lease Type & Select Units */}
        <div className="px-4 py-6 sm:px-0">
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

        <div className="px-4 py-6 sm:px-0">
          <dt className="text-sm/6 font-medium text-gray-900 dark:text-white">
            Select Units
          </dt>
          <dd className="mt-2">
            <FieldSelect
              id="units"
              options={unitOptions}
              placeholder="Select one or more units"
              multiple={true}
            />
          </dd>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 dark:border-gray-700"></div>

      {/* TENANT Section */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
          TENANT
        </h3>

        <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
          <div className="px-4 py-6 sm:px-0">
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

          <div className="px-4 py-6 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900 dark:text-white">
              Contact Person
            </dt>
            <dd className="mt-2">
              <FieldInput id="tenantContact" placeholder="e.g., John Smith" />
            </dd>
          </div>

          <div className="px-4 py-6 sm:px-0">
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

          <div className="px-4 py-6 sm:px-0">
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
      <div className="border-t border-gray-200 dark:border-gray-700"></div>

      {/* LEASE FILES Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            LEASE FILES
          </h3>
          <button className="flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-white/10 dark:text-white dark:ring-white/20 dark:hover:bg-white/20">
            <PlusIcon className="h-4 w-4" />
            Upload File
          </button>
        </div>

        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
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
      <div className="border-t border-gray-200 dark:border-gray-700"></div>

      {/* LEASE RENT Section */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
          LEASE RENT
        </h3>

        <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
          <div className="px-4 py-6 sm:px-0">
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

          <div className="px-4 py-6 sm:px-0">
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
      <div className="border-t border-gray-200 dark:border-gray-700"></div>

      {/* RENT SCHEDULE Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            RENT SCHEDULE
          </h3>
          <button
            onClick={addRentPeriod}
            className="flex items-center gap-2 rounded-md bg-brand-royal px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-royal"
          >
            <PlusIcon className="h-4 w-4" />
            Add Period
          </button>
        </div>

        <div className="space-y-6">
          {rentPeriods.map((period, index) => (
            <div
              key={period.id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  Period {index + 1}
                </h4>
                {rentPeriods.length > 1 && (
                  <button
                    onClick={() => removeRentPeriod(period.id)}
                    className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
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
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
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
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
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
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
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

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pt-6">
        <button className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-white/10 dark:text-white dark:ring-white/20 dark:hover:bg-white/20">
          Cancel
        </button>
        <button className="rounded-md bg-brand-royal px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-royal">
          Save Lease
        </button>
      </div>
    </div>
  );
}
