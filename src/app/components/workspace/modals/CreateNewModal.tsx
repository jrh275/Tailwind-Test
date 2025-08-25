// src/app/components/workspace/modals/CreateNewModal.tsx
"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";
import {
  BuildingOfficeIcon,
  ChartPieIcon,
  ClipboardIcon,
  DocumentDuplicateIcon,
  EnvelopeIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import React from "react";

export type CreateNewKind = "property" | "lease" | "issue" | "report" | "email";

interface CreateNewModalProps {
  open: boolean;
  onClose: () => void;
  onSelect?: (kind: CreateNewKind) => void;
}

export default function CreateNewModal({
  open,
  onClose,
  onSelect,
}: CreateNewModalProps) {
  const actions: Array<{
    key: CreateNewKind;
    name: string;
    desc: string;
    icon: React.ElementType;
    color: string;
  }> = [
    {
      key: "property",
      name: "New Property",
      desc: "Add a property to your portfolio",
      icon: BuildingOfficeIcon,
      color: "bg-blue-50 text-blue-600",
    },
    {
      key: "lease",
      name: "New Lease",
      desc: "Create and track a lease",
      icon: DocumentDuplicateIcon,
      color: "bg-green-50 text-green-600",
    },
    {
      key: "issue",
      name: "New Issue",
      desc: "Log a maintenance or task",
      icon: ClipboardIcon,
      color: "bg-amber-50 text-amber-600",
    },
    {
      key: "report",
      name: "New Report",
      desc: "Generate insights & KPIs",
      icon: ChartPieIcon,
      color: "bg-gray-50 text-gray-600",
    },
    {
      key: "email",
      name: "Compose Email",
      desc: "Send a message",
      icon: EnvelopeIcon,
      color: "bg-cyan-50 text-cyan-600",
    },
  ];

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-900/50 transition-opacity duration-200 ease-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 overflow-y-auto p-4 sm:p-6 md:p-8">
        <div className="mx-auto max-w-lg">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-xl transition-all data-[closed]:scale-95 data-[closed]:opacity-0"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Create new…
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Choose what you'd like to create.
                </p>
              </div>
              <button
                onClick={onClose}
                className="-m-2 rounded-full p-2 text-gray-400 hover:text-gray-600"
                aria-label="Close"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {actions.map((a) => (
                <button
                  key={a.key}
                  onClick={() => onSelect?.(a.key)}
                  className="group flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 text-left shadow-sm hover:shadow-md transition-shadow"
                >
                  <span
                    className={`inline-flex items-center justify-center rounded-lg p-2 ${a.color}`}
                  >
                    <a.icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-gray-900 group-hover:text-sea">
                      {a.name}
                    </span>
                    <span className="mt-0.5 block text-xs text-gray-500">
                      {a.desc}
                    </span>
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={onClose}
                className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>

            <TransitionChild>
              <div className="absolute inset-x-0 -bottom-24 mx-auto h-24 w-[80%] rounded-full bg-gray-100 blur-2xl" />
            </TransitionChild>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
