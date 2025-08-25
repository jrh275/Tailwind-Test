// src/app/components/issues/CreateIssueModal.tsx
"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

type Option = { label: string; value: string };

export type NewIssueInput = {
  title: string;
  description: string;
  parentIssueId?: string | null;
  organizationId?: string | null;
  assigneeId?: string | null;
  propertyId?: string | null;
  unitId?: string | null;
  leaseId?: string | null;
  status:
    | "To Do"
    | "In Progress"
    | "Completed"
    | "Cancelled"
    | "Duplicate"
    | "Draft"
    | "Archive";
  type: "Compliance" | "Inquiry" | "Lease" | "Maintenance" | "Other";
  priority: "Urgent" | "High" | "Medium" | "Low" | "No Priority";
};

export default function CreateIssueModal({
  open,
  onClose,
  onCreate,
  organizationOptions = [],
  assigneeOptions = [],
  propertyOptions = [],
  unitOptions = [],
  leaseOptions = [],
  parentIssueOptions = [],
}: {
  open: boolean;
  onClose: () => void;
  onCreate: (data: NewIssueInput) => void;
  organizationOptions?: Option[];
  assigneeOptions?: Option[];
  propertyOptions?: Option[];
  unitOptions?: Option[];
  leaseOptions?: Option[];
  parentIssueOptions?: Option[];
}) {
  const statusOptions: Option[] = [
    { label: "To Do", value: "To Do" },
    { label: "In Progress", value: "In Progress" },
    { label: "Completed", value: "Completed" },
    { label: "Cancelled", value: "Cancelled" },
    { label: "Duplicate", value: "Duplicate" },
    { label: "Draft", value: "Draft" },
    { label: "Archive", value: "Archive" },
  ];

  const typeOptions: Option[] = [
    { label: "Compliance", value: "Compliance" },
    { label: "Inquiry", value: "Inquiry" },
    { label: "Lease", value: "Lease" },
    { label: "Maintenance", value: "Maintenance" },
    { label: "Other", value: "Other" },
  ];

  const priorityOptions: Option[] = [
    { label: "Urgent", value: "Urgent" },
    { label: "High", value: "High" },
    { label: "Medium", value: "Medium" },
    { label: "Low", value: "Low" },
    { label: "No Priority", value: "No Priority" },
  ];

  const [form, setForm] = useState<NewIssueInput>({
    title: "",
    description: "",
    parentIssueId: null,
    organizationId: null,
    assigneeId: null,
    propertyId: null,
    unitId: null,
    leaseId: null,
    status: "To Do",
    type: "Maintenance",
    priority: "No Priority",
  });

  function update<K extends keyof NewIssueInput>(
    key: K,
    value: NewIssueInput[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onCreate(form);
  }

  const inputBase =
    "block w-full rounded-md bg-white py-2.5 pl-3 pr-10 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-brand-royal dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-400";
  const labelBase =
    "block text-sm font-medium text-typography-midnight dark:text-white";
  const selectBase = inputBase + " appearance-none";

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/30 transition-opacity data-[closed]:opacity-0" />
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-start justify-center p-4 sm:p-6">
          <DialogPanel
            transition
            className="relative w-full max-w-2xl transform rounded-2xl bg-white p-6 shadow-xl ring-1 ring-gray-200 transition data-[closed]:translate-y-2 data-[closed]:opacity-0 dark:bg-gray-900 dark:ring-white/10"
          >
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-typography-midnight dark:text-white">
                Create Issue
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-white"
              >
                <XMarkIcon className="size-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* 1. Title */}
              <div>
                <label htmlFor="title" className={labelBase}>
                  Title
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  required
                  placeholder="Brief, clear title"
                  className={inputBase}
                  value={form.title}
                  onChange={(e) => update("title", e.target.value)}
                />
              </div>

              {/* 2. Description */}
              <div>
                <label htmlFor="description" className={labelBase}>
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={5}
                  placeholder="Add steps, context, and any relevant details…"
                  className={inputBase + " resize-y"}
                  value={form.description}
                  onChange={(e) => update("description", e.target.value)}
                />
              </div>

              {/* 3–8 in a grid */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* 3. Make sub-issue of */}
                <div>
                  <label htmlFor="parentIssueId" className={labelBase}>
                    Make sub-issue of
                  </label>
                  <div className="relative">
                    <select
                      id="parentIssueId"
                      className={selectBase}
                      value={form.parentIssueId ?? ""}
                      onChange={(e) =>
                        update(
                          "parentIssueId",
                          e.target.value ? e.target.value : null
                        )
                      }
                    >
                      <option value="">— None —</option>
                      {parentIssueOptions.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                    <Caret />
                  </div>
                </div>

                {/* 4. For Organization */}
                <div>
                  <label htmlFor="organizationId" className={labelBase}>
                    For Organization
                  </label>
                  <div className="relative">
                    <select
                      id="organizationId"
                      className={selectBase}
                      value={form.organizationId ?? ""}
                      onChange={(e) =>
                        update(
                          "organizationId",
                          e.target.value ? e.target.value : null
                        )
                      }
                    >
                      <option value="">— Select organization —</option>
                      {organizationOptions.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                    <Caret />
                  </div>
                </div>

                {/* 5. Assigned to */}
                <div>
                  <label htmlFor="assigneeId" className={labelBase}>
                    Assigned to
                  </label>
                  <div className="relative">
                    <select
                      id="assigneeId"
                      className={selectBase}
                      value={form.assigneeId ?? ""}
                      onChange={(e) =>
                        update(
                          "assigneeId",
                          e.target.value ? e.target.value : null
                        )
                      }
                    >
                      <option value="">— Unassigned —</option>
                      {assigneeOptions.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                    <Caret />
                  </div>
                </div>

                {/* 6. Property */}
                <div>
                  <label htmlFor="propertyId" className={labelBase}>
                    Property
                  </label>
                  <div className="relative">
                    <select
                      id="propertyId"
                      className={selectBase}
                      value={form.propertyId ?? ""}
                      onChange={(e) =>
                        update("propertyId", e.target.value || null)
                      }
                    >
                      <option value="">— Select property —</option>
                      {propertyOptions.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                    <Caret />
                  </div>
                </div>

                {/* 7. Unit */}
                <div>
                  <label htmlFor="unitId" className={labelBase}>
                    Unit
                  </label>
                  <div className="relative">
                    <select
                      id="unitId"
                      className={selectBase}
                      value={form.unitId ?? ""}
                      onChange={(e) => update("unitId", e.target.value || null)}
                    >
                      <option value="">— Select unit —</option>
                      {unitOptions.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                    <Caret />
                  </div>
                </div>

                {/* 8. Lease */}
                <div>
                  <label htmlFor="leaseId" className={labelBase}>
                    Lease
                  </label>
                  <div className="relative">
                    <select
                      id="leaseId"
                      className={selectBase}
                      value={form.leaseId ?? ""}
                      onChange={(e) =>
                        update("leaseId", e.target.value || null)
                      }
                    >
                      <option value="">— Select lease —</option>
                      {leaseOptions.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                    <Caret />
                  </div>
                </div>
              </div>

              {/* 9–11 */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {/* 9. Status */}
                <div>
                  <label htmlFor="status" className={labelBase}>
                    Status
                  </label>
                  <div className="relative">
                    <select
                      id="status"
                      className={selectBase}
                      value={form.status}
                      onChange={(e) =>
                        update(
                          "status",
                          e.target.value as NewIssueInput["status"]
                        )
                      }
                    >
                      {statusOptions.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                    <Caret />
                  </div>
                </div>

                {/* 10. Type */}
                <div>
                  <label htmlFor="type" className={labelBase}>
                    Type
                  </label>
                  <div className="relative">
                    <select
                      id="type"
                      className={selectBase}
                      value={form.type}
                      onChange={(e) =>
                        update("type", e.target.value as NewIssueInput["type"])
                      }
                    >
                      {typeOptions.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                    <Caret />
                  </div>
                </div>

                {/* 11. Priority */}
                <div>
                  <label htmlFor="priority" className={labelBase}>
                    Priority
                  </label>
                  <div className="relative">
                    <select
                      id="priority"
                      className={selectBase}
                      value={form.priority}
                      onChange={(e) =>
                        update(
                          "priority",
                          e.target.value as NewIssueInput["priority"]
                        )
                      }
                    >
                      {priorityOptions.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                    <Caret />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-typography-midnight hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400 dark:text-white dark:border-white/15 dark:hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-md bg-royal/10 px-3 py-2 text-sm font-semibold text-royal shadow-xs hover:bg-royal/20 dark:bg-royal/20 dark:text-royal dark:shadow-none dark:hover:bg-royal/30"
                >
                  Create Issue
                </button>
              </div>
            </form>

            {/* subtle top divider animation (optional) */}
            <TransitionChild
              enter="ease-out duration-200"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-white/10" />
            </TransitionChild>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

/** Small caret icon positioned inward so it doesn't hug the right edge */
function Caret() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2"
    >
      <path
        d="M6 8l4 4 4-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
