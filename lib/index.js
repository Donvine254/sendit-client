//helper functions

import Axios from "axios";

const api = "https://sendit.up.railway.app/users";
//function to register current users to the database
export async function registerUser(data, setCurrentUser) {
  const { user, isAdmin, isRider } = data;
  let name = `${user.given_name} ${user.family_name}`;
  let role 
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

  Axios.get(`${api}/${user.id}`).catch((error) => {
    if (error?.response?.status === 404) {
      try {
        const response = Axios.post(api, userData);
        const data = response.data;
        setCurrentUser(data);
      } catch (error) {
        console.error(error);
      }
    } else {
      return false;
    }
  });
}

