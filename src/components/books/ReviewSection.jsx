import { FaStar, FaUser } from "react-icons/fa6";

export default function ReviewCard() {
  return (
    <div className="card bg-base-100 shadow-md">
      <div className="card-body">
        <div className="flex items-center gap-4">
          <div className="avatar">
            <div className="w-14 rounded-full bg-base-300 flex items-center justify-center">
              <FaUser />
            </div>
          </div>

          <div>
            <h3 className="font-bold">Reader Name</h3>

            <div className="flex gap-1 text-warning">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
          </div>
        </div>

        <p className="mt-4 text-base-content/70">
          Excellent book. Very useful and easy to read.
        </p>
      </div>
    </div>
  );
}
