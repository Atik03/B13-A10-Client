import Image from "next/image";
import Link from "next/link";
import { FaBookOpen } from "react-icons/fa6";

export default function BookCard({ book }) {
  return (
    <div className="card bg-base-100 shadow-md hover:shadow-xl duration-300">
      <figure className="h-60 bg-base-200 overflow-hidden">
        {book.image ? (
          <Image
            src={book.image}
            alt={book.title}
            width={250}
            height={250}
            className="w-full h-full object-cover"
          />
        ) : (
          <FaBookOpen className="text-7xl text-primary" />
        )}
      </figure>

      <div className="card-body">
        <div className="flex justify-between items-start gap-2">
          <h2 className="card-title line-clamp-2">{book.title}</h2>

          <div
            className={`badge ${
              book.availability === "Available"
                ? "badge-success"
                : "badge-error"
            }`}
          >
            {book.availability}
          </div>
        </div>

        <p className="text-base-content/70">Category: {book.category}</p>

        <div className="flex justify-between items-center mt-4">
          <span className="font-bold text-primary">
            ${book.deliveryFee} Delivery
          </span>

          <Link href={`/book/${book._id}`} className="btn btn-primary btn-sm">
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}
