//helper functions

import Axios from "axios";
import { calculatePrice
 } from "./calculatePrice";

 export{calculatePrice}
const api = "https://sendit.up.railway.app/users";
//function to register current users to the database
// export async function registerUser(data, setCurrentUser) {
//   const { user, isAdmin, isRider } = data;
//   let name = `${user.given_name} ${user.family_name}`;
//   let role 
//   if (isAdmin) {
//     role = "admin";
//   } else if (isRider) {
//     role = "rider";
//   } else {
//     role = "user";
//   }
//   const userData = {
//     name: name,
//     email: user.email,
//     picture: user.picture,
//     role: role,
//     user_id: user.id,
//   };

//   Axios.get(`${api}/${user.id}`).catch((error) => {
//     if (error?.response?.status === 404) {
//       try {
//         const response = Axios.post(api, userData);
//         const data = response.data;
//         console.log(data);
//         setCurrentUser(data);
//       } catch (error) {
//         console.error(error);
//       }
//     } else {
//       return false;
//     }
//   });
// }

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
    const getUserResponse = await fetch(`${api}/${user.id}`);
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
