export default function AdminBooksPage() {
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
          <tr>
            <td>Atomic Habits</td>
            <td>Self Development</td>

            <td>
              <div className="badge badge-success">Published</div>
            </td>

            <td className="space-x-2">
              <button className="btn btn-warning btn-sm">Unpublish</button>

              <button className="btn btn-error btn-sm">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
