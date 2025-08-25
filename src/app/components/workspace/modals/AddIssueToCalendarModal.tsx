// src/app/components/workspace/modals/AddIssueToCalendarModal.tsx
"use client";

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

export interface Issue {
  id: string;
  title: string;
  priority: "Urgent" | "High" | "Medium" | "Low";
  status: "Open" | "In Progress" | "Resolved" | "Closed";
  property: string;
  unit?: string;
  reportedDate: string;
}

interface AddIssueToCalendarModalProps {
  open: boolean;
  onClose: () => void;
  issue: Issue | null;
}

export default function AddIssueToCalendarModal({
  open,
  onClose,
  issue,
}: AddIssueToCalendarModalProps) {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("09:00");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (issue && selectedDate && selectedTime) {
      // Here you would add the logic to add to calendar
      console.log("Adding to calendar:", {
        issue: issue.title,
        date: selectedDate,
        time: selectedTime,
        notes,
      });
      onClose();
    }
  };

  if (!issue) return null;

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-900/50 transition-opacity duration-200 ease-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 overflow-y-auto p-4 sm:p-6 md:p-8">
        <div className="mx-auto max-w-md">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-xl transition-all data-[closed]:scale-95 data-[closed]:opacity-0"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Add Issue to Calendar
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Schedule time to address this issue
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

            <form onSubmit={handleSubmit} className="mt-5">
              <div className="space-y-4">
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                  <h3 className="font-medium text-gray-900">{issue.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {issue.property} • Priority: {issue.priority} • Status:{" "}
                    {issue.status}
                    {issue.unit && ` • Unit ${issue.unit}`}
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-sea focus:outline-none focus:ring-1 focus:ring-sea"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="time"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Time
                  </label>
                  <input
                    type="time"
                    id="time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-sea focus:outline-none focus:ring-1 focus:ring-sea"
                  />
                </div>

                <div>
                  <label
                    htmlFor="notes"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Notes (optional)
                  </label>
                  <textarea
                    id="notes"
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-sea focus:outline-none focus:ring-1 focus:ring-sea"
                    placeholder="Additional details or instructions..."
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-royal/10 px-3 py-2 text-sm font-semibold text-royal shadow-xs hover:bg-royal/20 dark:bg-royal/20 dark:text-royal dark:shadow-none dark:hover:bg-royal/30"
                >
                  Add to Calendar
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
