"use client";

export default function BookPagination({ page, setPage, totalPages }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-12">
      <div className="join">
        <button
          className="join-item btn"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          «
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setPage(index + 1)}
            className={`join-item btn ${
              page === index + 1 ? "btn-active" : ""
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          className="join-item btn"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          »
        </button>
      </div>
    </div>
  );
}
