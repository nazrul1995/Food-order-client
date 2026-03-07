import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Container from '../../components/Shared/Container';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const Testimonials = () => {
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ['featured-reviews'],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/reviews/featured`);
      return res.data.slice(0, 6);
    },
  });

  if (isLoading) return <div className="text-center py-20">Loading testimonials...</div>;

  return (
    <Container>
      <div className="py-16">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <FaQuoteLeft className="text-lime-400 text-2xl" />
            <span className="text-lime-400 font-semibold">Customer Stories</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">What Our Community Says</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Real experiences from food lovers who have discovered their favorite meals
            through our platform. Every review tells a story of culinary delight.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div
              key={review._id || index}
              className="bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-700/50 hover:border-lime-400/30 transition-all duration-300 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 text-lime-400/30">
                <FaQuoteLeft className="text-2xl" />
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`text-lg ${
                      i < review.rating ? 'text-yellow-400' : 'text-gray-600'
                    }`}
                  />
                ))}
                <span className="text-gray-400 text-sm ml-2">
                  {review.rating}/5
                </span>
              </div>

              {/* Review Text */}
              <p className="text-gray-300 text-lg leading-relaxed mb-6 italic">
                "{review.comment}"
              </p>

              {/* Reviewer Info */}
              <div className="flex items-center gap-4">
                <img
                  src={review.reviewerImage || 'https://via.placeholder.com/60'}
                  alt={review.reviewerName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-lime-400/50"
                />
                <div>
                  <h4 className="text-white font-semibold">
                    {review.reviewerName}
                  </h4>
                  <p className="text-gray-400 text-sm">
                    {review.date ? new Date(review.date).toLocaleDateString() : 'Recent'}
                  </p>
                  <p className="text-lime-400 text-xs font-medium">
                    Verified Customer
                  </p>
                </div>
              </div>

              {/* Meal Info */}
              {review.mealName && (
                <div className="mt-4 pt-4 border-t border-slate-700">
                  <p className="text-gray-500 text-sm">
                    About: <span className="text-gray-400">{review.mealName}</span>
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Join the Conversation
            </h3>
            <p className="text-gray-400 mb-6">
              Share your food experiences and help others discover great meals.
              Your review could be featured here next!
            </p>
            <button className="px-8 py-3 bg-lime-500 text-black font-bold rounded-full hover:bg-lime-400 transition-all duration-300 transform hover:scale-105">
              Write a Review
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Testimonials;