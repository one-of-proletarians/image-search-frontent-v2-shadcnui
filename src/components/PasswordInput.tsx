"use client";

import clsx from "clsx";
import { Eye, EyeOff } from "lucide-react";
import { forwardRef, useState } from "react";

import { cn } from "@/lib/utils";

import { Input, type InputProps } from "./ui/input";

export const PasswordInput = forwardRef<
  HTMLInputElement,
  Omit<InputProps, "type">
>(({ className, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex relative">
      <Input
        ref={ref}
        className={cn("pr-8", className)}
        type={showPassword ? "text" : "password"}
        {...props}
      />
      <button
        className={clsx(
          "flex items-center justify-center h-full rounded absolute right-2",
          {
            "text-foreground-400": props.disabled,
          }
        )}
        disabled={props.disabled}
        tabIndex={-1}
        type="button"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? (
          <EyeOff className="h-5 w-5" />
        ) : (
          <Eye className="h-5 w-5" />
        )}
      </button>
    </div>
  );
});

PasswordInput.displayName = "PasswordInput";
