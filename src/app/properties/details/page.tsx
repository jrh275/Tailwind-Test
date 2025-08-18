// src/app/properties/details/page.tsx
"use client";

import { ChevronDownIcon } from "@heroicons/react/16/solid";
import {
  ArrowDownTrayIcon,
  HomeIcon,
  PaperClipIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

type TabKey = "details" | "leases" | "units" | "issues" | "settings" | "files";
const DEFAULT_TAB: TabKey = "details";

const pages = [
  { name: "Properties", href: "/properties", current: false },
  {
    name: "4033 NW Yeon Avenue",
    href: "/properties/4033-nw-yeon-avenue",
    current: false,
  },
  { name: "Details", href: "#", current: true },
];

const TABS: { key: TabKey; name: string }[] = [
  { key: "details", name: "Details" },
  { key: "leases", name: "Leases" },
  { key: "units", name: "Units" },
  { key: "issues", name: "Issues" },
  { key: "settings", name: "Settings" },
  { key: "files", name: "Files" },
];

function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
function isTabKey(v: string | null): v is TabKey {
  return !!v && TABS.some((t) => t.key === v);
}

export default function PropertiesDetailsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const urlTab = searchParams.get("tab");
  const [active, setActive] = useState<TabKey>(
    isTabKey(urlTab) ? urlTab : DEFAULT_TAB
  );

  const setTab = useCallback(
    (key: TabKey) => {
      setActive(key);
      const params = new URLSearchParams(searchParams.toString());
      params.set("tab", key);
      router.replace(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  useEffect(() => {
    const current = searchParams.get("tab");
    if (isTabKey(current) && current !== active) {
      setActive(current);
    } else if (current && !isTabKey(current)) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("tab", DEFAULT_TAB);
      router.replace(`?${params.toString()}`, { scroll: false });
      setActive(DEFAULT_TAB);
    }
  }, [searchParams, active, router]);

  const activeTab = useMemo(
    () => TABS.find((t) => t.key === active) ?? TABS[0],
    [active]
  );

  return (
    <div className="border border-base-cloudy bg-base-white rounded-md dark:border-white/10 dark:bg-gray-800/50">
      {/* Breadcrumb with bottom border */}
      <nav
        aria-label="Breadcrumb"
        className="flex border-b border-base-cloudy dark:border-white/10"
      >
        <ol
          role="list"
          className="mx-auto flex w-full max-w-screen-2xl space-x-4 px-4 sm:px-6 lg:px-8"
        >
          <li className="flex">
            <div className="flex items-center">
              <Link
                href="/"
                className="text-gray-400 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <HomeIcon aria-hidden="true" className="size-5 shrink-0" />
                <span className="sr-only">Home</span>
              </Link>
            </div>
          </li>

          {pages.map((page) => (
            <li key={page.name} className="flex">
              <div className="flex items-center">
                <svg
                  fill="currentColor"
                  viewBox="0 0 24 44"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                  className="h-full w-6 shrink-0 text-gray-200 dark:text-white/10"
                >
                  <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
                </svg>
                <Link
                  href={page.href}
                  aria-current={page.current ? "page" : undefined}
                  className={classNames(
                    "ml-4 text-sm font-medium",
                    page.current
                      ? "text-gray-900 dark:text-gray-100"
                      : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  )}
                >
                  {page.name}
                </Link>
              </div>
            </li>
          ))}
        </ol>
      </nav>

      {/* Tabs (keep underline) */}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="py-4">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
            4033 NW Yeon Avenue
          </h3>

          <div className="mt-3 sm:mt-4">
            {/* Mobile select */}
            <div className="grid grid-cols-1 sm:hidden">
              <select
                value={activeTab.name}
                onChange={(e) => {
                  const found = TABS.find((t) => t.name === e.target.value);
                  if (found) setTab(found.key);
                }}
                aria-label="Select a tab"
                className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-brand-royal dark:bg-white/5 dark:text-white dark:outline-white/10 dark:*:bg-gray-800 dark:focus:outline-white"
              >
                {TABS.map((tab) => (
                  <option key={tab.key}>{tab.name}</option>
                ))}
              </select>
              <ChevronDownIcon
                aria-hidden="true"
                className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end fill-gray-500 dark:fill-gray-400"
              />
            </div>

            {/* Desktop tablist */}
            <div className="hidden sm:block">
              <nav
                role="tablist"
                aria-label="Property sections"
                className="flex space-x-8 border-b border-base-cloudy dark:border-white/10"
              >
                {TABS.map((tab) => {
                  const isActive = tab.key === active;
                  return (
                    <button
                      key={tab.key}
                      role="tab"
                      aria-selected={isActive}
                      aria-controls={`panel-${tab.key}`}
                      id={`tab-${tab.key}`}
                      onClick={() => setTab(tab.key)}
                      className={classNames(
                        isActive
                          ? "border-brand-royal text-brand-royal"
                          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-white/20 dark:hover:text-white",
                        "border-b-2 px-1 pb-4 text-sm font-medium whitespace-nowrap focus:outline-none"
                      )}
                    >
                      {tab.name}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Panels */}
      <section
        id={`panel-${active}`}
        role="tabpanel"
        aria-labelledby={`tab-${active}`}
        className="px-4 pb-6 sm:px-6 lg:px-8"
      >
        {active === "details" && <DetailsPanel />}
        {active === "leases" && <LeasesPanel />}
        {active === "units" && <UnitsPanel />}
        {active === "issues" && <IssuesPanel />}
        {active === "settings" && <SettingsPanel />}
        {active === "files" && <FilesPanel />}
      </section>
    </div>
  );
}

/* ---------------- Panels ---------------- */

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
}: {
  id: string;
  options: { label: string; value: string }[];
  placeholder?: string;
}) {
  return (
    <div className="relative">
      <select
        id={id}
        name={id}
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

function DetailsPanel() {
  const propertyTypeOptions = [
    { label: "Industrial", value: "industrial" },
    { label: "Office", value: "office" },
    { label: "Retail", value: "retail" },
    { label: "Mixed Use", value: "mixed_use" },
    { label: "Warehouse", value: "warehouse" },
  ];

  const stateOptions = [
    { label: "Oregon (OR)", value: "OR" },
    { label: "Washington (WA)", value: "WA" },
    { label: "California (CA)", value: "CA" },
    { label: "Idaho (ID)", value: "ID" },
    { label: "Nevada (NV)", value: "NV" },
  ];

  return (
    <div className="mt-6">
      <dl className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
        {/* Line one */}
        <div className="border-t border-base-cloudy px-4 py-6 sm:px-0 dark:border-white/10">
          <dt className="text-sm/6 font-medium text-gray-900 dark:text-white">
            Property Name
          </dt>
          <dd className="mt-2 sm:mt-2">
            <FieldInput id="propertyName" placeholder="e.g., Harbor Heights" />
          </dd>
        </div>
        <div className="border-t border-base-cloudy px-4 py-6 sm:px-0 dark:border-white/10">
          <dt className="text-sm/6 font-medium text-gray-900 dark:text-white">
            Property Type
          </dt>
          <dd className="mt-2 sm:mt-2">
            <FieldSelect
              id="propertyType"
              options={propertyTypeOptions}
              placeholder="Select property type"
            />
          </dd>
        </div>

        {/* Line two */}
        <div className="border-t border-base-cloudy px-4 py-6 sm:px-0 dark:border-white/10">
          <dt className="text-sm/6 font-medium text-gray-900 dark:text-white">
            Code
          </dt>
          <dd className="mt-2 sm:mt-2">
            <FieldInput id="code" placeholder="e.g., HH-001" />
          </dd>
        </div>
        <div className="border-t border-base-cloudy px-4 py-6 sm:px-0 dark:border-white/10">
          <dt className="text-sm/6 font-medium text-gray-900 dark:text-white">
            Total SQFT
          </dt>
          <dd className="mt-2 sm:mt-2">
            <FieldInput
              id="totalSqft"
              type="number"
              placeholder="e.g., 125000"
            />
          </dd>
        </div>

        {/* Line three */}
        <div className="border-t border-base-cloudy px-4 py-6 sm:px-0 dark:border-white/10">
          <dt className="text-sm/6 font-medium text-gray-900 dark:text-white">
            Property Manager Name
          </dt>
          <dd className="mt-2 sm:mt-2">
            <FieldInput id="managerName" placeholder="e.g., Lindsay Walton" />
          </dd>
        </div>
        <div className="border-t border-base-cloudy px-4 py-6 sm:px-0 dark:border-white/10">
          <dt className="text-sm/6 font-medium text-gray-900 dark:text-white">
            Owner
          </dt>
          <dd className="mt-2 sm:mt-2">
            <FieldInput id="ownerName" placeholder="e.g., Harbor Capital LLC" />
          </dd>
        </div>

        {/* Line four */}
        <div className="border-t border-base-cloudy px-4 py-6 sm:px-0 dark:border-white/10">
          <dt className="text-sm/6 font-medium text-gray-900 dark:text-white">
            Property Address
          </dt>
          <dd className="mt-2 sm:mt-2">
            <FieldInput id="address" placeholder="e.g., 4033 NW Yeon Avenue" />
          </dd>
        </div>
        <div className="border-t border-base-cloudy px-4 py-6 sm:px-0 dark:border-white/10">
          <dt className="text-sm/6 font-medium text-gray-900 dark:text-white">
            City
          </dt>
          <dd className="mt-2 sm:mt-2">
            <FieldInput id="city" placeholder="e.g., Portland" />
          </dd>
        </div>

        {/* Line five */}
        <div className="border-t border-base-cloudy px-4 py-6 sm:px-0 dark:border-white/10">
          <dt className="text-sm/6 font-medium text-gray-900 dark:text-white">
            State
          </dt>
          <dd className="mt-2 sm:mt-2">
            <FieldSelect
              id="state"
              options={stateOptions}
              placeholder="Select state"
            />
          </dd>
        </div>
        <div className="border-t border-base-cloudy px-4 py-6 sm:px-0 dark:border-white/10">
          <dt className="text-sm/6 font-medium text-gray-900 dark:text-white">
            Zip Code
          </dt>
          <dd className="mt-2 sm:mt-2">
            <FieldInput id="zip" placeholder="e.g., 97210" />
          </dd>
        </div>

        {/* Attachments */}
        <div className="border-t border-base-cloudy px-4 py-6 sm:col-span-2 sm:px-0 dark:border-white/10">
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
                      resume_back_end_developer.pdf
                    </span>
                    <span className="shrink-0 text-gray-400 dark:text-gray-500">
                      2.4mb
                    </span>
                  </div>
                </div>
                <div className="ml-4 shrink-0">
                  <button
                    type="button"
                    title="Download"
                    aria-label="Download resume_back_end_developer.pdf"
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
                      coverletter_back_end_developer.pdf
                    </span>
                    <span className="shrink-0 text-gray-400 dark:text-gray-500">
                      4.5mb
                    </span>
                  </div>
                </div>
                <div className="ml-4 shrink-0">
                  <button
                    type="button"
                    title="Download"
                    aria-label="Download coverletter_back_end_developer.pdf"
                    className="rounded-full p-2 text-base-sea hover:bg-base-sea/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-base-sea dark:text-base-sea dark:hover:bg-white/10"
                  >
                    <ArrowDownTrayIcon aria-hidden="true" className="size-5" />
                  </button>
                </div>
              </li>
            </ul>
          </dd>
        </div>
      </dl>
    </div>
  );
}

function LeasesPanel() {
  return <div>Lease list / metrics…</div>;
}
function UnitsPanel() {
  return <div>Units table…</div>;
}
function IssuesPanel() {
  return <div>Open issues / activity…</div>;
}
function SettingsPanel() {
  return <div>Property settings…</div>;
}
function FilesPanel() {
  return <div>Documents & uploads…</div>;
}
