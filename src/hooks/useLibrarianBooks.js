"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export default function useLibrarianBooks() {
  const { data: session } = authClient.useSession();

  const user = session?.user;

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const loadBooks = async () => {
      try {
        const res = await fetch(`${SERVER_URL}/librarian-books/${user.email}`);

        const data = await res.json();

        setBooks(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [user]);

  return {
    books,
    loading,
  };
}
