"use client";

import {
  FaCalendarDays,
  FaDollarSign,
  FaBookOpen,
  FaUser,
  FaPenToSquare,
  FaTrash,
  FaEyeSlash,
} from "react-icons/fa6";

export default function BookInfo({ book }) {
  const isOwner = false;
  const isAvailable = true;

  return (
    <div className="grid lg:grid-cols-2 gap-10">
      <div>
        <div className="rounded-3xl overflow-hidden shadow-lg">
          <img
            src={book.image}
            alt={book.title}
            className="w-full h-[500px] object-cover"
          />
        </div>
      </div>

      <div>
        <div className="badge badge-success mb-5">{book.status}</div>

        <h1 className="text-4xl font-bold">{book.title}</h1>

        <div className="space-y-4 mt-8">
          <div className="flex gap-3 items-center">
            <FaUser className="text-primary" />

            <span>Author: {book.author}</span>
          </div>

          <div className="flex gap-3 items-center">
            <FaBookOpen className="text-primary" />

            <span>Category: {book.category}</span>
          </div>

          <div className="flex gap-3 items-center">
            <FaDollarSign className="text-primary" />

            <span>Delivery Fee: ${book.fee}</span>
          </div>

          <div className="flex gap-3 items-center">
            <FaCalendarDays className="text-primary" />

            <span>Added: {book.date}</span>
          </div>
        </div>

        <div className="divider"></div>

        <p className="leading-8 text-base-content/80">{book.description}</p>

        {!isOwner && (
          <button disabled={!isAvailable} className="btn btn-primary mt-8">
            Request Delivery
          </button>
        )}

        {isOwner && (
          <div className="flex flex-wrap gap-4 mt-8">
            <button className="btn btn-info">
              <FaPenToSquare />
              Edit
            </button>

            <button className="btn btn-warning">
              <FaEyeSlash />
              Unpublish
            </button>

            <button className="btn btn-error">
              <FaTrash />
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
