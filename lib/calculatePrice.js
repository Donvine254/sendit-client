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
    return basePrice;
  }
 export function calculateVAT(price){
    let VAT=price*0.16
    return Math.round(VAT)
  }
  export function calculateEstimatedDeliveryDate(orderDuration) {
    // Regular expression to extract hours and minutes
    const regex = /(\d+)\s*(hours|hrs?|minutes|mins?)/g;
    let match;
    let totalDurationMinutes = 0;
  
    // Parse the order duration from the string
    while ((match = regex.exec(orderDuration)) !== null) {
      const value = parseInt(match[1], 10);
      const unit = match[2].toLowerCase();
      if (unit.includes('hour')) {
        totalDurationMinutes += value * 60;
      } else if (unit.includes('min')) {
        totalDurationMinutes += value;
      }
    }
  
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
  
    if (currentHour < 12 && totalDurationMinutes <= 360) {
      // If the current time is before 12 PM and the total duration is less than or equal to 6 hours (360 minutes)
      return formatDate(currentDate);
    } else {
      // Otherwise, return tomorrow's date
      currentDate.setDate(currentDate.getDate() + 1);
      return formatDate(currentDate);
    }
  }
  
  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${day}-${month}-${year}`;
  }