import type { Meta, StoryObj } from '@storybook/react';
import TextArea, { TextAreaProps } from '@/components/commons/Textarea';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

const meta: Meta<typeof TextArea> = {
  title: 'Components/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  args: {
    placeholder: '내용을 입력하세요',
  },
};
export default meta;

type Story = StoryObj<typeof TextArea>;

// react-hook-form 컨텍스트를 제공하는 컨트롤 컴포넌트
function ControlledTextArea(props: Partial<TextAreaProps>) {
  const methods = useForm({ mode: 'onChange' });

  // 에러를 일부러 넣는 로직 (minLength 10)
  React.useEffect(() => {
    methods.trigger(props.name ?? ''); // 렌더 후 validation 강제 실행
  }, [methods, props.name]);

  return (
    <FormProvider {...methods}>
      <TextArea {...(props as TextAreaProps)} />
    </FormProvider>
  );
}

export const Default: Story = {
  render: (args) => <ControlledTextArea {...args} name="default" />,
};

export const ErrorState: Story = {
  render: (args) => (
    <ControlledTextArea {...args} name="error" minLength={10} />
  ),
  args: {
    placeholder: '최소 10자 이상 입력하세요',
  },
};
