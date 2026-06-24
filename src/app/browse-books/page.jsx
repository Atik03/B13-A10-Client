import BookCard from "@/components/books/BookCard";
import BookFilters from "@/components/books/BookFilters";
import BookPagination from "@/components/books/BookPagination";

export default function BrowseBooksPage() {
  const books = Array.from({ length: 12 });

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold">Browse Books</h1>

        <p className="mt-4 text-base-content/70">
          Discover books from local libraries and independent providers.
        </p>
      </div>

      <BookFilters />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
        {books.map((_, index) => (
          <BookCard key={index} />
        ))}
      </div>

      <BookPagination />
    </section>
  );
}
