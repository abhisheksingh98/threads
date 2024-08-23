import React, { forwardRef } from "react";

interface InputProps {
  label: string;
  helperLabel?: string;
  type?: string;
  id: string;
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = forwardRef(function Input(
  {
    label,
    helperLabel,
    type = "text",
    id,
    placeholder,
    value,
    onChange,
    ...rest
  }: InputProps,
  ref: React.Ref<HTMLInputElement>
) {
  return (
    <div className="mb-5">
      <div className="flex justify-between">
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-input-label-primary"
        >
          {label}
        </label>
        {helperLabel && (
          <p className="mt-1 text-xs text-input-label-primary">{helperLabel}</p>
        )}
      </div>
      <input
        type={type}
        id={id}
        ref={ref}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-label={label}
        className="w-full px-4 py-3 leading-tight text-gray-100 border rounded border-input-border-primary bg-background-primary"
        {...rest}
      />
    </div>
  );
});

export default Input;
