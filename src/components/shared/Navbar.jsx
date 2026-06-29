"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-hot-toast";

import { FaBookOpen, FaBars, FaRightFromBracket } from "react-icons/fa6";
import useUserRole from "@/hooks/useUserRole";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const handleLogout = async () => {
    const { error } = await authClient.signOut();

    if (error) {
      toast.error(error.message || "Logout failed");
      return;
    }

    toast.success("Logged out successfully");
    router.push("/");
  };

  const navLinkClass = (path) => {
    const active = path === "/" ? pathname === "/" : pathname.startsWith(path);

    return active
      ? "text-primary font-semibold border-b-2 border-primary"
      : "hover:text-primary transition-all";
  };

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
    </>
  );

  if (isPending) {
    return (
      <div className="navbar max-w-7xl mx-auto px-4 h-20">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    );
  }

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
          <ul className="menu menu-horizontal gap-3 font-medium">{navLinks}</ul>
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
            <>
              <div
                className="tooltip tooltip-bottom"
                data-tip={user.name || user.email}
              >
                <div className="avatar">
                  <div className="w-11 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
                    <Image
                      src={
                        user?.image?.trim()
                          ? user.image.trim()
                          : "https://i.ibb.co/4pDNDk1/avatar.png"
                      }
                      alt={user?.name || "User"}
                      width={44}
                      height={44}
                      className="object-cover"
                      unoptimized
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
