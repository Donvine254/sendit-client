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

export type ParcelOrderData = {
  userId: string;
  description: string;
  weight: number;
  price: number;
  pickupAddress: AddressFormData;
  deliveryAddress: AddressFormData;
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

export interface QuoteFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  pickupRegion: string;
  pickupDistrict: string;
  pickupAddress: string;
  deliveryRegion: string;
  deliveryDistrict: string;
  deliveryAddress: string;
  description: string;
  weight: number;
  parcelImage: File | null;
}
