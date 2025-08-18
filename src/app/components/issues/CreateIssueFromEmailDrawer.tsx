"use client";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useMemo, useState } from "react";

type Option = { id: string; name: string };

type CreateIssueValues = {
  title: string;
  description: string;
  organizationId: string;
  personId: string;
  propertyId: string;
  unitId: string;
  status: string;
  type: string;
  priority: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  /** Seed from the selected email (subject → title, body → description). */
  emailSubject?: string;
  emailBody?: string;

  // Dropdown data (pass real data from your app; safe defaults included)
  organizations?: Option[];
  people?: Option[];
  properties?: Option[];
  units?: Option[];
  statuses?: Option[];
  types?: Option[];
  priorities?: Option[];

  /** Called with fully collected form values */
  onCreate?: (values: CreateIssueValues) => void;
};

const defaultOptions = {
  organizations: [
    { id: "org_1", name: "Harbor Heights" },
    { id: "org_2", name: "Maple Row" },
  ],
  people: [
    { id: "p_1", name: "Lindsay Walton" },
    { id: "p_2", name: "Courtney Henry" },
  ],
  properties: [
    { id: "prop_1", name: "Harbor Heights – Building A" },
    { id: "prop_2", name: "Maple Row – Retail" },
  ],
  units: [
    { id: "u_101", name: "Suite 101" },
    { id: "u_202", name: "Suite 202" },
  ],
  statuses: [
    { id: "open", name: "Open" },
    { id: "in_progress", name: "In Progress" },
    { id: "blocked", name: "Blocked" },
    { id: "closed", name: "Closed" },
  ],
  types: [
    { id: "maintenance", name: "Maintenance" },
    { id: "compliance", name: "Compliance" },
    { id: "billing", name: "Billing" },
    { id: "other", name: "Other" },
  ],
  priorities: [
    { id: "p1", name: "P1 – Critical" },
    { id: "p2", name: "P2 – High" },
    { id: "p3", name: "P3 – Medium" },
    { id: "p4", name: "P4 – Low" },
  ],
};

