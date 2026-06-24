import BookInfo from "@/components/books/BookInfo";
import ReviewSection from "@/components/books/ReviewSection";

export default function BookDetailsPage() {
  const book = {
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self Development",
    description:
      "An easy and proven way to build good habits and break bad ones.",
    fee: 5,
    status: "Available",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f",
    date: "20 Aug 2026",
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <BookInfo book={book} />

      <ReviewSection />
    </section>
  );
}
