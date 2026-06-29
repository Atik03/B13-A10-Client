"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

export default function AddBookPage() {
  const router = useRouter();

  const { data: session } = authClient.useSession();

  const user = session?.user;

  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const imageFile = watch("image");

  const uploadImageToImgBB = async (image) => {
    const formData = new FormData();

    formData.append("image", image);

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await response.json();

    if (!data.success) {
      throw new Error("Image Upload Failed");
    }

    return data.data.url;
  };

  const handleImagePreview = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setPreview(URL.createObjectURL(file));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Add New Book</h1>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <input
                  type="text"
                  placeholder="Book Title"
                  className="input input-bordered w-full"
                  {...register("title", {
                    required: "Title is required",
                  })}
                />

                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Author Name"
                  className="input input-bordered w-full"
                  {...register("author", {
                    required: "Author is required",
                  })}
                />

                {errors.author && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.author.message}
                  </p>
                )}
              </div>

              <div>
                <select
                  className="select select-bordered w-full"
                  {...register("category", {
                    required: "Category required",
                  })}
                >
                  <option value="">Select Category</option>

                  <option value="Programming">Programming</option>

                  <option value="Science">Science</option>

                  <option value="Technology">Technology</option>

                  <option value="History">History</option>

                  <option value="Novel">Novel</option>

                  <option value="Biography">Biography</option>
                </select>
              </div>

              <div>
                <input
                  type="number"
                  placeholder="Delivery Fee"
                  className="input input-bordered w-full"
                  {...register("deliveryFee", {
                    required: "Delivery Fee required",
                  })}
                />
              </div>

              <div>
                <input
                  type="number"
                  placeholder="Quantity"
                  className="input input-bordered w-full"
                  {...register("quantity", {
                    required: "Quantity required",
                  })}
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="ISBN Number"
                  className="input input-bordered w-full"
                  {...register("isbn")}
                />
              </div>

              <div className="md:col-span-2">
                <input
                  type="file"
                  accept="image/*"
                  className="file-input file-input-bordered w-full"
                  {...register("image", {
                    required: "Image required",
                  })}
                  onChange={handleImagePreview}
                />
              </div>

              {preview && (
                <div className="md:col-span-2">
                  <img
                    src={preview}
                    alt="preview"
                    className="w-40 h-52 object-cover rounded-lg border"
                  />
                </div>
              )}
            </div>

            <textarea
              className="textarea textarea-bordered w-full h-32"
              placeholder="Book Description"
              {...register("description", {
                required: "Description required",
              })}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full"
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Add Book"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  async function onSubmit(data) {
    try {
      setLoading(true);

      const image = data.image[0];

      const imageURL = await uploadImageToImgBB(image);

      const bookData = {
        title: data.title,
        author: data.author,
        category: data.category,
        description: data.description,
        deliveryFee: Number(data.deliveryFee),
        quantity: Number(data.quantity),
        isbn: data.isbn || "",
        image: imageURL,

        librarianName: user?.name,
        librarianEmail: user?.email,

        status: "Pending",

        availability: Number(data.quantity) > 0 ? "Available" : "Unavailable",
      };

      const response = await fetch(`${SERVER_URL}/books`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Book Added Successfully");

        reset();

        setPreview("");

        router.push("/dashboard/librarian/inventory");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error(error);

      toast.error(error.message || "Failed to add book");
    } finally {
      setLoading(false);
    }
  }
}
