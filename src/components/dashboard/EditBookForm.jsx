"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

export default function EditBookForm({ book }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(book.image);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: book.title,
      author: book.author,
      category: book.category,
      deliveryFee: book.deliveryFee,
      quantity: book.quantity,
      isbn: book.isbn,
      description: book.description,
    },
  });

  const uploadImage = async (image) => {
    const formData = new FormData();

    formData.append("image", image);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await res.json();

    if (!data.success) {
      throw new Error("Image upload failed");
    }

    return data.data.url;
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      let imageURL = book.image;

      if (data.image?.length > 0) {
        imageURL = await uploadImage(data.image[0]);
      }

      const updatedBook = {
        title: data.title,
        author: data.author,
        category: data.category,
        deliveryFee: Number(data.deliveryFee),
        quantity: Number(data.quantity),
        isbn: data.isbn,
        description: data.description,
        image: imageURL,
      };

      const res = await fetch(`${SERVER_URL}/books/${book._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedBook),
      });

      const result = await res.json();

      if (result.success) {
        toast.success("Book Updated Successfully");

        router.push("/dashboard/librarian/inventory");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid md:grid-cols-2 gap-5">
            <input
              className="input input-bordered"
              placeholder="Book Title"
              {...register("title", {
                required: "Title is required",
              })}
            />

            <input
              className="input input-bordered"
              placeholder="Author"
              {...register("author", {
                required: "Author is required",
              })}
            />

            <select
              className="select select-bordered"
              {...register("category")}
            >
              <option>Programming</option>
              <option>Science</option>
              <option>Technology</option>
              <option>Novel</option>
              <option>History</option>
              <option>Biography</option>
            </select>

            <input
              type="number"
              className="input input-bordered"
              placeholder="Delivery Fee"
              {...register("deliveryFee")}
            />

            <input
              type="number"
              className="input input-bordered"
              placeholder="Quantity"
              {...register("quantity")}
            />

            <input
              className="input input-bordered"
              placeholder="ISBN"
              {...register("isbn")}
            />

            <input
              type="file"
              className="file-input file-input-bordered md:col-span-2"
              accept="image/*"
              {...register("image")}
              onChange={(e) => {
                if (e.target.files[0]) {
                  setPreview(URL.createObjectURL(e.target.files[0]));
                }
              }}
            />

            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-40 rounded-lg border"
              />
            )}
            <textarea
              className="textarea textarea-bordered md:col-span-2 h-36"
              placeholder="Book Description"
              {...register("description", {
                required: "Description is required",
              })}
            />

            {errors.description && (
              <p className="text-red-500 text-sm md:col-span-2">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={() => router.push("/dashboard/librarian/inventory")}
              className="btn btn-outline"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Updating...
                </>
              ) : (
                "Update Book"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
