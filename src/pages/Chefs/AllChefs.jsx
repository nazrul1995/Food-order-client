import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useState, useMemo } from 'react'
import Container from '../../components/Shared/Container'
import LoadingSpinner from '../../components/Shared/LoadingSpinner'
import { Link } from 'react-router'
import { FaStar, FaShoppingCart } from 'react-icons/fa'
import avatarImg from '../../assets/images/placeholder.jpg'

const AllChefs = () => {
  const [sortBy, setSortBy] = useState('rating')
  const [currentPage, setCurrentPage] = useState(1)
  const chefsPerPage = 12

  const { data: chefs = [], isLoading } = useQuery({
    queryKey: ['all-chefs'],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/chefs`)
      return res.data
    },
  })

  // Sort chefs
  const sortedChefs = useMemo(() => {
    const sorted = [...chefs]
    if (sortBy === 'rating') {
      return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0))
    } else if (sortBy === 'orders') {
      return sorted.sort((a, b) => (b.totalOrders || 0) - (a.totalOrders || 0))
    } else if (sortBy === 'name') {
      return sorted.sort((a, b) => (a.chefName || '').localeCompare(b.chefName || ''))
    }
    return sorted
  }, [chefs, sortBy])

  // Paginate chefs
  const paginatedChefs = useMemo(() => {
    const startIndex = (currentPage - 1) * chefsPerPage
    const endIndex = startIndex + chefsPerPage
    return sortedChefs.slice(startIndex, endIndex)
  }, [sortedChefs, currentPage])

  const totalPages = Math.ceil(sortedChefs.length / chefsPerPage)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white py-12 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white py-12">
      <Container>
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Expert Chefs</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover talented home chefs passionate about creating authentic, delicious meals
          </p>
        </div>

        {/* Sort Options */}
        <div className="mb-8 flex justify-end">
          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value)
              setCurrentPage(1)
            }}
            className="px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none"
          >
            <option value="rating">Sort by Rating</option>
            <option value="orders">Sort by Orders</option>
            <option value="name">Sort by Name</option>
          </select>
        </div>

        {/* Chefs Grid */}
        {paginatedChefs && paginatedChefs.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
              {paginatedChefs.map((chef) => (
                <Link key={chef._id} to={`/chef/${chef._id}`}>
                  <div className="bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-700/50 hover:border-lime-400/50 hover:shadow-lg transition-all duration-300 h-full cursor-pointer transform hover:scale-105">
                    {/* Chef Avatar */}
                    <div className="flex justify-center mb-4">
                      <img
                        src={chef.photoUrl || avatarImg}
                        alt={chef.chefName}
                        className="w-24 h-24 rounded-full object-cover border-4 border-lime-400 shadow-lg"
                      />
                    </div>

                    {/* Chef Info */}
                    <h3 className="text-xl font-bold text-white text-center mb-2">{chef.chefName}</h3>
                    <p className="text-gray-400 text-sm text-center mb-4">{chef.userEmail}</p>

                    {/* Stats */}
                    <div className="space-y-3 mb-4 bg-slate-700/50 p-3 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Rating:</span>
                        <div className="flex items-center gap-1">
                          <FaStar className="text-yellow-400" />
                          <span className="font-semibold">{(chef.rating || 0).toFixed(1)}/5</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Orders:</span>
                        <div className="flex items-center gap-1">
                          <FaShoppingCart className="text-orange-400" />
                          <span className="font-semibold">{chef.totalOrders || 0}</span>
                        </div>
                      </div>
                    </div>

                    {/* Verified Badge */}
                    {chef.verified && (
                      <div className="text-center mb-4">
                        <span className="inline-block px-3 py-1 bg-lime-400/20 text-lime-400 text-sm font-medium rounded-full">
                          ✓ Verified Chef
                        </span>
                      </div>
                    )}

                    {/* View Profile Button */}
                    <button className="w-full py-2 bg-lime-500 text-black font-semibold rounded-lg hover:bg-lime-400 transition-colors">
                      View Profile
                    </button>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12 gap-3 flex-wrap">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition disabled:opacity-40"
              >
                Prev
              </button>

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
            No chefs available at this moment.
          </div>
        )}
      </Container>
    </div>
  )
}

export default AllChefs
