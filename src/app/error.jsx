"use client";

export default function Error({ error, reset }) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center px-4">
      <h1 className="text-5xl font-bold text-error">Something Went Wrong</h1>

      <p className="mt-4 max-w-md">{error?.message}</p>

      <button onClick={() => reset()} className="btn btn-primary mt-6">
        Try Again
      </button>
    </div>
  );
}
