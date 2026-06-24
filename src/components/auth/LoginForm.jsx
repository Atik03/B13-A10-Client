"use client";

import { FaGoogle } from "react-icons/fa6";

export default function LoginForm() {
  return (
    <div className="card bg-base-100 w-full max-w-md shadow-xl">
      <div className="card-body">
        <h2 className="text-3xl font-bold text-center">Welcome Back</h2>

        <form className="space-y-4 mt-6">
          <div>
            <label className="label">Email</label>

            <input
              type="email"
              className="input input-bordered w-full"
              placeholder="Email"
            />
          </div>

          <div>
            <label className="label">Password</label>

            <input
              type="password"
              className="input input-bordered w-full"
              placeholder="Password"
            />
          </div>

          <button className="btn btn-primary w-full">Login</button>
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
