"use client";

import { useEffect, useState } from "react";

import BookCard from "@/components/books/BookCard";
import BookFilters from "@/components/books/BookFilters";
import BookPagination from "@/components/books/BookPagination";

export default function BrowseBooksPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    search: "",
    category: "",
    availability: "",
    sort: "latest",
  });

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchBooks();
  }, [filters, page]);

  const fetchBooks = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/books?search=${filters.search}&category=${filters.category}&availability=${filters.availability}&sort=${filters.sort}&page=${page}&limit=8`,
      );

      const data = await response.json();

      setBooks(data.books || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold">Browse Books</h1>

        <p className="mt-4 text-base-content/70">
          Discover books from local libraries and independent providers.
        </p>
      </div>

      <BookFilters
        onFilter={(data) => {
          setFilters(data);
          setPage(1);
        }}
      />

      {loading ? (
        <div className="flex justify-center py-20">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <>
          {books.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-2xl font-semibold">No Books Found</h2>

              <p className="text-gray-500 mt-2">
                Try changing your search or filters.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
                {books.map((book) => (
                  <BookCard key={book._id} book={book} />
                ))}
              </div>

              <BookPagination
                page={page}
                setPage={setPage}
                totalPages={totalPages}
              />
            </>
          )}
        </>
      )}
    </section>
  );
}
