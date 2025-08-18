"use client";

import React, { forwardRef, useEffect, useRef, useState } from "react";

// Simple utility function for conditional classes
function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export interface AutocompleteOption {
  label: string;
  value: string | number;
}

export interface AutocompleteProps {
  label?: string;
  placeholder?: string;
  options: AutocompleteOption[];
  value?: AutocompleteOption | AutocompleteOption[] | null;
  multiple?: boolean;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  onChange?: (value: AutocompleteOption | AutocompleteOption[] | null) => void;
  onInputChange?: (value: string) => void;
  sx?: React.CSSProperties; // For compatibility during migration
}

const Autocomplete = forwardRef<HTMLInputElement, AutocompleteProps>(
  function Autocomplete(
    {
      label,
      placeholder,
      options,
      value,
      multiple = false,
      error = false,
      helperText,
      disabled = false,
      fullWidth = false,
      className,
      onChange,
      onInputChange,
      sx,
      ...props
    },
    ref
  ) {
    const [focused, setFocused] = useState(false);
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [selectedOptions, setSelectedOptions] = useState<
      AutocompleteOption[]
    >(
      multiple
        ? Array.isArray(value)
          ? value
          : []
        : value && !Array.isArray(value)
          ? [value]
          : []
    );

    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const hasValue = selectedOptions.length > 0 || inputValue.length > 0;

    // Filter options based on input
    const filteredOptions = options.filter(
      (option) =>
        option.label.toLowerCase().includes(inputValue.toLowerCase()) &&
        (!multiple ||
          !selectedOptions.some((selected) => selected.value === option.value))
    );

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setOpen(false);
          setFocused(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      setOpen(true);
      onInputChange?.(newValue);
    };

    const handleInputFocus = () => {
      setFocused(true);
      setOpen(true);
    };

    const handleOptionSelect = (option: AutocompleteOption) => {
      if (multiple) {
        const newSelected = [...selectedOptions, option];
        setSelectedOptions(newSelected);
        onChange?.(newSelected);
        setInputValue("");
      } else {
        setSelectedOptions([option]);
        onChange?.(option);
        setInputValue(option.label);
        setOpen(false);
        setFocused(false);
      }
    };

    const handleChipRemove = (optionToRemove: AutocompleteOption) => {
      const newSelected = selectedOptions.filter(
        (option) => option.value !== optionToRemove.value
      );
      setSelectedOptions(newSelected);
      onChange?.(multiple ? newSelected : null);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setFocused(false);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setOpen(true);
      }
    };

    // Base container classes
    const containerClasses = cn(
      "relative",
      fullWidth ? "w-full" : "w-auto",
      className
    );

    // Input container classes (matches your design system)
    const inputContainerClasses = cn(
      "relative rounded-lg transition-all duration-200 ease-out min-h-[52px]",
      // Background color - prominent pink/red for error state
      error ? "bg-red-100" : "bg-white",
      "border border-gray-300",
      "flex flex-col justify-center px-3 py-1.5",
      // Focus and error states
      focused &&
        !error &&
        "border-gray-900 shadow-[0_0_0_1px_rgb(209_213_219)]",
      focused && error && "border-red-600 shadow-[0_0_0_0.5px_rgb(220_38_38)]",
      !focused && error && "border-red-600",
      !focused && !error && "border-gray-300",
      // Hover states
      !disabled && "hover:border-gray-900",
      // Disabled state
      disabled && "bg-white text-gray-400 cursor-not-allowed opacity-60",
      error && !focused && "hover:border-gray-300"
    );

    // Label classes
    const labelClasses = cn(
      "transition-all duration-200 ease-out pointer-events-none text-gray-500",
      // Label positioning - force stacked layout when error is present
      focused || hasValue || error
        ? "text-sm mb-1 self-start" // Medium font size for label
        : "absolute top-1/2 left-3 transform -translate-y-1/2 text-base",
      // Focus and error states
      focused && !error && "text-gray-500",
      error && "text-red-600",
      disabled && "text-gray-400"
    );

    // Input field classes
    const inputClasses = cn(
      "w-full bg-transparent border-0 outline-none text-lg text-gray-900", // Larger font size for input
      "placeholder-gray-400",
      disabled && "cursor-not-allowed"
    );

    // Chips container classes
    const chipsContainerClasses = cn(
      "flex flex-wrap gap-1.5 mb-1",
      selectedOptions.length === 0 && "hidden"
    );

    // Individual chip classes
    const chipClasses = cn(
      "inline-flex items-center gap-1 px-2 py-0.5 rounded bg-gray-100",
      "text-xs font-medium text-gray-700 border-0"
    );

    // Dropdown menu classes
    const dropdownClasses = cn(
      "absolute top-full left-0 right-0 z-50 mt-1",
      "bg-white border border-gray-200 rounded-lg shadow-lg",
      "max-h-60 overflow-auto",
      open ? "block" : "hidden"
    );

    // Menu item classes
    const menuItemClasses = (isSelected: boolean) =>
      cn(
        "px-4 py-3 text-sm text-gray-900 cursor-pointer",
        "hover:bg-gray-50",
        isSelected && "bg-gray-50"
      );

    // Helper text classes - positioned inside the field
    const helperTextClasses = cn(
      "text-xs mt-1", // Smaller font size for helper text
      error ? "text-red-600" : "text-gray-500"
    );

    return (
      <div className={containerClasses} style={sx} ref={containerRef}>
        <div className={inputContainerClasses}>
          {/* Label */}
          {label && <label className={labelClasses}>{label}</label>}

          {/* Selected chips for multiple selection */}
          {multiple && (
            <div className={chipsContainerClasses}>
              {selectedOptions.map((option) => (
                <div key={option.value} className={chipClasses}>
                  <span>{option.label}</span>
                  {!disabled && (
                    <button
                      type="button"
                      onClick={() => handleChipRemove(option)}
                      className="ml-1 text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Input field */}
          <input
            ref={inputRef}
            className={inputClasses}
            value={inputValue}
            placeholder={focused || hasValue ? placeholder : ""}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            {...props}
          />

          {/* Dropdown arrow */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg
              className={cn(
                "w-5 h-5 text-gray-400 transition-transform",
                open && "rotate-180"
              )}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>

          {/* Helper Text - Inside the field */}
          {helperText && <div className={helperTextClasses}>{helperText}</div>}
        </div>

        {/* Dropdown menu */}
        <div className={dropdownClasses}>
          {filteredOptions.length === 0 ? (
            <div className="px-4 py-3 text-sm text-gray-500">
              No options found
            </div>
          ) : (
            filteredOptions.map((option) => {
              const isSelected = selectedOptions.some(
                (selected) => selected.value === option.value
              );
              return (
                <div
                  key={option.value}
                  className={menuItemClasses(isSelected)}
                  onClick={() => handleOptionSelect(option)}
                >
                  {multiple && (
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => {}} // Handled by onClick
                      className="mr-2 text-blue-600 rounded focus:ring-blue-500"
                    />
                  )}
                  {option.label}
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  }
);

export default Autocomplete;
