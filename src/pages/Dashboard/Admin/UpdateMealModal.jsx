/* eslint-disable react-hooks/set-state-in-effect */
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState, useEffect } from 'react'
import useAuth from '../../../hooks/useAuth'

const UpdateMealModal = ({ isOpen, closeModal, meal, onUpdate }) => {
  const { user } = useAuth()
console.log(meal)
  const [formData, setFormData] = useState({
    foodName: '',
    price: '',
    rating: 0,
    ingredients: '',
    deliveryTime: 0,
  })

  useEffect(() => {
    if (isOpen && meal) {
      setFormData({
        foodName: meal.foodName || '',
        price: meal.price || '',
        rating: meal.rating || 0,
        ingredients: meal.ingredients ? meal.ingredients.join(', ') : '',
        deliveryTime: meal.estimatedDeliveryTime || 0,
      })
    }
  }, [isOpen, meal])

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = () => {
    onUpdate(meal._id, {
      foodName: formData.foodName,
      price: Number(formData.price),
      rating: Number(formData.rating),
      ingredients: formData.ingredients
        .split(',')
        .map((i) => i.trim()),
      estimatedDeliveryTime: Number(formData.deliveryTime),
      userEmail: user?.email,
    })
  }

  return (
    <Dialog
      open={isOpen}
      onClose={closeModal}
      className="relative z-50"
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
<div className="fixed inset-0 flex items-center justify-center p-4 md:p-8">
  <DialogPanel
  className="
    w-full
    max-w-2xl
    max-h-[90vh]
    bg-slate-900
    border
    border-slate-700
    rounded-3xl
    shadow-2xl
    flex
    flex-col
    overflow-hidden
  "
>    
          {/* Header */}
          <div className="bg-slate-800 border-b border-slate-700 px-6 py-5">
            <DialogTitle className="text-2xl font-bold text-white">
              Update Meal Here
            </DialogTitle>

            <p className="text-sm text-gray-400 mt-1">
              Modify your meal information below.
            </p>
          </div>

          {/* Body */}
<div className="flex-1 overflow-y-auto p-6 space-y-5">            {/* Food Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Food Name
              </label>

              <input
                name="foodName"
                type="text"
                value={formData.foodName}
                onChange={handleChange}
                placeholder="Food Name"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-lime-500 transition"
              />
            </div>

            {/* Price + Rating */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Price ($)
                </label>

                <input
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Price"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-lime-500 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Rating
                </label>

                <input
                  name="rating"
                  type="number"
                  min={0}
                  max={5}
                  value={formData.rating}
                  onChange={handleChange}
                  placeholder="Rating"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-lime-500 transition"
                />
              </div>
            </div>

            {/* Ingredients */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Ingredients
              </label>

              <input
                name="ingredients"
                type="text"
                value={formData.ingredients}
                onChange={handleChange}
                placeholder="Chicken, Rice, Onion"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-lime-500 transition"
              />
            </div>

            {/* Delivery Time */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Delivery Time (mins)
              </label>

              <input
                name="deliveryTime"
                type="number"
                value={formData.deliveryTime}
                onChange={handleChange}
                placeholder="Delivery Time"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-lime-500 transition"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 p-6 border-t border-slate-700 bg-slate-800">
            <button
              onClick={closeModal}
              className="px-5 py-3 rounded-xl bg-slate-700 text-white hover:bg-slate-600 transition"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              className="px-5 py-3 rounded-xl bg-lime-500 text-black font-bold hover:bg-lime-400 transition"
            >
              Update Meal
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}

export default UpdateMealModal