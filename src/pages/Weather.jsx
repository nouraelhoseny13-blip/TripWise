import { useState } from "react";
import {
  CloudSun,
  Droplets,
  MapPin,
  Search,
  Wind,
} from "lucide-react";

import ErrorMessage from "../components/ErrorMessage";
import { getWeather } from "../services/weatherService";
import { searchCity } from "../services/geocodingService";

function getWeatherCondition(code) {
  if (code === 0) return "Clear sky";

  if ([1, 2, 3].includes(code)) return "Partly cloudy";

  if ([45, 48].includes(code)) return "Foggy";

  if ([51, 53, 55, 56, 57].includes(code)) return "Drizzle";

  if ([61, 63, 65, 66, 67].includes(code)) return "Rainy";

  if ([71, 73, 75, 77].includes(code)) return "Snowy";

  if ([80, 81, 82].includes(code)) return "Rain showers";

  if ([85, 86].includes(code)) return "Snow showers";

  if ([95, 96, 99].includes(code)) return "Thunderstorm";

  return "Unknown";
}

function WeatherSkeleton() {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="overflow-hidden rounded-[22px] border border-primary/10 bg-white shadow-sm sm:rounded-[28px]">
        <div className="bg-soft-pink px-5 py-8 text-center sm:px-10 sm:py-10">
          <div className="mx-auto h-14 w-14 animate-pulse rounded-full bg-white/70 sm:h-16 sm:w-16" />

          <div className="mx-auto mt-5 h-5 w-36 animate-pulse rounded-full bg-white/70 sm:w-40" />

          <div className="mx-auto mt-5 h-14 w-36 animate-pulse rounded-[12px] bg-white/70 sm:h-16 sm:w-40" />

          <div className="mx-auto mt-3 h-5 w-24 animate-pulse rounded-full bg-white/70 sm:w-28" />
        </div>

        <div className="grid grid-cols-2 divide-x divide-primary/10 sm:grid-cols-3">
          <div className="p-5 text-center sm:p-6">
            <div className="mx-auto h-6 w-6 animate-pulse rounded-full bg-soft-pink" />

            <div className="mx-auto mt-3 h-3 w-16 animate-pulse rounded-full bg-soft-pink" />

            <div className="mx-auto mt-2 h-6 w-20 animate-pulse rounded-full bg-soft-pink" />
          </div>

          <div className="p-5 text-center sm:p-6">
            <div className="mx-auto h-6 w-6 animate-pulse rounded-full bg-soft-pink" />

            <div className="mx-auto mt-3 h-3 w-12 animate-pulse rounded-full bg-soft-pink" />

            <div className="mx-auto mt-2 h-6 w-24 animate-pulse rounded-full bg-soft-pink" />
          </div>

          <div className="col-span-2 border-t border-primary/10 p-5 text-center sm:col-span-1 sm:border-t-0 sm:p-6">
            <div className="mx-auto h-6 w-6 animate-pulse rounded-full bg-soft-pink" />

            <div className="mx-auto mt-3 h-3 w-16 animate-pulse rounded-full bg-soft-pink" />

            <div className="mx-auto mt-2 h-6 w-20 animate-pulse rounded-full bg-soft-pink" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Weather() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (event) => {
    event?.preventDefault();

    const city = search.trim();

    if (!city) {
      setWeather(null);
      setError("Please enter a city name.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setWeather(null);

      const locationData = await searchCity(city);

      if (
        !locationData.results ||
        locationData.results.length === 0
      ) {
        setError("City not found. Please try another city.");
        return;
      }

      const location = locationData.results[0];

      const weatherData = await getWeather(
        location.latitude,
        location.longitude
      );

      setWeather({
        city: location.name,
        country: location.country,
        temperature: Math.round(
          weatherData.current.temperature_2m
        ),
        humidity:
          weatherData.current.relative_humidity_2m,
        wind: Math.round(
          weatherData.current.wind_speed_10m
        ),
        condition: getWeatherCondition(
          weatherData.current.weather_code
        ),
      });
    } catch (err) {
      console.error(err);

      setWeather(null);
      setError(
        "Unable to load weather data. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-background px-5 pb-16 pt-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm">
            Weather
          </p>

          <h1 className="mx-auto mt-2 max-w-4xl font-heading text-[2.35rem] font-bold leading-tight text-text sm:text-5xl">
            Check the weather before you travel.
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-text/60 sm:mt-5 sm:text-lg sm:leading-8">
            Get real-time weather information for your
            destination and plan your trip with confidence.
          </p>
        </div>

        {/* Search */}
        <form
          onSubmit={handleSearch}
          className="mx-auto mt-8 max-w-2xl sm:mt-10"
        >
          <div className="flex flex-col gap-3 rounded-[16px] border border-primary/10 bg-white p-3 shadow-sm transition focus-within:border-primary focus-within:shadow-md sm:flex-row sm:items-center sm:gap-3 sm:px-5 sm:py-4">
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <Search
                size={21}
                className="shrink-0 text-primary"
              />

              <input
                type="text"
                placeholder="Search a destination..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="min-w-0 w-full bg-transparent py-1 text-sm text-text outline-none placeholder:text-text/40"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full shrink-0 rounded-[10px] bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:py-2.5"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </form>

        {/* Weather Result */}
        <section className="mt-8 sm:mt-12">
          {loading && <WeatherSkeleton />}

          {!loading && error && (
            <div className="mx-auto max-w-2xl">
              <ErrorMessage
                title="Weather unavailable"
                message={error}
                onRetry={() => handleSearch()}
              />
            </div>
          )}

          {!loading && !error && weather && (
            <div className="mx-auto max-w-4xl">
              <div className="overflow-hidden rounded-[22px] border border-primary/10 bg-white shadow-sm sm:rounded-[28px]">

                {/* Main Weather */}
                <div className="bg-soft-pink px-5 py-8 text-center sm:px-10 sm:py-10">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-primary shadow-sm sm:h-16 sm:w-16">
                    <CloudSun size={29} className="sm:h-8 sm:w-8" />
                  </div>

                  <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-sm font-medium text-primary-dark">
                    <MapPin size={17} />

                    <span>
                      {weather.city}, {weather.country}
                    </span>
                  </div>

                  <p className="mt-4 font-heading text-5xl font-bold text-text sm:text-6xl">
                    {weather.temperature}°C
                  </p>

                  <p className="mt-2 text-sm font-medium text-text/60 sm:text-base">
                    {weather.condition}
                  </p>
                </div>

                {/* Weather Stats */}
                <div className="grid grid-cols-2 divide-x divide-primary/10 sm:grid-cols-3">

                  <div className="p-5 text-center sm:p-6">
                    <Droplets
                      size={22}
                      className="mx-auto text-primary"
                    />

                    <p className="mt-3 text-[11px] uppercase tracking-wider text-text/40 sm:text-xs">
                      Humidity
                    </p>

                    <p className="mt-1 text-base font-semibold text-text sm:text-lg">
                      {weather.humidity}%
                    </p>
                  </div>

                  <div className="p-5 text-center sm:p-6">
                    <Wind
                      size={22}
                      className="mx-auto text-primary"
                    />

                    <p className="mt-3 text-[11px] uppercase tracking-wider text-text/40 sm:text-xs">
                      Wind
                    </p>

                    <p className="mt-1 text-base font-semibold text-text sm:text-lg">
                      {weather.wind} km/h
                    </p>
                  </div>

                  <div className="col-span-2 border-t border-primary/10 p-5 text-center sm:col-span-1 sm:border-t-0 sm:p-6">
                    <CloudSun
                      size={22}
                      className="mx-auto text-primary"
                    />

                    <p className="mt-3 text-[11px] uppercase tracking-wider text-text/40 sm:text-xs">
                      Weather
                    </p>

                    <p className="mt-1 text-base font-semibold text-text sm:text-lg">
                      Live data
                    </p>
                  </div>

                </div>
              </div>
            </div>
          )}
        </section>

        {/* Travel Tip */}
        <section className="mt-10 rounded-[22px] border border-primary/10 bg-white p-5 shadow-sm sm:mt-16 sm:rounded-[24px] sm:p-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm">
              Travel Tip
            </p>

            <h2 className="mt-2 font-heading text-2xl font-bold leading-tight text-text sm:text-3xl">
              Always check the weather before your trip.
            </h2>

            <p className="mt-4 text-sm leading-6 text-text/60 sm:text-base sm:leading-7">
              Weather conditions can change your travel plans,
              activities, and what you need to pack. TripWise
              helps you make better travel decisions.
            </p>
          </div>
        </section>

      </div>
    </main>
  );
}

export default Weather;
