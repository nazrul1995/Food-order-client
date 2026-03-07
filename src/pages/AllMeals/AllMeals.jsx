/* eslint-disable no-unused-vars */
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useMemo, useState, useEffect } from 'react'
import Container from '../../components/Shared/Container'
import Card from '../../components/Home/Card'
import LoadingSpinner from '../../components/Shared/LoadingSpinner'

const AllMeals = () => {
  const [sortOrder, setSortOrder] = useState('default')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const mealsPerPage = 10;

  const { data: meals = [], isLoading } = useQuery({
    queryKey: ['daily-meals'],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/meals`)
      return res.data
    },
  })

  // Get unique categories from meals
  const categories = useMemo(() => {
    const uniqueCategories = new Set(meals.map(meal => meal.category || 'Uncategorized'))
    return Array.from(uniqueCategories).sort()
  }, [meals])

  // Filter by category
  const filteredMeals = useMemo(() => {
    if (selectedCategory === 'all') {
      return meals
    }
    return meals.filter(meal => (meal.category || 'Uncategorized') === selectedCategory)
  }, [meals, selectedCategory])

  // Sorted meals based on dropdown
  const sortedMeals = useMemo(() => {
    if (sortOrder === 'asc') {
      return [...filteredMeals].sort((a, b) => a.price - b.price)
    }
    if (sortOrder === 'desc') {
      return [...filteredMeals].sort((a, b) => b.price - a.price)
    }
    return filteredMeals
  }, [filteredMeals, sortOrder])

  // Reset to page 1 when category changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentPage(1)
  }, [selectedCategory])

  // Paginated meals
  const paginatedMeals = useMemo(() => {
    const startIndex = (currentPage - 1) * mealsPerPage
    const endIndex = startIndex + mealsPerPage
    return sortedMeals.slice(startIndex, endIndex)
  }, [sortedMeals, currentPage])

  const totalPages = Math.ceil(sortedMeals.length / mealsPerPage)

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white py-12">
      <Container>
        {/* Section Title */}
        <h2 className="text-4xl font-bold text-center mb-8">
          Daily Meals
        </h2>

        {/* Category Filter and Sorting */}
        <div className="mb-10 space-y-4">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-semibold mb-2">Filter by Category:</label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-lg transition ${
                  selectedCategory === 'all'
                    ? 'bg-lime-500 text-black font-semibold'
                    : 'bg-slate-700 hover:bg-slate-600'
                }`}
              >
                All Categories
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg transition ${
                    selectedCategory === category
                      ? 'bg-lime-500 text-black font-semibold'
                      : 'bg-slate-700 hover:bg-slate-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Sorting Dropdown */}
          <div className="flex justify-end">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none"
          >
            <option value="default">Sort by Price</option>
            <option value="asc">Price: Low → High</option>
            <option value="desc">Price: High → Low</option>
          </select>
          </div>
        </div>

        {/* Loading */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner />
          </div>
        ) : paginatedMeals && paginatedMeals.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 gap-8">
              {paginatedMeals.map((meal) => (
                <div key={meal._id} className="rounded-3xl overflow-hidden">
                  <Card meal={meal} />
                </div>
              ))}
            </div>

            {/* Pagination Buttons */}
           {/* Pagination Buttons */}
<div className="flex justify-center mt-10 gap-3 flex-wrap">
  {/* Prev */}
  <button
    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
    disabled={currentPage === 1}
    className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition disabled:opacity-40"
  >
    Prev
  </button>

  {/* Page Numbers */}
  {Array.from({ length: totalPages }, (_, i) => {
    const page = i + 1
    const isActive = currentPage === page

    return (
      <button
        key={page}
        onClick={() => setCurrentPage(page)}
        className={`px-4 py-2 rounded-lg transition ${
          isActive
            ? "bg-lime-500 text-black font-bold"
            : "bg-slate-700 hover:bg-slate-600"
        }`}
      >
        {page}
      </button>
    )
  })}

  {/* Next */}
  <button
    onClick={() =>
      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
    }
    disabled={currentPage === totalPages}
    className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition disabled:opacity-40"
  >
    Next
  </button>
</div>
          </>
        ) : (
          <div className="text-center text-gray-300 mt-20">
            No meals available today. Please check back later!
          </div>
        )}
      </Container>
    </div>
  )
}

export default AllMeals
