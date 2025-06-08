'use client';
import { useRouter } from 'next/navigation';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import AuthCard from '@/components/commons/AuthCard';
import Input from '@/components/commons/Input';
import Button from '@/components/commons/Button';
import { useLoginMutation } from '@/hooks/queries/auth/useLoginMutaion';

interface FormValues {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const methods = useForm<FormValues>({
    mode: 'all',
    defaultValues: { email: '', password: '' },
    shouldUnregister: false,
  });
  const {
    formState: { isValid },
    reset,
  } = methods;

  const { mutateAsync } = useLoginMutation();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await mutateAsync(data);
    router.push('/');
    reset();
  };

  return (
    <AuthCard title="로그인" linkTo="signup">
      <div className="flex w-[25.125rem] flex-col items-center">
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            noValidate
            className="w-full"
          >
            <div className="flex flex-col gap-[1.5rem]">
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
            </div>
            <Button
              variant="solid"
              size="large"
              className="mt-[2.5rem] w-full"
              type="submit"
              disabled={!isValid}
            >
              로그인
            </Button>
          </form>
        </FormProvider>
      </div>
    </AuthCard>
  );
}
