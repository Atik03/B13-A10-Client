"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";
import MyReviewCard from "./MyReviewCard";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export default function MyReviewsPage() {
  const { data: session } = authClient.useSession();

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editing, setEditing] = useState(null);

  const [deleteReview, setDeleteReview] = useState(null);

  useEffect(() => {
    if (session?.user?.email) {
      fetchReviews();
    }
  }, [session]);

  const fetchReviews = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${SERVER_URL}/user/reviews/${session.user.email}`,
      );

      const data = await res.json();

      setReviews(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`${SERVER_URL}/reviews/${deleteReview._id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.deletedCount > 0 || data.success) {
        toast.success("Review Deleted Successfully");

        setDeleteReview(null);

        fetchReviews();
      } else {
        toast.error("Delete Failed");
      }
    } catch (error) {
      toast.error("Delete Failed");
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`${SERVER_URL}/reviews/${editing._id}`, {
        method: "PATCH",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          rating: editing.rating,
          comment: editing.comment,
        }),
      });

      const data = await res.json();

      if (data.modifiedCount > 0 || data.success) {
        toast.success("Review Updated Successfully");

        setEditing(null);

        fetchReviews();
      } else {
        toast.error("Update Failed");
      }
    } catch (error) {
      toast.error("Update Failed");
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
      <h1 className="text-3xl font-bold mb-8">My Reviews</h1>

      {reviews.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold">No Reviews Yet</h2>

          <p className="opacity-70 mt-2">
            Your submitted reviews will appear here.
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {reviews.map((review) => (
            <MyReviewCard
              key={review._id}
              review={review}
              onEdit={setEditing}
              onDelete={setDeleteReview}
            />
          ))}
        </div>
      )}

      {editing && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-xl">Edit Review</h3>

            <select
              className="select select-bordered w-full mt-5"
              value={editing.rating}
              onChange={(e) =>
                setEditing({
                  ...editing,
                  rating: Number(e.target.value),
                })
              }
            >
              <option value={5}>★★★★★</option>
              <option value={4}>★★★★☆</option>
              <option value={3}>★★★☆☆</option>
              <option value={2}>★★☆☆☆</option>
              <option value={1}>★☆☆☆☆</option>
            </select>

            <textarea
              className="textarea textarea-bordered w-full mt-5"
              rows={5}
              value={editing.comment}
              onChange={(e) =>
                setEditing({
                  ...editing,
                  comment: e.target.value,
                })
              }
            />

            <div className="modal-action">
              <button className="btn" onClick={() => setEditing(null)}>
                Cancel
              </button>

              <button onClick={handleUpdate} className="btn btn-primary">
                Save Changes
              </button>
            </div>
          </div>
        </dialog>
      )}

      {deleteReview && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-xl text-error">Delete Review</h3>

            <p className="py-5">
              Are you sure you want to delete this review?
              <br />
              <span className="font-semibold">"{deleteReview.title}"</span>
            </p>

            <div className="modal-action">
              <button className="btn" onClick={() => setDeleteReview(null)}>
                Cancel
              </button>

              <button onClick={handleDelete} className="btn btn-error">
                Delete
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}
