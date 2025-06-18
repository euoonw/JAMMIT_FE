import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useForm, FormProvider } from 'react-hook-form';
import TextArea, { TextAreaProps } from '../Textarea';

describe('TextArea Component', () => {
  function Wrapper(props: TextAreaProps) {
    const methods = useForm();
    return (
      <FormProvider {...methods}>
        <TextArea {...props} />
      </FormProvider>
    );
  }

  const defaultProps: TextAreaProps = {
    name: 'test',
    placeholder: 'Enter text',
    onChange: jest.fn(),
  };

  test('초기 렌더링시 placeholder value 출력 여부', () => {
    render(<Wrapper {...defaultProps} />);
    const textarea = screen.getByPlaceholderText(
      'Enter text',
    ) as HTMLTextAreaElement;
    expect(textarea).toBeInTheDocument();
    expect(textarea.value).toBe('');
  });

  test('이벤트 발생시 핸들러 정상 호출 여부', () => {
    const onChangeMock = jest.fn();
    render(<Wrapper {...defaultProps} onChange={onChangeMock} />);
    const textarea = screen.getByPlaceholderText('Enter text');
    fireEvent.change(textarea, { target: { value: 'New Value' } });
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith(expect.any(Object));
  });

  test('커스텀 클래스 적용 확인', () => {
    render(<Wrapper {...defaultProps} className="custom-class" />);
    const textarea = screen.getByPlaceholderText('Enter text');
    expect(textarea).toHaveClass('custom-class');
  });
});
