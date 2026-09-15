import axios from "axios";

const COUNTRIES_API_URL = "https://countries.dev";

export async function getCountry(countryCode) {
  try {
    const response = await axios.get(
      `${COUNTRIES_API_URL}/alpha/${countryCode}`
    );

    console.log("Destination API response:", response.data);

    return response.data;
  } catch (error) {
    console.error("Destination API error:", error);
    throw error;
  }
}