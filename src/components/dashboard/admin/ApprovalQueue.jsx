"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";

export default function ApprovalQueue() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedBook, setSelectedBook] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetchPendingBooks();
  }, []);

  const fetchPendingBooks = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/pending-books`,
      );

      const data = await res.json();

      setBooks(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleView = async (id) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/books/${id}`,
      );

      const data = await res.json();

      setSelectedBook(data);
      setOpenModal(true);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id, action) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/books/${id}/${action}`,
        {
          method: "PATCH",
        },
      );

      const data = await res.json();

      if (data.modifiedCount > 0) {
        toast.success(
          action === "approve"
            ? "Book Approved Successfully"
            : "Book Rejected Successfully",
        );

        setBooks((prev) => prev.filter((book) => book._id !== id));

        setOpenModal(false);
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
    <div>
      <h1 className="text-3xl font-bold mb-8">Approval Queue</h1>

      {books.length === 0 ? (
        <div className="text-center py-20 text-xl font-semibold">
          No Pending Books
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl bg-base-100 shadow">
          <table className="table">
            <thead>
              <tr>
                <th>Book</th>
                <th>Title</th>
                <th>Librarian</th>
                <th>Category</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {books.map((book) => (
                <tr key={book._id}>
                  <td>
                    <Image
                      src={book.image}
                      alt={book.title}
                      width={60}
                      height={80}
                      className="rounded object-cover"
                    />
                  </td>

                  <td>{book.title}</td>

                  <td>{book.librarianName}</td>

                  <td>{book.category}</td>

                  <td>
                    <span className="badge badge-warning">{book.status}</span>
                  </td>

                  <td>
                    <button
                      className="btn btn-info btn-sm"
                      onClick={() => handleView(book._id)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {openModal && selectedBook && (
        <dialog className="modal modal-open">
          <div className="modal-box max-w-4xl">
            <h3 className="font-bold text-2xl mb-6">Book Details</h3>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <Image
                  src={selectedBook.image}
                  alt={selectedBook.title}
                  width={500}
                  height={700}
                  className="rounded-xl w-full h-[420px] object-cover"
                />
              </div>

              <div className="space-y-4">
                <h2 className="text-3xl font-bold">{selectedBook.title}</h2>

                <p>
                  <strong>Author:</strong> {selectedBook.author}
                </p>

                <p>
                  <strong>Category:</strong> {selectedBook.category}
                </p>

                <p>
                  <strong>ISBN:</strong> {selectedBook.isbn}
                </p>

                <p>
                  <strong>Quantity:</strong> {selectedBook.quantity}
                </p>

                <p>
                  <strong>Delivery Fee:</strong> ${selectedBook.deliveryFee}
                </p>

                <p>
                  <strong>Librarian:</strong> {selectedBook.librarianName}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  <span className="badge badge-warning">
                    {selectedBook.status}
                  </span>
                </p>

                <div>
                  <h4 className="font-bold mb-2">Description</h4>

                  <p className="text-base-content/70 leading-7">
                    {selectedBook.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="modal-action">
              <button
                className="btn btn-success"
                onClick={() => updateStatus(selectedBook._id, "approve")}
              >
                Approve
              </button>

              <button
                className="btn btn-error"
                onClick={() => updateStatus(selectedBook._id, "reject")}
              >
                Reject
              </button>

              <button
                className="btn"
                onClick={() => {
                  setOpenModal(false);
                  setSelectedBook(null);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}
