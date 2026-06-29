"use client";

import Image from "next/image";

import { FaBookOpen, FaUser, FaDollarSign } from "react-icons/fa6";

export default function ReadingBookCard({ book }) {
  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition">
      <figure>
        <Image
          src={book.image}
          alt={book.title}
          width={400}
          height={500}
          className="w-full h-72 object-cover"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title">{book.title}</h2>

        <div className="space-y-2 text-sm">
          <p className="flex items-center gap-2">
            <FaUser className="text-primary" />
            {book.author}
          </p>

          <p className="flex items-center gap-2">
            <FaBookOpen className="text-primary" />
            {book.category}
          </p>

          <p className="flex items-center gap-2">
            <FaDollarSign className="text-primary" />${book.deliveryFee}
          </p>
        </div>

        <div className="card-actions mt-5 justify-end">
          <div className="badge badge-success">Delivered</div>
        </div>
      </div>
    </div>
  );
}
