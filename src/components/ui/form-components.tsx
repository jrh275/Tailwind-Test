// src/components/ui/form-components.tsx
import { CalendarDaysIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import React from "react";

// FormField Component
interface FormFieldProps {
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}

export function FormField({ label, error, hint, children }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      {children}
      {hint && !error && (
        <p className="text-xs text-gray-500 dark:text-gray-400">{hint}</p>
      )}
      {error && (
        <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}

// Input Component
interface InputProps {
  id?: string;
  name?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  error?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Input({
  id,
  name,
  type = "text",
  placeholder,
  value,
  error = false,
  onChange,
}: InputProps) {
  return (
    <input
      id={id}
      name={name || id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={clsx(
        "block w-full rounded-md bg-white py-2 px-3 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-brand-royal dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-400",
        error && "outline-red-500 focus:outline-red-500"
      )}
    />
  );
}

// DateInput Component (Fixed version)
interface DateInputProps {
  id?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function DateInput({
  id,
  placeholder,
  value,
  onChange,
}: DateInputProps) {
  return (
    <div className="relative">
      <input
        id={id}
        name={id}
        type="date"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="block w-full rounded-md bg-white py-2 pr-10 pl-3 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-brand-royal dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-400"
      />
      <CalendarDaysIcon
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 size-5 text-gray-400 dark:text-gray-500"
      />
    </div>
  );
}

// Textarea Component
interface TextareaProps {
  id?: string;
  name?: string;
  placeholder?: string;
  value?: string;
  rows?: number;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function Textarea({
  id,
  name,
  placeholder,
  value,
  rows = 3,
  onChange,
}: TextareaProps) {
  return (
    <textarea
      id={id}
      name={name || id}
      rows={rows}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="block w-full rounded-md bg-white py-2 px-3 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-brand-royal dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-400 resize-none"
    />
  );
}

// Select Component
export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  id?: string;
  name?: string;
  value?: string;
  options: SelectOption[];
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function Select({
  id,
  name,
  value,
  options,
  placeholder = "Select an option",
  onChange,
}: SelectProps) {
  return (
    <div className="relative">
      <select
        id={id}
        name={name || id}
        value={value}
        onChange={onChange}
        className="block w-full rounded-md bg-white py-2 pr-10 pl-3 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-brand-royal dark:bg-white/5 dark:text-white dark:outline-white/10 appearance-none"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDownIcon
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 size-5 text-gray-400 dark:text-gray-500"
      />
    </div>
  );
}
