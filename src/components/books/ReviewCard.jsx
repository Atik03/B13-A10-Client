"use client";

import { FaStar, FaUser, FaPen, FaTrash } from "react-icons/fa6";
import { authClient } from "@/lib/auth-client";

export default function ReviewCard({ review, onEdit, onDelete }) {
  const { data: session } = authClient.useSession();

  const isOwner = session?.user?.email === review.userEmail;

  return (
    <div className="card bg-base-100 shadow-md">
      <div className="card-body">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <div className="avatar">
              <div className="w-14 rounded-full bg-base-300 flex items-center justify-center">
                <FaUser />
              </div>
            </div>

            <div>
              <h3 className="font-bold">{review.userName}</h3>

              <div className="flex gap-1 text-warning">
                {[...Array(review.rating)].map((_, index) => (
                  <FaStar key={index} />
                ))}
              </div>
            </div>
          </div>

          {isOwner && (
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(review)}
                className="btn btn-xs btn-info"
              >
                <FaPen />
              </button>

              <button
                onClick={() => onDelete(review._id)}
                className="btn btn-xs btn-error"
              >
                <FaTrash />
              </button>
            </div>
          )}
        </div>

        <p className="mt-4 text-base-content/70">{review.comment}</p>

        <p className="text-sm opacity-60 mt-2">
          {new Date(review.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
