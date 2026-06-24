export default function BookSkeleton() {
  return (
    <div className="card bg-base-100 shadow-md">
      <div className="skeleton h-60 w-full"></div>

      <div className="card-body">
        <div className="skeleton h-6 w-3/4"></div>

        <div className="skeleton h-4 w-1/2"></div>

        <div className="skeleton h-10 w-full mt-4"></div>
      </div>
    </div>
  );
}
