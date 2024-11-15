import { forwardRef, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, className = "", ...props }, ref) => {
    const id = `${label}-input`;
    let textField = (
      <input
        {...props}
        id={id}
        ref={ref}
        className="h-12 rounded-md border-2 border-gray-300 pl-2 dark:bg-gray-800"
      />
    );

    if (!label) return textField;

    return (
      <div className={`flex flex-col ${className}`}>
        <label htmlFor={id} className="font-bolds mb-2">
          {label}
        </label>
        {textField}
      </div>
    );
  }
);

Input.displayName = "LpddInput";
