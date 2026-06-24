export default function InventoryPage() {
  return (
    <div className="overflow-x-auto">
      <h1 className="text-3xl font-bold mb-8">Manage Inventory</h1>

      <table className="table bg-base-100">
        <thead>
          <tr>
            <th>Book</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Atomic Habits</td>

            <td>
              <div className="badge badge-warning">Pending Approval</div>
            </td>

            <td className="space-x-2">
              <button className="btn btn-info btn-sm">Edit</button>

              <button className="btn btn-error btn-sm">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
