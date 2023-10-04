//helper functions
import Axios from "axios";

const api = "http://127.0.0.1:4000/users";
//function to register current users to the database
export function registerUser(data, setCurrentUser) {
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

//function to get the distance between the pickup and delivery locations using google maps service
//blocked due to CORS

const proxyUrl = "https://cors-anywhere.herokuapp.com/";

export async function getDistanceAndDurationBetweenLocations(
  origin,
  destination
) {
  const apiKey = "AIzaSyCoXmWJSWJDTmvHRqAVOZxVe4tADGFk2hY";

  const distanceMatrixServiceUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${apiKey}`;

  const response = await Axios.get(`${proxyUrl}${distanceMatrixServiceUrl}`);

  if (response.status === 200) {
    const distance =  response?.data?.rows[0].elements[0].distance?.text ?? 0
    const duration =  response?.data?.rows[0].elements[0].duration?.text ?? 0
    return { distance, duration } ;
  } else {
    throw new Error("Distance Matrix API request failed");
  }
}

// const result = await  getDistanceAndDurationBetweenLocations(
//   "Kahawa West, Githurai, Nairobi",
//   "Nairobi, CBD"
// )
// console.log(result);