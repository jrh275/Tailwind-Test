// src/app/AppLayoutWrapper.tsx
"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
} from "@headlessui/react";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import {
  Bars3Icon,
  BellIcon,
  BriefcaseIcon,
  BuildingOfficeIcon,
  ChartBarIcon,
  ChartPieIcon,
  ClipboardIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  InboxIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";

const navigation = [
  { name: "Overview", href: "/overview", icon: ChartBarIcon },
  { name: "My Workspace", href: "/workspace", icon: BriefcaseIcon },
  { name: "Inbox", href: "/inbox", icon: InboxIcon },
  { name: "Issues", href: "/issues", icon: ClipboardIcon },
  { name: "Properties", href: "/properties", icon: BuildingOfficeIcon },
  { name: "Leases", href: "/leases", icon: DocumentDuplicateIcon },
  { name: "Reports", href: "/reports", icon: ChartPieIcon },
  { name: "Contacts", href: "/contacts", icon: UsersIcon },
];

const userNavigation = [
  { name: "Your profile", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function AppLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Dark at the top → lighter at the bottom (midnight weighted in the top ~65%)
  const sidebarWaveStyle: React.CSSProperties = {
    backgroundImage:
      "linear-gradient(to bottom, var(--color-midnight) 0%, var(--color-midnight) 65%, var(--color-cloudy) 100%), url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cpath d='M0 48 Q 16 32 32 48 T 64 48 M0 32 Q 16 16 32 32 T 64 32 M0 16 Q 16 0 32 16 T 64 16' fill='none' stroke='%23FFFFFF' stroke-opacity='0.07' stroke-width='2'/%3E%3C/svg%3E\")",
    backgroundRepeat: "no-repeat, repeat",
    backgroundSize: "auto, 64px 64px",
    backgroundPosition: "0 0, 0 0",
  };

  return (
    <div className="min-h-dvh bg-base-white text-typography-midnight">
      {/* Mobile sidebar */}
      <Dialog
        open={sidebarOpen}
        onClose={setSidebarOpen}
        className="relative z-50 lg:hidden"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-base-midnight/80 transition-opacity duration-300 ease-linear data-closed:opacity-0"
        />
        <div className="fixed inset-0 flex">
          <DialogPanel
            transition
            className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-closed:-translate-x-full"
          >
            <TransitionChild>
              <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-closed:opacity-0">
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="-m-2.5 p-2.5"
                >
                  <span className="sr-only">Close sidebar</span>
                  <XMarkIcon aria-hidden="true" className="size-6 text-white" />
                </button>
              </div>
            </TransitionChild>

            {/* Sidebar (mobile) - gradient + wave */}
            <div
              className="relative flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4 text-white"
              style={sidebarWaveStyle}
            >
              {/* Sidebar header (mobile) */}
              <div className="relative flex h-16 shrink-0 items-center gap-3">
                <img
                  alt="Cardinal"
                  src="/cardinal-logo.png"
                  className="h-8 w-auto opacity-95" // was h-6 → larger
                  loading="eager"
                  decoding="async"
                />
                <span className="text-white font-regular tracking-wider uppercase">
                  CARDINAL
                </span>
              </div>

              <nav className="relative flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" className="-mx-2 space-y-1">
                      {navigation.map((item) => (
                        <li key={item.name}>
                          <a
                            href={item.href}
                            className="group flex gap-x-3 rounded-md p-2 text-14-20 font-medium text-white hover:bg-white/10"
                          >
                            <item.icon
                              aria-hidden="true"
                              className="size-6 shrink-0 text-white"
                            />
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>

                  <li className="mt-auto">
                    <a
                      href="#"
                      className="group -mx-2 flex gap-x-3 rounded-md p-2 text-14-20 font-medium text-white hover:bg-white/10"
                    >
                      <Cog6ToothIcon
                        aria-hidden="true"
                        className="size-6 shrink-0 text-white"
                      />
                      Settings
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Desktop sidebar */}
      <div
        className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col text-white"
        style={sidebarWaveStyle}
      >
        {/* Keep inner container transparent so the background shows through */}
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-base-cloudy px-6 pb-4">
          {/* Sidebar header (desktop) */}
          <div className="relative flex h-16 shrink-0 items-center gap-3">
            <img
              alt="Cardinal"
              src="/cardinal-logo.png"
              className="h-8 w-auto opacity-95" // was h-6 → larger
              loading="eager"
              decoding="async"
            />
            <span className="text-white font-regular tracking-wider uppercase">
              CARDINAL
            </span>
          </div>

          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="group flex gap-x-3 rounded-md p-2 text-14-20 font-medium text-white hover:bg-white/10"
                      >
                        <item.icon
                          aria-hidden="true"
                          className="size-6 shrink-0 text-white"
                        />
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>

              <li className="mt-auto">
                <a
                  href="#"
                  className="group -mx-2 flex gap-x-3 rounded-md p-2 text-14-20 font-medium text-white hover:bg-white/10"
                >
                  <Cog6ToothIcon
                    aria-hidden="true"
                    className="size-6 shrink-0 text-white"
                  />
                  Settings
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Top bar */}
      <div className="lg:pl-72">
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-base-cloudy bg-white px-4 shadow-xs sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="-m-2.5 p-2.5 text-base-sea hover:text-typography-midnight lg:hidden"
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>

          <div
            aria-hidden="true"
            className="h-6 w-px bg-base-cloudy lg:hidden"
          />

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <form action="#" method="GET" className="grid flex-1 grid-cols-1">
              <input
                name="search"
                placeholder="Search"
                aria-label="Search"
                className="col-start-1 row-start-1 block size-full bg-white pl-8 text-base text-typography-midnight outline-hidden placeholder:text-base-foggy sm:text-14-20"
              />
              <MagnifyingGlassIcon
                aria-hidden="true"
                className="pointer-events-none col-start-1 row-start-1 size-5 self-center text-base-foggy"
              />
            </form>

            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <button
                type="button"
                className="-m-2.5 p-2.5 text-base-foggy hover:text-typography-midnight"
              >
                <span className="sr-only">View notifications</span>
                <BellIcon aria-hidden="true" className="size-6" />
              </button>

              <div
                aria-hidden="true"
                className="hidden lg:block lg:h-6 lg:w-px lg:bg-base-cloudy"
              />

              <Menu as="div" className="relative">
                <MenuButton className="relative flex items-center">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    className="size-8 rounded-full bg-base-faint outline -outline-offset-1 outline-base-cloudy"
                  />
                  <span className="hidden lg:flex lg:items-center">
                    <span
                      aria-hidden="true"
                      className="ml-4 text-14-20 font-semibold text-typography-midnight"
                    >
                      Tom Cook
                    </span>
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="ml-2 size-5 text-base-foggy"
                    />
                  </span>
                </MenuButton>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2.5 w-36 origin-top-right rounded-md bg-base-white py-2 shadow-lg border border-foggy transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  {userNavigation.map((item) => (
                    <MenuItem key={item.name}>
                      <a
                        href={item.href}
                        className="block px-3 py-1 text-14-20 text-typography-midnight data-focus:bg-base-faint data-focus:outline-hidden"
                      >
                        {item.name}
                      </a>
                    </MenuItem>
                  ))}
                </MenuItems>
              </Menu>
            </div>
          </div>
        </div>

        <main className="pt-22 py-6">
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
