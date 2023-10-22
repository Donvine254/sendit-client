//helper functions

import Axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { sendEmail } from "./mailer";
const api = "https://sendit.up.railway.app";

//function to register current users to the database
export async function registerUser(data, setCurrentUser) {
  const { user, isAdmin, isRider } = data;
  let name = `${user.given_name} ${user.family_name}`;
  let role;

  if (isAdmin) {
    role = "admin";
  } else if (isRider) {
    role = "rider";
  } else {
    role = "user";
  }

  const userData = {
    name: name,
    email: user.email,
    picture: user.picture,
    role: role,
    user_id: user.id,
  };

  try {
    const createUserResponse = await Axios.post(`${api}/users`, userData);
    const newUser = createUserResponse.data;
    setCurrentUser(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    toast.error("something went wrong", error)
  }
}

//function to create a parcel order
export async function createParcel(
  parcelData,
  router,
  setOrderData,
  setCreatedParcel,
  setErrors
) {
  try {
    const response = await Axios.post(`${api}/parcels`, parcelData, {
      cache: "no-store",
    });
    const data = await response.data;
    toast.success("processing request...", {
      icon: "⏳",
    });
    setOrderData((prev) => ({
      ...prev,
      parcel_id: data.id,
    }));
    setCreatedParcel(data);
    router.replace(`/deliveries/orders?parcel_id=${data.id}`);
    return data;
  } catch (error) {
    setErrors(error?.response?.data?.errors)
    toast.error("error processing request", error);
    return false
  }
}
//function to patch the user phone_number
export async function updateUserDetails(
  currentUser,
  phone_number,
  setCurrentUser
) {
  //pass the phone_number and current user
  try {
    if (phone_number) {
      const response = await Axios.patch(
        `${api}/users/${currentUser.user_id}`,
        { phone_number: phone_number }
      );
      const data = await response.data;
      console.log(data);
      setCurrentUser((prev) => ({
        ...prev,
        phone_number: data.phone_number,
      }));
    } 
  } catch (error) {
    toast.error("error processing request", error);
 
  }
}

//function to create an Order

export async function createOrder(data, router, setErrors) {
  const emailData = {
    subject: "Order confirmation",
    message:
      "Hello there, this is just to let you know that your order has been confirmed. Our rider in the area will contact you for pickup instructions as  soon as possible. Kindly ensure your phone is always on to avoid any inconvenience.",
  };
  try {
    const response = await Axios.post(`${api}/orders`, data);
    const order = await response.data;
    Swal.fire({
      icon: "success",
      title: "Your order has been placed successfully!",
      text: "Our riders in the area will contact you as soon as possible. Kindly do not switch off your phone",
      showCloseButton: true,
      confirmButtonColor: "#0056F1",
    })
    router.replace("/dashboard");
    sendEmail(emailData);
  } catch (error) {
    setErrors(error?.response?.data?.errors)
    toast.error("error processing request", error);
  }
}
