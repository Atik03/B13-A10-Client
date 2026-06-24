export default function DeliveriesPage() {
  return (
    <div className="overflow-x-auto">
      <h1 className="text-3xl font-bold mb-8">Manage Deliveries</h1>

      <table className="table bg-base-100 rounded-xl">
        <thead>
          <tr>
            <th>Client</th>
            <th>Book</th>
            <th>Date</th>
            <th>Status</th>
            <th>Update</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Atik Shariar</td>
            <td>Atomic Habits</td>
            <td>20 Aug 2026</td>

            <td>
              <select className="select select-bordered select-sm">
                <option>Pending</option>
                <option>Dispatched</option>
                <option>Delivered</option>
              </select>
            </td>

            <td>
              <button className="btn btn-primary btn-sm">Save</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
