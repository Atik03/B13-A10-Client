"use client";

import Link from "next/link";
import StatCard from "./StatCard";
import LibrarianOverviewChart from "./LibrarianOverviewChart";
import RecentBooksTable from "./RecentBooksTable";
import QuickActions from "./QuickActions";
import useLibrarianBooks from "@/hooks/useLibrarianBooks";

export default function LibrarianDashboardHome() {
  const { books, loading } = useLibrarianBooks();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const totalBooks = books.length;

  const pendingBooks = books.filter((book) => book.status === "Pending").length;

  const publishedBooks = books.filter(
    (book) => book.status === "Published",
  ).length;

  const rejectedBooks = books.filter(
    (book) => book.status === "Rejected",
  ).length;

  const recentBooks = [...books]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Librarian Dashboard</h1>

          <p className="text-gray-500 mt-2">
            Manage your books and monitor approval status.
          </p>
        </div>

        <Link href="/dashboard/librarian/add-book" className="btn btn-primary">
          + Add Book
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard title="Total Books" value={totalBooks} />

        <StatCard title="Pending" value={pendingBooks} />

        <StatCard title="Published" value={publishedBooks} />

        <StatCard title="Rejected" value={rejectedBooks} />
      </div>

      <LibrarianOverviewChart
        published={publishedBooks}
        pending={pendingBooks}
        rejected={rejectedBooks}
      />

      <RecentBooksTable books={recentBooks} />

      <QuickActions />
    </div>
  );
}
