import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";

const destinations = [
  {
    name: "Santorini",
    country: "Greece",
    description:
      "Discover whitewashed villages, beautiful views, and unforgettable sunsets.",
    background: "bg-soft-pink",
  },
  {
    name: "Paris",
    country: "France",
    description:
      "Experience timeless streets, charming cafés, art, and unforgettable moments.",
    background: "bg-[#FDECEF]",
  },
  {
    name: "Bali",
    country: "Indonesia",
    description:
      "Relax among tropical landscapes, peaceful beaches, and beautiful nature.",
    background: "bg-[#FCE8E2]",
  },
];

const heroContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const heroItem = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const cardContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardItem = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: "easeOut",
    },
  },
};

function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background">

      {/* Hero Section */}
      <section className="relative overflow-hidden px-5 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-16 lg:px-8 lg:pb-28 lg:pt-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-16">

          {/* Hero Content */}
          <motion.div
            variants={heroContainer}
            initial="hidden"
            animate="show"
            className="max-w-2xl"
          >
            <motion.div
              variants={heroItem}
              className="mb-5 inline-flex items-center gap-2 rounded-full bg-soft-pink px-3.5 py-2 text-xs font-medium text-primary-dark sm:mb-6 sm:px-4 sm:text-sm"
            >
              <MapPin size={15} />
              Plan smarter. Travel better.
            </motion.div>

            <motion.h1
              variants={heroItem}
              className="font-heading text-[2.7rem] font-bold leading-[1.1] text-text sm:text-5xl sm:leading-tight lg:text-7xl"
            >
              Your next
              <span className="text-primary"> adventure </span>
              starts here.
            </motion.h1>

            <motion.p
              variants={heroItem}
              className="mt-5 max-w-xl text-base leading-7 text-text/70 sm:mt-6 sm:text-lg sm:leading-8"
            >
              Discover beautiful destinations, organize your perfect itinerary,
              and keep all your travel plans in one place.
            </motion.p>

            <motion.div
              variants={heroItem}
              className="mt-7 flex w-full flex-col gap-3 sm:mt-8 sm:w-auto sm:flex-row"
            >
              <Link
                to="/planner"
                className="inline-flex w-full items-center justify-center gap-2 rounded-[10px] bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-md sm:w-auto"
              >
                Start Planning
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/explore"
                className="inline-flex w-full items-center justify-center rounded-[10px] border border-primary/20 bg-white px-6 py-3.5 text-sm font-semibold text-text shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-primary hover:bg-soft-pink hover:shadow-sm sm:w-auto"
              >
                Explore Destinations
              </Link>
            </motion.div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, x: 35, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.35,
              ease: "easeOut",
            }}
            className="relative mx-auto w-full max-w-xl lg:max-w-none"
          >
            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -right-12 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl sm:-right-8 sm:-top-8 sm:h-40 sm:w-40"
            />

            <motion.div
              animate={{
                y: [0, 8, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -bottom-8 -left-10 h-32 w-32 rounded-full bg-soft-pink blur-3xl sm:-left-8 sm:h-40 sm:w-40"
            />

            <motion.div
              whileHover={{
                y: -6,
                rotate: 0.3,
              }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
              }}
              className="relative rounded-[20px] border border-primary/10 bg-white p-2.5 shadow-xl sm:rounded-[24px] sm:p-3"
            >
              <div className="flex aspect-[4/3] items-center justify-center rounded-[15px] bg-soft-pink sm:rounded-[18px]">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.8,
                    ease: "easeOut",
                  }}
                  className="px-4 text-center"
                >
                  <motion.div
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <MapPin
                      size={44}
                      className="mx-auto mb-3 text-primary sm:mb-4 sm:h-[52px] sm:w-[52px]"
                    />
                  </motion.div>

                  <p className="font-heading text-xl font-bold text-text sm:text-2xl">
                    Where will you go?
                  </p>

                  <p className="mt-2 text-xs text-text/60 sm:text-sm">
                    Your journey starts with a single idea.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* Popular Destinations */}
      <section className="px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-8 sm:mb-10"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm">
              Discover
            </p>

            <h2 className="mt-2 font-heading text-3xl font-bold text-text sm:text-4xl">
              Popular Destinations
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-text/60 sm:text-base">
              Find inspiration for your next unforgettable journey.
            </p>
          </motion.div>

          {/* Destination Cards */}
          <motion.div
            variants={cardContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
          >
            {destinations.map((destination) => (
              <motion.div
                key={destination.name}
                variants={cardItem}
                whileHover={{
                  y: -7,
                  transition: {
                    duration: 0.25,
                    ease: "easeOut",
                  },
                }}
                className="group overflow-hidden rounded-[18px] border border-primary/10 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg sm:rounded-[20px]"
              >
                <div
                  className={`flex h-48 items-end ${destination.background} p-5 transition-transform duration-500 group-hover:scale-[1.02] sm:h-56 sm:p-6`}
                >
                  <div>
                    <p className="text-xs font-medium text-primary-dark sm:text-sm">
                      {destination.country}
                    </p>

                    <h3 className="mt-1 font-heading text-xl font-bold text-text sm:text-2xl">
                      {destination.name}
                    </h3>
                  </div>
                </div>

                <div className="p-5">
                  <p className="text-sm leading-6 text-text/60">
                    {destination.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

    </main>
  );
}

export default Home;
