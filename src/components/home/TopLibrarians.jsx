"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CiCircleCheck } from "react-icons/ci";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export default function TopLibrarians() {
  const [librarians, setLibrarians] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopLibrarians();
  }, []);

  const fetchTopLibrarians = async () => {
    try {
      const res = await fetch(`${SERVER_URL}/top-librarians`);

      const data = await res.json();

      setLibrarians(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold">Top Librarians</h2>

        <p className="mt-4 text-gray-500">
          Meet our most active book providers.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {librarians.map((librarian) => (
          <div
            key={librarian.email}
            className="card bg-base-100 shadow-md hover:shadow-xl duration-300"
          >
            <div className="card-body items-center text-center">
              <div className="avatar">
                <div className="w-24 rounded-full overflow-hidden ring ring-primary ring-offset-base-100 ring-offset-2">
                  <Image
                    src={librarian.image}
                    alt={librarian.name}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <h3 className="text-xl font-semibold mt-4">{librarian.name}</h3>

              <div className="badge badge-primary gap-2 mt-3">
                <CiCircleCheck />
                {librarian.totalBooks} Books Added
              </div>
            </div>
          </div>
        ))}
      </div>

      {!loading && librarians.length === 0 && (
        <div className="text-center mt-10">
          <p className="text-gray-500">No librarians found.</p>
        </div>
      )}
    </section>
  );
}
