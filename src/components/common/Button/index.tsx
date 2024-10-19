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
        className={`rounded-xl bg-blue-500 px-4 py-2 text-white transition-all duration-200 hover:bg-blue-600 ${props.className}`}
      >
        {props.children}
      </button>
    );
  }
);

// Add a display name to the component for better debugging
Button.displayName = "Button";
