export default interface IDateProvider {
  defaultDate7Days(): string;
  convertDate(givenDate: Date): string;
}
