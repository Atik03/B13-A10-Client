import Link from "next/link";
import { FaBookOpen } from "react-icons/fa6";

export default function BookCard() {
  return (
    <div className="card bg-base-100 shadow-md hover:shadow-xl duration-300">
      <figure className="h-60 bg-base-200">
        <FaBookOpen className="text-7xl text-primary" />
      </figure>

      <div className="card-body">
        <div className="flex justify-between items-start gap-2">
          <h2 className="card-title line-clamp-2">Atomic Habits</h2>

          <div className="badge badge-success">Available</div>
        </div>

        <p className="text-base-content/70">Category: Self Development</p>

        <div className="flex justify-between items-center mt-4">
          <span className="font-bold text-primary">$5 Delivery</span>

          <Link href="/book/1" className="btn btn-primary btn-sm">
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}
