export default function DeliveryHistoryPage() {
  return (
    <div className="overflow-x-auto">
      <h1 className="text-3xl font-bold mb-8">Delivery History</h1>

      <table className="table bg-base-100 rounded-xl">
        <thead>
          <tr>
            <th>Book</th>
            <th>Fee</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Atomic Habits</td>
            <td>$5</td>
            <td>22 Aug 2026</td>
            <td>
              <div className="badge badge-success">Delivered</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
