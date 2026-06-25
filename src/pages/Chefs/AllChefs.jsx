import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useState, useMemo } from 'react'
import Container from '../../components/Shared/Container'
import LoadingSpinner from '../../components/Shared/LoadingSpinner'
import { Link } from 'react-router'
import { TbStarFilled, TbShoppingCart, TbChevronLeft, TbChevronRight, TbCheck, TbSelector } from 'react-icons/tb'
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
      <div className="min-h-screen bg-slate-950 text-white py-24 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-16 relative overflow-hidden">
      {/* Structural background atmosphere blurs */}
      <div className="absolute top-20 left-[-10%] w-[500px] h-[500px] bg-lime-500/5 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-20 right-[-10%] w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[130px] pointer-events-none -z-10" />

      <Container>
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white">
            Our Expert{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-400">
              Kitchen Specialists
            </span>
          </h1>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed font-medium">
            Discover independent home culinary artisans cooking authentic family recipes with premium local ingredients safely delivered to your doorstep.
          </p>
        </div>

        {/* Filters/Sort Matrix Layer */}
        <div className="mb-10 flex items-center justify-between border-b border-slate-900 pb-5">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Showing {paginatedChefs.length} of {sortedChefs.length} Chefs
          </p>
          <div className="relative inline-block w-48">
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full pl-4 pr-10 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs font-bold text-slate-300 appearance-none focus:outline-none focus:border-slate-700 focus:text-white transition-colors cursor-pointer"
            >
              <option value="rating">Sort by Rating</option>
              <option value="orders">Sort by Total Orders</option>
              <option value="name">Sort by Name</option>
            </select>
            <TbSelector className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none text-sm" />
          </div>
        </div>

        {/* Chefs Grid Area */}
        {paginatedChefs && paginatedChefs.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedChefs.map((chef) => (
                <div
                  key={chef._id}
                  className="group bg-slate-900/40 backdrop-blur-sm border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:border-slate-700 hover:bg-slate-900 shadow-xl"
                >
                  <div className="space-y-4">
                    {/* Visual Profile Avatar Container */}
                    <div className="flex justify-center relative">
                      <div className="relative">
                        <img
                          src={chef.photoUrl || avatarImg}
                          alt={chef.chefName}
                          className="w-20 h-20 rounded-full object-cover border-2 border-slate-800 group-hover:border-lime-400 transition-colors duration-300 shadow-xl"
                        />
                        {chef.verified && (
                          <div className="absolute bottom-0 right-0 size-6 bg-lime-400 border-4 border-slate-950 rounded-full flex items-center justify-center text-slate-950 text-[10px]" title="Verified Kitchen Specialist">
                            <TbCheck className="stroke-[4]" />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Meta Identities */}
                    <div className="text-center space-y-1">
                      <h3 className="text-base font-bold text-white tracking-tight group-hover:text-lime-400 transition-colors truncate">
                        {chef.chefName || "Local Artisan"}
                      </h3>
                      <p className="text-slate-500 text-xs font-medium truncate">
                        {chef.userEmail}
                      </p>
                    </div>

                    {/* Integrated Analytics Sub-Board */}
                    <div className="grid grid-cols-2 gap-2 bg-slate-950/40 p-2.5 rounded-xl border border-slate-950">
                      <div className="text-center py-1">
                        <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Rating</span>
                        <div className="flex items-center justify-center gap-1 text-xs font-bold text-slate-200">
                          <TbStarFilled className="text-amber-400 text-xs" />
                          <span>{Number(chef.rating || 0).toFixed(1)}</span>
                        </div>
                      </div>
                      <div className="text-center py-1 border-l border-slate-900">
                        <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Orders</span>
                        <div className="flex items-center justify-center gap-1 text-xs font-bold text-slate-200">
                          <TbShoppingCart className="text-orange-400 text-xs" />
                          <span>{chef.totalOrders || 0}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Primary Profile Anchor Routing Block */}
                  <div className="pt-5 mt-5 border-t border-slate-950">
                    <Link to={`/chef/${chef._id}`} className="block">
                      <button className="w-full py-2.5 bg-slate-950 hover:bg-lime-400 border border-slate-850 hover:border-lime-400 text-slate-300 hover:text-slate-950 font-bold text-xs rounded-xl tracking-wide transition-all duration-300 active:scale-[0.98]">
                        View Chef Portfolio
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls Module */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center mt-16 gap-2">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-850 hover:border-slate-700 text-slate-400 hover:text-white transition-all disabled:opacity-30 disabled:pointer-events-none active:scale-95"
                >
                  <TbChevronLeft className="text-lg" />
                </button>

                <div className="flex items-center gap-1.5 px-2">
                  {Array.from({ length: totalPages }, (_, i) => {
                    const page = i + 1
                    const isActive = currentPage === page

                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`min-w-[38px] h-[38px] px-3 rounded-xl text-xs font-bold tracking-wide transition-all duration-200 active:scale-95 ${
                          isActive
                            ? "bg-lime-400 text-slate-950 shadow-md shadow-lime-500/10"
                            : "bg-slate-900/50 border border-slate-850 hover:border-slate-700 text-slate-400 hover:text-white"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  })}
                </div>

                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-850 hover:border-slate-700 text-slate-400 hover:text-white transition-all disabled:opacity-30 disabled:pointer-events-none active:scale-95"
                >
                  <TbChevronRight className="text-lg" />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 bg-slate-900/10 border border-dashed border-slate-900 rounded-3xl mt-12">
            <p className="text-slate-500 text-sm font-semibold">
              No kitchen specialists match your active dashboard configuration sequence.
            </p>
          </div>
        )}
      </Container>
    </div>
  )
}

export default AllChefs