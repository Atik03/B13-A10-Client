"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { FaBookOpen } from "react-icons/fa6";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export default function FeaturedBooks() {
  const [books, setBooks] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${SERVER_URL}/featured-books`);

      const data = await res.json();

      setBooks(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold">Featured Books</h2>

        <p className="mt-4 text-base-content/70">
          Discover our latest published books.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {books.map((book) => (
          <div
            key={book._id}
            className="card bg-base-100 shadow-lg hover:shadow-2xl duration-300"
          >
            <figure className="relative h-72">
              <Image
                src={book.image}
                alt={book.title}
                fill
                className="object-cover"
              />
            </figure>

            <div className="card-body">
              <h2 className="card-title line-clamp-1">{book.title}</h2>

              <p className="flex items-center gap-2 text-sm opacity-70">
                <FaBookOpen />
                {book.category}
              </p>

              <div className="mt-3 space-y-2 text-sm">
                <p>
                  <span className="font-semibold">Author:</span> {book.author}
                </p>

                <p>
                  <span className="font-semibold">Delivery Fee:</span> $
                  {book.deliveryFee}
                </p>

                <p>
                  <span className="badge badge-success">
                    {book.availability}
                  </span>
                </p>
              </div>

              <div className="card-actions justify-end mt-5">
                <Link href={`/book/${book._id}`}>
                  <button className="btn btn-primary btn-sm">Details</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {books.length === 0 && (
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold">No Featured Books Found</h2>
        </div>
      )}
    </section>
  );
}
