export default function ReviewsPage() {
  return (
    <div className="overflow-x-auto">
      <h1 className="text-3xl font-bold mb-8">My Reviews</h1>

      <table className="table bg-base-100 rounded-xl">
        <thead>
          <tr>
            <th>Book</th>
            <th>Rating</th>
            <th>Comment</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Atomic Habits</td>
            <td>5 ⭐</td>
            <td>Excellent and practical book.</td>

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
