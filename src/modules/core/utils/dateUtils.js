import { format, formatDistanceToNow, isToday, isYesterday } from 'date-fns';
import { id } from 'date-fns/locale';

export const formatDate = (date, formatStr = 'PPP') => {
  if (!date) return '';
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, formatStr, { locale: id });
};

export const formatTimeAgo = (date) => {
  if (!date) return '';
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isToday(dateObj)) {
    return `Hari ini, ${format(dateObj, 'HH:mm')}`;
  } else if (isYesterday(dateObj)) {
    return `Kemarin, ${format(dateObj, 'HH:mm')}`;
  } else {
    return formatDistanceToNow(dateObj, { addSuffix: true, locale: id });
  }
};

export const getTodayFormatted = () => {
  return format(new Date(), 'd MMMM yyyy', { locale: id });
};