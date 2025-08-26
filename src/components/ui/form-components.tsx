// src/components/ui/form-components.tsx
import * as Headless from "@headlessui/react";
import { CalendarDaysIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import React, { forwardRef } from "react";

// Base input styles matching Feynman's approach
const inputStyles = [
  // Basic layout
  "relative block w-full rounded-md",
  // Background and border
  "bg-white border border-gray-300 dark:bg-white/5 dark:border-white/10",
  // Typography and spacing
  "px-3 py-2 text-sm text-gray-900 dark:text-white",
  "placeholder:text-gray-400 dark:placeholder:text-gray-400",
  // Focus states
  "focus:outline-none focus:ring-2 focus:ring-royal focus:border-royal",
  "dark:focus:ring-blue-500 dark:focus:border-blue-500",
  // Disabled state
  "disabled:opacity-50 disabled:cursor-not-allowed",
];

// Input Component
export const Input = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & {
    error?: boolean;
  }
>(({ className, error, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={clsx(
        inputStyles,
        error && "border-red-500 focus:border-red-500 focus:ring-red-500",
        className
      )}
      {...props}
    />
  );
});
Input.displayName = "Input";

// Textarea Component
export const Textarea = forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    error?: boolean;
  }
>(({ className, error, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={clsx(
        inputStyles,
        "resize-y",
        error && "border-red-500 focus:border-red-500 focus:ring-red-500",
        className
      )}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

// Label Component
export const Label = forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement> & {
    required?: boolean;
  }
>(({ className, children, required, ...props }, ref) => {
  return (
    <label
      ref={ref}
      className={clsx(
        "block text-sm font-medium text-gray-900 dark:text-white mb-1",
        className
      )}
      {...props}
    >
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
});
Label.displayName = "Label";

// Date Input Component (matching Feynman's pattern)
export const DateInput = forwardRef<
  HTMLInputElement,
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> & {
    error?: boolean;
  }
>(({ className, error, ...props }, ref) => {
  return (
    <div className="relative">
      <input
        ref={ref}
        type="date"
        className={clsx(
          inputStyles,
          "pr-10", // Space for icon
          // Hide browser date picker icon
          "[&::-webkit-calendar-picker-indicator]:opacity-0",
          "[&::-webkit-calendar-picker-indicator]:absolute",
          "[&::-webkit-calendar-picker-indicator]:inset-0",
          "[&::-webkit-calendar-picker-indicator]:cursor-pointer",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500",
          className
        )}
        {...props}
      />
      <CalendarDaysIcon
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 size-5 text-gray-400 dark:text-gray-500"
      />
    </div>
  );
});
DateInput.displayName = "DateInput";

// Select Component (using Headless UI for consistency)
export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  error?: boolean;
  className?: string;
  id?: string;
  name?: string;
}

export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      options,
      value,
      onChange,
      placeholder = "Select...",
      error,
      className,
      ...props
    },
    ref
  ) => {
    const selectedOption = options.find((opt) => opt.value === value);

    return (
      <Headless.Listbox value={value} onChange={onChange}>
        <div className="relative">
          <Headless.ListboxButton
            ref={ref}
            className={clsx(
              inputStyles,
              "text-left pr-10 cursor-default",
              error && "border-red-500 focus:border-red-500 focus:ring-red-500",
              className
            )}
            {...props}
          >
            <span
              className={clsx(
                selectedOption
                  ? "text-gray-900 dark:text-white"
                  : "text-gray-400"
              )}
            >
              {selectedOption?.label || placeholder}
            </span>
            <ChevronDownIcon
              aria-hidden="true"
              className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 size-4 text-gray-400"
            />
          </Headless.ListboxButton>

          <Headless.ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800 dark:ring-white/10">
            {options.map((option) => (
              <Headless.ListboxOption
                key={option.value}
                value={option.value}
                className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 data-[selected]:bg-royal data-[selected]:text-white"
              >
                {option.label}
              </Headless.ListboxOption>
            ))}
          </Headless.ListboxOptions>
        </div>
      </Headless.Listbox>
    );
  }
);
Select.displayName = "Select";

// Form Field Component (for consistent field layout)
export interface FormFieldProps {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  hint,
  required,
  children,
  className,
}) => {
  return (
    <div className={clsx("space-y-1", className)}>
      {label && <Label required={required}>{label}</Label>}

      {children}

      {hint && !error && (
        <p className="text-xs text-gray-500 dark:text-gray-400">{hint}</p>
      )}

      {error && (
        <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};
