// src/app/components/properties/panels/AddUnitModal.tsx
"use client";

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import React, { useMemo, useState } from "react";

export type NewUnitInput = {
  unitName: string;
  totalSqFt?: number | "";
  address1?: string;
  address2?: string;
};

export default function AddUnitModal({
  open,
  onClose,
  onCreate,
  initialValues,
  title = "Add Unit",
}: {
  open: boolean;
  onClose: () => void;
  onCreate: (data: {
    unitName: string;
    totalSqFt?: number;
    address1?: string;
    address2?: string;
  }) => void;
  initialValues?: Partial<NewUnitInput>;
  title?: string;
}) {
  const [form, setForm] = useState<NewUnitInput>({
    unitName: initialValues?.unitName ?? "",
    totalSqFt: initialValues?.totalSqFt ?? "",
    address1: initialValues?.address1 ?? "",
    address2: initialValues?.address2 ?? "",
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const errors = useMemo(() => {
    const e: Record<string, string> = {};
    if (!form.unitName.trim()) e.unitName = "Unit name is required.";
    if (
      form.totalSqFt !== "" &&
      (Number.isNaN(Number(form.totalSqFt)) || Number(form.totalSqFt) < 0)
    ) {
      e.totalSqFt = "Enter a valid non-negative number.";
    }
    return e;
  }, [form]);

  const isValid = Object.keys(errors).length === 0;

  function setField<K extends keyof NewUnitInput>(
    key: K,
    value: NewUnitInput[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({
      unitName: true,
      totalSqFt: true,
      address1: true,
      address2: true,
    });
    if (!isValid) return;
    onCreate({
      unitName: form.unitName.trim(),
      totalSqFt: form.totalSqFt === "" ? undefined : Number(form.totalSqFt),
      address1: form.address1?.trim() || undefined,
      address2: form.address2?.trim() || undefined,
    });
    onClose();
  }

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-900/30 backdrop-blur-sm data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-start justify-center p-4 sm:p-6">
          <DialogPanel
            transition
            className="relative w-full max-w-2xl transform rounded-2xl bg-white p-0 text-left align-middle shadow-xl ring-1 ring-black/5 transition-all data-[closed]:translate-y-2 data-[closed]:opacity-0 dark:bg-gray-900 dark:ring-white/10"
          >
            {/* Header */}
            <div className="flex items-start justify-between border-b border-gray-100 px-5 py-4 dark:border-white/10">
              <div>
                <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                  {title}
                </h2>
                <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                  Create a new unit and optionally include size and address
                  details.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-royal dark:text-gray-300 dark:hover:bg-white/5"
                aria-label="Close"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            <form onSubmit={handleSubmit} className="px-5 py-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Unit Name (required) */}
                <div className="sm:col-span-1">
                  <label
                    htmlFor="unitName"
                    className="block text-sm font-medium text-gray-900 dark:text-gray-100"
                  >
                    Unit Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="unitName"
                    name="unitName"
                    type="text"
                    required
                    value={form.unitName}
                    onChange={(e) => setField("unitName", e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, unitName: true }))}
                    className="mt-1 block w-full rounded-md bg-white py-2 px-3 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-brand-royal dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-400"
                    placeholder="e.g., Suite 101"
                  />
                  {touched.unitName && errors.unitName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.unitName}
                    </p>
                  )}
                </div>

                {/* Total Square Feet */}
                <div className="sm:col-span-1">
                  <label
                    htmlFor="totalSqFt"
                    className="block text-sm font-medium text-gray-900 dark:text-gray-100"
                  >
                    Total Square Feet
                  </label>
                  <input
                    id="totalSqFt"
                    name="totalSqFt"
                    type="number"
                    inputMode="numeric"
                    min={0}
                    value={form.totalSqFt}
                    onChange={(e) =>
                      setField(
                        "totalSqFt",
                        e.target.value === "" ? "" : Number(e.target.value)
                      )
                    }
                    onBlur={() =>
                      setTouched((t) => ({ ...t, totalSqFt: true }))
                    }
                    className="mt-1 block w-full rounded-md bg-white py-2 px-3 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-brand-royal dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-400"
                    placeholder="e.g., 1250"
                  />
                  {touched.totalSqFt && errors.totalSqFt && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.totalSqFt}
                    </p>
                  )}
                </div>

                {/* Address Line One */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="address1"
                    className="block text-sm font-medium text-gray-900 dark:text-gray-100"
                  >
                    Address Line One
                  </label>
                  <input
                    id="address1"
                    name="address1"
                    type="text"
                    value={form.address1}
                    onChange={(e) => setField("address1", e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, address1: true }))}
                    className="mt-1 block w-full rounded-md bg-white py-2 px-3 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-brand-royal dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-400"
                    placeholder="Street address, P.O. box, company name, c/o"
                  />
                </div>

                {/* Address Line Two */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="address2"
                    className="block text-sm font-medium text-gray-900 dark:text-gray-100"
                  >
                    Address Line Two
                  </label>
                  <input
                    id="address2"
                    name="address2"
                    type="text"
                    value={form.address2}
                    onChange={(e) => setField("address2", e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, address2: true }))}
                    className="mt-1 block w-full rounded-md bg-white py-2 px-3 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-brand-royal dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-400"
                    placeholder="Apartment, suite, unit, building, floor, etc."
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 flex items-center justify-end gap-3 border-t border-gray-100 pt-4 dark:border-white/10">
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-royal dark:border-white/10 dark:bg-white/5 dark:text-gray-100 dark:hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!isValid}
                  className="inline-flex items-center rounded-md bg-brand-royal px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-royal/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-royal disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create Unit
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
