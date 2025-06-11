import { format } from 'date-fns';

export const formatDateToLocal = (date: Date): string => {
  return format(date, "yyyy-MM-dd'T'HH:mm");
};
