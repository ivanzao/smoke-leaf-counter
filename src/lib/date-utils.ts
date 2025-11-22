import { format, toZonedTime } from 'date-fns-tz';

const TIMEZONE = 'America/Sao_Paulo';

export const getNowGMT3 = (): Date => {
    return toZonedTime(new Date(), TIMEZONE);
};

export const getTodayKeyGMT3 = (): string => {
    const now = getNowGMT3();
    return format(now, 'yyyy-MM-dd', { timeZone: TIMEZONE });
};

export const formatDateGMT3 = (date: Date | string | number, formatStr: string = 'dd/MM/yyyy'): string => {
    return format(toZonedTime(date, TIMEZONE), formatStr, { timeZone: TIMEZONE });
};

export const getStartOfMonthGMT3 = (): Date => {
    const now = getNowGMT3();
    return new Date(now.getFullYear(), now.getMonth(), 1);
};

export const getEndOfMonthGMT3 = (): Date => {
    const now = getNowGMT3();
    return new Date(now.getFullYear(), now.getMonth() + 1, 0);
};
