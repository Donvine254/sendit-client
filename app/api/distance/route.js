import { NextResponse } from "next/server";
import Axios from "axios";
export async function POST(req, res) {
  const data = await req.json();
  if (!data.origin || !data.destination) {
    return NextResponse.json({ message: "something went wrong somewhere" });
  }

  try {
    const apiKey = "AIzaSyCoXmWJSWJDTmvHRqAVOZxVe4tADGFk2hY";

    const distanceMatrixServiceUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${data.origin}&destinations=${data.destination}&key=${apiKey}`;

    const response = await Axios.get(distanceMatrixServiceUrl, {cache: "no-store"});
    const result = await response.data
    const distance = result.rows[0].elements[0].distance.text;
    const duration = result.rows[0].elements[0].duration.text;
    return NextResponse.json({distance, duration});
  } catch (error) {
    return new Response(error, { status: 400 });
  }
}
