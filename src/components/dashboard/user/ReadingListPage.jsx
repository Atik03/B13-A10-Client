"use client";

import { useEffect, useState } from "react";

import { authClient } from "@/lib/auth-client";

import ReadingBookCard from "./ReadingBookCard";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export default function ReadingListPage() {
  const { data: session } = authClient.useSession();

  const [books, setBooks] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.email) {
      fetchReadingList();
    }
  }, [session]);

  const fetchReadingList = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${SERVER_URL}/user/reading-list/${session.user.email}`,
      );

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
      <div className="flex justify-center items-center h-[70vh]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">My Reading List</h1>

      {books.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold">No Books Yet</h2>

          <p className="opacity-70 mt-2">Delivered books will appear here.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {books.map((book) => (
            <ReadingBookCard key={book._id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}
