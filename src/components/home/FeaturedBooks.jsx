import { FaBook } from "react-icons/fa6";

export default function FeaturedBooks() {
  const books = Array.from({ length: 6 });

  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold">Featured Books</h2>

        <p className="mt-4 text-gray-500">
          Discover some of our most popular books.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {books.map((_, index) => (
          <div
            key={index}
            className="card bg-base-100 shadow-md hover:shadow-xl duration-300"
          >
            <figure className="h-56 bg-base-200">
              <FaBook className="text-6xl text-primary" />
            </figure>

            <div className="card-body">
              <h2 className="card-title">Book Title</h2>

              <p className="text-sm text-gray-500">Category</p>

              <div className="card-actions justify-between items-center mt-4">
                <span className="font-semibold text-primary">$5 Delivery</span>

                <button className="btn btn-primary btn-sm">Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
