"use client";

import { FaFilter, FaMagnifyingGlass } from "react-icons/fa6";

export default function BookFilters() {
  return (
    <div className="bg-base-100 p-5 rounded-2xl shadow-md">
      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
        <label className="input input-bordered flex items-center gap-2 w-full">
          <FaMagnifyingGlass />

          <input type="text" className="grow " placeholder="Search books" />
        </label>

        <select className="select select-bordered w-full">
          <option>All Categories</option>
          <option>Fiction</option>
          <option>Academic</option>
          <option>Sci-Fi</option>
          <option>History</option>
        </select>

        <select className="select select-bordered w-full">
          <option>Delivery Fee</option>
          <option>$1 - $5</option>
          <option>$6 - $10</option>
          <option>$11 - $20</option>
        </select>

        <select className="select select-bordered w-full">
          <option>Availability</option>
          <option>Available</option>
          <option>Checked Out</option>
        </select>

        <button className="btn btn-primary">
          <FaFilter />
          Apply
        </button>
      </div>
    </div>
  );
}
