"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import useUserRole from "@/hooks/useUserRole";

import {
  FaBook,
  FaBox,
  FaChartColumn,
  FaUsers,
  FaMoneyBill,
  FaPlus,
  FaStar,
  FaCheck,
  FaHouse,
  FaRightFromBracket,
} from "react-icons/fa6";

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const { role, loading } = useUserRole();

  const activeClass = (path) => {
    if (
      path === "/dashboard/user" ||
      path === "/dashboard/librarian" ||
      path === "/dashboard/admin"
    ) {
      return pathname === path
        ? "bg-primary text-white rounded-lg font-semibold"
        : "";
    }

    return pathname.startsWith(path)
      ? "bg-primary text-white rounded-lg font-semibold"
      : "";
  };

  const handleLogout = async () => {
    const { error } = await authClient.signOut();

    if (error) {
      toast.error(error.message || "Logout Failed");
      return;
    }

    toast.success("Logged Out Successfully");
    router.push("/");
  };

  if (loading) {
    return (
      <div className="drawer-side">
        <aside className="w-72 min-h-full bg-base-100 border-r flex justify-center items-center">
          <span className="loading loading-spinner loading-lg"></span>
        </aside>
      </div>
    );
  }

  return (
    <div className="drawer-side z-50">
      <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

      <aside className="w-72 min-h-full bg-base-100 border-r flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-2xl font-bold text-primary">BookNest</h2>
        </div>

        <ul className="menu p-4 gap-2 flex-1">
          {role === "user" && (
            <>
              <li>
                <Link
                  href="/dashboard/user"
                  className={activeClass("/dashboard/user")}
                >
                  <FaChartColumn />
                  Overview
                </Link>
              </li>

              <li>
                <Link
                  href="/dashboard/user/reading-list"
                  className={activeClass("/dashboard/user/reading-list")}
                >
                  <FaBook />
                  Reading List
                </Link>
              </li>

              <li>
                <Link
                  href="/dashboard/user/delivery-history"
                  className={activeClass("/dashboard/user/delivery-history")}
                >
                  <FaBox />
                  Delivery History
                </Link>
              </li>

              <li>
                <Link
                  href="/dashboard/user/reviews"
                  className={activeClass("/dashboard/user/reviews")}
                >
                  <FaStar />
                  My Reviews
                </Link>
              </li>
            </>
          )}

          {role === "librarian" && (
            <>
              <li>
                <Link
                  href="/dashboard/librarian"
                  className={activeClass("/dashboard/librarian")}
                >
                  <FaChartColumn />
                  Overview
                </Link>
              </li>

              <li>
                <Link
                  href="/dashboard/librarian/add-book"
                  className={activeClass("/dashboard/librarian/add-book")}
                >
                  <FaPlus />
                  Add Book
                </Link>
              </li>

              <li>
                <Link
                  href="/dashboard/librarian/inventory"
                  className={activeClass("/dashboard/librarian/inventory")}
                >
                  <FaBook />
                  Manage Inventory
                </Link>
              </li>

              <li>
                <Link
                  href="/dashboard/librarian/deliveries"
                  className={activeClass("/dashboard/librarian/deliveries")}
                >
                  <FaBox />
                  Manage Deliveries
                </Link>
              </li>
            </>
          )}

          {role === "admin" && (
            <>
              <li>
                <Link
                  href="/dashboard/admin"
                  className={activeClass("/dashboard/admin")}
                >
                  <FaChartColumn />
                  Overview
                </Link>
              </li>

              <li>
                <Link
                  href="/dashboard/admin/approvals"
                  className={activeClass("/dashboard/admin/approvals")}
                >
                  <FaCheck />
                  Approval Queue
                </Link>
              </li>

              <li>
                <Link
                  href="/dashboard/admin/users"
                  className={activeClass("/dashboard/admin/users")}
                >
                  <FaUsers />
                  Manage Users
                </Link>
              </li>

              <li>
                <Link
                  href="/dashboard/admin/books"
                  className={activeClass("/dashboard/admin/books")}
                >
                  <FaBook />
                  Manage Books
                </Link>
              </li>

              <li>
                <Link
                  href="/dashboard/admin/transactions"
                  className={activeClass("/dashboard/admin/transactions")}
                >
                  <FaMoneyBill />
                  Transactions
                </Link>
              </li>
            </>
          )}
        </ul>

        <div className="border-t p-4">
          <ul className="menu gap-2">
            <li>
              <Link href="/">
                <FaHouse />
                Home
              </Link>
            </li>

            <li>
              <button onClick={handleLogout} className="text-error">
                <FaRightFromBracket />
                Logout
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
