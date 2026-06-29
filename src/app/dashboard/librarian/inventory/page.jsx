"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-hot-toast";
import Link from "next/link";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export default function InventoryPage() {
  const { data: session } = authClient.useSession();

  const user = session?.user;

  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchBooks = async () => {
    if (!user?.email) return;

    try {
      setLoading(true);

      const res = await fetch(`${SERVER_URL}/librarian-books/${user.email}`);

      const data = await res.json();

      setBooks(data);
      setFilteredBooks(data);
    } catch (error) {
      toast.error("Failed to load books");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [user]);

  useEffect(() => {
    const result = books.filter(
      (book) =>
        book.title?.toLowerCase().includes(search.toLowerCase()) ||
        book.author?.toLowerCase().includes(search.toLowerCase()),
    );

    setFilteredBooks(result);
  }, [search, books]);

  const handleDelete = async (id) => {
    if (!confirm("Delete this book?")) return;

    try {
      const res = await fetch(`${SERVER_URL}/books/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Book Deleted");

        fetchBooks();
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Delete Failed");
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
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold">Manage Inventory</h1>

        <input
          type="text"
          placeholder="Search book..."
          className="input input-bordered w-full md:w-80"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredBooks.length === 0 ? (
        <div className="text-center py-20 bg-base-100 rounded-xl shadow">
          <h2 className="text-2xl font-semibold">No Books Found</h2>

          <p className="text-gray-500 mt-2">Add your first book.</p>

          <Link
            href="/dashboard/librarian/add-book"
            className="btn btn-primary mt-5"
          >
            Add Book
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto bg-base-100 rounded-xl shadow">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Book</th>
                <th>Author</th>
                <th>Category</th>
                <th>Qty</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredBooks.map((book, index) => (
                <tr key={book._id}>
                  <td>{index + 1}</td>

                  <td className="font-semibold">{book.title}</td>

                  <td>{book.author}</td>

                  <td>{book.category}</td>

                  <td>{book.quantity}</td>

                  <td>
                    <span
                      className={`badge
                      ${
                        book.status === "Published"
                          ? "badge-success"
                          : book.status === "Rejected"
                            ? "badge-error"
                            : "badge-warning"
                      }`}
                    >
                      {book.status}
                    </span>
                  </td>

                  <td className="space-x-2">
                    <Link
                      href={`/dashboard/librarian/edit-book/${book._id}`}
                      className="btn btn-info btn-sm"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(book._id)}
                      className="btn btn-error btn-sm text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
