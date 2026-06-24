"use client";

import Link from "next/link";
import {
  FaBook,
  FaBox,
  FaChartColumn,
  FaUsers,
  FaMoneyBill,
  FaPlus,
  FaClipboardList,
  FaStar,
  FaCheck,
} from "react-icons/fa6";

export default function DashboardSidebar({ role }) {
  return (
    <div className="drawer-side z-50">
      <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

      <aside className="w-72 min-h-full bg-base-100 border-r">
        <div className="p-4 border-b">
          <h2 className="text-2xl font-bold text-primary">BookNest</h2>
        </div>

        <ul className="menu p-4 gap-2">
          {role === "user" && (
            <>
              <li>
                <Link href="/dashboard/user">
                  <FaChartColumn />
                  Overview
                </Link>
              </li>

              <li>
                <Link href="/dashboard/user/reading-list">
                  <FaBook />
                  Reading List
                </Link>
              </li>

              <li>
                <Link href="/dashboard/user/delivery-history">
                  <FaBox />
                  Delivery History
                </Link>
              </li>

              <li>
                <Link href="/dashboard/user/reviews">
                  <FaStar />
                  My Reviews
                </Link>
              </li>
            </>
          )}

          {role === "librarian" && (
            <>
              <li>
                <Link href="/dashboard/librarian">
                  <FaChartColumn />
                  Overview
                </Link>
              </li>

              <li>
                <Link href="/dashboard/librarian/add-book">
                  <FaPlus />
                  Add Book
                </Link>
              </li>

              <li>
                <Link href="/dashboard/librarian/inventory">
                  <FaBook />
                  Manage Inventory
                </Link>
              </li>

              <li>
                <Link href="/dashboard/librarian/deliveries">
                  <FaBox />
                  Manage Deliveries
                </Link>
              </li>
            </>
          )}

          {role === "admin" && (
            <>
              <li>
                <Link href="/dashboard/admin">
                  <FaChartColumn />
                  Overview
                </Link>
              </li>

              <li>
                <Link href="/dashboard/admin/approvals">
                  <FaCheck />
                  Approval Queue
                </Link>
              </li>

              <li>
                <Link href="/dashboard/admin/users">
                  <FaUsers />
                  Manage Users
                </Link>
              </li>

              <li>
                <Link href="/dashboard/admin/books">
                  <FaBook />
                  Manage Books
                </Link>
              </li>

              <li>
                <Link href="/dashboard/admin/transactions">
                  <FaMoneyBill />
                  Transactions
                </Link>
              </li>
            </>
          )}
        </ul>
      </aside>
    </div>
  );
}
