"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa6";
import { toast } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function RegisterForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const password = watch("password");

  const handleRegister = async (data) => {
    setLoading(true);

    const { name, email, image, password, role } = data;

    try {
      const { data: res, error } = await authClient.signUp.email({
        name,
        email,
        password,
        image,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      const userInfo = {
        name,
        email,
        image,
        role,
        createdAt: new Date(),
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userInfo),
        },
      );

      const result = await response.json();

      if (response.ok) {
        toast.success("Registration Successful");

        router.push("/");
      } else {
        toast.error(result.message || "Failed to save user");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setGoogleLoading(true);

    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error) {
      toast.error(error.message || "Google Sign In Failed");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl w-full max-w-lg">
      <div className="card-body">
        <h2 className="text-3xl font-bold text-center">Create Account</h2>

        <p className="text-center text-gray-500">Join BookNest Today</p>

        <form
          onSubmit={handleSubmit(handleRegister)}
          className="space-y-4 mt-6"
        >
          <input
            type="text"
            placeholder="Full Name"
            className="input input-bordered w-full"
            {...register("name", {
              required: "Name is required",
            })}
          />

          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}

          <input
            type="email"
            placeholder="Email Address"
            className="input input-bordered w-full"
            {...register("email", {
              required: "Email is required",
            })}
          />

          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          <input
            type="text"
            placeholder="Photo URL"
            className="input input-bordered w-full"
            {...register("image", {
              required: "Photo URL is required",
            })}
          />

          {errors.image && (
            <p className="text-red-500 text-sm">{errors.image.message}</p>
          )}

          <select
            className="select select-bordered w-full"
            defaultValue=""
            {...register("role", {
              required: "Select a role",
            })}
          >
            <option value="" disabled>
              Select Role
            </option>

            <option value="user">Reader</option>

            <option value="librarian">Librarian</option>
          </select>

          {errors.role && (
            <p className="text-red-500 text-sm">{errors.role.message}</p>
          )}

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="input input-bordered w-full"
              {...register("password", {
                required: "Password is required",
              })}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-4"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="input input-bordered w-full"
              {...register("confirmPassword", {
                required: "Confirm Password is required",

                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-4"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <div className="divider">OR</div>

        <button
          onClick={handleGoogleRegister}
          disabled={googleLoading}
          className="btn btn-outline w-full"
        >
          <FaGoogle />

          {googleLoading ? "Please wait..." : "Continue with Google"}
        </button>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
