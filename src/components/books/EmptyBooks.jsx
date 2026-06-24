import { FaBookOpen } from "react-icons/fa6";

export default function EmptyBooks() {
  return (
    <div className="text-center py-24">
      <FaBookOpen className="text-7xl mx-auto text-base-300" />

      <h2 className="text-3xl font-bold mt-6">No Books Found</h2>

      <p className="text-base-content/70 mt-3">
        Try changing filters or search terms.
      </p>
    </div>
  );
}
