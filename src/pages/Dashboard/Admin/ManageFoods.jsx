import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Swal from 'sweetalert2'
import useAuth from '../../../hooks/useAuth'
import { TbStarFilled } from 'react-icons/tb'
import UpdateMealModal from './UpdateMealModal'

const ManageFoods = () => {
  const { user } = useAuth()

  const [selectedMeal, setSelectedMeal] = useState(null)
  const [isUpdateOpen, setIsUpdateOpen] = useState(false)

  // Fetch meals
  const {
    data: meals = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['my-meals', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/seller-created-meals/${user.email}`
      )
      return res.data
    },
  })

  // Stats
  const totalMeals = meals.length

  const totalReviews = meals.reduce(
    (sum, meal) => sum + (meal.totalReviews || 0),
    0
  )

  const averageRating =
    meals.length > 0
      ? (
          meals.reduce(
            (sum, meal) => sum + (meal.averageRating || 0),
            0
          ) / meals.length
        ).toFixed(1)
      : 0

  const highestPrice =
    meals.length > 0
      ? Math.max(...meals.map((meal) => meal.price || 0))
      : 0

  // Delete Meal
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Delete Meal?',
      text: 'This meal will be permanently removed.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#84cc16',
      cancelButtonColor: '#ef4444',
      confirmButtonText: 'Delete',
    })

    if (!result.isConfirmed) return

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/seller-created-meals/${id}`
      )

      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: 'Meal deleted successfully.',
        timer: 1800,
        showConfirmButton: false,
      })

      refetch()
    } catch (error) {
      console.log(error)

      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: 'Could not delete meal.',
      })
    }
  }

  // Open Update Modal
  const handleUpdateClick = (meal) => {
    setSelectedMeal(meal)
    setIsUpdateOpen(true)
  }

  // Update Meal
  const handleUpdate = async (id, updatedData) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/update-meal/${id}`,
        updatedData
      )

      Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: 'Meal updated successfully.',
        timer: 1800,
        showConfirmButton: false,
      })

      setIsUpdateOpen(false)
      refetch()
    } catch (error) {
      console.log(error)

      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: 'Please try again.',
      })
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-slate-900">
        <span className="loading loading-spinner loading-lg text-lime-400"></span>
      </div>
    )
  }
console.log(meals)
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900 to-slate-800 text-white py-16 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-lime-500 rounded-full opacity-20 blur-3xl -z-10"></div>
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-cyan-500 rounded-full opacity-20 blur-3xl -z-10"></div>

      <div className="container mx-auto px-6">
        {/* Header */}
        <h1 className="text-4xl lg:text-5xl font-bold text-center mb-12">
          Manage Meals
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div className="bg-slate-800/70 border border-slate-700 rounded-2xl p-5">
            <p className="text-gray-400 text-sm">Total Meals</p>
            <h3 className="text-3xl font-bold">{totalMeals}</h3>
          </div>

          <div className="bg-slate-800/70 border border-slate-700 rounded-2xl p-5">
            <p className="text-gray-400 text-sm">Average Rating</p>
            <h3 className="text-3xl font-bold text-yellow-400">
              {averageRating}
            </h3>
          </div>

          <div className="bg-slate-800/70 border border-slate-700 rounded-2xl p-5">
            <p className="text-gray-400 text-sm">Total Reviews</p>
            <h3 className="text-3xl font-bold text-cyan-400">
              {totalReviews}
            </h3>
          </div>

          <div className="bg-slate-800/70 border border-slate-700 rounded-2xl p-5">
            <p className="text-gray-400 text-sm">Highest Price</p>
            <h3 className="text-3xl font-bold text-lime-400">
              ${highestPrice}
            </h3>
          </div>
        </div>

        {/* Empty State */}
        {meals.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-7xl mb-4">🍔</div>

            <h2 className="text-3xl font-bold mb-2">
              No Meals Created Yet
            </h2>

            <p className="text-gray-400">
              Start adding meals to attract customers.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block">
              <div className="overflow-x-auto bg-slate-800/70 rounded-2xl border border-slate-700 shadow-xl">
                <table className="min-w-full text-sm text-left">
                  <thead className="bg-slate-900 text-gray-300 uppercase text-xs">
                    <tr>
                      <th className="px-6 py-4">Food</th>
                      <th className="px-6 py-4">Price</th>
                      <th className="px-6 py-4">Rating</th>
                      <th className="px-6 py-4">Reviews</th>
                      <th className="px-6 py-4">Created</th>
                      <th className="px-6 py-4">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-700">
                    {meals.map((meal) => (
                      <tr
                        key={meal._id}
                        className="hover:bg-slate-700/40 transition"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={meal.foodImage}
                              alt={meal.foodName}
                              className="w-14 h-14 rounded-lg object-cover"
                            />

                            <span className="font-semibold">
                              {meal.foodName}
                            </span>
                          </div>
                        </td>

                        <td className="px-6 py-4 text-lime-400 font-bold">
                          ${meal.price}
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1">
                            <TbStarFilled className="text-yellow-400" />
                            {meal.averageRating || 0}
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          {meal.totalReviews || 0}
                        </td>

                        <td className="px-6 py-4">
                          {new Date(
                            meal.createdAt
                          ).toLocaleDateString()}
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() =>
                                handleUpdateClick(meal)
                              }
                              className="px-4 py-2 bg-blue-500/10 text-blue-300 border border-blue-500/20 rounded-lg hover:bg-blue-500 hover:text-white transition"
                            >
                              Update
                            </button>

                            <button
                              onClick={() =>
                                handleDelete(meal._id)
                              }
                              className="px-4 py-2 bg-red-500/10 text-red-300 border border-red-500/20 rounded-lg hover:bg-red-500 hover:text-white transition"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Cards */}
            <div className="block md:hidden space-y-6">
              {meals.map((meal) => (
                <div
                  key={meal._id}
                  className="bg-slate-800/70 rounded-2xl p-5 border border-slate-700 shadow-lg"
                >
                  <img
                    src={meal.foodImage}
                    alt={meal.foodName}
                    className="w-full h-52 object-cover rounded-xl mb-4"
                  />

                  <h2 className="text-xl font-bold mb-3">
                    {meal.foodName}
                  </h2>

                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="text-gray-400">
                        Price:
                      </span>{' '}
                      <span className="text-lime-400 font-bold">
                        ${meal.price}
                      </span>
                    </p>

                    <p>
                      <span className="text-gray-400">
                        Rating:
                      </span>{' '}
                      ⭐ {meal.averageRating || 0}
                    </p>

                    <p>
                      <span className="text-gray-400">
                        Reviews:
                      </span>{' '}
                      {meal.totalReviews || 0}
                    </p>

                    <p>
                      <span className="text-gray-400">
                        Created:
                      </span>{' '}
                      {new Date(
                        meal.createdAt
                      ).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex gap-3 mt-5">
                    <button
                      onClick={() =>
                        handleUpdateClick(meal)
                      }
                      className="flex-1 py-3 bg-blue-600 text-white font-semibold rounded-xl"
                    >
                      Update
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(meal._id)
                      }
                      className="flex-1 py-3 bg-red-600 text-white font-semibold rounded-xl"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Update Modal */}
      {selectedMeal && (
        <UpdateMealModal
          isOpen={isUpdateOpen}
          closeModal={() => setIsUpdateOpen(false)}
          meal={selectedMeal}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  )
}

export default ManageFoods

