import * as React from "react";
import { cva } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-background hover:opacity-90",
        outline:
          "border-border bg-background hover:bg-surface-2 hover:text-foreground aria-expanded:bg-surface-2 aria-expanded:text-foreground dark:border-border dark:bg-surface/30 dark:hover:bg-surface-2",
        secondary:
          "bg-secondary text-background hover:opacity-90 aria-expanded:bg-secondary",
        ghost:
          "hover:bg-surface-2 hover:text-foreground aria-expanded:bg-surface-2 aria-expanded:text-foreground",
        destructive:
          "bg-danger text-white hover:opacity-90 focus-visible:border-danger focus-visible:ring-danger/20",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-10 gap-1.5 px-4",
        xs: "h-7 gap-1 rounded-sm px-2 text-xs",
        sm: "h-8.5 gap-1 rounded-sm px-3 text-xs",
        lg: "h-11.5 gap-1.5 px-6 text-base",
        xl: "h-13 gap-2 px-8 text-lg",
        icon: "size-10",
        "icon-xs":
          "size-7 rounded-sm",
        "icon-sm":
          "size-8.5 rounded-sm",
        "icon-lg": "size-11.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  loading = false,
  children,
  disabled,
  ...props
}) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      disabled={disabled || loading}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          {/* Spinner Icon */}
          <svg className="animate-spin h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          {children}
        </span>
      ) : (
        children
      )}
    </Comp>
  );
}

export { Button, buttonVariants };
