export default function ApprovalsPage() {
  return (
    <div className="overflow-x-auto">
      <h1 className="text-3xl font-bold mb-8">Book Approval Queue</h1>

      <table className="table bg-base-100 rounded-xl">
        <thead>
          <tr>
            <th>Book</th>
            <th>Author</th>
            <th>Librarian</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Deep Work</td>
            <td>Cal Newport</td>
            <td>Rahim Library</td>

            <td className="space-x-2">
              <button className="btn btn-success btn-sm">Approve</button>

              <button className="btn btn-error btn-sm">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
