"use client";

import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputClassName?: string;
}

export function PasswordInput({ inputClassName, className, ...props }: PasswordInputProps) {
  const [show, setShow] = useState(false);

  return (
    <div className={`relative ${className ?? ""}`}>
      <input
        type={show ? "text" : "password"}
        className={`w-full pr-10 ${inputClassName ?? ""}`}
        {...props}
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-foreground hover:text-foreground"
        tabIndex={-1}
        aria-label={show ? "Hide password" : "Show password"}
      >
        {show ? (
          <EyeOffIcon className="h-4 w-4" />
        ) : (
          <EyeIcon className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}
