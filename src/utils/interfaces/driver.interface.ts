export interface Driver {
  _id: string;
  name: string;
  email: string;
  phone: string;
  licenseNumber: string
  hireDate: string;
  status: string;
  assignedTruck: string;
  totalDeliveries: number;
  licenseExpirationDate: string;
}
