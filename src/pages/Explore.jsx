import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  MapPin,
  Heart,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTrip } from "../context/TripContext";

function Explore() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [favorites, setFavorites] = useState([]);

  const { setSelectedDestination } = useTrip();

  const destinations = [
    {
      id: 1,
      name: "Santorini",
      country: "Greece",
      category: "Romantic",
      description:
        "Whitewashed villages, blue domes, beautiful views, and unforgettable sunsets.",
      color: "bg-soft-pink dark:bg-[#42232F]",
      cardTextClass: "text-[#B84D78] dark:text-[#E7A1B8]",
    },
    {
      id: 2,
      name: "Paris",
      country: "France",
      category: "Cities",
      description:
        "Charming cafés, iconic landmarks, art, culture, and romantic streets.",
      color: "bg-[#FDECEF] dark:bg-[#38242B]",
      cardTextClass: "text-[#8C5A78] dark:text-[#D9B0C5]",
    },
    {
      id: 3,
      name: "Bali",
      country: "Indonesia",
      category: "Beach",
      description:
        "Tropical landscapes, peaceful beaches, temples, and beautiful nature.",
      color: "bg-[#FCE8E2] dark:bg-[#3D2926]",
      cardTextClass: "text-[#A45B48] dark:text-[#E4B09F]",
    },
    {
      id: 4,
      name: "Kyoto",
      country: "Japan",
      category: "Nature",
      description:
        "Ancient temples, peaceful gardens, traditional streets, and Japanese culture.",
      color: "bg-[#F8EAF0] dark:bg-[#3B2730]",
      cardTextClass: "text-[#7C5A83] dark:text-[#D7B7DC]",
    },
    {
      id: 5,
      name: "Swiss Alps",
      country: "Switzerland",
      category: "Adventure",
      description:
        "Majestic mountains, scenic villages, fresh air, and incredible outdoor adventures.",
      color: "bg-[#EDE9F7] dark:bg-[#302A3D]",
      cardTextClass: "text-[#625A86] dark:text-[#C9C0EA]",
    },
    {
      id: 6,
      name: "Cappadocia",
      country: "Turkey",
      category: "Adventure",
      description:
        "Unique landscapes, cave hotels, ancient valleys, and magical hot air balloon rides.",
      color: "bg-[#F7E5DC] dark:bg-[#3D2B27]",
      cardTextClass: "text-[#9A5A43] dark:text-[#E2AE98]",
    },
  ];

  useEffect(() => {
    const savedFavorites = JSON.parse(
      localStorage.getItem("tripwise_favorites") || "[]"
    );

    setFavorites(savedFavorites);
  }, []);

  const filteredDestinations = destinations.filter((destination) => {
    const searchValue = search.toLowerCase().trim();

    const matchesSearch =
      destination.name.toLowerCase().includes(searchValue) ||
      destination.country.toLowerCase().includes(searchValue);

    const matchesCategory =
      category === "All" || destination.category === category;

    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (destinationId) => {
    setFavorites((currentFavorites) => {
      const updatedFavorites = currentFavorites.includes(destinationId)
        ? currentFavorites.filter((id) => id !== destinationId)
        : [...currentFavorites, destinationId];

      localStorage.setItem(
        "tripwise_favorites",
        JSON.stringify(updatedFavorites)
      );

      return updatedFavorites;
    });
  };

  const handleSelectDestination = (destination) => {
    setSelectedDestination(destination);
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-background px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm">
            Explore
          </p>

          <h1 className="mx-auto mt-2 max-w-3xl font-heading text-[2.35rem] font-bold leading-tight text-text sm:text-5xl">
            Discover your next destination.
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-text/60 sm:mt-5 sm:text-lg sm:leading-8">
            Find beautiful places, get inspired, and choose where your next
            adventure will take you.
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.15,
            ease: "easeOut",
          }}
          className="mx-auto mt-8 w-full max-w-2xl sm:mt-10"
        >
          <div className="flex items-center gap-3 rounded-[14px] border border-primary/10 bg-white px-4 py-3.5 shadow-sm transition focus-within:border-primary focus-within:shadow-md sm:rounded-[16px] sm:px-5 sm:py-4 dark:bg-[#271A20]">
            <Search
              size={20}
              className="shrink-0 text-primary sm:h-[22px] sm:w-[22px]"
            />

            <input
              type="text"
              placeholder="Search destinations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="min-w-0 w-full bg-transparent text-sm text-text outline-none placeholder:text-text/40 dark:text-[#FFF1F5] dark:placeholder:text-[#D1B8C1]"
            />
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.25,
            ease: "easeOut",
          }}
          className="mt-8 flex flex-wrap justify-center gap-2.5 sm:mt-10 sm:gap-3"
        >
          {[
            "All",
            "Beach",
            "Cities",
            "Nature",
            "Adventure",
            "Romantic",
          ].map((item) => (
            <motion.button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition sm:px-5 sm:py-2.5 sm:text-sm ${
                category === item
                  ? "bg-primary text-white shadow-sm hover:bg-primary-dark"
                  : "border border-primary/15 bg-white text-text hover:border-primary hover:bg-soft-pink dark:bg-[#271A20] dark:text-[#FFF1F5]"
              }`}
            >
              {item}
            </motion.button>
          ))}
        </motion.div>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mt-14 sm:mt-16"
        >
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm">
                Destinations
              </p>

              <h2 className="mt-2 font-heading text-2xl font-bold text-text sm:text-3xl">
                Explore places you’ll love
              </h2>
            </div>

            <div className="hidden shrink-0 items-center gap-2 text-sm text-text/50 sm:flex">
              <MapPin size={16} />
              <span>{filteredDestinations.length} destinations</span>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2 text-xs text-text/50 sm:hidden">
            <MapPin size={14} />
            <span>{filteredDestinations.length} destinations</span>
          </div>
        </motion.div>

        {/* Destination Cards */}
        <div className="mt-7 grid gap-5 sm:mt-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {filteredDestinations.map((destination, index) => {
            const isFavorite = favorites.includes(destination.id);

            return (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.06,
                  ease: "easeOut",
                }}
                whileHover={{
                  y: -8,
                  scale: 1.015,
                }}
                className="group overflow-hidden rounded-[18px] border border-primary/10 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl sm:rounded-[20px] dark:bg-[#271A20]"
              >

                {/* Card Cover */}
                <div
                  className={`relative flex h-52 items-end ${destination.color} p-5 sm:h-64 sm:p-6`}
                >
                  <motion.button
                    type="button"
                    onClick={() => toggleFavorite(destination.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={
                      isFavorite
                        ? `Remove ${destination.name} from favorites`
                        : `Add ${destination.name} to favorites`
                    }
                    className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full shadow-sm transition ${
                      isFavorite
                        ? "bg-primary text-white"
                        : "bg-white/90 text-primary hover:bg-white"
                    }`}
                  >
                    <Heart
                      size={19}
                      fill={isFavorite ? "currentColor" : "none"}
                    />
                  </motion.button>

                  <div className="relative">
                    <p
                      className={`text-xs font-semibold sm:text-sm ${destination.cardTextClass}`}
                    >
                      {destination.country}
                    </p>

                    <h3
                      className={`mt-1 font-heading text-2xl font-bold sm:text-3xl ${destination.cardTextClass}`}
                    >
                      {destination.name}
                    </h3>
                  </div>
                </div>

                {/* Card Content */}
                <div className="bg-white p-5 dark:bg-[#271A20] sm:p-6">

                  <div
                    className={`mb-3 inline-flex rounded-full bg-soft-pink px-3 py-1 text-xs font-semibold dark:bg-[#42232F] ${destination.cardTextClass}`}
                  >
                    {destination.category}
                  </div>

                  <p
                    className={`text-sm leading-6 ${destination.cardTextClass}`}
                  >
                    {destination.description}
                  </p>

                  <Link
                    to={`/destination/${destination.id}`}
                    onClick={() => handleSelectDestination(destination)}
                    className={`mt-5 inline-flex items-center gap-2 text-sm font-semibold transition hover:opacity-75 ${destination.cardTextClass}`}
                  >
                    Explore destination

                    <motion.span
                      className="inline-flex"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRight size={16} />
                    </motion.span>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredDestinations.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 rounded-[20px] border border-primary/10 bg-white px-5 py-14 text-center shadow-sm sm:mt-10 sm:px-6 sm:py-16 dark:bg-[#271A20]"
          >
            <Search
              size={38}
              className="mx-auto text-primary/50"
            />

            <h3 className="mt-4 font-heading text-xl font-bold text-text dark:text-[#DFA0B5] sm:text-2xl">
              No destinations found
            </h3>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-text/50 dark:text-[#CFAEB9]">
              Try another destination, country, or category.
            </p>
          </motion.div>
        )}

      </div>
    </main>
  );
}

export default Explore;
