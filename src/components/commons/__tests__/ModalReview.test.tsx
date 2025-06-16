import { render, screen, fireEvent } from '@testing-library/react';
import ModalReview from '../Modal/ModalReview';

jest.mock('@/assets/icons/ic_Invisibility.svg', () => {
  return function MockInVisibilityIcon() {
    return <svg data-testid="mock-invisibility-icon" />;
  };
});

describe('ModalReview 렌데링 테스트', () => {
  const onCancelMock = jest.fn();
  const onSubmitMock = jest.fn();

  beforeEach(() => {
    onCancelMock.mockClear();
    onSubmitMock.mockClear();
    const modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');
    document.body.appendChild(modalRoot);
  });

  afterEach(() => {
    const modalRoot = document.getElementById('modal-root');
    if (modalRoot) {
      document.body.removeChild(modalRoot);
    }
  });

  test('모달이 렌더링', () => {
    render(
      <ModalReview
        onCancel={onCancelMock}
        onSubmit={onSubmitMock}
        revieweeNickname="테스트"
      />,
    );

    expect(screen.getByText('리뷰쓰기')).toBeInTheDocument();
  });

  test('취소 버튼 클릭 시 onCancel 호출', () => {
    render(
      <ModalReview
        onCancel={onCancelMock}
        onSubmit={onSubmitMock}
        revieweeNickname="테스트"
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: /모달 닫기/i }));
    expect(onCancelMock).toHaveBeenCalledTimes(1);
  });

  test('리뷰 등록 버튼은 조건을 만족해야 활성화', () => {
    render(
      <ModalReview
        onCancel={onCancelMock}
        onSubmit={onSubmitMock}
        revieweeNickname="테스트"
      />,
    );

    const submitButton = screen.getByRole('button', { name: '리뷰 등록' });
    expect(submitButton).toBeDisabled();
  });
});
