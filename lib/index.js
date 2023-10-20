//helper functions

import Axios from "axios";
import toast from "react-hot-toast";
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
    // Try to make a GET request to check if the user exists
    const getUserResponse = await fetch(`${api}/users/${user.id}`);
    if (getUserResponse.status === 200) {
      const userExists = await getUserResponse.json();
      // User exists, set it as the current user
      setCurrentUser(userExists);
    }
  } catch (error) {
    console.error("Error checking user:", error);
    if (error.response && error.response.status === 404) {
      // User does not exist, proceed to create it
      try {
        const createUserResponse = await Axios.post(api, userData);
        const newUser = createUserResponse.data;
        setCurrentUser(newUser);
      } catch (createError) {
        console.error("Error creating user:", createError);
      }
    }
  }
}

//function to create a parcel order
export async function createParcel(parcelData, navigate) {
  console.log(parcelData);
  try {
    const response = await Axios.post(`${api}/parcels`, parcelData);
    const data = await response.data;
    console.log(data)
    toast.success("Processing request...");
    navigate.replace(`/deliveries/orders?parcel_id=${data.id}`);
    return data;
  } catch (error) {
    const errorData = error?.response?.data.errors;
    return errorData
  }
}
