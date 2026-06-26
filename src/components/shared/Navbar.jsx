"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";

import { FaBookOpen, FaBars, FaRightFromBracket } from "react-icons/fa6";

export default function Navbar() {
  const pathname = usePathname();

  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const handleLogout = async () => {
    await authClient.signOut();
  };

  const navLinkClass = (path) =>
    pathname === path ? "text-primary font-semibold" : "";

  const navLinks = (
    <>
      <li>
        <Link href="/" className={navLinkClass("/")}>
          Home
        </Link>
      </li>

      <li>
        <Link href="/browse-books" className={navLinkClass("/browse-books")}>
          Browse Books
        </Link>
      </li>

      <li>
        <Link href="/dashboard" className={navLinkClass("/dashboard")}>
          Dashboard
        </Link>
      </li>
      {/* )} */}
    </>
  );

  if (isPending) return null;

  return (
    <div className="sticky top-0 z-50 bg-base-100/90 backdrop-blur-md border-b border-base-200">
      <div className="navbar max-w-7xl mx-auto px-4">
        <div className="navbar-start">
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost">
              <FaBars className="text-lg" />
            </label>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[100] p-2 shadow bg-base-100 rounded-box w-56"
            >
              {navLinks}
            </ul>
          </div>

          <Link
            href="/"
            className="hidden lg:flex items-center gap-2 text-2xl font-bold text-primary"
          >
            <FaBookOpen />
            <span>BookNest</span>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-2 px-1 font-medium">
            {navLinks}
          </ul>
        </div>

        <div className="navbar-end gap-3">
          {!user ? (
            <>
              <Link href="/login" className="btn btn-ghost">
                Login
              </Link>

              <Link href="/register" className="btn btn-primary rounded-full">
                Register
              </Link>
            </>
          ) : (
            <>
              <div
                className="tooltip tooltip-bottom"
                data-tip={user.name || user.email}
              >
                <div className="avatar">
                  <div className="w-11 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img
                      src={user.image || "https://i.ibb.co/4pDNDk1/avatar.png"}
                      alt="User"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="btn btn-error text-white"
              >
                <FaRightFromBracket />
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
