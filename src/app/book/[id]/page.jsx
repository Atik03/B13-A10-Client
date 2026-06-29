"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import BookInfo from "@/components/books/BookInfo";
import ReviewSection from "@/components/books/ReviewSection";

export default function BookDetailsPage() {
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchBook();
    }
  }, [id]);

  const fetchBook = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/books/${id}`,
      );

      const data = await response.json();

      setBook(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!book || book.success === false) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold">Book Not Found</h2>

        <p className="mt-3 text-gray-500">
          This book does not exist or has been removed.
        </p>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <BookInfo book={book} />

      <ReviewSection book={book._id} />
    </section>
  );
}
