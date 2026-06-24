export default function ReadingListPage() {
  const books = Array.from({ length: 8 });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">My Reading List</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((_, i) => (
          <div key={i} className="card bg-base-100 shadow">
            <figure className="h-48 bg-base-200" />

            <div className="card-body">
              <h2 className="font-bold">Book Name</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
