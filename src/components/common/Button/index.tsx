import React, { forwardRef, ButtonHTMLAttributes } from "react";

// Define the type that extends from native button attributes
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

// Define the component with forwarded ref
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    return (
      <button
        {...props} // Spread all the props
        ref={ref} // Forward the ref
        className={`rounded-xl bg-primary px-4 py-2 text-neutralLight transition-all duration-200 hover:bg-primary-hover sm:px-8 sm:py-4 sm:text-2xl ${props.className}`}
      >
        {props.children}
      </button>
    );
  }
);

// Add a display name to the component for better debugging
Button.displayName = "Button";
