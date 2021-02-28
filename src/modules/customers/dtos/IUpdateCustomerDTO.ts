export default interface CreateCustomerDTO {
  id: string;
  name?: string;
  email?: string;
  telephone?: string[];
  area?: string;
  city?: string;
  state?: string;
}
