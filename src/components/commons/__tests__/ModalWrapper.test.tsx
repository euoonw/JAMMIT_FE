import { render, screen, fireEvent } from '@testing-library/react';
import ModalWrapper from '../Modal/ModalWrapper';

jest.mock('@/assets/icons/ic_Invisibility.svg', () => {
  return function MockInVisibilityIcon() {
    return <svg data-testid="mock-invisibility-icon" />;
  };
});

describe('ModalWrapper 렌더링 테스트', () => {
  const onCloseMock = jest.fn();

  beforeEach(() => {
    onCloseMock.mockClear();
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

  test('제목과 내용이 잘 렌더링 되는지?', () => {
    render(
      <ModalWrapper
        title="모달 제목"
        onClose={onCloseMock}
        className="custom-class"
      >
        <div>모달 내용</div>
      </ModalWrapper>,
    );

    expect(screen.getByText('모달 제목')).toBeInTheDocument();
    expect(screen.getByText('모달 내용')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /모달 닫기/i }),
    ).toBeInTheDocument();

    const modalContent = screen.getByText('모달 내용').parentElement;
    expect(modalContent).toHaveClass('custom-class');
  });

  test('x버튼 클릭시 onClose 정상 실행?', () => {
    render(
      <ModalWrapper onClose={onCloseMock}>
        <div>내용</div>
      </ModalWrapper>,
    );

    fireEvent.click(screen.getByRole('button', { name: /모달 닫기/i }));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
