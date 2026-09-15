import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  Globe2,
  ImageOff,
  MapPin,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";

const destinations = {
  1: {
    name: "Santorini",
    country: "Greece",
    category: "Romantic",
    description:
      "Discover whitewashed villages, beautiful views, and unforgettable sunsets.",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1400&q=80",
  },

  2: {
    name: "Paris",
    country: "France",
    category: "Cities",
    description:
      "Experience timeless streets, charming cafés, art, and unforgettable moments.",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1400&q=80",
  },

  3: {
    name: "Bali",
    country: "Indonesia",
    category: "Beach",
    description:
      "Relax among tropical landscapes, peaceful beaches, and beautiful nature.",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1400&q=80",
  },

  4: {
    name: "Kyoto",
    country: "Japan",
    category: "Nature",
    description:
      "Explore peaceful temples, traditional streets, and beautiful Japanese gardens.",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1400&q=80",
  },

  5: {
    name: "Swiss Alps",
    country: "Switzerland",
    category: "Adventure",
    description:
      "Enjoy breathtaking mountains, peaceful villages, and unforgettable alpine adventures.",
    image:
      "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1400&q=80",
  },

  6: {
    name: "Cappadocia",
    country: "Turkey",
    category: "Adventure",
    description:
      "Discover magical valleys, unique landscapes, and unforgettable hot-air balloon rides.",
    image:
      "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1400&q=80",
  },
};

const countryCardVariants = {
  hidden: {
    opacity: 0,
    y: 18,
  },

  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      delay: index * 0.1,
      ease: "easeOut",
    },
  }),
};

