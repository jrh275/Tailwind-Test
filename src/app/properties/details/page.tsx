// src/app/properties/details/page.tsx
"use client";

import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { ChevronRightIcon, HomeIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

// Import panels
import DetailsPanel from "../../components/properties/panels/DetailsPanel";
import FilesPanel from "../../components/properties/panels/FilesPanel";
import IssuesPanel from "../../components/properties/panels/IssuesPanel";
import LeasesPanel from "../../components/properties/panels/LeasesPanel";
import SettingsPanel from "../../components/properties/panels/SettingsPanel";
import UnitsPanel from "../../components/properties/panels/UnitsPanel";

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

// Property email (sample data)
const propertyEmail = "4033nwyeonavenue@mail.cardinal.wtf";

// Stats (example values)
const stats = [
  { name: "Total SF", value: "20,000" },
  { name: "Rentable SF", value: "18,500" },
  { name: "Current Rent", value: "$25,000" },
  { name: "Next Rent", value: "$27,000" },
  { name: "Occupancy Rate", value: "92%" },
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
    <div className="bg-base-white dark:bg-gray-800/50 mt-0 sm:mt-2">
      {/* Breadcrumb */}
      <div className="px-4 sm:px-6 lg:px-8 py-3">
        <nav aria-label="Breadcrumb">
          <ol role="list" className="flex items-center space-x-4">
            <li>
              <div>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-300"
                >
                  <HomeIcon aria-hidden="true" className="size-5 shrink-0" />
                  <span className="sr-only">Home</span>
                </Link>
              </div>
            </li>
            {pages.map((page) => (
              <li key={page.name}>
                <div className="flex items-center">
                  <ChevronRightIcon
                    aria-hidden="true"
                    className="size-5 shrink-0 text-gray-400 dark:text-gray-500"
                  />
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
      </div>

      {/* Tabs (with divider) */}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="pb-2">
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
                className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-brand-royal dark:bg-white/5 dark:text-white dark:outline-white/10"
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
                className="flex space-x-8 border-b border-gray-200 dark:border-white/10"
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
                          ? "border-b-2 border-brand-royal text-brand-royal"
                          : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white",
                        "px-1 pb-4 text-sm font-medium whitespace-nowrap focus:outline-none -mb-px"
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

        {/* Stats section */}
        <section aria-labelledby="property-stats-heading" className="pt-3 pb-4">
          <dl className="flex text-xs sm:text-sm divide-x divide-gray-200 dark:divide-white/10">
            {/* 1–5) Existing stats */}
            {stats.map((s) => (
              <div
                key={s.name}
                className="flex-1 px-6 first:pl-0 last:pr-0 flex flex-col"
              >
                <dt className="text-gray-500 dark:text-gray-400">{s.name}</dt>
                <dd className="font-semibold text-gray-900 dark:text-white">
                  {s.value}
                </dd>
              </div>
            ))}

            {/* 6) Property email */}
            <div className="flex-1 px-6 first:pl-0 last:pr-0 flex flex-col">
              <dt className="text-gray-500 dark:text-gray-400">
                Property email
              </dt>
              <dd className="font-semibold text-gray-900 dark:text-white">
                <span className="inline-flex items-center gap-2">
                  <span className="truncate">{propertyEmail}</span>
                  <button
                    type="button"
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(propertyEmail);
                      } catch {
                        // Clipboard API might be unavailable
                      }
                    }}
                    className="inline-flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    aria-label="Copy property email to clipboard"
                    title="Copy"
                  >
                    {/* Copy icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                      />
                    </svg>
                  </button>
                </span>
              </dd>
            </div>
          </dl>
        </section>
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
