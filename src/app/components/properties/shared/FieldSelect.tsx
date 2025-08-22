// src/app/components/ui/FieldSelect.tsx
"use client";

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
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
  placeholder = "Select…",
  multiple,
  className = "block w-full rounded-md bg-white py-2 px-3 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-brand-royal",
}: Props) {
  const isControlled = value !== undefined;

  // Uncontrolled state (mirrors native <select> defaults)
  const [internal, setInternal] = React.useState<string | string[]>(
    isControlled ? (value as any) : multiple ? [] : ""
  );

  // Keep internal in sync when controlled
  React.useEffect(() => {
    if (isControlled) setInternal(value as any);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isControlled, JSON.stringify(value)]);

  const current = (isControlled ? value : internal) as any;

  // Create a select-like synthetic event for onChange compatibility
  const fireChange = (next: string | string[]) => {
    if (!isControlled) setInternal(next);

    if (onChange) {
      const target = { value: next } as any;
      const event = { target } as React.ChangeEvent<HTMLSelectElement>;
      onChange(event);
    }
  };

  // Label shown in the closed button
  const renderLabel = () => {
    if (multiple) {
      const vals = (current as string[]) || [];
      if (!vals.length)
        return <span className="text-gray-400">{placeholder}</span>;
      return options
        .filter((o) => vals.includes(o.value))
        .map((o) => o.label)
        .join(", ");
    } else {
      const val = (current as string) || "";
      if (!val) return <span className="text-gray-400">{placeholder}</span>;
      return options.find((o) => o.value === val)?.label ?? placeholder;
    }
  };

  return (
    <Listbox
      value={current}
      onChange={(next) => fireChange(next as any)}
      multiple={!!multiple}
    >
      <div className="relative">
        {/* Button (closed control) */}
        <ListboxButton id={id} className={className + " text-left pr-8"}>
          {renderLabel()}
          <ChevronDownIcon
            aria-hidden="true"
            className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 size-4 text-gray-400"
          />
        </ListboxButton>

        {/* Panel (open dropdown) — fully stylable, forced white */}
        <Transition
          enter="transition ease-out duration-100"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <ListboxOptions className="absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg outline-1 outline-black/5">
            {/* Hidden placeholder option for single-select parity */}
            {!multiple && (
              <ListboxOption value="" disabled className="hidden">
                {placeholder}
              </ListboxOption>
            )}

            {options.map((opt) => (
              <ListboxOption
                key={opt.value}
                value={opt.value}
                className="group flex cursor-pointer select-none items-center gap-2 px-3 py-2 text-gray-900 data-[focus]:bg-gray-100"
              >
                {({ selected }) => (
                  <>
                    <span className="flex-1">{opt.label}</span>
                    <CheckIcon
                      className={`size-4 text-[var(--color-brand-royal)] ${selected ? "opacity-100" : "opacity-0"}`}
                    />
                  </>
                )}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Transition>

        {/* Optional: hidden native select for forms (keeps name/value in POST) */}
        {/* Uncomment if you need form submission compatibility.
        <select
          id={id}
          name={id}
          multiple={!!multiple}
          value={current as any}
          onChange={() => {}}
          className="hidden"
        >
          {!multiple && <option value="">{placeholder}</option>}
          {options.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        */}
      </div>
    </Listbox>
  );
}
