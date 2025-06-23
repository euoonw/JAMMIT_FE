'use client';

import { ErrorMessage } from '@hookform/error-message';
import clsx from 'clsx';
import React, {
  ChangeEventHandler,
  FocusEventHandler,
  memo,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';

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
  classnames?: string;
  autoResize?: boolean;
}

const MAX_HEIGHT = 92;
const MIN_HEIGHT = 44;
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
  classnames,
  onChange,
  autoResize = false,
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

  const { ref: formRef, ...rest } = register(name, {
    onChange: handleChange,
    onBlur: handleBlur,
    minLength,
    maxLength,
    ...rules,
    shouldUnregister: true,
  });

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleResize = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = `${MIN_HEIGHT}px`;
      const newHeight = Math.min(textarea.scrollHeight, MAX_HEIGHT);
      textarea.style.height = `${newHeight}px`;
      textarea.style.overflowY =
        textarea.scrollHeight > MAX_HEIGHT ? 'auto' : 'hidden';
    }
  };
  const setRef = (el: HTMLTextAreaElement | null) => {
    textareaRef.current = el;
    if (typeof formRef === 'function') {
      formRef(el);
    }
  };
  useEffect(() => {
    if (autoResize) {
      handleResize(); // 마운트 시 초기 크기 설정
    }
  }, [autoResize]);

  return (
    <div className={`flex flex-col gap-[0.5rem] ${classnames}`}>
      <textarea
        id={name}
        placeholder={placeholder}
        ref={setRef}
        onInput={autoResize ? handleResize : undefined}
        onFocus={handleFocus}
        className={clsx(
          'h-[11rem] resize-none rounded-lg border-0 bg-[#34343A] px-[1rem] py-[0.625rem] text-base font-medium outline-none',
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
