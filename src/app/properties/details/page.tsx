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
    <div className="bg-base-white dark:bg-gray-800/50 -mt-12">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="px-4 sm:px-6 lg:px-8 py-4">
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

      {/* Tabs */}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="pb-4">
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
                className="flex space-x-8"
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
                        "px-1 pb-4 text-sm font-medium whitespace-nowrap focus:outline-none"
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
