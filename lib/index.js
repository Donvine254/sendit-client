//helper functions

import Axios from "axios";

const api = "http://127.0.0.1:4000/users";
//function to register current users to the database
export async function registerUser(data, setCurrentUser) {
  const { user, isAdmin } = data;
  let name = `${user.given_name} ${user.family_name}`;
  let role = isAdmin ? "admin" : "user";
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

