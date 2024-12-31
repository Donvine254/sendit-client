import React from "react";
import AddressForm from "./address-form";
import { AddressFormData } from "@/types";

interface PickupAddressProps {
  data: AddressFormData;
  // eslint-disable-next-line
  onChange: (data: AddressFormData) => void;
  onNext: () => void;
  onBack: () => void;
}
// TO-DO: Pass user data and shipping address information as the default data
const PickupAddress = (props: PickupAddressProps) => {
  return <AddressForm title="Pickup Address" {...props} />;
};

export default PickupAddress;
