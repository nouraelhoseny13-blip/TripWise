import { useMemo, useState } from "react";
import {
  BedDouble,
  Bus,
  Calculator,
  MapPin,
  Utensils,
} from "lucide-react";
import Button from "../components/Button";

function BudgetCalculator() {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState(5);
  const [travelers, setTravelers] = useState(1);

  const [hotel, setHotel] = useState(400);
  const [food, setFood] = useState(150);
  const [activities, setActivities] = useState(100);
  const [transport, setTransport] = useState(80);

  const total = useMemo(() => {
    return (
      Number(hotel) +
      Number(food) +
      Number(activities) +
      Number(transport)
    );
  }, [hotel, food, activities, transport]);

  const perPerson = travelers > 0 ? Math.round(total / travelers) : 0;

  return (
    <main className="min-h-screen overflow-x-hidden bg-background px-5 pb-16 pt-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm">
            Budget Calculator
          </p>

          <h1 className="mt-2 font-heading text-[2.35rem] font-bold leading-tight text-text sm:text-5xl">
            Plan your budget with confidence.
          </h1>

          <p className="mt-4 text-base leading-7 text-text/60 sm:mt-5 sm:text-lg sm:leading-8">
            Estimate your travel expenses and get a clear idea of how much
            your trip could cost.
          </p>
        </div>

        {/* Content */}
        <div className="mt-8 grid gap-5 sm:mt-12 sm:gap-8 lg:grid-cols-[1fr_360px]">

          {/* Calculator */}
          <section className="rounded-[22px] border border-primary/10 bg-white p-5 shadow-sm sm:rounded-[24px] sm:p-8">

            {/* Destination */}
            <div>
              <label className="text-sm font-semibold text-text">
                Destination
              </label>

              <div className="relative mt-3">
                <MapPin
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-primary"
                />

                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full appearance-none rounded-[12px] border border-primary/10 bg-background px-11 py-3.5 text-sm text-text outline-none transition focus:border-primary"
                >
                  <option value="">
                    Select a destination
                  </option>

                  <option value="Santorini">Santorini</option>
                  <option value="Paris">Paris</option>
                  <option value="Bali">Bali</option>
                  <option value="Kyoto">Kyoto</option>
                  <option value="Swiss Alps">Swiss Alps</option>
                  <option value="Cappadocia">Cappadocia</option>
                </select>
              </div>
            </div>

            {/* Trip Details */}
            <div className="mt-6 grid gap-5 sm:mt-8 sm:grid-cols-2">

              <div>
                <label className="text-sm font-semibold text-text">
                  Number of days
                </label>

                <input
                  type="number"
                  min="1"
                  max="30"
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                  className="mt-3 w-full rounded-[12px] border border-primary/10 bg-background px-4 py-3.5 text-sm text-text outline-none transition focus:border-primary"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-text">
                  Travelers
                </label>

                <input
                  type="number"
                  min="1"
                  max="20"
                  value={travelers}
                  onChange={(e) =>
                    setTravelers(Number(e.target.value))
                  }
                  className="mt-3 w-full rounded-[12px] border border-primary/10 bg-background px-4 py-3.5 text-sm text-text outline-none transition focus:border-primary"
                />
              </div>

            </div>

            {/* Expenses */}
            <div className="mt-8 sm:mt-10">

              <div className="flex items-center gap-2">
                <Calculator size={19} className="text-primary" />

                <h2 className="font-heading text-2xl font-bold text-text">
                  Estimated expenses
                </h2>
              </div>

              {/* Hotel */}
              <div className="mt-6">
                <label className="flex items-center gap-2 text-sm font-semibold text-text">
                  <BedDouble size={17} className="text-primary" />
                  Hotel
                </label>

                <div className="relative mt-3">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-text/40">
                    $
                  </span>

                  <input
                    type="number"
                    min="0"
                    value={hotel}
                    onChange={(e) => setHotel(e.target.value)}
                    className="w-full rounded-[12px] border border-primary/10 bg-background py-3.5 pl-9 pr-4 text-sm text-text outline-none transition focus:border-primary"
                  />
                </div>
              </div>

              {/* Food */}
              <div className="mt-5">
                <label className="flex items-center gap-2 text-sm font-semibold text-text">
                  <Utensils size={17} className="text-primary" />
                  Food
                </label>

                <div className="relative mt-3">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-text/40">
                    $
                  </span>

                  <input
                    type="number"
                    min="0"
                    value={food}
                    onChange={(e) => setFood(e.target.value)}
                    className="w-full rounded-[12px] border border-primary/10 bg-background py-3.5 pl-9 pr-4 text-sm text-text outline-none transition focus:border-primary"
                  />
                </div>
              </div>

              {/* Activities */}
              <div className="mt-5">
                <label className="text-sm font-semibold text-text">
                  Activities
                </label>

                <div className="relative mt-3">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-text/40">
                    $
                  </span>

                  <input
                    type="number"
                    min="0"
                    value={activities}
                    onChange={(e) => setActivities(e.target.value)}
                    className="w-full rounded-[12px] border border-primary/10 bg-background py-3.5 pl-9 pr-4 text-sm text-text outline-none transition focus:border-primary"
                  />
                </div>
              </div>

              {/* Transport */}
              <div className="mt-5">
                <label className="flex items-center gap-2 text-sm font-semibold text-text">
                  <Bus size={17} className="text-primary" />
                  Transport
                </label>

                <div className="relative mt-3">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-text/40">
                    $
                  </span>

                  <input
                    type="number"
                    min="0"
                    value={transport}
                    onChange={(e) => setTransport(e.target.value)}
                    className="w-full rounded-[12px] border border-primary/10 bg-background py-3.5 pl-9 pr-4 text-sm text-text outline-none transition focus:border-primary"
                  />
                </div>
              </div>

            </div>

            {/* Calculate */}
            <div className="mt-7 sm:mt-8">
              <Button
                size="large"
                className="w-full sm:w-auto"
              >
                Calculate Budget
              </Button>
            </div>

          </section>

          {/* Summary */}
          <aside className="h-fit rounded-[22px] border border-primary/10 bg-white p-5 shadow-sm sm:rounded-[24px] sm:p-8">

            <p className="text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm">
              Budget Summary
            </p>

            <h2 className="mt-2 font-heading text-3xl font-bold text-text">
              ${total}
            </h2>

            <p className="mt-2 text-sm text-text/50">
              Estimated total trip cost
            </p>

            <div className="mt-6 space-y-3 sm:mt-8">

              <div className="flex items-center justify-between gap-4 border-b border-primary/10 pb-3">
                <span className="text-sm text-text/60">
                  Hotel
                </span>

                <span className="text-sm font-semibold text-text">
                  ${hotel || 0}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 border-b border-primary/10 pb-3">
                <span className="text-sm text-text/60">
                  Food
                </span>

                <span className="text-sm font-semibold text-text">
                  ${food || 0}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 border-b border-primary/10 pb-3">
                <span className="text-sm text-text/60">
                  Activities
                </span>

                <span className="text-sm font-semibold text-text">
                  ${activities || 0}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-text/60">
                  Transport
                </span>

                <span className="text-sm font-semibold text-text">
                  ${transport || 0}
                </span>
              </div>

            </div>

            <div className="mt-6 rounded-[16px] bg-soft-pink p-5 sm:mt-8">
              <p className="text-xs text-text/50">
                Estimated cost per traveler
              </p>

              <p className="mt-1 font-heading text-2xl font-bold text-primary-dark">
                ${perPerson}
              </p>
            </div>

            <p className="mt-5 text-xs leading-5 text-text/40">
              This is an estimated budget for planning purposes. Actual
              prices may vary depending on your destination and travel dates.
            </p>

          </aside>

        </div>
      </div>
    </main>
  );
}

export default BudgetCalculator;
