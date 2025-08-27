// src/components/ui/button.tsx
import * as Headless from "@headlessui/react";
import clsx from "clsx";
import React, { forwardRef } from "react";

const styles = {
  base: [
    // Base
    "relative isolate inline-flex items-baseline justify-center gap-x-2 rounded-lg border text-base/6 font-medium",
    // Sizing (kept so sizes work consistently across variants)
    "px-[calc(theme(spacing.3.5)-1px)] py-[calc(theme(spacing.2.5)-1px)] sm:px-[calc(theme(spacing.3)-1px)] sm:py-[calc(theme(spacing.1.5)-1px)] sm:text-sm/6",
    // Focus
    "focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal",
    // Disabled
    "disabled:opacity-50 disabled:cursor-not-allowed",
    // Icon sizing
    "[&>svg]:size-5 [&>svg]:shrink-0 sm:[&>svg]:size-4",
  ],

  // Variants
  solid: ["border-transparent", "shadow-sm"],
  outline: [
    "border-gray-300 text-gray-700 bg-white hover:bg-gray-50",
    "dark:border-gray-600 dark:text-gray-300 dark:bg-transparent dark:hover:bg-white/5",
  ],
  plain: [
    "border-transparent text-gray-700 hover:bg-gray-100",
    "dark:text-gray-300 dark:hover:bg-white/10",
  ],

  /** New: CTA (your requested style) */
  cta: [
    "border-transparent", // no visible border
    "items-center rounded-md", // override base alignment/radius
    "font-semibold", // override base font weight
    // light royal tint + subtle shadow
    "bg-royal/10 text-royal shadow-xs hover:bg-royal/20",
    // dark mode
    "dark:bg-royal/20 dark:text-royal dark:shadow-none dark:hover:bg-royal/30",
  ],

  // Color palettes used with the "solid" variant (unchanged)
  colors: {
    primary: [
      "text-white bg-royal hover:bg-royal/90",
      "dark:bg-royal dark:hover:bg-royal/90",
    ],
    secondary: [
      "text-gray-900 bg-white border-gray-300 hover:bg-gray-50",
      "dark:text-white dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700",
    ],
    destructive: [
      "text-white bg-cardinal hover:bg-cardinal/90",
      "dark:bg-cardinal dark:hover:bg-cardinal/90",
    ],
    royal: ["text-white bg-royal hover:bg-royal/90"],
    spruce: ["text-white bg-spruce hover:bg-spruce/90"],
    cardinal: ["text-white bg-cardinal hover:bg-cardinal/90"],
    pumpkin: ["text-gray-900 bg-pumpkin hover:bg-pumpkin/90"],
    // Tailwind color examples
    indigo: ["text-white bg-indigo-600 hover:bg-indigo-500"],
    cyan: ["text-cyan-900 bg-cyan-300 hover:bg-cyan-400"],
    rose: ["text-white bg-rose-600 hover:bg-rose-500"],
  },
} as const;

type ColorVariant = keyof typeof styles.colors;

type BaseButtonProps = {
  className?: string;
  children: React.ReactNode;
  color?: ColorVariant | (string & {});
  variant?: "solid" | "outline" | "plain" | "cta"; // ← added "cta"
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
};

type NativeButtonProps = BaseButtonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps>;

type LinkButtonProps = BaseButtonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps> & {
    href: string;
  };

type ButtonProps = NativeButtonProps | LinkButtonProps;

const sizeStyles = {
  sm: "px-2.5 py-1.5 text-xs",
  md: "px-3 py-1.5 text-sm font-medium", // ← matches your CTA string exactly
  lg: "px-4 py-2 text-base",
};

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
  (
    {
      color = "primary",
      variant = "solid",
      size = "md",
      className,
      children,
      loading,
      disabled,
      ...props
    },
    ref
  ) => {
    const isLink = "href" in props;

    const colorKey = color as ColorVariant;
    const colorStyles = styles.colors[colorKey] || [
      `text-white bg-${color} hover:bg-${color}/90`,
    ];

    const variantClasses =
      variant === "outline"
        ? styles.outline
        : variant === "plain"
          ? styles.plain
          : variant === "cta"
            ? styles.cta
            : [styles.solid, colorStyles]; // solid

    const classes = clsx(
      styles.base,
      variantClasses,
      sizeStyles[size],
      loading && "cursor-wait",
      className
    );

    const LoadingSpinner = () => (
      <svg
        className="animate-spin -ml-1 mr-2 h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    );

    if (isLink) {
      return (
        <a
          ref={ref as React.ForwardedRef<HTMLAnchorElement>}
          className={classes}
          {...(props as LinkButtonProps)}
        >
          <TouchTarget>
            {loading && <LoadingSpinner />}
            {children}
          </TouchTarget>
        </a>
      );
    }

    return (
      <Headless.Button
        ref={ref as React.ForwardedRef<HTMLButtonElement>}
        className={classes}
        disabled={disabled || loading}
        {...(props as NativeButtonProps)}
      >
        <TouchTarget>
          {loading && <LoadingSpinner />}
          {children}
        </TouchTarget>
      </Headless.Button>
    );
  }
);

Button.displayName = "Button";

function TouchTarget({ children }: { children: React.ReactNode }) {
  return (
    <>
      <span
        className="absolute left-1/2 top-1/2 size-[max(100%,2.75rem)] -translate-x-1/2 -translate-y-1/2 [@media(pointer:fine)]:hidden"
        aria-hidden="true"
      />
      {children}
    </>
  );
}
