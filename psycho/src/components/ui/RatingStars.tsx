export function RatingStars({ rating, reviewsCount }: { rating: number; reviewsCount?: number }) {
  return (
    <span className="inline-flex items-center gap-1 text-[13px] text-sage-700">
      <span className="text-peach-dark">★</span>
      <span className="font-medium">{rating.toFixed(1)}</span>
      {reviewsCount !== undefined && <span className="text-sage-500">({reviewsCount})</span>}
    </span>
  );
}
