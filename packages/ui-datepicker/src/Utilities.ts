import moment, { MomentInput } from 'moment';

export class Utilities {
  static transform(date: MomentInput, format: string, locale = 'sv'): string {
    const transform = moment(date);
    transform.locale(locale);
    return transform.format(format);
  }

  static natural(date: MomentInput, locale = 'sv'): string {
    const data = moment.localeData(locale);
    return moment(date)
      .locale(locale)
      .calendar(undefined, {
        lastWeek: 'dddd D MMMM',
        lastDay: data.calendar('lastDay').replace(/( |\]).*/, ']'),
        sameDay: data.calendar('sameDay').replace(/( |\]).*/, ']'),
        nextDay: data.calendar('nextDay').replace(/( |\]).*/, ']'),
        nextWeek: 'dddd D MMMM',
        sameElse: 'dddd D MMMM',
      });
  }

  static naturalShort(date: MomentInput, locale = 'sv'): string {
    const data = moment.localeData(locale);
    return moment(date)
      .locale(locale)
      .calendar(undefined, {
        lastWeek: 'D MMM',
        lastDay: data.calendar('lastDay').replace(/( |\]).*/, ']'),
        sameDay: data.calendar('sameDay').replace(/( |\]).*/, ']'),
        nextDay: data.calendar('nextDay').replace(/( |\]).*/, ']'),
        nextWeek: 'D MMM',
        sameElse: 'D MMM',
      });
  }

  static weekdays(locale = 'sv'): string[] {
    const data = moment.localeData(locale);
    return Utilities.reorder(data.weekdays(), data.firstDayOfWeek());
  }

  static weekdaysShort(locale = 'sv'): string[] {
    const data = moment.localeData(locale);
    return Utilities.reorder(data.weekdaysShort(), data.firstDayOfWeek());
  }

  static weekdaysMin(locale = 'sv'): string[] {
    const data = moment.localeData(locale);
    return Utilities.reorder(data.weekdaysMin(), data.firstDayOfWeek());
  }

  static reorder(weekdays: string[], count: number) {
    const move = weekdays.slice(0, count);
    return weekdays.slice(count).concat(move);
  }

  static daysInMonth(month: number, year: number): number {
    return new Date(year, month + 1, 0).getDate();
  }

  //------------------------------------------------------------------------------------
  // CHECKS
  //------------------------------------------------------------------------------------

  static isMatchingDates(dateA: Date | undefined, dateB: Date | undefined): boolean {
    return (
      dateA !== undefined &&
      dateB !== undefined &&
      dateA.getDate() === dateB.getDate() &&
      dateA.getMonth() === dateB.getMonth() &&
      dateA.getFullYear() === dateB.getFullYear()
    );
  }

  static isSameMonth(dateA: Date | undefined, dateB: Date | undefined): boolean {
    return dateA !== undefined && dateB !== undefined && dateA.getMonth() === dateB.getMonth();
  }
}
