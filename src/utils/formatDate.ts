import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import weekday from 'dayjs/plugin/weekday';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.locale('ko');
dayjs.extend(weekday);
dayjs.extend(localizedFormat);

export const formatDateToKoreanStyle = (date: string): string => {
  const d = dayjs(date);
  const ampm = d.hour() < 12 ? 'AM' : 'PM';
  const hour12 = d.hour() % 12 === 0 ? 12 : d.hour() % 12;

  return `${d.format('YYYY년 M월 D일 dddd')} ${ampm} ${hour12}시`;
};

export const formatDateToYYMMDD = (date: string): string => {
  return dayjs(date).format('YY.MM.DD');
};
