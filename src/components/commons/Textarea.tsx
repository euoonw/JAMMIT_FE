'use client';

import React, {
  ChangeEventHandler,
  FocusEventHandler,
  memo,
  useCallback,
} from 'react';
import { useFormContext, RegisterOptions } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import clsx from 'clsx';

export interface TextAreaProps {
  name: string;
  placeholder: string;
  rules?: RegisterOptions;
  className?: string;
  width?: string;
  minLength?: number;
  maxLength?: number;
  onFocus?: FocusEventHandler<HTMLTextAreaElement>;
  onBlur?: FocusEventHandler<HTMLTextAreaElement>;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
}

function TextArea({
  name,
  placeholder,
  rules,
  className,
  width = 'w-full',
  minLength,
  maxLength,
  onFocus,
  onBlur,
  onChange,
}: TextAreaProps) {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  const isError = !!errors[name];

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const value = e.target.value;
    setValue(name, value);
    if (onChange) onChange(e);
  };

  const handleFocus = useCallback(
    (e: React.FocusEvent<HTMLTextAreaElement>) => {
      if (onFocus) onFocus(e);
    },
    [onFocus],
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLTextAreaElement>) => {
      if (onBlur) onBlur(e);
    },
    [onBlur],
  );

  const { ref, ...rest } = register(name, {
    onChange: handleChange,
    onBlur: handleBlur,
    minLength,
    maxLength,
    ...rules,
    shouldUnregister: true,
  });

  return (
    <div className="flex flex-col gap-[0.5rem]">
      <textarea
        id={name}
        placeholder={placeholder}
        ref={ref}
        onFocus={handleFocus}
        className={clsx(
          'h-[11rem] resize-none rounded-lg border-0 bg-[#34343A] px-[1rem] py-[0.625rem] text-base font-medium text-white outline-none',
          isError && 'border-errorBorder border',
          width,
          className,
        )}
        {...rest}
      />
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <p className="text-sm text-red-500">{message}</p>
        )}
      />
    </div>
  );
}

export default memo(TextArea);
