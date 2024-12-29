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

const PickupAddress = (props: PickupAddressProps) => {
  return <AddressForm title="Pickup Address" {...props} />;
};

export default PickupAddress;
