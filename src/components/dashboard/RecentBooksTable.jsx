export default function RecentBooksTable({ books }) {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="text-xl font-bold mb-4">Recent Added Books</h2>

        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Book</th>
                <th>Category</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {books.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center py-8">
                    No Books Found
                  </td>
                </tr>
              ) : (
                books.map((book) => (
                  <tr key={book._id}>
                    <td>{book.title}</td>

                    <td>{book.category}</td>

                    <td>
                      <span
                        className={`badge ${
                          book.status === "Published"
                            ? "badge-success"
                            : book.status === "Rejected"
                              ? "badge-error"
                              : "badge-warning"
                        }`}
                      >
                        {book.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
