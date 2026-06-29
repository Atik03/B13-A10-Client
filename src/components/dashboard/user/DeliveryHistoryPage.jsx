"use client";

import { useEffect, useState } from "react";

import { authClient } from "@/lib/auth-client";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export default function DeliveryHistoryPage() {
  const { data: session } = authClient.useSession();

  const [deliveries, setDeliveries] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.email) {
      fetchHistory();
    }
  }, [session]);

  const fetchHistory = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${SERVER_URL}/user/deliveries/${session.user.email}`,
      );

      const data = await res.json();

      setDeliveries(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getBadge = (status) => {
    switch (status) {
      case "Pending":
        return "badge-warning";

      case "Dispatched":
        return "badge-info";

      case "Delivered":
        return "badge-success";

      default:
        return "badge-neutral";
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
      <h1 className="text-3xl font-bold mb-8">Delivery History</h1>

      <div className="overflow-x-auto bg-base-100 rounded-xl shadow">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>

              <th>Book</th>

              <th>Delivery Fee</th>

              <th>Request Date</th>

              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {deliveries.length > 0 ? (
              deliveries.map((delivery, index) => (
                <tr key={delivery._id}>
                  <td>{index + 1}</td>

                  <td>
                    <div className="flex items-center gap-3">
                      <img
                        src={delivery.image}
                        alt={delivery.title}
                        className="w-14 h-16 rounded object-cover"
                      />

                      <div>
                        <h3 className="font-semibold">{delivery.title}</h3>

                        <p className="text-sm opacity-70">{delivery.author}</p>
                      </div>
                    </div>
                  </td>

                  <td>${delivery.deliveryFee}</td>

                  <td>{new Date(delivery.createdAt).toLocaleDateString()}</td>

                  <td>
                    <span className={`badge ${getBadge(delivery.status)}`}>
                      {delivery.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-12">
                  No Delivery History Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
