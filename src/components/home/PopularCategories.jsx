import {
  FaBookOpen,
  FaGraduationCap,
  FaFlask,
  FaLandmark,
} from "react-icons/fa6";

export default function PopularCategories() {
  const categories = [
    {
      name: "Fiction",
      icon: <FaBookOpen />,
    },
    {
      name: "Academic",
      icon: <FaGraduationCap />,
    },
    {
      name: "Science",
      icon: <FaFlask />,
    },
    {
      name: "History",
      icon: <FaLandmark />,
    },
  ];

  return (
    <section className="bg-base-200 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">Popular Categories</h2>

          <p className="mt-4 text-gray-500">Explore books by category.</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.name}
              className="card bg-base-100 shadow-md hover:shadow-xl duration-300"
            >
              <div className="card-body items-center text-center">
                <div className="text-5xl text-primary">{category.icon}</div>

                <h3 className="font-semibold text-xl mt-4">{category.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
