"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";

import ReviewCard from "./ReviewCard";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export default function ReviewSection({ book }) {
  const { data: session } = authClient.useSession();

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const [editingReview, setEditingReview] = useState(null);

  useEffect(() => {
    fetchReviews();
  }, [book._id]);

  const fetchReviews = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${SERVER_URL}/reviews/${book._id}`);

      const data = await res.json();

      setReviews(data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!session) {
      return toast.error("Please login first");
    }

    if (!comment.trim()) {
      return toast.error("Write your review");
    }

    try {
      const review = {
        bookId: book._id,
        title: book.title,

        userName: session.user.name,
        userEmail: session.user.email,

        rating,
        comment,
      };

      const res = await fetch(`${SERVER_URL}/reviews`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(review),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Review Added");

        setComment("");
        setRating(5);

        fetchReviews();
      }
    } catch (error) {
      console.log(error);

      toast.error("Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${SERVER_URL}/reviews/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.deletedCount > 0) {
        toast.success("Review Deleted");

        fetchReviews();
      }
    } catch (error) {
      toast.error("Delete Failed");
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`${SERVER_URL}/reviews/${editingReview._id}`, {
        method: "PATCH",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          rating: editingReview.rating,
          comment: editingReview.comment,
        }),
      });

      const data = await res.json();

      if (data.modifiedCount > 0) {
        toast.success("Review Updated");

        setEditingReview(null);

        fetchReviews();
      }
    } catch (error) {
      toast.error("Update Failed");
    }
  };

  return (
    <section className="mt-20">
      <h2 className="text-3xl font-bold mb-8">Reader Reviews</h2>

      <div className="card bg-base-100 shadow-md mb-10">
        <div className="card-body">
          <h3 className="font-bold text-xl">Write a Review</h3>

          <select
            className="select select-bordered mt-4 w-full"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            <option value={5}>★★★★★</option>

            <option value={4}>★★★★☆</option>

            <option value={3}>★★★☆☆</option>

            <option value={2}>★★☆☆☆</option>

            <option value={1}>★☆☆☆☆</option>
          </select>

          <textarea
            className="textarea textarea-bordered mt-4 w-full"
            rows={4}
            placeholder="Write your review..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <button onClick={handleSubmit} className="btn btn-primary mt-5">
            Submit Review
          </button>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center py-10">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : reviews.length > 0 ? (
        <div className="grid gap-6">
          {reviews.map((review) => (
            <ReviewCard
              key={review._id}
              review={review}
              onEdit={setEditingReview}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-base-content/60">
          No reviews yet.
        </div>
      )}

      {editingReview && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-xl mb-5">Edit Review</h3>

            <select
              className="select select-bordered w-full"
              value={editingReview.rating}
              onChange={(e) =>
                setEditingReview({
                  ...editingReview,
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
              className="textarea textarea-bordered w-full mt-4"
              rows={5}
              value={editingReview.comment}
              onChange={(e) =>
                setEditingReview({
                  ...editingReview,
                  comment: e.target.value,
                })
              }
            />

            <div className="modal-action">
              <button className="btn" onClick={() => setEditingReview(null)}>
                Cancel
              </button>

              <button className="btn btn-primary" onClick={handleUpdate}>
                Save
              </button>
            </div>
          </div>
        </dialog>
      )}
    </section>
  );
}
