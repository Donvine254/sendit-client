import { AddressFormData } from "@/types";
import AddressForm from "./address-form";

interface DeliveryAddressProps {
  data: AddressFormData;
  // eslint-disable-next-line
  onChange: (data: AddressFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

const DeliveryAddress = (props: DeliveryAddressProps) => {
  return <AddressForm title="Delivery Address" {...props} />;
};

export default DeliveryAddress;
