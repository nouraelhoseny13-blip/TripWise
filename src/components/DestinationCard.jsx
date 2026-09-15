import { Link } from "react-router-dom";
import { Heart, ArrowRight } from "lucide-react";

function DestinationCard({
  destination,
  isFavorite = false,
  onToggleFavorite,
}) {
  return (
    <div className="group overflow-hidden rounded-[20px] border border-primary/10 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div
        className={`relative flex h-64 items-end ${destination.color} p-6`}
      >
        <button
          type="button"
          onClick={() => onToggleFavorite?.(destination.id)}
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
        </button>

        <div>
          <p className="text-sm font-medium text-primary-dark">
            {destination.country}
          </p>

          <h3 className="mt-1 font-heading text-3xl font-bold text-text">
            {destination.name}
          </h3>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-3 inline-flex rounded-full bg-soft-pink px-3 py-1 text-xs font-medium text-primary-dark">
          {destination.category}
        </div>

        <p className="text-sm leading-6 text-text/60">
          {destination.description}
        </p>

        <Link
          to={`/destination/${destination.id}`}
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:text-primary-dark"
        >
          Explore destination
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

export default DestinationCard;