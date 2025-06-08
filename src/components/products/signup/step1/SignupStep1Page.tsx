'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import debounce from 'lodash.debounce';
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useWatch,
} from 'react-hook-form';
import AuthCard from '@/components/commons/AuthCard';
import Button from '@/components/commons/Button';
import Input from '@/components/commons/Input';
import { useSignupStore } from '@/stores/useSignupStore';
import { checkEmailDuplicate } from '@/lib/auth/signup';

interface FormValues {
  email: string;
  name: string;
  password: string;
}

export default function SignUpStep1Page() {
  const router = useRouter();
  const methods = useForm<FormValues>({
    mode: 'all',
    defaultValues: { email: '', name: '', password: '' },
    shouldUnregister: false,
  });
  const {
    formState: { isValid },
    watch,
    setError,
    clearErrors,
  } = methods;

  const email = useWatch({ name: 'email', control: methods.control });
  const password = watch('password');
  const [checking, setChecking] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState<boolean | null>(null);
  const [duplicateMessage, setDuplicateMessage] = useState<string | null>(null);
  const isValidEmailFormat = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const checkEmail = useCallback(async (emailToCheck: string) => {
    setChecking(true);
    try {
      const exists = await checkEmailDuplicate(emailToCheck);
      setIsDuplicate(exists);
      if (exists) {
        setDuplicateMessage('이미 사용 중인 이메일입니다.');
      } else {
        setDuplicateMessage('사용 가능한 이메일입니다.');
      }
    } catch {
      setDuplicateMessage('중복 검사 중 오류가 발생했습니다.');
      setIsDuplicate(null);
    } finally {
      setChecking(false);
    }
  }, []);
  const debounceCheckEmail = useMemo(
    () => debounce(checkEmail, 500),
    [checkEmail],
  );

  useEffect(() => {
    if (!email) {
      setDuplicateMessage(null);
      return;
    }
    const isValidFormat = isValidEmailFormat(email);
    if (!isValidFormat) {
      setDuplicateMessage(null);
      setIsDuplicate(null);
      return;
    }

    debounceCheckEmail(email);
    return () => {
      debounceCheckEmail.cancel();
    };
  }, [email, setError, clearErrors, debounceCheckEmail]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    useSignupStore.getState().setStep1Data(data);
    router.push('/signup/step2');
  };

  return (
    <AuthCard title="회원가입" linkTo="login">
      <div className="flex w-[25.125rem] flex-col items-center">
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            noValidate
            className="w-full"
          >
            <div className="flex flex-col gap-[1.5rem]">
              <div>
                <Input
                  name="email"
                  type="text"
                  label="아이디"
                  placeholder="이메일을 입력해주세요."
                  rules={{
                    required: '이메일은 필수 입력입니다.',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: '올바른 이메일 형식을 입력해주세요.',
                    },
                  }}
                />
                {duplicateMessage && (
                  <p
                    className={`mt-3 text-sm ${
                      isDuplicate ? 'text-red-500' : 'text-[#bf5eff]'
                    }`}
                  >
                    {duplicateMessage}
                  </p>
                )}
              </div>
              <Input
                name="name"
                type="text"
                label="이름"
                placeholder="이름을 입력해주세요."
                rules={{
                  required: '이름은 필수 입력입니다.',
                }}
              />
              <Input
                name="password"
                type="password"
                label="비밀번호"
                placeholder="비밀번호를 입력해주세요."
                rules={{
                  required: '비밀번호는 필수 입력입니다.',
                  minLength: {
                    value: 8,
                    message: '비밀번호는 최소 8자 이상이어야 합니다.',
                  },
                }}
              />
              <Input
                name="passwordConfirm"
                type="password"
                label="비밀번호 확인"
                placeholder="비밀번호를 다시 한 번 입력해주세요."
                rules={{
                  required: '비밀번호 확인은 필수 입력입니다.',
                  validate: (value) =>
                    value === password || '비밀번호가 일치하지 않습니다.',
                }}
              />
            </div>
            <Button
              variant="solid"
              size="large"
              className="mt-[2.5rem] w-full"
              type="submit"
              disabled={!isValid || checking || isDuplicate === true}
            >
              {checking ? '확인 중...' : '다음'}
            </Button>
          </form>
        </FormProvider>
      </div>
    </AuthCard>
  );
}
