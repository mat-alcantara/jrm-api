import IDateProvider from '@shared/containers/providers/DateProvider/models/IDateProvider';
import { format, addDays, getDay } from 'date-fns';

export default class DateFnsDateProvider implements IDateProvider {
  public defaultDate7Days(): string {
    if (getDay(new Date(Date.now())) === 6) {
      return format(addDays(new Date(Date.now()), 9), 'dd/MM/yyyy');
    }

    return format(addDays(new Date(Date.now()), 7), 'dd/MM/yyyy');
  }

  public convertDate(givenDate: Date): string {
    return format(givenDate, 'dd/MMM/yyyy');
  }
}
