// FieldSelect.tsx
"use client";
import * as React from "react";

type Option = { label: string; value: string };

type Props = {
  id: string;
  options: Option[];
  value?: string | string[]; // if present => controlled
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  multiple?: boolean;
  className?: string;
};

export function FieldSelect({
  id,
  options,
  value,
  onChange,
  placeholder,
  multiple,
  className = "block w-full rounded-md bg-white py-2 px-3 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-brand-royal dark:bg-white/5 dark:text-white dark:outline-white/10",
}: Props) {
  const isControlled = value !== undefined;

  const selectProps: React.SelectHTMLAttributes<HTMLSelectElement> = {
    id,
    multiple,
    onChange,
    className,
    ...(isControlled
      ? { value } // controlled
      : multiple
        ? { defaultValue: [] } // uncontrolled (multi)
        : placeholder
          ? { defaultValue: "" } // uncontrolled (single) with placeholder
          : {}), // uncontrolled (single) no placeholder
  };

  return (
    <select {...selectProps}>
      {!multiple && placeholder && (
        <option value="" disabled hidden>
          {placeholder}
        </option>
      )}
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
