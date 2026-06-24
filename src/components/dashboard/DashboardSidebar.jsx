"use client";

import Link from "next/link";
import {
  FaBook,
  FaBox,
  FaChartColumn,
  FaUsers,
  FaMoneyBill,
} from "react-icons/fa6";

export default function DashboardSidebar({ role }) {
  return (
    <div className="drawer-side z-50">
      <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

      <aside className="w-72 min-h-full bg-base-100">
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
                <a>
                  <FaBook />
                  Reading List
                </a>
              </li>

              <li>
                <a>
                  <FaBox />
                  Delivery History
                </a>
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
                <a>
                  <FaBook />
                  Add Book
                </a>
              </li>

              <li>
                <a>
                  <FaBox />
                  Manage Inventory
                </a>
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
                <a>
                  <FaUsers />
                  Manage Users
                </a>
              </li>

              <li>
                <a>
                  <FaBook />
                  Manage Books
                </a>
              </li>

              <li>
                <a>
                  <FaMoneyBill />
                  Transactions
                </a>
              </li>
            </>
          )}
        </ul>
      </aside>
    </div>
  );
}