export default function CreateIssueFromEmailDrawer({
  open,
  onClose,
  emailSubject,
  emailBody,
  organizations = defaultOptions.organizations,
  people = defaultOptions.people,
  properties = defaultOptions.properties,
  units = defaultOptions.units,
  statuses = defaultOptions.statuses,
  types = defaultOptions.types,
  priorities = defaultOptions.priorities,
  onCreate,
}: Props) {
  // Prefill from email
  const initial = useMemo<CreateIssueValues>(
    () => ({
      title: emailSubject ?? "",
      description: emailBody ?? "",
      organizationId: organizations[0]?.id ?? "",
      personId: people[0]?.id ?? "",
      propertyId: properties[0]?.id ?? "",
      unitId: units[0]?.id ?? "",
      status: statuses[0]?.id ?? "open",
      type: types[0]?.id ?? "maintenance",
      priority: priorities[2]?.id ?? "p3",
    }),
    [
      emailSubject,
      emailBody,
      organizations,
      people,
      properties,
      units,
      statuses,
      types,
      priorities,
    ]
  );

  const [values, setValues] = useState<CreateIssueValues>(initial);

  // Reset state when drawer opens with different email
  const resetFromEmail = () => setValues(initial);

  const handleChange =
    (key: keyof CreateIssueValues) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) =>
      setValues((v) => ({ ...v, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate?.(values);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        onClose();
      }}
      className="relative z-50"
    >
      <div className="fixed inset-0" />
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-2xl transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
            >
              <form
                onSubmit={handleSubmit}
                className="relative flex h-full flex-col overflow-y-auto bg-base-white shadow-xl dark:bg-gray-800 dark:after:absolute dark:after:inset-y-0 dark:after:left-0 dark:after:w-px dark:after:bg-white/10"
              >
                {/* Header */}
                <div className="bg-base-faint px-4 py-6 sm:px-6 dark:bg-gray-800/50">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <DialogTitle className="text-base font-semibold text-typography-midnight dark:text-white">
                        Create Issue from Email
                      </DialogTitle>
                      <p className="text-sm text-typography-foggy dark:text-gray-400">
                        We prefilled the form with the email’s subject and body.
                        Review and assign context below.
                      </p>
                    </div>
                    <div className="flex h-7 items-center gap-2">
                      <button
                        type="button"
                        onClick={resetFromEmail}
                        className="rounded-md px-2 py-1 text-sm text-base-sea hover:bg-base-faint"
                        title="Reset to email contents"
                      >
                        Reset
                      </button>
                      <button
                        type="button"
                        onClick={onClose}
                        className="relative rounded-md text-typography-rainy hover:text-typography-midnight focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-royal"
                        aria-label="Close panel"
                      >
                        <span className="absolute -inset-2.5" />
                        <XMarkIcon aria-hidden="true" className="size-6" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="flex-1 space-y-6 py-6 sm:space-y-0 sm:divide-y sm:divide-base-cloudy sm:py-0">
                  {/* Issue Title */}
                  <FieldRow label="Issue Title" htmlFor="issue-title">
                    <input
                      id="issue-title"
                      name="issue-title"
                      type="text"
                      required
                      value={values.title}
                      onChange={handleChange("title")}
                      className="block w-full rounded-md bg-base-white px-3 py-2 text-base text-typography-midnight outline-1 -outline-offset-1 outline-base-cloudy placeholder:text-typography-rainy focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-royal sm:text-sm/6"
                      placeholder="Short, descriptive title"
                    />
                  </FieldRow>

                  {/* Issue Description */}
                  <FieldRow
                    label="Issue Description"
                    htmlFor="issue-description"
                  >
                    <textarea
                      id="issue-description"
                      name="issue-description"
                      rows={5}
                      value={values.description}
                      onChange={handleChange("description")}
                      className="block w-full rounded-md bg-base-white px-3 py-2 text-base text-typography-midnight outline-1 -outline-offset-1 outline-base-cloudy placeholder:text-typography-rainy focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-royal sm:text-sm/6"
                      placeholder="Paste details from the email or add context…"
                    />
                  </FieldRow>

                  {/* Organization */}
                  <FieldRow label="Assign to Organization" htmlFor="org-select">
                    <Select
                      id="org-select"
                      value={values.organizationId}
                      onChange={handleChange("organizationId")}
                      options={organizations}
                    />
                  </FieldRow>

                  {/* Person */}
                  <FieldRow label="Assign to Person" htmlFor="person-select">
                    <Select
                      id="person-select"
                      value={values.personId}
                      onChange={handleChange("personId")}
                      options={people}
                    />
                  </FieldRow>

                  {/* Property */}
                  <FieldRow label="Property" htmlFor="property-select">
                    <Select
                      id="property-select"
                      value={values.propertyId}
                      onChange={handleChange("propertyId")}
                      options={properties}
                    />
                  </FieldRow>

                  {/* Unit */}
                  <FieldRow label="Unit" htmlFor="unit-select">
                    <Select
                      id="unit-select"
                      value={values.unitId}
                      onChange={handleChange("unitId")}
                      options={units}
                    />
                  </FieldRow>

                  {/* Status / Type / Priority */}
                  <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                    <Label text="Status" htmlFor="status-select" />
                    <div className="sm:col-span-2">
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        <Select
                          id="status-select"
                          value={values.status}
                          onChange={handleChange("status")}
                          options={statuses}
                        />
                        <Select
                          id="type-select"
                          value={values.type}
                          onChange={handleChange("type")}
                          options={types}
                          ariaLabel="Issue Type"
                        />
                        <Select
                          id="priority-select"
                          value={values.priority}
                          onChange={handleChange("priority")}
                          options={priorities}
                          ariaLabel="Issue Priority"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="shrink-0 border-t border-base-cloudy px-4 py-5 sm:px-6 dark:border-white/10">
                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="rounded-md bg-base-white px-3 py-2 text-sm font-medium text-typography-midnight shadow-xs outline outline-1 -outline-offset-1 outline-base-cloudy hover:bg-base-faint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-royal"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md bg-brand-royal px-3 py-2 text-sm font-semibold text-typography-white shadow-xs hover:bg-brand-royal-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-royal"
                    >
                      Create Issue
                    </button>
                  </div>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

/** ---------- Small presentational helpers ---------- */

function FieldRow({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
      <div>
        <Label text={label} htmlFor={htmlFor} />
      </div>
      <div className="sm:col-span-2">{children}</div>
    </div>
  );
}

function Label({ text, htmlFor }: { text: string; htmlFor: string }) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm/6 font-medium text-typography-midnight sm:mt-1.5 dark:text-white"
    >
      {text}
    </label>
  );
}

function Select({
  id,
  value,
  onChange,
  options,
  ariaLabel,
}: {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  ariaLabel?: string;
}) {
  return (
    <select
      id={id}
      aria-label={ariaLabel}
      value={value}
      onChange={onChange}
      className="block w-full rounded-md bg-base-white px-3 py-2 text-sm text-typography-midnight outline-1 -outline-offset-1 outline-base-cloudy placeholder:text-typography-rainy focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-royal"
    >
      {options.map((opt) => (
        <option key={opt.id} value={opt.id}>
          {opt.name}
        </option>
      ))}
    </select>
  );
}
