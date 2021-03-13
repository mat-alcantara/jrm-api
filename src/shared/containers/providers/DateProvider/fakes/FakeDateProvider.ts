import IDateProvider from '@shared/containers/providers/DateProvider/models/IDateProvider';

export default class FakeDateProvider implements IDateProvider {
  public defaultDate7Days(): string {
    return '01/01/2001';
  }
}
