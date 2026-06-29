"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-hot-toast";

import Image from "next/image";

import {
  FaCalendarDays,
  FaDollarSign,
  FaBookOpen,
  FaUser,
  FaBarcode,
  FaBoxesStacked,
} from "react-icons/fa6";

export default function BookInfo({ book }) {
  const { data: session } = authClient.useSession();

  const [buyLoading, setBuyLoading] = useState(false);

  const isAvailable =
    book.availability === "Available" &&
    book.status === "Published" &&
    book.quantity > 0;

  const handleBuyBook = async () => {
    if (!session?.user) {
      toast.error("Please login first");
      return;
    }

    try {
      setBuyLoading(true);

      const delivery = {
        bookId: book._id,

        title: book.title,
        image: book.image,
        author: book.author,
        category: book.category,

        deliveryFee: book.deliveryFee,

        librarianName: book.librarianName,
        librarianEmail: book.librarianEmail,

        userName: session.user.name,
        userEmail: session.user.email,

        status: "Pending",
        createdAt: new Date(),
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/deliveries`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(delivery),
        },
      );

      const data = await res.json();

      if (data.success) {
        toast.success("Book purchased successfully");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setBuyLoading(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-10">
      <div>
        <div className="rounded-3xl overflow-hidden shadow-lg bg-base-200">
          <Image
            src={book.image}
            alt={book.title}
            width={700}
            height={500}
            className="w-full h-[500px] object-cover"
          />
        </div>
      </div>

      <div>
        <div
          className={`badge mb-5 ${
            isAvailable ? "badge-success" : "badge-error"
          }`}
        >
          {book.availability}
        </div>

        <h1 className="text-4xl font-bold">{book.title}</h1>

        <div className="space-y-4 mt-8">
          <div className="flex items-center gap-3">
            <FaUser className="text-primary" />
            <span>
              <strong>Author:</strong> {book.author}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <FaBookOpen className="text-primary" />
            <span>
              <strong>Category:</strong> {book.category}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <FaBarcode className="text-primary" />
            <span>
              <strong>ISBN:</strong> {book.isbn}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <FaBoxesStacked className="text-primary" />
            <span>
              <strong>Quantity:</strong> {book.quantity}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <FaDollarSign className="text-primary" />
            <span>
              <strong>Delivery Fee:</strong> ${book.deliveryFee}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <FaCalendarDays className="text-primary" />
            <span>
              <strong>Added:</strong>{" "}
              {new Date(book.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="divider"></div>

        <h3 className="text-xl font-semibold mb-3">Description</h3>

        <p className="leading-8 text-base-content/80">{book.description}</p>

        <button
          onClick={handleBuyBook}
          disabled={!isAvailable || buyLoading}
          className="btn btn-primary mt-8"
        >
          {buyLoading ? (
            <>
              <span className="loading loading-spinner loading-sm"></span>
              Processing...
            </>
          ) : (
            "Buy Book"
          )}
        </button>

        {!isAvailable && (
          <p className="text-error mt-3 font-medium">
            This book is currently unavailable.
          </p>
        )}
      </div>
    </div>
  );
}
