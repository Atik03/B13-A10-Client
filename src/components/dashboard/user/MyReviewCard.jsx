"use client";

import { FaStar, FaPen, FaTrash } from "react-icons/fa6";

export default function MyReviewCard({ review, onEdit, onDelete }) {
  return (
    <div className="card bg-base-100 shadow-lg">
      <div className="card-body">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="card-title">{review.title}</h2>

            <div className="flex gap-1 text-warning mt-2">
              {[...Array(review.rating)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onEdit(review)}
              className="btn btn-info btn-sm"
            >
              <FaPen />
            </button>

            <button
              onClick={() => onDelete(review)}
              className="btn btn-error btn-sm"
            >
              <FaTrash />
            </button>
          </div>
        </div>

        <p className="mt-5">{review.comment}</p>

        <p className="text-sm opacity-60 mt-4">
          {new Date(review.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
