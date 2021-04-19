export default interface CreateCustomerDTO {
  name: string;
  email?: string;
  telephone: string[];
  street: string;
  area: string;
  city: string;
  state: string;
}
