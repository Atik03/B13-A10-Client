export default function BookCardSkeleton() {
  return (
    <div className="card bg-base-100 shadow">
      <div className="skeleton h-60 w-full"></div>

      <div className="card-body">
        <div className="skeleton h-5 w-3/4"></div>

        <div className="skeleton h-4 w-1/2"></div>

        <div className="skeleton h-10 w-full"></div>
      </div>
    </div>
  );
}