function DestinationDetails() {
  const { id } = useParams();

  const destination = destinations[id];

  const [country, setCountry] = useState(null);
  const [loadingCountry, setLoadingCountry] = useState(true);
  const [countryError, setCountryError] = useState("");

  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const loadCountry = async () => {
      if (!destination?.country) {
        setLoadingCountry(false);
        return;
      }

      try {
        setLoadingCountry(true);
        setCountryError("");

        const response = await fetch(
          `https://restcountries.com/v3.1/name/${destination.country}?fullText=true`
        );

        if (!response.ok) {
          throw new Error("Could not load country information.");
        }

        const data = await response.json();

        setCountry(data[0]);
      } catch (error) {
        setCountryError(
          error.message || "Could not load country information."
        );
      } finally {
        setLoadingCountry(false);
      }
    };

    loadCountry();
  }, [id, destination?.country]);

  useEffect(() => {
    setImageLoading(true);
    setImageError(false);
  }, [destination?.image]);

  if (!destination) {
    return (
      <main className="min-h-screen overflow-x-hidden bg-background px-5 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl rounded-[22px] border border-primary/10 bg-white px-5 py-12 text-center shadow-sm sm:rounded-[24px] sm:px-6 sm:py-16">
          <MapPin
            className="mx-auto text-primary"
            size={40}
          />

          <h1 className="mt-5 font-heading text-2xl font-bold text-text sm:text-3xl">
            Destination not found
          </h1>

          <p className="mt-3 text-sm leading-6 text-text/60 sm:text-base">
            We couldn't find the destination you're looking for.
          </p>

          <Link
            to="/explore"
            className="mt-6 inline-flex items-center gap-2 rounded-[12px] bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
          >
            <ArrowLeft size={17} />
            Back to Explore
          </Link>
        </div>
      </main>
    );
  }

  const countryName = country?.name?.common || destination.country;

  const capital = country?.capital?.[0] || "—";

  const region = country?.region || "—";

  const population = country?.population
    ? country.population.toLocaleString()
    : "—";

  const languages = country?.languages
    ? Object.values(country.languages).join(", ")
    : "—";

  return (
    <main className="min-h-screen overflow-x-hidden bg-background px-5 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-10 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Back */}
        <Link
          to="/explore"
          className="inline-flex items-center gap-2 text-sm font-semibold text-text/60 transition hover:text-primary-dark"
        >
          <ArrowLeft size={17} />
          Back to Explore
        </Link>

        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
          className="mt-6 overflow-hidden rounded-[22px] border border-primary/10 bg-white shadow-sm sm:mt-8 sm:rounded-[28px]"
        >
          <div className="relative h-[330px] overflow-hidden sm:h-[440px] lg:h-[500px]">

            {imageLoading && !imageError && (
              <div className="absolute inset-0 animate-pulse bg-soft-pink">
                <div className="absolute inset-0 bg-gradient-to-br from-soft-pink via-white/40 to-primary/10" />
              </div>
            )}

            {imageError ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-soft-pink px-5 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/80 text-primary shadow-sm sm:h-16 sm:w-16">
                  <ImageOff size={27} />
                </div>

                <h2 className="mt-5 font-heading text-xl font-bold text-text sm:text-2xl">
                  Image unavailable
                </h2>

                <p className="mt-2 max-w-sm text-xs leading-6 text-text/60 sm:text-sm">
                  We couldn't load the destination image, but you can still
                  explore all the information about this destination.
                </p>
              </div>
            ) : (
              <img
                src={destination.image}
                alt={destination.name}
                onLoad={() => setImageLoading(false)}
                onError={() => {
                  setImageLoading(false);
                  setImageError(true);
                }}
                className={`h-full w-full object-cover transition-opacity duration-500 ${
                  imageLoading ? "opacity-0" : "opacity-100"
                }`}
              />
            )}

            {!imageError && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
            )}

            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 lg:p-10">
              <span className="inline-flex rounded-full bg-white/90 px-3.5 py-1.5 text-[11px] font-semibold text-primary-dark backdrop-blur sm:px-4 sm:py-2 sm:text-xs">
                {destination.category}
              </span>

              <h1 className="mt-3 font-heading text-3xl font-bold leading-tight text-white sm:mt-4 sm:text-5xl lg:text-6xl">
                {destination.name}
              </h1>

              <div className="mt-2 flex items-center gap-2 text-xs text-white/85 sm:mt-3 sm:text-sm">
                <MapPin size={16} />
                {destination.country}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Country Information */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.15,
            ease: "easeOut",
          }}
          className="mt-6 grid gap-5 sm:mt-8 sm:gap-6 lg:grid-cols-[1fr_360px]"
        >
          <div className="rounded-[22px] border border-primary/10 bg-white p-5 shadow-sm sm:rounded-[24px] sm:p-8">

            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-soft-pink text-primary sm:h-11 sm:w-11">
                <Globe2 size={20} />
              </div>

              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-primary sm:text-xs">
                  Country Information
                </p>

                <h2 className="mt-1 break-words font-heading text-2xl font-bold text-text sm:text-3xl">
                  {countryName}
                </h2>
              </div>
            </div>

            {loadingCountry ? (
              <div className="mt-6 grid gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-4">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="h-24 animate-pulse rounded-[18px] bg-soft-pink/60 sm:h-28"
                  />
                ))}
              </div>
            ) : countryError ? (
              <div className="mt-6 rounded-[18px] bg-soft-pink px-4 py-5 text-sm leading-6 text-text/70 sm:mt-8 sm:px-5 sm:py-6">
                {countryError}
              </div>
            ) : (
              <div className="mt-6 grid gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-4">

                {/* Capital */}
                <motion.div
                  custom={0}
                  variants={countryCardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{
                    y: -4,
                    transition: { duration: 0.2 },
                  }}
                  className="rounded-[18px] border border-primary/10 bg-background p-4 transition-shadow hover:shadow-md sm:p-5"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-soft-pink text-primary sm:h-10 sm:w-10">
                      <MapPin size={18} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-medium text-muted">
                        Capital
                      </p>

                      <p className="mt-1 break-words text-sm font-semibold text-text">
                        {capital}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Region */}
                <motion.div
                  custom={1}
                  variants={countryCardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{
                    y: -4,
                    transition: { duration: 0.2 },
                  }}
                  className="rounded-[18px] border border-primary/10 bg-background p-4 transition-shadow hover:shadow-md sm:p-5"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-soft-pink text-primary sm:h-10 sm:w-10">
                      <Globe2 size={18} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-medium text-muted">
                        Region
                      </p>

                      <p className="mt-1 break-words text-sm font-semibold text-text">
                        {region}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Population */}
                <motion.div
                  custom={2}
                  variants={countryCardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{
                    y: -4,
                    transition: { duration: 0.2 },
                  }}
                  className="rounded-[18px] border border-primary/10 bg-background p-4 transition-shadow hover:shadow-md sm:p-5"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-soft-pink text-primary sm:h-10 sm:w-10">
                      <Users size={18} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-medium text-muted">
                        Population
                      </p>

                      <p className="mt-1 break-words text-sm font-semibold text-text">
                        {population}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Languages */}
                <motion.div
                  custom={3}
                  variants={countryCardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{
                    y: -4,
                    transition: { duration: 0.2 },
                  }}
                  className="rounded-[18px] border border-primary/10 bg-background p-4 transition-shadow hover:shadow-md sm:p-5"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-soft-pink text-primary sm:h-10 sm:w-10">
                      <Globe2 size={18} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-medium text-muted">
                        Languages
                      </p>

                      <p className="mt-1 break-words text-sm font-semibold leading-5 text-text">
                        {languages}
                      </p>
                    </div>
                  </div>
                </motion.div>

              </div>
            )}
          </div>

          {/* Quick Trip Card */}
          <motion.aside
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.3,
              ease: "easeOut",
            }}
            whileHover={{
              y: -4,
              transition: { duration: 0.2 },
            }}
            className="rounded-[22px] border border-primary/10 bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:rounded-[24px] sm:p-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.35,
                delay: 0.45,
              }}
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm">
                Plan Your Trip
              </p>

              <h2 className="mt-2 font-heading text-2xl font-bold text-text sm:text-3xl">
                Ready to explore?
              </h2>

              <p className="mt-3 text-sm leading-6 text-text/60">
                Build your itinerary, choose activities, and estimate your
                travel budget.
              </p>
            </motion.div>

            <div className="mt-5 space-y-3 sm:mt-6">

              <motion.div
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.35,
                  delay: 0.5,
                }}
                className="flex items-center gap-3 rounded-[14px] bg-background p-3.5 sm:p-4"
              >
                <CalendarDays size={19} className="shrink-0 text-primary" />

                <div className="min-w-0">
                  <p className="text-xs text-muted">
                    Trip Planning
                  </p>

                  <p className="text-sm font-semibold text-text">
                    Create your itinerary
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.35,
                  delay: 0.6,
                }}
                className="flex items-center gap-3 rounded-[14px] bg-background p-3.5 sm:p-4"
              >
                <Clock3 size={19} className="shrink-0 text-primary" />

                <div className="min-w-0">
                  <p className="text-xs text-muted">
                    Flexible
                  </p>

                  <p className="text-sm font-semibold text-text">
                    Plan at your own pace
                  </p>
                </div>
              </motion.div>

            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.35,
                delay: 0.7,
              }}
            >
              <Link
                to="/planner"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-[12px] bg-primary px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-primary-dark sm:mt-6"
              >
                Start Planning
                <ArrowLeft size={17} className="rotate-180" />
              </Link>
            </motion.div>
          </motion.aside>
        </motion.section>

        {/* Final CTA */}
        <motion.section
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.45,
            ease: "easeOut",
          }}
          className="mt-6 rounded-[22px] border border-primary/10 bg-soft-pink px-5 py-9 text-center sm:mt-8 sm:rounded-[24px] sm:px-10 sm:py-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: 0.6,
            }}
          >
            <h2 className="font-heading text-2xl font-bold leading-tight text-text sm:text-3xl">
              Make {destination.name} part of your next adventure.
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-text/60">
              Plan your days, activities, and budget with TripWise.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              delay: 0.75,
            }}
          >
            <Link
              to="/planner"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-[12px] bg-primary px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-primary-dark sm:w-auto"
            >
              Start Planning
              <ArrowLeft size={17} className="rotate-180" />
            </Link>
          </motion.div>
        </motion.section>

      </div>
    </main>
  );
}

export default DestinationDetails;
