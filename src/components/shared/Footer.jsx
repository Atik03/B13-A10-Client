import Link from "next/link";
import { FaBookOpen, FaFacebook, FaGithub, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-base-200 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-center md:text-left">
          {/* Logo */}
          <div>
            <Link
              href="/"
              className="flex items-center justify-center md:justify-start gap-2 text-2xl font-bold text-primary"
            >
              <FaBookOpen />
              <span>BookNest</span>
            </Link>

            <p className="mt-4 text-sm opacity-70 max-w-xs mx-auto md:mx-0">
              Your Local Library, Delivered.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="footer-title justify-center md:justify-start">
              Quick Links
            </h3>

            <Link href="/" className="link link-hover block">
              Home
            </Link>

            <Link href="/browse-books" className="link link-hover block">
              Browse Books
            </Link>

            <Link href="/about" className="link link-hover block">
              About
            </Link>

            <Link href="/contact" className="link link-hover block">
              Contact
            </Link>
          </div>

          {/* Policies */}
          <div>
            <h3 className="footer-title justify-center md:justify-start">
              Policies
            </h3>

            <a className="link link-hover block">Privacy Policy</a>

            <a className="link link-hover block">Terms & Conditions</a>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="footer-title justify-center md:justify-start">
              Newsletter
            </h3>

            <p className="text-sm mb-4">Subscribe for updates.</p>

            <div className="join w-full max-w-sm mx-auto md:mx-0">
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered join-item w-full"
              />

              <button className="btn btn-primary join-item">Join</button>
            </div>

            <div className="flex justify-center md:justify-start gap-4 mt-5 text-xl">
              <a className="hover:text-primary cursor-pointer">
                <FaFacebook />
              </a>

              <a className="hover:text-primary cursor-pointer">
                <FaGithub />
              </a>

              <a className="hover:text-primary cursor-pointer">
                <FaXTwitter />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-base-300 mt-12 pt-6 text-center text-sm opacity-70">
          © 2026 BookNest. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
