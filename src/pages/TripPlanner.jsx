import { useMemo, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Check,
  MapPin,
  Save,
  Users,
  Wallet,
} from "lucide-react";

import Button from "../components/Button";

function TripPlanner() {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState(5);
  const [travelers, setTravelers] = useState(1);

  const [selectedActivities, setSelectedActivities] = useState([]);
  const [saveMessage, setSaveMessage] = useState("");

  const destinations = [
    "Santorini",
    "Paris",
    "Bali",
    "Kyoto",
    "Swiss Alps",
    "Cappadocia",
  ];

  const activities = [
    {
      id: 1,
      name: "City Tour",
      price: 40,
    },
    {
      id: 2,
      name: "Museum Visit",
      price: 25,
    },
    {
      id: 3,
      name: "Boat Trip",
      price: 60,
    },
    {
      id: 4,
      name: "Food Experience",
      price: 35,
    },
    {
      id: 5,
      name: "Adventure Activity",
      price: 50,
    },
    {
      id: 6,
      name: "Beach Day",
      price: 20,
    },
  ];

  const prices = {
    hotelPerDay: 80,
    foodPerDayPerPerson: 30,
    transportPerPerson: 80,
  };

  const toggleActivity = (activityId) => {
    setSelectedActivities((currentActivities) => {
      if (currentActivities.includes(activityId)) {
        return currentActivities.filter((id) => id !== activityId);
      }

      return [...currentActivities, activityId];
    });

    setSaveMessage("");
  };

  const budget = useMemo(() => {
    const safeDays = Math.max(1, Number(days) || 1);
    const safeTravelers = Math.max(1, Number(travelers) || 1);

    const hotel = prices.hotelPerDay * safeDays;

    const food =
      prices.foodPerDayPerPerson *
      safeDays *
      safeTravelers;

    const selectedActivityPrice = activities
      .filter((activity) => selectedActivities.includes(activity.id))
      .reduce((total, activity) => total + activity.price, 0);

    const activityTotal =
      selectedActivityPrice * safeTravelers;

    const transport =
      prices.transportPerPerson * safeTravelers;

    const total =
      hotel +
      food +
      activityTotal +
      transport;

    const perPerson = total / safeTravelers;

    return {
      hotel,
      food,
      activities: activityTotal,
      transport,
      total,
      perPerson,
    };
  }, [days, travelers, selectedActivities]);

  const handleSaveTrip = () => {
    if (!destination) {
      setSaveMessage("Please select a destination first.");
      return;
    }

    const savedTrips = JSON.parse(
      localStorage.getItem("tripwise_saved_trips") || "[]"
    );

    const newTrip = {
      id: Date.now(),
      destination,
      days,
      travelers,
      activities: selectedActivities,
      budget: {
        hotel: budget.hotel,
        food: budget.food,
        activities: budget.activities,
        transport: budget.transport,
        total: budget.total,
        perPerson: budget.perPerson,
      },
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "tripwise_saved_trips",
      JSON.stringify([...savedTrips, newTrip])
    );

    setSaveMessage("Trip saved successfully!");
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-background px-5 pb-16 pt-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm">
            Trip Planner
          </p>

          <h1 className="mt-2 font-heading text-[2.35rem] font-bold leading-tight text-text sm:text-5xl">
            Plan your perfect trip.
          </h1>

          <p className="mt-4 text-base leading-7 text-text/60 sm:mt-5 sm:text-lg sm:leading-8">
            Choose your destination, set your travel details, select your
            activities, and estimate your trip budget.
          </p>
        </div>

        <div className="mt-8 grid gap-5 sm:mt-12 sm:gap-8 lg:grid-cols-[1fr_360px]">

          {/* Main Planner */}
          <section className="rounded-[22px] border border-primary/10 bg-white p-5 shadow-sm sm:rounded-[24px] sm:p-8">

            {/* Destination */}
            <div>
              <label className="text-sm font-semibold text-text">
                Where do you want to go?
              </label>

              <div className="relative mt-3">
                <MapPin
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-primary"
                />

                <select
                  value={destination}
                  onChange={(e) => {
                    setDestination(e.target.value);
                    setSaveMessage("");
                  }}
                  className="w-full appearance-none rounded-[12px] border border-primary/10 bg-background px-11 py-3.5 text-sm text-text outline-none transition focus:border-primary"
                >
                  <option value="">
                    Select a destination
                  </option>

                  {destinations.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Days */}
            <div className="mt-6 sm:mt-8">
              <label className="text-sm font-semibold text-text">
                How many days?
              </label>

              <div className="relative mt-3">
                <CalendarDays
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-primary"
                />

                <input
                  type="number"
                  min="1"
                  max="30"
                  value={days}
                  onChange={(e) => {
                    setDays(Number(e.target.value));
                    setSaveMessage("");
                  }}
                  className="w-full rounded-[12px] border border-primary/10 bg-background px-11 py-3.5 text-sm text-text outline-none transition focus:border-primary"
                />
              </div>
            </div>

            {/* Travelers */}
            <div className="mt-6 sm:mt-8">
              <label className="text-sm font-semibold text-text">
                Number of travelers
              </label>

              <div className="relative mt-3">
                <Users
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-primary"
                />

                <input
                  type="number"
                  min="1"
                  max="20"
                  value={travelers}
                  onChange={(e) => {
                    setTravelers(Number(e.target.value));
                    setSaveMessage("");
                  }}
                  className="w-full rounded-[12px] border border-primary/10 bg-background px-11 py-3.5 text-sm text-text outline-none transition focus:border-primary"
                />
              </div>
            </div>

            {/* Activities */}
            <div className="mt-8 sm:mt-10">

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm">
                    Activities
                  </p>

                  <h2 className="mt-2 font-heading text-2xl font-bold text-text">
                    Choose your experiences
                  </h2>
                </div>

                <span className="w-fit rounded-full bg-soft-pink px-3 py-1 text-xs font-semibold text-primary-dark">
                  {selectedActivities.length} selected
                </span>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">

                {activities.map((activity) => {
                  const isSelected = selectedActivities.includes(activity.id);

                  return (
                    <button
                      key={activity.id}
                      type="button"
                      onClick={() => toggleActivity(activity.id)}
                      className={`flex min-h-[72px] items-center justify-between gap-3 rounded-[14px] border p-4 text-left transition ${
                        isSelected
                          ? "border-primary bg-soft-pink"
                          : "border-primary/10 bg-background hover:border-primary/40"
                      }`}
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-text">
                          {activity.name}
                        </p>

                        <p className="mt-1 text-xs text-text/50">
                          ${activity.price} / person
                        </p>
                      </div>

                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                          isSelected
                            ? "bg-primary text-white"
                            : "bg-white text-text/20"
                        }`}
                      >
                        <Check size={16} />
                      </div>
                    </button>
                  );
                })}

              </div>
            </div>

            {/* Budget */}
            <div className="mt-8 sm:mt-10">

              <div className="flex items-center gap-2">
                <Wallet size={19} className="text-primary" />

                <h2 className="font-heading text-2xl font-bold text-text">
                  Estimated Budget
                </h2>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">

                <div className="rounded-[14px] bg-background p-4">
                  <p className="text-xs text-text/50">
                    Hotel
                  </p>

                  <p className="mt-1 text-lg font-semibold text-text">
                    ${budget.hotel}
                  </p>
                </div>

                <div className="rounded-[14px] bg-background p-4">
                  <p className="text-xs text-text/50">
                    Food
                  </p>

                  <p className="mt-1 text-lg font-semibold text-text">
                    ${budget.food}
                  </p>
                </div>

                <div className="rounded-[14px] bg-background p-4">
                  <p className="text-xs text-text/50">
                    Activities
                  </p>

                  <p className="mt-1 text-lg font-semibold text-text">
                    ${budget.activities}
                  </p>
                </div>

                <div className="rounded-[14px] bg-background p-4">
                  <p className="text-xs text-text/50">
                    Transport
                  </p>

                  <p className="mt-1 text-lg font-semibold text-text">
                    ${budget.transport}
                  </p>
                </div>

              </div>
            </div>

            {/* Actions */}
            <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row">

              <Button
                size="large"
                className="w-full sm:w-auto"
              >
                Calculate Budget
                <ArrowRight size={18} className="ml-2" />
              </Button>

              <Button
                size="large"
                variant="secondary"
                onClick={handleSaveTrip}
                className="w-full sm:w-auto"
              >
                <Save size={18} className="mr-2" />
                Save Trip
              </Button>

            </div>

            {saveMessage && (
              <div
                className={`mt-4 rounded-[12px] px-4 py-3 text-sm font-medium ${
                  saveMessage.includes("successfully")
                    ? "bg-soft-pink text-primary-dark"
                    : "bg-[#FFF1F3] text-primary-dark"
                }`}
              >
                {saveMessage}
              </div>
            )}

          </section>

          {/* Summary */}
          <aside className="h-fit rounded-[22px] border border-primary/10 bg-white p-5 shadow-sm sm:rounded-[24px] sm:p-8">

            <p className="text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm">
              Trip Summary
            </p>

            <h2 className="mt-2 font-heading text-2xl font-bold text-text">
              Your trip
            </h2>

            <div className="mt-5 rounded-[14px] bg-soft-pink p-4 sm:mt-6">
              <p className="text-xs text-text/50">
                Destination
              </p>

              <p className="mt-1 break-words font-semibold text-text">
                {destination || "Not selected"}
              </p>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3">

              <div className="rounded-[14px] bg-background p-4">
                <p className="text-xs text-text/50">
                  Days
                </p>

                <p className="mt-1 font-semibold text-text">
                  {days}
                </p>
              </div>

              <div className="rounded-[14px] bg-background p-4">
                <p className="text-xs text-text/50">
                  Travelers
                </p>

                <p className="mt-1 font-semibold text-text">
                  {travelers}
                </p>
              </div>

            </div>

            <div className="mt-3 rounded-[14px] bg-background p-4">
              <p className="text-xs text-text/50">
                Activities
              </p>

              <p className="mt-1 font-semibold text-text">
                {selectedActivities.length} selected
              </p>
            </div>

            <div className="mt-5 rounded-[18px] bg-primary p-5 text-white sm:mt-6">

              <p className="text-sm text-white/75">
                Estimated total
              </p>

              <p className="mt-1 font-heading text-3xl font-bold sm:text-4xl">
                ${budget.total}
              </p>

              <p className="mt-2 text-sm leading-5 text-white/75">
                Approximately ${Math.round(budget.perPerson)} per person
              </p>

            </div>

          </aside>

        </div>
      </div>
    </main>
  );
}

export default TripPlanner;
