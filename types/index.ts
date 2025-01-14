export type AddressFormData = {
  fullName: string;
  phone: string;
  email: string;
  region: string;
  district: string;
  address: string;
};
export interface Address {
  email?: string;
  phone: string;
  fullName: string;
  region: string;
  district: string;
  address: string;
}

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
  full_name?: string;
  given_name?: string;
  picture?: string;
  username?: string;
  phone_number?: string;
};
export interface KindeUser {
  id: string;
  email: string;
  username: string;
  full_name: string;
  last_name: string;
  first_name: string;
  is_suspended: boolean;
  created_on: string;
  picture?: string;
  total_sign_ins: number;
  last_signed_in: string;
}

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
export type Order = {
  id: string;
  userId: string;
  description: string;
  createdAt: Date;
  updatedAt?: Date | null;
  status: string;
  pickupAddress: {
    fullName?: string;
    phone: string;
    email?: string;
    region: string;
    district: string;
    address: string;
  };
  deliveryAddress: {
    fullName?: string;
    phone: string;
    email?: string;
    region: string;
    district: string;
    address: string;
  };
  price: number;
};
export interface ShippingAddressData {
  userId: string;
  phone: string;
  fullName: string;
  email: string;
  region: string;
  district: string;
  address: string;
}

export interface OrderDetails {
  email: string;
  name: string;
  orderId: string;
  pickupAddress: string;
  deliveryAddress: string;
  parcelDescription: string;
  parcelWeight: number;
  totalPrice: number;
}
