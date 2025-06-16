import { render, screen, fireEvent } from '@testing-library/react';
import ModalInteraction from '../Modal/ModalInteraction';

jest.mock('@/assets/icons/ic_Invisibility.svg', () => {
  return function MockInVisibilityIcon() {
    return <svg data-testid="mock-invisibility-icon" />;
  };
});

describe('ModalInteraction 렌더링 테스트', () => {
  const onConfirmMock = jest.fn();
  const onCloseMock = jest.fn();

  beforeEach(() => {
    onConfirmMock.mockClear();
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

  test('메세지와 버튼 렌더링 되는지?', () => {
    render(
      <ModalInteraction
        message="테스트 메시지"
        onConfirm={onConfirmMock}
        onClose={onCloseMock}
      />,
    );

    expect(screen.getByText('테스트 메시지')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '확인' })).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: '취소' }),
    ).not.toBeInTheDocument();
  });

  test('취소 버튼이 보여지는 경우', () => {
    render(
      <ModalInteraction
        message="테스트"
        onConfirm={onConfirmMock}
        onClose={onCloseMock}
        isShowCancel={true}
      />,
    );

    expect(screen.getByRole('button', { name: '취소' })).toBeInTheDocument();
  });

  test('확인 버튼 클릭시 onConfirm 작동 되는지?', () => {
    render(
      <ModalInteraction
        message="테스트"
        onConfirm={onConfirmMock}
        onClose={onCloseMock}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: '확인' }));
    expect(onConfirmMock).toHaveBeenCalledTimes(1);
  });

  test('취소 버튼 클릭시 onClose 작동 되는지?', () => {
    render(
      <ModalInteraction
        message="테스트"
        onConfirm={onConfirmMock}
        onClose={onCloseMock}
        isShowCancel={true}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: '취소' }));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
