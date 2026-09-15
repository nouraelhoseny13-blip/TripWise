import { Star } from "lucide-react";

function Rating({
  value = 4.8,
  reviews = 120,
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        <Star
          size={17}
          className="fill-primary text-primary"
        />

        <span className="text-sm font-semibold text-text">
          {value}
        </span>
      </div>

      <span className="text-sm text-text/50">
        ({reviews} reviews)
      </span>
    </div>
  );
}

export default Rating;