import { forwardRef, TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, className, ...props }, ref) => {
    const id = `${label}-textarea`;
    let textArea = (
      <textarea
        {...props}
        id={id}
        ref={ref}
        className="h-40 rounded-md border-2 border-gray-300 pl-2 dark:bg-gray-800"
      />
    );

    if (!label) return textArea;

    return (
      <div className={`flex flex-col ${className}`}>
        <label htmlFor={id} className="font-bolds mb-2">
          {label}
        </label>
        {textArea}
      </div>
    );
  }
);

TextArea.displayName = "LpddTextArea";
