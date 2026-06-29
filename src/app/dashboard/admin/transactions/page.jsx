"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/transactions`,
      );

      const data = await res.json();

      setTransactions(data.transactions || []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load transactions");
    } finally {
      setLoading(false);
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
      <h1 className="text-3xl font-bold mb-8">Transactions</h1>

      <table className="table bg-base-100 rounded-xl">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Book</th>
            <th>Librarian</th>
            <th>Delivery Fee</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <tr key={transaction._id}>
                <td>
                  <div>
                    <p className="font-semibold">{transaction.userName}</p>

                    <p className="text-xs opacity-70">
                      {transaction.userEmail}
                    </p>
                  </div>
                </td>

                <td>
                  <div className="flex items-center gap-3">
                    <img
                      src={transaction.image}
                      alt={transaction.title}
                      className="w-14 h-16 rounded object-cover"
                    />

                    <span>{transaction.title}</span>
                  </div>
                </td>

                <td>
                  <div>
                    <p className="font-semibold">{transaction.librarianName}</p>

                    <p className="text-xs opacity-70">
                      {transaction.librarianEmail}
                    </p>
                  </div>
                </td>

                <td>${transaction.deliveryFee}</td>

                <td>
                  <div
                    className={`badge ${
                      transaction.status === "Pending"
                        ? "badge-warning"
                        : transaction.status === "Dispatched"
                          ? "badge-info"
                          : transaction.status === "Delivered"
                            ? "badge-success"
                            : "badge-error"
                    }`}
                  >
                    {transaction.status}
                  </div>
                </td>

                <td>{new Date(transaction.createdAt).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-10">
                No Transactions Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
