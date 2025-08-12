// src/components/DashboardLayout.tsx
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
  BuildingOfficeIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import {
  Bars3Icon,
  BellIcon,
  ChartBarIcon,
  ChevronRightIcon,
  ClipboardIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

// Updated navigation structure with expandable sections
const navigation = [
  { name: "Overview", href: "/", icon: ChartBarIcon },
  {
    name: "Inbox",
    href: "/inbox",
    icon: UsersIcon,
    children: [
      { name: "All", href: "/inbox" },
      { name: "Assigned to me", href: "/inbox/assigned" },
      { name: "Archive", href: "/inbox/archive" },
    ],
  },
  {
    name: "Issues",
    href: "/issues",
    icon: ClipboardIcon,
    children: [
      { name: "All Issues", href: "/issues" },
      { name: "Assigned to Me", href: "/issues/assigned" },
      { name: "Drafts", href: "/issues/drafts" },
      { name: "Archive", href: "/issues/archive" },
    ],
  },
  { name: "Properties", href: "/properties", icon: BuildingOfficeIcon },
  { name: "Leases", href: "/leases", icon: DocumentDuplicateIcon },
];

const teams = [
  { id: 1, name: "Heroicons", href: "#", initial: "H", current: false },
  { id: 2, name: "Tailwind Labs", href: "#", initial: "T", current: false },
  { id: 3, name: "Workcation", href: "#", initial: "W", current: false },
];

const userNavigation = [
  { name: "Your profile", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

// Navigation Item Component
function NavigationItem({
  item,
  expanded,
  setExpanded,
  currentPath,
}: {
  item: any;
  expanded: Record<string, boolean>;
  setExpanded: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  currentPath: string;
}) {
  const hasChildren = item.children && item.children.length > 0;
  const isExpanded = expanded[item.name] || false;
  const isCurrent = currentPath === item.href;

  // Check if any child is current
  const hasCurrentChild =
    hasChildren &&
    item.children.some((child: any) => currentPath === child.href);

  const toggleExpanded = () => {
    if (hasChildren) {
      setExpanded((prev) => ({
        ...prev,
        [item.name]: !prev[item.name],
      }));
    }
  };

  return (
    <li>
      <div>
        <a
          href={item.href}
          onClick={
            hasChildren
              ? (e) => {
                  e.preventDefault();
                  toggleExpanded();
                }
              : undefined
          }
          className={classNames(
            isCurrent || hasCurrentChild
              ? "bg-base-sea text-typography-white"
              : "text-typography-white hover:bg-base-sea hover:text-typography-white",
            "group flex gap-x-3 rounded-md p-2 text-14-20 font-medium",
            hasChildren ? "cursor-pointer" : ""
          )}
        >
          <item.icon
            aria-hidden="true"
            className="size-6 shrink-0 text-typography-white group-hover:text-typography-white"
          />
          {item.name}
          {hasChildren && (
            <div className="ml-auto">
              {isExpanded ? (
                <ChevronDownIcon className="size-5 text-typography-white" />
              ) : (
                <ChevronRightIcon className="size-5 text-typography-white" />
              )}
            </div>
          )}
        </a>
      </div>

      {hasChildren && isExpanded && (
        <ul className="mt-1 space-y-1">
          {item.children.map((child: any) => {
            const isChildCurrent = currentPath === child.href;
            return (
              <li key={child.name}>
                <a
                  href={child.href}
                  className={classNames(
                    isChildCurrent
                      ? "bg-base-sea text-typography-white"
                      : "text-typography-white hover:bg-base-sea hover:text-typography-white",
                    "group flex gap-x-3 rounded-md py-2 pl-9 pr-2 text-14-20"
                  )}
                >
                  {child.name}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  currentPath?: string;
}

export default function DashboardLayout({
  children,
  currentPath = "/",
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  return (
    <div className="min-h-dvh bg-base-faint text-typography-midnight">
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
                  <XMarkIcon
                    aria-hidden="true"
                    className="size-6 text-typography-white"
                  />
                </button>
              </div>
            </TransitionChild>

            {/* Sidebar (mobile) — midnight + white */}
            <div className="relative flex grow flex-col gap-y-5 overflow-y-auto bg-base-midnight px-6 pb-4">
              <div className="relative flex h-16 shrink-0 items-center">
                {/* Replace with your logo */}
                <div className="h-8 w-8 rounded-md bg-brand-royal" />
              </div>

              <nav className="relative flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" className="-mx-2 space-y-1">
                      {navigation.map((item) => (
                        <NavigationItem
                          key={item.name}
                          item={item}
                          expanded={expanded}
                          setExpanded={setExpanded}
                          currentPath={currentPath}
                        />
                      ))}
                    </ul>
                  </li>

                  <li>
                    <div className="text-12-16 font-medium text-typography-white">
                      Your teams
                    </div>
                    <ul role="list" className="-mx-2 mt-2 space-y-1">
                      {teams.map((team) => (
                        <li key={team.name}>
                          <a
                            href={team.href}
                            className="group flex gap-x-3 rounded-md p-2 text-14-20 font-medium text-typography-white hover:bg-base-sea"
                          >
                            <span className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-typography-white bg-base-midnight text-[0.625rem] font-medium text-typography-white">
                              {team.initial}
                            </span>
                            <span className="truncate">{team.name}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>

                  <li className="mt-auto">
                    <a
                      href="#"
                      className="group -mx-2 flex gap-x-3 rounded-md p-2 text-14-20 font-medium text-typography-white hover:bg-base-sea"
                    >
                      <Cog6ToothIcon
                        aria-hidden="true"
                        className="size-6 shrink-0 text-typography-white group-hover:text-typography-white"
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

      {/* Desktop sidebar — midnight + white */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-base-cloudy bg-base-midnight px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center">
            {/* Replace with your logo */}
            <div className="h-8 w-8 rounded-md bg-brand-royal" />
          </div>

          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <NavigationItem
                      key={item.name}
                      item={item}
                      expanded={expanded}
                      setExpanded={setExpanded}
                      currentPath={currentPath}
                    />
                  ))}
                </ul>
              </li>

              <li>
                <div className="text-12-16 font-medium text-typography-white">
                  Your teams
                </div>
                <ul role="list" className="-mx-2 mt-2 space-y-1">
                  {teams.map((team) => (
                    <li key={team.name}>
                      <a
                        href={team.href}
                        className="group flex gap-x-3 rounded-md p-2 text-14-20 font-medium text-typography-white hover:bg-base-sea"
                      >
                        <span className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-typography-white bg-base-midnight text-[0.625rem] font-medium text-typography-white">
                          {team.initial}
                        </span>
                        <span className="truncate">{team.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </li>

              <li className="mt-auto">
                <a
                  href="#"
                  className="group -mx-2 flex gap-x-3 rounded-md p-2 text-14-20 font-medium text-typography-white hover:bg-base-sea"
                >
                  <Cog6ToothIcon
                    aria-hidden="true"
                    className="size-6 shrink-0 text-typography-white group-hover:text-typography-white"
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
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-base-cloudy bg-base-white px-4 shadow-xs sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="-m-2.5 p-2.5 text-base-sea hover:text-typography-midnight lg:hidden"
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>

          {/* Separator */}
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
                className="col-start-1 row-start-1 block size-full bg-base-white pl-8 text-base text-typography-midnight outline-hidden placeholder:text-base-foggy sm:text-14-20"
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

              {/* Separator */}
              <div
                aria-hidden="true"
                className="hidden lg:block lg:h-6 lg:w-px lg:bg-base-cloudy"
              />

              {/* Profile dropdown */}
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
                  className="absolute right-0 z-10 mt-2.5 w-36 origin-top-right rounded-md bg-base-white py-2 shadow-lg outline-1 outline-base-midnight/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
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

        {/* Main content */}
        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
