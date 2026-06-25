import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { imageUpload } from "../../../utils";
import { TbFidgetSpinner } from "react-icons/tb";
import Container from "../../components/Shared/Container";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddFoodForm = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { mutateAsync: addMeal, isPending } = useMutation({
    mutationFn: async (mealData) => {
      const res = await axiosSecure.post("/add-meal", mealData);
      return res.data;
    },

    onSuccess: () => {
      Swal.fire({
        title: "Success!",
        text: "Food added successfully!",
        icon: "success",
        confirmButtonColor: "#84cc16",
      });

      reset();
    },

    onError: (err) => {
      Swal.fire({
        title: "Error!",
        text: err?.response?.data?.message || "Failed to add food",
        icon: "error",
        confirmButtonColor: "#ef4444",
      });
    },
  });

  const onSubmit = async (data) => {
    const {
      foodName,
      category,
      price,
      ingredients,
      description,
      estimatedDeliveryTime,
      foodImageFile,
    } = data;

    if (!foodImageFile?.[0]) {
      toast.error("Please upload a food image");
      return;
    }

    let foodImage;

    try {
      foodImage = await imageUpload(foodImageFile[0]);
    } catch (error) {
      Swal.fire(error.message);
      return;
    }

    const newFood = {
      foodName: foodName.trim(),
      category,
      foodImage,
      price: Number(price),
      description: description.trim(),
      ingredients: ingredients
        .split(",")
        .map((item) => item.trim()),
      estimatedDeliveryTime,
      averageRating: 0,
      totalReviews: 0,
      createdBy: user?.email,
      createdAt: new Date().toISOString(),
    };

    await addMeal(newFood);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900 to-slate-800 text-white py-8 md:py-16 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-20 left-10 w-72 md:w-96 h-72 md:h-96 bg-lime-500 rounded-full opacity-20 blur-3xl -z-10"></div>

      <div className="absolute bottom-20 right-10 md:right-20 w-64 md:w-80 h-64 md:h-80 bg-lime-400 rounded-full opacity-30 blur-3xl -z-10"></div>

      <Container>
        {/* Heading */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Add New Meal
          </h1>

          <p className="text-gray-400 mt-3 text-sm md:text-base">
            Create and publish a delicious meal for customers.
          </p>
        </div>

        {/* Form Card */}
        <div className="max-w-5xl mx-auto bg-slate-800/70 border border-slate-700 rounded-2xl md:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-10">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8"
          >
            {/* Food Name */}
            <div className="space-y-2">
              <label className="block text-base md:text-lg font-medium">
                Food Name <span className="text-red-400">*</span>
              </label>

              <input
                type="text"
                placeholder="e.g. Spicy Chicken Burger"
                className="w-full px-4 md:px-6 py-3 md:py-4 bg-slate-900 border border-slate-700 rounded-xl focus:outline-none focus:border-lime-500 transition"
                {...register("foodName", {
                  required: "Food name is required",
                })}
              />

              {errors.foodName && (
                <p className="text-red-400 text-sm">
                  {errors.foodName.message}
                </p>
              )}
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="block text-base md:text-lg font-medium">
                Category <span className="text-red-400">*</span>
              </label>

              <select
                className="w-full px-4 md:px-6 py-3 md:py-4 bg-slate-900 border border-slate-700 rounded-xl focus:outline-none focus:border-lime-500"
                {...register("category", {
                  required: "Category is required",
                })}
              >
                <option value="">Select Category</option>
                <option value="Pizza">Pizza</option>
                <option value="Burger">Burger</option>
                <option value="Cake">Cake</option>
                <option value="Drinks">Drinks</option>
              </select>

              {errors.category && (
                <p className="text-red-400 text-sm">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* Price */}
            <div className="space-y-2">
              <label className="block text-base md:text-lg font-medium">
                Price (USD) <span className="text-red-400">*</span>
              </label>

              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="15.99"
                className="w-full px-4 md:px-6 py-3 md:py-4 bg-slate-900 border border-slate-700 rounded-xl focus:outline-none focus:border-lime-500"
                {...register("price", {
                  required: "Price is required",
                  min: {
                    value: 0.01,
                    message: "Price must be greater than 0",
                  },
                })}
              />

              {errors.price && (
                <p className="text-red-400 text-sm">
                  {errors.price.message}
                </p>
              )}
            </div>

            {/* Ingredients */}
            <div className="space-y-2">
              <label className="block text-base md:text-lg font-medium">
                Ingredients <span className="text-red-400">*</span>
              </label>

              <input
                type="text"
                placeholder="Chicken, Cheese, Onion, Tomato"
                className="w-full px-4 md:px-6 py-3 md:py-4 bg-slate-900 border border-slate-700 rounded-xl focus:outline-none focus:border-lime-500"
                {...register("ingredients", {
                  required: "Ingredients are required",
                })}
              />

              {errors.ingredients && (
                <p className="text-red-400 text-sm">
                  {errors.ingredients.message}
                </p>
              )}
            </div>

            {/* Delivery Time */}
            <div className="space-y-2">
              <label className="block text-base md:text-lg font-medium">
                Estimated Delivery Time{" "}
                <span className="text-red-400">*</span>
              </label>

              <input
                type="text"
                placeholder="45 Minutes"
                className="w-full px-4 md:px-6 py-3 md:py-4 bg-slate-900 border border-slate-700 rounded-xl focus:outline-none focus:border-lime-500"
                {...register("estimatedDeliveryTime", {
                  required: "Delivery time is required",
                })}
              />

              {errors.estimatedDeliveryTime && (
                <p className="text-red-400 text-sm">
                  {errors.estimatedDeliveryTime.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2 md:col-span-2">
              <label className="block text-base md:text-lg font-medium">
                Description <span className="text-red-400">*</span>
              </label>

              <textarea
                rows={5}
                placeholder="Describe your delicious meal..."
                className="w-full px-4 md:px-6 py-3 md:py-4 bg-slate-900 border border-slate-700 rounded-xl focus:outline-none focus:border-lime-500"
                {...register("description", {
                  required: "Description is required",
                })}
              />

              {errors.description && (
                <p className="text-red-400 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Food Image */}
            <div className="space-y-2 md:col-span-2">
              <label className="block text-base md:text-lg font-medium">
                Food Image <span className="text-red-400">*</span>
              </label>

              <input
                type="file"
                accept="image/*"
                className="w-full text-sm file:mr-2 md:file:mr-6 file:py-2 md:file:py-4 file:px-4 md:file:px-8 file:rounded-xl file:border-0 file:bg-lime-500/20 file:text-lime-400 hover:file:bg-lime-500/30 file:cursor-pointer"
                {...register("foodImageFile", {
                  required: "Food image is required",
                })}
              />

              {errors.foodImageFile && (
                <p className="text-red-400 text-sm">
                  {errors.foodImageFile.message}
                </p>
              )}

              <p className="text-xs md:text-sm text-gray-400">
                Upload a high-quality food image.
              </p>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={isPending}
                className="w-full md:w-auto px-6 md:px-16 py-3 md:py-4 bg-lime-500 text-black font-bold text-lg md:text-2xl rounded-xl hover:bg-lime-400 transition shadow-xl disabled:opacity-70 flex items-center justify-center mx-auto"
              >
                {isPending ? (
                  <span className="flex items-center gap-3">
                    <TbFidgetSpinner className="animate-spin text-2xl" />
                    Adding Meal...
                  </span>
                ) : (
                  "Add Meal"
                )}
              </button>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default AddFoodForm;

