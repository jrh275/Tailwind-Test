"use client";

import React, { forwardRef, useState } from "react";

// Simple utility function for conditional classes
function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export interface TextFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  error?: boolean;
  helperText?: string;
  multiline?: boolean;
  rows?: number;
  maxRows?: number;
  fullWidth?: boolean;
  size?: "small" | "medium";
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  sx?: React.CSSProperties; // For compatibility during migration
}

const TextField = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  TextFieldProps
>(function TextField(
  {
    label,
    error = false,
    helperText,
    multiline = false,
    rows = 4,
    maxRows,
    fullWidth = false,
    size = "medium",
    startAdornment,
    endAdornment,
    className,
    sx,
    disabled,
    ...props
  },
  ref
) {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(
    Boolean(props.value || props.defaultValue)
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setHasValue(Boolean(e.target.value));
    props.onChange?.(e as any);
  };

  const handleFocus = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFocused(true);
    props.onFocus?.(e as any);
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFocused(false);
    props.onBlur?.(e as any);
  };

  // Base container classes
  const containerClasses = cn(
    "relative",
    fullWidth ? "w-full" : "w-auto",
    className
  );

  // Input container classes (matches your design system)
  const inputContainerClasses = cn(
    "relative rounded-lg transition-all duration-200 ease-out",
    // Background color - prominent pink/red for error state
    error ? "bg-red-100" : "bg-white",
    "border border-gray-300",
    // Layout changes based on state - column when filled, row when empty
    // Force stacked layout when error is present
    focused || hasValue || error
      ? "flex flex-col justify-center items-start px-3 py-1.5"
      : "inline-flex items-center gap-2.5 px-3 py-3.5",
    // Focus and error states
    focused && !error && "border-blue-500",
    focused && error && "border-red-500",
    !focused && error && "border-red-500",
    !focused && !error && "border-gray-300",
    // Disabled state
    disabled && "bg-white text-gray-500 cursor-not-allowed opacity-60"
  );

  // Input field classes
  const inputClasses = cn(
    "w-full bg-transparent border-0 outline-none",
    "text-gray-900 placeholder-transparent",
    "text-lg", // Larger font size for input text
    // No padding needed - handled by container
    // Disabled state
    disabled && "cursor-not-allowed"
  );

  // Label classes
  const labelClasses = cn(
    "transition-all duration-200 ease-out pointer-events-none",
    "text-gray-600",
    // Label positioning - absolute when empty, relative when filled
    // Force stacked layout when error is present
    focused || hasValue || error
      ? "relative text-sm mb-1 self-start" // Medium font size for label
      : "absolute top-1/2 left-3 transform -translate-y-1/2 text-base",
    // Focus and error states
    focused && !error && "text-blue-500",
    error && "text-red-500",
    disabled && "text-gray-400"
  );

  // Helper text classes - positioned inside the field
  const helperTextClasses = cn(
    "text-xs mt-1", // Smaller font size for helper text
    error ? "text-red-500" : "text-gray-600"
  );

  const InputComponent = multiline ? "textarea" : "input";

  return (
    <div className={containerClasses} style={sx}>
      <div className={inputContainerClasses}>
        {/* Label */}
        {label && <label className={labelClasses}>{label}</label>}

        {/* Start Adornment */}
        {startAdornment && (
          <div className="flex items-center text-gray-500">
            {startAdornment}
          </div>
        )}

        {/* Input Field */}
        <InputComponent
          ref={ref as any}
          className={inputClasses}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          disabled={disabled}
          rows={multiline ? rows : undefined}
          style={
            maxRows && multiline
              ? { maxHeight: `${maxRows * 1.5}rem` }
              : undefined
          }
          {...(props as any)}
        />

        {/* End Adornment */}
        {endAdornment && (
          <div className="flex items-center text-gray-500">{endAdornment}</div>
        )}

        {/* Helper Text - Inside the field */}
        {helperText && <div className={helperTextClasses}>{helperText}</div>}
      </div>
    </div>
  );
});

export default TextField;
