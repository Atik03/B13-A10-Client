"use client";

import Link from "next/link";
import {
  FaBars,
  FaBookOpen,
  FaUser,
  FaArrowRightFromBracket,
} from "react-icons/fa6";

export default function Navbar() {
  const user = null;

  const navLinks = (
    <>
      <li>
        <Link href="/">Home</Link>
      </li>

      <li>
        <Link href="/browse-books">Browse Books</Link>
      </li>

      {/* {user && ( */}
      <li>
        <Link href="/dashboard">Dashboard</Link>
      </li>
      {/* )} */}
    </>
  );

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
            className="flex items-center gap-2 text-2xl font-bold text-primary"
          >
            <FaBookOpen />
            <span>BookNest</span>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-medium gap-2">
            {navLinks}
          </ul>
        </div>

        <div className="navbar-end gap-2">
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
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full bg-primary text-white flex items-center justify-center">
                  <FaUser />
                </div>
              </label>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[100] p-2 shadow bg-base-100 rounded-box w-56"
              >
                <li>
                  <Link href="/dashboard">Dashboard</Link>
                </li>

                <li>
                  <button>
                    <FaArrowRightFromBracket />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
