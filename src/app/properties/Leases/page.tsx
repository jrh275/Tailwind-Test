// src/app/properties/leases.tsx
"use client";

import { ChevronDownIcon } from "@heroicons/react/16/solid";
import {
  ArrowDownTrayIcon,
  CalendarDaysIcon,
  PaperClipIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import { useState } from "react";

/* ---------------- Reusable inputs ---------------- */

function FieldInput({
  id,
  placeholder,
  type = "text",
}: {
  id: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      id={id}
      name={id}
      type={type}
      placeholder={placeholder}
      className="block w-full rounded-md bg-white py-2 px-3 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-brand-royal dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-400"
    />
  );
}

function FieldSelect({
  id,
  options,
  placeholder,
  multiple = false,
}: {
  id: string;
  options: { label: string; value: string }[];
  placeholder?: string;
  multiple?: boolean;
}) {
  return (
    <div className="relative">
      <select
        id={id}
        name={id}
        multiple={multiple}
        className="block w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-brand-royal dark:bg-white/5 dark:text-white dark:outline-white/10"
        defaultValue=""
      >
        <option value="" disabled>
          {placeholder ?? "Select…"}
        </option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDownIcon
        aria-hidden="true"
        className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 size-5 fill-gray-500 dark:fill-gray-400"
      />
    </div>
  );
}

function DateInput({ id, placeholder }: { id: string; placeholder?: string }) {
  return (
    <div className="relative">
      <input
        id={id}
        name={id}
        type="date"
        placeholder={placeholder}
        className="block w-full rounded-md bg-white py-2 pr-10 pl-3 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-brand-royal dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-400"
      />
      <CalendarDaysIcon
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 size-5 text-gray-400 dark:text-gray-500"
      />
    </div>
  );
}

interface RentPeriod {
  id: string;
  startDate: string;
  endDate: string;
  monthlyRent: string;
  description?: string;
}

// This component should be imported and used to replace the LeasesPanel in properties/details/page.tsx

export default function LeasesPanel() {
  const [rentPeriods, setRentPeriods] = useState<RentPeriod[]>([
    {
      id: "1",
      startDate: "",
      endDate: "",
      monthlyRent: "",
      description: "",
    },
  ]);

  const leaseTypeOptions = [
    { label: "Full Service Gross", value: "full_service_gross" },
    { label: "NNN", value: "nnn" },
    { label: "Percentage", value: "percentage" },
    { label: "Other", value: "other" },
    { label: "None", value: "none" },
  ];

  const unitOptions = [
    { label: "Unit 101 - 2,500 sq ft", value: "unit_101" },
    { label: "Unit 102 - 1,800 sq ft", value: "unit_102" },
    { label: "Unit 201 - 3,200 sq ft", value: "unit_201" },
    { label: "Unit 202 - 2,100 sq ft", value: "unit_202" },
    { label: "Warehouse A - 15,000 sq ft", value: "warehouse_a" },
    { label: "Warehouse B - 12,000 sq ft", value: "warehouse_b" },
  ];

  const leaseRentOptions = [
    { label: "Fixed Monthly Rent", value: "fixed_monthly" },
    { label: "Graduated Rent", value: "graduated" },
    { label: "Percentage Rent", value: "percentage" },
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
    setRentPeriods(rentPeriods.filter((period) => period.id !== id));
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
    <div>
      <dl className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
        {/* Line one */}
        <div className="px-4 py-6 sm:px-0">
          <dt className="text-sm/6 font-medium text-gray-900 dark:text-white">
            Lease Start Date
          </dt>
          <dd className="mt-2 sm:mt-2">
            <DateInput id="leaseStartDate" placeholder="Select start date" />
          </dd>
        </div>
        <div className="px-4 py-6 sm:px-0">
          <dt className="text-sm/6 font-medium text-gray-900 dark:text-white">
            Lease End Date
          </dt>
          <dd className="mt-2 sm:mt-2">
            <DateInput id="leaseEndDate" placeholder="Select end date" />
          </dd>
        </div>

        {/* Line two */}
        <div className="border-t border-base-cloudy px-4 py-6 sm:px-0 dark:border-white/10">
          <dt className="text-sm/6 font-medium text-gray-900 dark:text-white">
            Security Deposit
          </dt>
          <dd className="mt-2 sm:mt-2">
            <FieldInput
              id="securityDeposit"
              type="number"
              placeholder="e.g., 5000"
            />
          </dd>
        </div>
        <div className="border-t border-base-cloudy px-4 py-6 sm:px-0 dark:border-white/10">
          <dt className="text-sm/6 font-medium text-gray-900 dark:text-white">
            Rent Commencement Date
          </dt>
          <dd className="mt-2 sm:mt-2">
            <DateInput id="rentCommencementDate" placeholder="Select date" />
          </dd>
        </div>

        {/* Line three */}
        <div className="border-t border-base-cloudy px-4 py-6 sm:px-0 dark:border-white/10">
          <dt className="text-sm/6 font-medium text-gray-900 dark:text-white">
            Lease Type
          </dt>
          <dd className="mt-2 sm:mt-2">
            <FieldSelect
              id="leaseType"
              options={leaseTypeOptions}
              placeholder="Select lease type"
            />
          </dd>
        </div>
        <div className="border-t border-base-cloudy px-4 py-6 sm:px-0 dark:border-white/10">
          <dt className="text-sm/6 font-medium text-gray-900 dark:text-white">
            Select Units
          </dt>
          <dd className="mt-2 sm:mt-2">
            <FieldSelect
              id="units"
              options={unitOptions}
              placeholder="Select one or more units"
              multiple={true}
            />
          </dd>
        </div>
      </dl>

      {/* TENANT Section */}
      <div className="mt-8 border-t border-base-cloudy pt-8 dark:border-white/10">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          TENANT
        </h3>
        <dl className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
          <div className="px-4 py-6 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900 dark:text-white">
              Company Name
            </dt>
            <dd className="mt-2 sm:mt-2">
              <FieldInput
                id="tenantCompany"
                placeholder="e.g., Acme Corporation"
              />
            </dd>
          </div>
        </dl>
      </div>

      {/* LEASE FILES Section */}
      <div className="mt-8 border-t border-base-cloudy pt-8 dark:border-white/10">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          LEASE FILES
        </h3>
        <div className="px-4 sm:px-0">
          <dt className="flex items-center text-sm/6 font-medium text-gray-900 dark:text-white">
            <button
              type="button"
              aria-label="Add attachment"
              className="mr-2 rounded-full bg-base-sea p-1 text-base-white shadow-xs hover:bg-opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-base-sea dark:shadow-none"
            >
              <PlusIcon aria-hidden="true" className="size-5" />
            </button>
            Attachments
          </dt>

          <dd className="mt-2 text-sm text-gray-900 dark:text-white">
            <ul
              role="list"
              className="rounded-md divide-y divide-base-cloudy dark:divide-white/10"
            >
              <li className="flex items-center justify-between py-3 pr-5 pl-0">
                <div className="flex w-0 flex-1 items-center">
                  <PaperClipIcon className="size-5 shrink-0 text-gray-400 dark:text-gray-500" />
                  <div className="ml-4 flex min-w-0 flex-1 gap-2">
                    <span className="truncate font-medium text-gray-900 dark:text-white">
                      lease_agreement_signed.pdf
                    </span>
                    <span className="shrink-0 text-gray-400 dark:text-gray-500">
                      1.2mb
                    </span>
                  </div>
                </div>
                <div className="ml-4 shrink-0">
                  <button
                    type="button"
                    title="Download"
                    aria-label="Download lease_agreement_signed.pdf"
                    className="rounded-full p-2 text-base-sea hover:bg-base-sea/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-base-sea dark:text-base-sea dark:hover:bg-white/10"
                  >
                    <ArrowDownTrayIcon aria-hidden="true" className="size-5" />
                  </button>
                </div>
              </li>

              <li className="flex items-center justify-between py-3 pr-5 pl-0">
                <div className="flex w-0 flex-1 items-center">
                  <PaperClipIcon className="size-5 shrink-0 text-gray-400 dark:text-gray-500" />
                  <div className="ml-4 flex min-w-0 flex-1 gap-2">
                    <span className="truncate font-medium text-gray-900 dark:text-white">
                      tenant_insurance_certificate.pdf
                    </span>
                    <span className="shrink-0 text-gray-400 dark:text-gray-500">
                      856kb
                    </span>
                  </div>
                </div>
                <div className="ml-4 shrink-0">
                  <button
                    type="button"
                    title="Download"
                    aria-label="Download tenant_insurance_certificate.pdf"
                    className="rounded-full p-2 text-base-sea hover:bg-base-sea/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-base-sea dark:text-base-sea dark:hover:bg-white/10"
                  >
                    <ArrowDownTrayIcon aria-hidden="true" className="size-5" />
                  </button>
                </div>
              </li>
            </ul>
          </dd>
        </div>
      </div>

      {/* LEASE RENT Section */}
      <div className="mt-8 border-t border-base-cloudy pt-8 dark:border-white/10">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          LEASE RENT
        </h3>
        <dl className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
          <div className="px-4 py-6 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900 dark:text-white">
              Rent Structure
            </dt>
            <dd className="mt-2 sm:mt-2">
              <FieldSelect
                id="rentStructure"
                options={leaseRentOptions}
                placeholder="Select rent structure"
              />
            </dd>
          </div>
        </dl>
      </div>

      {/* RENT SCHEDULE Section */}
      <div className="mt-8 border-t border-base-cloudy pt-8 dark:border-white/10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            RENT SCHEDULE
          </h3>
          <button
            type="button"
            onClick={addRentPeriod}
            className="inline-flex items-center gap-2 rounded-md bg-brand-royal px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-royal/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-royal"
          >
            <PlusIcon className="size-4" />
            Add Period
          </button>
        </div>

        <div className="space-y-6">
          {rentPeriods.map((period, index) => (
            <div
              key={period.id}
              className="rounded-lg border border-base-cloudy p-4 dark:border-white/10"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  Period {index + 1}
                </h4>
                {rentPeriods.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeRentPeriod(period.id)}
                    className="rounded-full p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 dark:hover:text-red-400"
                  >
                    <TrashIcon className="size-4" />
                  </button>
                )}
              </div>

              <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-3">
                <div>
                  <dt className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Period Start Date
                  </dt>
                  <dd>
                    <DateInput
                      id={`periodStart-${period.id}`}
                      placeholder="Select start date"
                    />
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Period End Date
                  </dt>
                  <dd>
                    <DateInput
                      id={`periodEnd-${period.id}`}
                      placeholder="Select end date"
                    />
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Monthly Rent
                  </dt>
                  <dd>
                    <FieldInput
                      id={`monthlyRent-${period.id}`}
                      type="number"
                      placeholder="e.g., 3500"
                    />
                  </dd>
                </div>
                <div className="sm:col-span-3">
                  <dt className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description (Optional)
                  </dt>
                  <dd>
                    <FieldInput
                      id={`description-${period.id}`}
                      placeholder="e.g., Base rent with 3% annual increase"
                    />
                  </dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
