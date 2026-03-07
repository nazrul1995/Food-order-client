import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useParams, Link } from 'react-router'
import Container from '../../components/Shared/Container'
import LoadingSpinner from '../../components/Shared/LoadingSpinner'
import Card from '../../components/Home/Card'
import { FaStar, FaShoppingCart, FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa'
import { useState } from 'react'
import useAuth from '../../hooks/useAuth'
import avatarImg from '../../assets/images/placeholder.jpg'

const ChefDetails = () => {
  const { user } = useAuth()
  const { id } = useParams()
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [reviewRating, setReviewRating] = useState(0)
  const [reviewComment, setReviewComment] = useState('')

  // Fetch chef details
  const { data: chef = {}, isLoading: chefLoading } = useQuery({
    queryKey: ['chef', id],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/chefs/${id}`)
      return res.data
    },
  })

  // Fetch chef's meals
  const { data: meals = [], isLoading: mealsLoading } = useQuery({
    queryKey: ['chef-meals', id],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/meals/chef/${id}`)
      return res.data
    },
  })

  // Fetch chef reviews
  const { data: reviews = [], isLoading: reviewsLoading, refetch: refetchReviews } = useQuery({
    queryKey: ['chef-reviews', id],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/reviews/chef/${id}`)
      return res.data
    },
  })

  const handleSubmitReview = async (e) => {
    e.preventDefault()
    if (!reviewRating || !reviewComment.trim()) {
      alert('Please fill in all fields')
      return
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/reviews/chef`, {
        chefId: id,
        chefName: chef.chefName,
        rating: reviewRating,
        comment: reviewComment,
        reviewerName: user?.displayName || 'Anonymous',
        userEmail: user?.email || 'unknown',
      })

      setReviewRating(0)
      setReviewComment('')
      setShowReviewForm(false)
      refetchReviews()
    } catch (err) {
      console.error('Error submitting review:', err)
      alert('Failed to submit review')
    }
  }

  if (chefLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white py-12 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white py-12">
      <Container>
        {/* Chef Profile Header */}
        <div className="bg-slate-800 rounded-2xl p-8 mb-12 border border-slate-700">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Chef Avatar */}
            <div className="flex justify-center md:col-span-1">
              <img
                src={chef.photoUrl || avatarImg}
                alt={chef.chefName}
                className="w-40 h-40 rounded-full object-cover border-4 border-lime-400 shadow-lg"
              />
            </div>

            {/* Chef Info */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-bold">{chef.chefName}</h1>
                {chef.verified && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-lime-400/20 text-lime-400 rounded-full">
                    <FaCheckCircle /> Verified
                  </span>
                )}
              </div>
              <p className="text-gray-400 mb-4">{chef.userEmail}</p>
              <p className="text-gray-300 mb-6">{chef.bio || 'Passionate home chef dedicated to creating delicious meals.'}</p>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-slate-700/50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-lime-400 flex items-center justify-center gap-2">
                    <FaStar /> {(chef.rating || 0).toFixed(1)}
                  </div>
                  <p className="text-gray-400 text-sm">Rating</p>
                </div>
                <div className="bg-slate-700/50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-orange-400 flex items-center justify-center gap-2">
                    <FaShoppingCart /> {chef.totalOrders || 0}
                  </div>
                  <p className="text-gray-400 text-sm">Orders</p>
                </div>
                <div className="bg-slate-700/50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-400">{meals.length}</div>
                  <p className="text-gray-400 text-sm">Meals</p>
                </div>
              </div>

              {/* Info */}
              <div className="text-sm text-gray-400 space-y-1">
                {chef.experience && <p>Experience: {chef.experience}</p>}
                {chef.speciality && <p>Specialty: {chef.speciality}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Chef's Meals Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Meals by {chef.chefName}</h2>
          {mealsLoading ? (
            <LoadingSpinner />
          ) : meals.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {meals.map((meal) => (
                <div key={meal._id}>
                  <Card meal={meal} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No meals available from this chef yet.</p>
          )}
        </div>

        {/* Reviews Section */}
        <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
          <h2 className="text-3xl font-bold mb-6">Chef Reviews</h2>

          {/* Review Form */}
          <div className="mb-8">
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="px-6 py-3 bg-lime-500 text-black font-semibold rounded-lg hover:bg-lime-400 transition"
            >
              {showReviewForm ? 'Cancel' : 'Write a Review'}
            </button>

            {showReviewForm && (
              <form onSubmit={handleSubmitReview} className="mt-6 bg-slate-700 p-6 rounded-lg">
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2">Rating:</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setReviewRating(val)}
                        className="text-3xl transition"
                      >
                        <FaStar
                          className={val <= reviewRating ? 'text-yellow-400' : 'text-gray-600'}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2">Your Review:</label>
                  <textarea
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="Share your experience with this chef..."
                    className="w-full p-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none"
                    rows="4"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!reviewRating || !reviewComment.trim()}
                  className="px-6 py-2 bg-lime-500 text-black font-semibold rounded-lg hover:bg-lime-400 disabled:opacity-50 transition"
                >
                  Submit Review
                </button>
              </form>
            )}
          </div>

          {/* Reviews List */}
          <div className="space-y-4">
            {reviewsLoading ? (
              <LoadingSpinner />
            ) : reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review._id} className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-white">{review.reviewerName}</h4>
                      <p className="text-gray-400 text-sm">
                        {review.date ? new Date(review.date).toLocaleDateString() : 'Recently'}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={i < review.rating ? 'text-yellow-400' : 'text-gray-600'}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-300">{review.comment}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No reviews yet. Be the first to review!</p>
            )}
          </div>
        </div>
      </Container>
    </div>
  )
}

export default ChefDetails
