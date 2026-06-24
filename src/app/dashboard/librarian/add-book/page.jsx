export default function AddBookPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Add New Book</h1>

      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <div className="grid md:grid-cols-2 gap-5">
            <input className="input input-bordered" placeholder="Book Title" />

            <input className="input input-bordered" placeholder="Author" />

            <input className="input input-bordered" placeholder="Category" />

            <input
              className="input input-bordered"
              placeholder="Delivery Fee"
            />

            <input type="file" className="file-input file-input-bordered" />
          </div>

          <textarea
            className="textarea textarea-bordered mt-5"
            placeholder="Description"
          />

          <button className="btn btn-primary mt-5">Add Book</button>
        </div>
      </div>
    </div>
  );
}
