"use client";

import { use } from "react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import EditBookForm from "@/components/dashboard/EditBookForm";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export default function EditBookPage({ params }) {
  const { id } = use(params);

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBook();
  }, []);

  const fetchBook = async () => {
    try {
      const res = await fetch(`${SERVER_URL}/books/${id}`);

      const data = await res.json();

      setBook(data);
    } catch (error) {
      toast.error("Failed to load book");
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

  if (!book) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold">Book Not Found</h2>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Edit Book</h1>

      <EditBookForm book={book} />
    </div>
  );
}
