import { useMemo } from "react";
import {
  Map,
  Navigation,
  Search,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import L from "leaflet";

function MapControls() {
  const map = useMap();

  return (
    <div className="absolute right-3 top-3 z-[1000] flex flex-col overflow-hidden rounded-[12px] border border-black/5 bg-white shadow-md sm:right-4 sm:top-4 sm:rounded-[14px]">
      <button
        type="button"
        aria-label="Zoom in"
        onClick={() => map.zoomIn()}
        className="flex h-10 w-10 items-center justify-center text-text transition hover:bg-soft-pink hover:text-primary sm:h-11 sm:w-11"
      >
        <ZoomIn size={18} />
      </button>

      <div className="h-px bg-black/10" />

      <button
        type="button"
        aria-label="Zoom out"
        onClick={() => map.zoomOut()}
        className="flex h-10 w-10 items-center justify-center text-text transition hover:bg-soft-pink hover:text-primary sm:h-11 sm:w-11"
      >
        <ZoomOut size={18} />
      </button>
    </div>
  );
}

function InteractiveMap() {
  const destinations = [
    {
      name: "Paris",
      country: "France",
      position: [48.8566, 2.3522],
    },
    {
      name: "Santorini",
      country: "Greece",
      position: [36.3932, 25.4615],
    },
    {
      name: "Cappadocia",
      country: "Turkey",
      position: [38.6431, 34.8289],
    },
    {
      name: "Kyoto",
      country: "Japan",
      position: [35.0116, 135.7681],
    },
    {
      name: "Bali",
      country: "Indonesia",
      position: [-8.4095, 115.1889],
    },
  ];

  const markerIcon = useMemo(() => {
    return L.divIcon({
      className: "tripwise-marker",
      html: `
        <div
          style="
            width: 42px;
            height: 42px;
            border-radius: 50% 50% 50% 0;
            background: #f4a6b8;
            border: 3px solid white;
            box-shadow: 0 5px 14px rgba(58, 32, 40, 0.25);
            transform: rotate(-45deg);
            display: flex;
            align-items: center;
            justify-content: center;
          "
        >
          <div
            style="
              width: 11px;
              height: 11px;
              border-radius: 50%;
              background: white;
            "
          ></div>
        </div>
      `,
      iconSize: [42, 42],
      iconAnchor: [21, 42],
      popupAnchor: [0, -42],
    });
  }, []);

  return (
    <main className="min-h-screen overflow-x-hidden bg-background px-5 pb-16 pt-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm">
            Interactive Map
          </p>

          <h1 className="mt-2 font-heading text-[2.35rem] font-bold leading-tight text-text sm:text-5xl">
            Explore the world your way.
          </h1>

          <p className="mt-4 text-base leading-7 text-text/60 sm:mt-5 sm:text-lg sm:leading-8">
            Discover destinations on the map and get a visual overview of
            places you may want to visit.
          </p>
        </div>

        {/* Search */}
        <div className="mt-7 max-w-xl sm:mt-10">
          <div className="flex items-center gap-3 rounded-[16px] border border-primary/10 bg-white px-4 py-3.5 shadow-sm transition focus-within:border-primary focus-within:shadow-md sm:px-5 sm:py-4">
            <Search
              size={20}
              className="shrink-0 text-primary"
            />

            <input
              type="text"
              placeholder="Search a destination..."
              className="min-w-0 w-full bg-transparent text-sm text-text outline-none placeholder:text-text/40"
            />
          </div>
        </div>

        {/* Map */}
        <section className="relative mt-7 overflow-hidden rounded-[22px] border border-primary/10 bg-white shadow-sm sm:mt-10 sm:rounded-[28px]">
          <div className="relative h-[430px] sm:h-[560px]">

            <MapContainer
              center={[30, 25]}
              zoom={3}
              minZoom={2}
              maxZoom={12}
              scrollWheelZoom={true}
              className="h-full w-full"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {destinations.map((destination) => (
                <Marker
                  key={destination.name}
                  position={destination.position}
                  icon={markerIcon}
                >
                  <Popup>
                    <div className="min-w-[140px] text-center sm:min-w-[150px]">
                      <h3 className="font-heading text-base font-bold text-text sm:text-lg">
                        {destination.name}
                      </h3>

                      <p className="mt-1 text-xs text-text/50 sm:text-sm">
                        {destination.country}
                      </p>
                    </div>
                  </Popup>
                </Marker>
              ))}

              <MapControls />
            </MapContainer>

            {/* Map Label */}
            <div className="absolute left-3 top-3 z-[1000] max-w-[190px] rounded-[12px] border border-white/60 bg-white/95 px-3 py-2.5 shadow-md backdrop-blur-sm sm:left-5 sm:top-5 sm:max-w-none sm:rounded-[14px] sm:px-4 sm:py-3">
              <div className="flex items-center gap-2">
                <Map size={17} className="shrink-0 text-primary" />

                <span className="text-xs font-semibold text-text sm:text-sm">
                  TripWise Map
                </span>
              </div>

              <p className="mt-1 text-[10px] text-text/50 sm:text-xs">
                Explore popular destinations
              </p>
            </div>

            {/* My Location */}
            <button
              type="button"
              className="absolute bottom-3 right-3 z-[1000] flex items-center gap-2 rounded-[11px] bg-primary px-3.5 py-2.5 text-xs font-semibold text-white shadow-md transition hover:bg-primary-dark sm:bottom-5 sm:right-5 sm:rounded-[12px] sm:px-4 sm:py-3 sm:text-sm"
            >
              <Navigation size={16} />
              <span>My location</span>
            </button>

          </div>
        </section>

        {/* Destination List */}
        <section className="mt-8 sm:mt-10">

          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm">
                Popular places
              </p>

              <h2 className="mt-2 font-heading text-2xl font-bold text-text sm:text-3xl">
                Explore destinations
              </h2>
            </div>

            <span className="hidden text-sm text-text/50 sm:block">
              {destinations.length} places
            </span>
          </div>

          <div className="mt-5 grid gap-4 sm:mt-6 sm:grid-cols-2 lg:grid-cols-5">
            {destinations.map((destination) => (
              <button
                key={destination.name}
                type="button"
                className="group rounded-[16px] border border-primary/10 bg-white p-4 text-left shadow-sm transition duration-200 hover:-translate-y-1 hover:border-primary/20 hover:shadow-md sm:rounded-[18px] sm:p-5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-soft-pink text-primary transition group-hover:bg-primary group-hover:text-white">
                  <Map size={19} />
                </div>

                <h3 className="mt-4 font-heading text-lg font-bold text-text sm:text-xl">
                  {destination.name}
                </h3>

                <p className="mt-1 text-sm text-text/50">
                  {destination.country}
                </p>
              </button>
            ))}
          </div>

        </section>

      </div>
    </main>
  );
}

export default InteractiveMap;
