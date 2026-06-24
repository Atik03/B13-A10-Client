import { CiCircleCheck } from "react-icons/ci";

export default function TopLibrarians() {
  const librarians = [1, 2, 3];

  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold">Top Librarians</h2>

        <p className="mt-4 text-gray-500">
          Meet our most active book providers.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {librarians.map((item) => (
          <div key={item} className="card bg-base-100 shadow-md">
            <div className="card-body items-center text-center">
              <div className="avatar">
                <div className="w-24 rounded-full bg-base-200"></div>
              </div>

              <h3 className="text-xl font-semibold">Librarian Name</h3>

              <div className="badge badge-primary gap-2">
                <CiCircleCheck />
                120 Deliveries
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
