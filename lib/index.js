//helper functions
import Axios from "axios";
import { useAppContext } from "@/context/context";
const api = "http://127.0.0.1:4000/users";
//function to register current users to the database
export function registerUser(data) {
  const { setCurrentUser, setIsAdmin } = useAppContext();
  const { user, isAdmin } = data;
  setIsAdmin(isAdmin);
  let name = `${user.given_name} ${user.family_name}`;
  let role = isAdmin ? "admin" : "user";
  const userData = {
    name: name,
    email: user.email,
    picture: user.picture,
    role: role,
    user_id: user.id,
  };
  console.log(userData);
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
