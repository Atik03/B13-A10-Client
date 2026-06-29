"use client";

import { useState } from "react";
import { FaFilter, FaMagnifyingGlass } from "react-icons/fa6";

export default function BookFilters({ onFilter }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [availability, setAvailability] = useState("");
  const [sort, setSort] = useState("latest");

  const handleApply = () => {
    onFilter({
      search,
      category,
      availability,
      sort,
    });
  };

  return (
    <div className="bg-base-100 p-5 rounded-2xl shadow-md">
      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
        <label className="input input-bordered flex items-center gap-2 w-full">
          <FaMagnifyingGlass />

          <input
            type="text"
            className="grow"
            placeholder="Search books"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>

        <select
          className="select select-bordered w-full"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Programming">Programming</option>
          <option value="Fiction">Fiction</option>
          <option value="Academic">Academic</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="History">History</option>
        </select>

        <select
          className="select select-bordered w-full"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="latest">Latest</option>
          <option value="low">Low Delivery Fee</option>
          <option value="high">High Delivery Fee</option>
        </select>

        <select
          className="select select-bordered w-full"
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
        >
          <option value="">Availability</option>
          <option value="Available">Available</option>
          <option value="Checked Out">Checked Out</option>
        </select>

        <button className="btn btn-primary" onClick={handleApply}>
          <FaFilter />
          Apply
        </button>
      </div>
    </div>
  );
}
