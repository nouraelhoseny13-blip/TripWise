import { CloudSun, Droplets, Wind } from "lucide-react";

function WeatherCard({
  city = "Paris",
  temperature = 24,
  condition = "Partly Cloudy",
  humidity = 65,
  wind = 12,
}) {
  return (
    <div className="rounded-[20px] border border-primary/10 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-text/50">
            Weather
          </p>

          <h3 className="mt-1 font-heading text-2xl font-bold text-text">
            {city}
          </h3>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-soft-pink text-primary">
          <CloudSun size={26} />
        </div>
      </div>

      <div className="mt-6 flex items-center gap-4">
        <span className="font-heading text-5xl font-bold text-text">
          {temperature}°
        </span>

        <span className="text-sm text-text/60">
          {condition}
        </span>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="flex items-center gap-3 rounded-[12px] bg-soft-pink/60 px-4 py-3">
          <Droplets size={18} className="text-primary" />

          <div>
            <p className="text-xs text-text/50">
              Humidity
            </p>

            <p className="mt-0.5 text-sm font-semibold text-text">
              {humidity}%
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-[12px] bg-soft-pink/60 px-4 py-3">
          <Wind size={18} className="text-primary" />

          <div>
            <p className="text-xs text-text/50">
              Wind
            </p>

            <p className="mt-0.5 text-sm font-semibold text-text">
              {wind} km/h
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;