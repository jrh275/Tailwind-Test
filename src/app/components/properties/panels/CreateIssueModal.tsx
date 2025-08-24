"use client";

import { Dialog, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Fragment, useMemo, useState } from "react";

type Option = { label: string; value: string };

type Issue = {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: "Urgent" | "High" | "Medium" | "Low";
  status: "Open" | "In Progress" | "Resolved" | "Closed";
  reportedBy: string;
  assignedTo?: string;
  reportedDate: string; // yyyy-mm-dd
  dueDate?: string; // yyyy-mm-dd
  estimatedCost?: number;
  unit?: string;
  completedDate?: string; // yyyy-mm-dd
};

type NewIssue = Omit<Issue, "id">;

export default function CreateIssueModal({
  open,
  onClose,
  onCreate,
  categoryOptions,
  priorityOptions,
  statusOptions,
}: {
  open: boolean;
  onClose: () => void;
  onCreate: (data: NewIssue) => void;
  categoryOptions: Option[];
  priorityOptions: Option[];
  statusOptions: Option[];
}) {
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const [form, setForm] = useState<NewIssue>({
    title: "",
    description: "",
    category: categoryOptions[0]?.value || "HVAC",
    priority: "Medium",
    status: "Open",
    reportedBy: "",
    assignedTo: "",
    reportedDate: today,
    dueDate: "",
    estimatedCost: undefined,
    unit: "",
    completedDate: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const inputClass =
    "block w-full rounded-md bg-white py-2 px-3 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-brand-royal dark:bg-white/5 dark:text-white dark:outline-white/10";
  // Add appearance-none to hide native arrow and pr-10 to make room for our inset chevron
  const selectClass = `${inputClass} appearance-none pr-10`;
  const textareaClass =
    "block w-full rounded-md bg-white py-2 px-3 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-brand-royal dark:bg-white/5 dark:text-white dark:outline-white/10 min-h-28";

  function update<K extends keyof NewIssue>(key: K, val: NewIssue[K]) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = "Title is required.";
    if (!form.description.trim()) e.description = "Description is required.";
    if (!form.reportedBy.trim()) e.reportedBy = "Reported by is required.";
    if (!form.category) e.category = "Category is required.";
    if (!form.priority) e.priority = "Priority is required.";
    if (!form.status) e.status = "Status is required.";
    if (
      form.estimatedCost !== undefined &&
      Number.isNaN(Number(form.estimatedCost))
    ) {
      e.estimatedCost = "Estimated cost must be a number.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    const clean: NewIssue = {
      ...form,
      assignedTo: form.assignedTo?.trim() ? form.assignedTo.trim() : undefined,
      unit: form.unit?.trim() ? form.unit.trim() : undefined,
      dueDate: form.dueDate || undefined,
      completedDate: form.completedDate || undefined,
      estimatedCost:
        form.estimatedCost === undefined ||
        form.estimatedCost === null ||
        (form.estimatedCost as any) === ""
          ? undefined
          : Number(form.estimatedCost),
    };
    onCreate(clean);
  }

  return (
    <Transition show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-150"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        {/* Panel */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-end sm:items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-150"
              enterFrom="opacity-0 translate-y-2 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-100"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-2 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all border border-gray-200 dark:border-gray-700">
                <Dialog.Title className="text-lg font-semibold text-sea">
                  Create Issue
                </Dialog.Title>

                <form className="mt-4 space-y-6" onSubmit={handleSubmit}>
                  {/* Title + Priority + Status */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Title{" "}
                        {errors.title && (
                          <span className="text-cardinal ml-1">
                            • {errors.title}
                          </span>
                        )}
                      </label>
                      <input
                        className={inputClass}
                        value={form.title}
                        onChange={(e) => update("title", e.target.value)}
                        placeholder="Short summary"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Priority{" "}
                        {errors.priority && (
                          <span className="text-cardinal ml-1">
                            • {errors.priority}
                          </span>
                        )}
                      </label>
                      <div className="relative">
                        <select
                          className={selectClass}
                          value={form.priority}
                          onChange={(e) =>
                            update(
                              "priority",
                              e.target.value as NewIssue["priority"]
                            )
                          }
                        >
                          {priorityOptions.map((o) => (
                            <option key={o.value} value={o.value}>
                              {o.label}
                            </option>
                          ))}
                        </select>
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 size-4 text-gray-500 dark:text-gray-300"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Status{" "}
                        {errors.status && (
                          <span className="text-cardinal ml-1">
                            • {errors.status}
                          </span>
                        )}
                      </label>
                      <div className="relative">
                        <select
                          className={selectClass}
                          value={form.status}
                          onChange={(e) =>
                            update(
                              "status",
                              e.target.value as NewIssue["status"]
                            )
                          }
                        >
                          {statusOptions.map((o) => (
                            <option key={o.value} value={o.value}>
                              {o.label}
                            </option>
                          ))}
                        </select>
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 size-4 text-gray-500 dark:text-gray-300"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                      Description{" "}
                      {errors.description && (
                        <span className="text-cardinal ml-1">
                          • {errors.description}
                        </span>
                      )}
                    </label>
                    <textarea
                      className={textareaClass}
                      value={form.description}
                      onChange={(e) => update("description", e.target.value)}
                      placeholder="What happened? Where, when, how severe?"
                    />
                  </div>

                  {/* Category + Unit + Estimated Cost */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Category{" "}
                        {errors.category && (
                          <span className="text-cardinal ml-1">
                            • {errors.category}
                          </span>
                        )}
                      </label>
                      <div className="relative">
                        <select
                          className={selectClass}
                          value={form.category}
                          onChange={(e) => update("category", e.target.value)}
                        >
                          {categoryOptions.map((o) => (
                            <option key={o.value} value={o.value}>
                              {o.label}
                            </option>
                          ))}
                        </select>
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 size-4 text-gray-500 dark:text-gray-300"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Unit (optional)
                      </label>
                      <input
                        className={inputClass}
                        value={form.unit || ""}
                        onChange={(e) => update("unit", e.target.value)}
                        placeholder="e.g., 101"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Estimated Cost (optional){" "}
                        {errors.estimatedCost && (
                          <span className="text-cardinal ml-1">
                            • {errors.estimatedCost}
                          </span>
                        )}
                      </label>
                      <input
                        className={inputClass}
                        inputMode="decimal"
                        placeholder="e.g., 350"
                        value={form.estimatedCost ?? ""}
                        onChange={(e) =>
                          update(
                            "estimatedCost",
                            e.target.value === ""
                              ? ("" as any)
                              : Number(e.target.value)
                          )
                        }
                      />
                    </div>
                  </div>

                  {/* People */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Reported By{" "}
                        {errors.reportedBy && (
                          <span className="text-cardinal ml-1">
                            • {errors.reportedBy}
                          </span>
                        )}
                      </label>
                      <input
                        className={inputClass}
                        value={form.reportedBy}
                        onChange={(e) => update("reportedBy", e.target.value)}
                        placeholder="Name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Assigned To (optional)
                      </label>
                      <input
                        className={inputClass}
                        value={form.assignedTo || ""}
                        onChange={(e) => update("assignedTo", e.target.value)}
                        placeholder="Person or vendor"
                      />
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Reported Date
                      </label>
                      <input
                        type="date"
                        className={inputClass}
                        value={form.reportedDate}
                        onChange={(e) => update("reportedDate", e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Due Date (optional)
                      </label>
                      <input
                        type="date"
                        className={inputClass}
                        value={form.dueDate || ""}
                        onChange={(e) => update("dueDate", e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Completed Date (optional)
                      </label>
                      <input
                        type="date"
                        className={inputClass}
                        value={form.completedDate || ""}
                        onChange={(e) =>
                          update("completedDate", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={onClose}
                      className="rounded-md border border-sea/30 px-3 py-2 text-sm font-medium text-sea hover:bg-sea/5"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center rounded-md bg-royal px-4 py-2 text-sm font-semibold text-white shadow-xs hover:bg-royal/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal"
                    >
                      Create Issue
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
