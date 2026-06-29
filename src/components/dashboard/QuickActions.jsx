import Link from "next/link";

export default function QuickActions() {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="text-xl font-bold mb-5">Quick Actions</h2>

        <div className="grid md:grid-cols-3 gap-4">
          <Link
            href="/dashboard/librarian/add-book"
            className="btn btn-primary"
          >
            Add Book
          </Link>

          <Link
            href="/dashboard/librarian/inventory"
            className="btn btn-secondary"
          >
            Manage Inventory
          </Link>

          <Link href="/browse-books" className="btn btn-outline">
            Browse Books
          </Link>
        </div>
      </div>
    </div>
  );
}
