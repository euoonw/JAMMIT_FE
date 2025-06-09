import dayjs from 'dayjs';

export const deadline = (deadline: string) => {
  const days = dayjs(deadline)
    .startOf('day')
    .diff(dayjs().startOf('day'), 'day');
  if (days < 0) {
    return '마감';
  }
  if (days === 0) {
    return 'D-Day';
  }
  return `D-${days}`;
};
