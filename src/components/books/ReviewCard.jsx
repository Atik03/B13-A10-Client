import ReviewCard from "./ReviewCard";

export default function ReviewSection() {
  const reviews = [1, 2, 3];

  return (
    <section className="mt-20">
      <h2 className="text-3xl font-bold mb-10">Reader Reviews</h2>

      <div className="grid gap-6">
        {reviews.map((review) => (
          <ReviewCard key={review} />
        ))}
      </div>
    </section>
  );
}
