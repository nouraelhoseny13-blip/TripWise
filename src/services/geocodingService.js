import axios from "axios";

const GEOCODING_API_URL =
  "https://geocoding-api.open-meteo.com/v1/search";

export async function searchCity(city) {
  const response = await axios.get(GEOCODING_API_URL, {
    params: {
      name: city,
      count: 1,
      language: "en",
      format: "json",
    },
  });

  return response.data;
}