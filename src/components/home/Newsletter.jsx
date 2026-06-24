import { FaPaperPlane } from "react-icons/fa6";

export default function Newsletter() {
  return (
    <section className="bg-primary py-20">
      <div className="max-w-3xl mx-auto text-center px-4 text-white">
        <h2 className="text-4xl font-bold">Join Our Newsletter</h2>

        <p className="mt-4 opacity-90">
          Get updates about new books and offers.
        </p>

        <div className="join mt-8 w-full max-w-xl">
          <input
            type="email"
            placeholder="Enter your email"
            className="input input-bordered join-item w-full text-black"
          />

          <button className="btn join-item">
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </section>
  );
}
