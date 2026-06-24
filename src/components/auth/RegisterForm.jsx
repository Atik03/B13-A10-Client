"use client";

import { FaGoogle } from "react-icons/fa6";

export default function RegisterForm() {
  return (
    <div className="card bg-base-100 w-full max-w-lg shadow-xl">
      <div className="card-body">
        <h2 className="text-3xl font-bold text-center">Create Account</h2>

        <form className="space-y-4 mt-6">
          <input
            type="text"
            placeholder="Full Name"
            className="input input-bordered w-full"
          />

          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full"
          />

          <input
            type="text"
            placeholder="Photo URL"
            className="input input-bordered w-full"
          />

          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="input input-bordered w-full"
          />

          {/* Requirement অনুযায়ী Role Selection */}
          <select className="select select-bordered w-full">
            <option>Select Role</option>

            <option value="user">Reader</option>

            <option value="librarian">Librarian</option>
          </select>

          <button className="btn btn-primary w-full">Register</button>
        </form>

        <div className="divider">OR</div>

        <button className="btn w-full">
          <FaGoogle />
          Continue with Google
        </button>
      </div>
    </div>
  );
}
