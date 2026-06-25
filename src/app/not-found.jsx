import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center px-4">
      <h1 className="text-8xl font-bold text-primary">404</h1>

      <h2 className="text-3xl font-bold mt-4">Page Not Found</h2>

      <p className="mt-3 text-base-content/70">
        The page you are looking for does not exist.
      </p>

      <Link href="/" className="btn btn-primary mt-8">
        Back Home
      </Link>
    </div>
  );
}
