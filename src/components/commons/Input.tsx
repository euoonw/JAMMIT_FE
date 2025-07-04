'use client';

import Invisibility from '@/assets/icons/ic_Invisibility.svg';
import Visibility from '@/assets/icons/ic_visibility.svg';
import { ErrorMessage } from '@hookform/error-message';
import React, {
  ChangeEventHandler,
  memo,
  ReactNode,
  RefObject,
  useCallback,
  useState,
} from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';
import Button from './Button';

interface InputProps {
  /** RHF name속성 */
  name: string;
  /** input 타입인지 */
  type: string;
  /** register 를 호출할 때 지정하는 유효성 검사 규칙과 같은 포맷 */
  rules?: RegisterOptions;
  /** 최소 입력 글자수 */
  minLength?: number;
  /** 최대 입력 글자수 */
  maxLength?: number;
  /** onFocus 이벤트 등록 */
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  /** onBlur 이벤트 등록 */
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  /** onChange 이벤트 등록 */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** input label 설정 */
  label?: string | ReactNode;
  placeholder?: string;
  defaultValue?: string | number;
  /** register에서 받은 ref */
  innerRef?: RefObject<HTMLInputElement | null>;
  /** input의 너비 */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /** 오른쪽 버튼 표시 여부 */
  isrightbutton?: boolean;
  /** 오른쪽 버튼 비활성화 */
  rightButtonDisabled?: boolean;
  /** 오른쪽 버튼 클릭 이벤트 */
  onRightButtonClick?: () => void;
  /** 버튼 내용 */
  children?: ReactNode;
  /** 자동완성 설정 */
  autoComplete?: string;
}

function Input({
  name,
  type,
  rules,
  minLength,
  maxLength,
  onFocus,
  onBlur,
  onChange,
  label,
  placeholder,
  defaultValue,
  innerRef,
  size,
  isrightbutton,
  rightButtonDisabled,
  onRightButtonClick,
  children,
  autoComplete = 'off',
}: InputProps) {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  const IsError = errors[name];
  const IsPwd = type === 'password';
  const [showPassword, setShowPassword] = useState(false);

  const sizeClass = {
    // 283px
    xs: 'tab:w-[17.6875rem] w-[13.125rem]',
    // 400px
    sm: 'pc:w-[25rem] w-[19.4375rem]',
    // 448px
    md: 'w-[28rem]',
    lg: 'w-full pc:w-[56rem]',
    xlg: 'w-full',
  }[size || 'xlg'];

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newValue = e.target.value;
    setValue(name, newValue);
    if (onChange) {
      onChange(e);
    }
  };

  const onInputFocus = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      if (onFocus) {
        onFocus(e);
      }
    },
    [onFocus],
  );

  const onInputBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      if (onBlur) {
        onBlur(e);
      }
    },
    [onBlur],
  );

  const { ref, ...rest } = register(name, {
    onChange: handleChange,
    onBlur: onInputBlur,
    ...rules,
    shouldUnregister: true,
  });

  return (
    <>
      <div className="flex flex-col gap-[0.5rem]">
        <label
          htmlFor={name}
          className="block text-sm font-semibold text-gray-100"
        >
          {label}
        </label>
        <div className={`relative ${sizeClass}`}>
          <div className="flex flex-row items-center gap-[0.5rem]">
            <input
              id={name}
              type={IsPwd ? (showPassword ? 'text' : 'password') : type}
              onFocus={onInputFocus}
              placeholder={placeholder}
              defaultValue={defaultValue}
              minLength={minLength}
              maxLength={maxLength}
              autoComplete={autoComplete}
              ref={(el) => {
                ref(el);
                if (innerRef) {
                  innerRef.current = el;
                }
              }}
              {...rest}
              className={`h-[2.75rem] w-full rounded-lg border-0 bg-[#34343A] px-[1rem] py-[0.625rem] ${
                IsError
                  ? 'border-red-500 focus-within:border-red-500 focus-within:ring-red-500'
                  : 'focus-within:ring-0 focus-within:outline-none'
              }`}
            />
            {isrightbutton && (
              <Button
                type="button"
                variant="outline"
                className="w-auto max-w-[6.8125rem] min-w-[5.8125rem]"
                onClick={onRightButtonClick}
                disabled={rightButtonDisabled}
              >
                {children}
              </Button>
            )}
          </div>
          {IsPwd && (
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-1/2 right-3 -translate-y-1/2"
              aria-label="비밀번호 숨김 버튼"
            >
              {showPassword ? <Visibility /> : <Invisibility />}
            </button>
          )}
        </div>
        <ErrorMessage
          errors={errors}
          name={name}
          render={({ message }) => (
            <p className="mt-1 text-sm text-red-500">{message}</p>
          )}
        />
      </div>
    </>
  );
}

export default memo(Input);
