// src/app/properties/details/page.tsx
"use client";

import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { HomeIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

const pages = [
  { name: "Properties", href: "/properties", current: false },
  {
    name: "4033 NW Yeon Avenue",
    href: "/properties/4033-nw-yeon-avenue",
    current: false,
  },
  { name: "Details", href: "#", current: true },
];

const tabs = [
  { name: "Details", href: "#", current: false },
  { name: "Leases", href: "#", current: false },
  { name: "Units", href: "#", current: true },
  { name: "Issues", href: "#", current: false },
  { name: "Settings", href: "#", current: false },
  { name: "Files", href: "#", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function PropertiesDetailsPage() {
  return (
    <div className="border border-gray-200 bg-white rounded-md dark:border-white/10 dark:bg-gray-800/50">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex">
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
                  className={
                    "ml-4 text-sm font-medium " +
                    (page.current
                      ? "text-gray-900 dark:text-gray-100"
                      : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200")
                  }
                >
                  {page.name}
                </Link>
              </div>
            </li>
          ))}
        </ol>
      </nav>

      {/* Tabs */}
      <div className="border-t border-gray-200 px-4 sm:px-6 lg:px-8 dark:border-white/10">
        <div className="py-4">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
            4033 NW Yeon Avenue
          </h3>
          <div className="mt-3 sm:mt-4">
            <div className="grid grid-cols-1 sm:hidden">
              <select
                defaultValue={tabs.find((tab) => tab.current)?.name}
                aria-label="Select a tab"
                className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:*:bg-gray-800 dark:focus:outline-white"
              >
                {tabs.map((tab) => (
                  <option key={tab.name}>{tab.name}</option>
                ))}
              </select>
              <ChevronDownIcon
                aria-hidden="true"
                className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end fill-gray-500 dark:fill-gray-400"
              />
            </div>
            <div className="hidden sm:block">
              <nav className="-mb-px flex space-x-8">
                {tabs.map((tab) => (
                  <a
                    key={tab.name}
                    href={tab.href}
                    aria-current={tab.current ? "page" : undefined}
                    className={classNames(
                      tab.current
                        ? "border-black-500 text-black-600 dark:border-black-400 dark:text-black-400"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-white/20 dark:hover:text-white",
                      "border-b-2 px-1 pb-4 text-sm font-medium whitespace-nowrap"
                    )}
                  >
                    {tab.name}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
