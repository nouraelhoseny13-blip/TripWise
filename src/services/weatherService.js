import axios from "axios";

const WEATHER_API_URL = "https://api.open-meteo.com/v1/forecast";

export async function getWeather(latitude, longitude) {
  try {
    const response = await axios.get(WEATHER_API_URL, {
      params: {
        latitude,
        longitude,
        current:
          "temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code",
        timezone: "auto",
      },
    });

    console.log("Weather API response:", response.data);

    return response.data;
  } catch (error) {
    console.error("Weather API error:", error);
    throw error;
  }
}