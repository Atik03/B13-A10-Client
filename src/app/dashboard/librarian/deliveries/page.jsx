"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function DeliveriesPage() {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);

  const { data: session } = authClient.useSession();

  useEffect(() => {
    if (session?.user?.email) {
      fetchDeliveries();
    }
  }, [session]);

  const fetchDeliveries = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/deliveries/librarian/${session.user.email}`,
      );

      const data = await res.json();

      setDeliveries(data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load deliveries");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (id, status) => {
    setDeliveries((prev) =>
      prev.map((item) => (item._id === id ? { ...item, status } : item)),
    );
  };

  const handleSave = async (delivery) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/deliveries/${delivery._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: delivery.status,
          }),
        },
      );

      const data = await res.json();

      if (data.modifiedCount > 0) {
        toast.success("Delivery Status Updated");
      } else {
        toast("No Changes Made");
      }
    } catch (error) {
      console.log(error);
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
    <div className="overflow-x-auto">
      <h1 className="text-3xl font-bold mb-8">Manage Deliveries</h1>

      <table className="table bg-base-100 rounded-xl">
        <thead>
          <tr>
            <th>Client</th>
            <th>Book</th>
            <th>Fee</th>
            <th>Date</th>
            <th>Status</th>
            <th>Update</th>
          </tr>
        </thead>

        <tbody>
          {deliveries.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-12">
                No Delivery Requests
              </td>
            </tr>
          ) : (
            deliveries.map((delivery) => (
              <tr key={delivery._id}>
                <td>{delivery.userName}</td>

                <td>{delivery.title}</td>

                <td>${delivery.deliveryFee}</td>

                <td>{new Date(delivery.createdAt).toLocaleDateString()}</td>

                <td>
                  <select
                    value={delivery.status}
                    onChange={(e) =>
                      handleStatusChange(delivery._id, e.target.value)
                    }
                    className="select select-bordered select-sm"
                  >
                    <option>Pending</option>
                    <option>Dispatched</option>
                    <option>Delivered</option>
                  </select>
                </td>

                <td>
                  <button
                    onClick={() => handleSave(delivery)}
                    className="btn btn-primary btn-sm"
                  >
                    Save
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
