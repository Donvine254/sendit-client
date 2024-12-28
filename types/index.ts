export type AddressFormData = {
  fullName: string;
  phone: string;
  email: string;
  region: string;
  district: string;
  address: string;
};

export type ParcelFormData = {
  description: string;
  weight: number;
};
export type sessionUser = {
  email: string;
  id: string;
  family_name?: string;
  given_name?: string;
  picture?: string;
  username?: string;
  phone_number?: string;
};
