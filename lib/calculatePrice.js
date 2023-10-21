import Axios from "axios";
//function to calculate price for parcel delivery
//takes a {lat, lng} object for origin and {lat, lng} for destination and returns the distance and duration

export async function getDistance(origin, destination) {
  const req = {
    origin,
    destination,
  };
  try {
    const response = await Axios.post("/api/distance", req);
    const data = await response.data;
    return data
  } catch (error) {
    console.error(error);
  }
}

export function calculatePrice(parcelWeight) {
  let weight = parseFloat(parcelWeight.toString())
    let basePrice
  
   switch (true) {
      case weight >= 0 && weight <= 7:
        basePrice = 250;
        break;
      case weight >= 8 && weight <= 10:
        basePrice = 300;
        break;
      case weight >= 11 && weight <= 15:
        basePrice = 350;
        break;
      case weight >= 16 && weight <= 19:
        basePrice = 400;
        break;
      case weight >= 20 && weight <= 25:
        basePrice = 500;
        break;
      default:
        basePrice = 500 + ((weight - 25) * 20);
        break;
    }
    return null
  }
 export function calculateVAT(price){
    let VAT=price*0.16
    return Math.round(VAT)
  }