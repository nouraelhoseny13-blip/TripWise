import { useEffect, useState } from "react";
import {
  CalendarDays,
  MapPin,
  Users,
  Wallet,
  Trash2,
  Heart,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function SavedTrips() {
  const [savedTrips, setSavedTrips] = useState([]);

  useEffect(() => {
    const trips = JSON.parse(
      localStorage.getItem("tripwise_saved_trips") || "[]"
    );

    setSavedTrips(trips);
  }, []);

  const handleDeleteTrip = (tripId) => {
    const updatedTrips = savedTrips.filter(
      (trip) => trip.id !== tripId
    );

    localStorage.setItem(
      "tripwise_saved_trips",
      JSON.stringify(updatedTrips)
    );

    setSavedTrips(updatedTrips);
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-background px-5 pb-16 pt-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm">
            Saved Trips
          </p>

          <h1 className="mt-2 font-heading text-[2.35rem] font-bold leading-tight text-text sm:text-5xl">
            Your saved journeys.
          </h1>

          <p className="mt-4 text-base leading-7 text-text/60 sm:mt-5 sm:text-lg sm:leading-8">
            Keep your favorite travel plans in one place and come back to them
            whenever you need.
          </p>
        </div>

        {/* Empty State */}
        {savedTrips.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              ease: "easeOut",
            }}
            className="relative mt-8 overflow-hidden rounded-[22px] border border-primary/10 bg-white px-5 py-16 text-center shadow-sm sm:mt-12 sm:rounded-[24px] sm:px-6 sm:py-20"
          >
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-soft-pink/70 blur-3xl" />

            <div className="absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: 0.15,
                duration: 0.4,
              }}
              className="relative mx-auto flex h-18 w-18 items-center justify-center rounded-full bg-soft-pink text-primary sm:h-20 sm:w-20"
            >
              <Heart
                size={30}
                fill="currentColor"
                className="sm:h-[34px] sm:w-[34px]"
              />
            </motion.div>

            <div className="relative">
              <h2 className="mt-6 font-heading text-2xl font-bold text-text sm:text-3xl">
                No saved trips yet
              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-text/60">
                Your next adventure is waiting. Start planning a trip and save
                it here so you can easily find it later.
              </p>

              <Link
                to="/planner"
                className="mt-7 inline-flex w-full items-center justify-center rounded-[12px] bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-dark hover:shadow-md sm:w-auto"
              >
                Start Planning
              </Link>
            </div>
          </motion.div>
        ) : (
          /* Saved Trips */
          <div className="mt-8 grid gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {savedTrips.map((trip, index) => (
              <motion.article
                key={trip.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.06,
                  ease: "easeOut",
                }}
                whileHover={{
                  y: -6,
                }}
                className="overflow-hidden rounded-[22px] border border-primary/10 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg sm:rounded-[24px]"
              >
                {/* Card Header */}
                <div className="bg-soft-pink p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-primary-dark sm:text-sm">
                        Destination
                      </p>

                      <h2 className="mt-1 break-words font-heading text-2xl font-bold text-text sm:text-3xl">
                        {trip.destination}
                      </h2>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeleteTrip(trip.id)}
                      aria-label={`Delete ${trip.destination} trip`}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-primary transition hover:bg-primary hover:text-white"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 sm:p-6">

                  {/* Days + Travelers */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-[14px] bg-background p-3.5 sm:p-4">
                      <div className="flex items-center gap-2 text-primary">
                        <CalendarDays size={17} />

                        <span className="text-xs font-medium">
                          Days
                        </span>
                      </div>

                      <p className="mt-2 font-semibold text-text">
                        {trip.days}
                      </p>
                    </div>

                    <div className="rounded-[14px] bg-background p-3.5 sm:p-4">
                      <div className="flex items-center gap-2 text-primary">
                        <Users size={17} />

                        <span className="text-xs font-medium">
                          Travelers
                        </span>
                      </div>

                      <p className="mt-2 font-semibold text-text">
                        {trip.travelers}
                      </p>
                    </div>
                  </div>

                  {/* Budget */}
                  <div className="mt-3 rounded-[14px] bg-background p-3.5 sm:p-4">
                    <div className="flex items-center gap-2 text-primary">
                      <Wallet size={17} />

                      <span className="text-xs font-medium">
                        Total Budget
                      </span>
                    </div>

                    <p className="mt-2 font-heading text-2xl font-bold text-text">
                      ${trip.budget.total}
                    </p>

                    <p className="mt-1 text-xs text-text/50">
                      Approximately $
                      {Math.round(trip.budget.perPerson)} per person
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-text/50">
                    <span>
                      {trip.activities?.length || 0} activities
                    </span>

                    <span>
                      {new Date(trip.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default SavedTrips;
