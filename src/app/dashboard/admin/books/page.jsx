"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AdminBooksPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [deleteId, setDeleteId] = useState(null);
  const [unpublishId, setUnpublishId] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/books`,
      );

      const data = await res.json();

      setBooks(data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load books");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/books/${id}`,
        {
          method: "DELETE",
        },
      );

      const data = await res.json();

      if (data.deletedCount > 0) {
        toast.success("Book deleted successfully");

        setBooks((prev) => prev.filter((book) => book._id !== id));

        setDeleteId(null);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleUnpublish = async (id) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/books/${id}/unpublish`,
        {
          method: "PATCH",
        },
      );

      const data = await res.json();

      if (data.modifiedCount > 0) {
        toast.success("Book unpublished successfully");

        setBooks((prev) =>
          prev.map((book) =>
            book._id === id
              ? {
                  ...book,
                  status: "Pending",
                }
              : book,
          ),
        );

        setUnpublishId(null);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <h1 className="text-3xl font-bold mb-8">Manage Books</h1>

      <table className="table bg-base-100 rounded-xl">
        <thead>
          <tr>
            <th>Book</th>
            <th>Category</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {books.length > 0 ? (
            books.map((book) => (
              <tr key={book._id}>
                <td>{book.title}</td>

                <td>{book.category}</td>

                <td>
                  <div
                    className={`badge ${
                      book.status === "Published"
                        ? "badge-success"
                        : book.status === "Pending"
                          ? "badge-warning"
                          : "badge-error"
                    }`}
                  >
                    {book.status}
                  </div>
                </td>

                <td className="space-x-2">
                  <button
                    onClick={() => setUnpublishId(book._id)}
                    className="btn btn-warning btn-sm"
                    disabled={book.status !== "Published"}
                  >
                    Unpublish
                  </button>

                  <button
                    onClick={() => setDeleteId(book._id)}
                    className="btn btn-error btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-10">
                No Books Found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {deleteId && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-xl">Delete Book</h3>

            <p className="py-4">
              Are you sure you want to permanently delete this book?
            </p>

            <div className="modal-action">
              <button className="btn" onClick={() => setDeleteId(null)}>
                Cancel
              </button>

              <button
                className="btn btn-error"
                onClick={() => handleDelete(deleteId)}
              >
                Delete
              </button>
            </div>
          </div>
        </dialog>
      )}

      {unpublishId && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-xl">Unpublish Book</h3>

            <p className="py-4">
              Are you sure you want to unpublish this book?
            </p>

            <div className="modal-action">
              <button className="btn" onClick={() => setUnpublishId(null)}>
                Cancel
              </button>

              <button
                className="btn btn-warning"
                onClick={() => handleUnpublish(unpublishId)}
              >
                Unpublish
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}
