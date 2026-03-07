import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Container from '../../components/Shared/Container';
import { FaStar, FaMapMarkerAlt, FaClock, FaCheckCircle } from 'react-icons/fa';

const FeaturedChefs = () => {
  const { data: chefs = [], isLoading } = useQuery({
    queryKey: ['featured-chefs'],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/chefs/featured`);
      return res.data.slice(0, 7);
    },
  });

  if (isLoading) return <div className="text-center py-20 text-white">Loading chefs...</div>;

  return (
    <Container>
      <div className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-white mb-4">Meet Our Expert Chefs</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Professional home chefs passionate about creating authentic, delicious meals
            using traditional recipes and fresh local ingredients.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {chefs.map((chef, index) => (
            <div
              key={chef._id || index}
              className="bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-700/50 hover:border-lime-400/60 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-lime-500">
                  {chef.photoUrl ? (
                    <img
                      src={chef.photoUrl}
                      alt={chef.chefName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-lime-400 text-black font-bold text-xl">
                      {chef.chefName?.charAt(0) || 'C'}
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-lime-400 transition-colors">
                    {chef.chefName || 'Chef Name'}
                  </h3>
                  <p className="text-gray-400 text-sm">{chef.userEmail}</p>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FaStar className="text-yellow-400" />
                    <span className="text-white font-medium">{chef.rating || 0}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaClock className="text-orange-400" />
                    <span className="text-gray-400 text-sm">{chef.totalOrders || 0} Orders</span>
                  </div>
                </div>

                {chef.verified && (
                  <div className="flex items-center gap-2 text-lime-400 font-medium">
                    <FaCheckCircle />
                    <span>Verified Chef</span>
                  </div>
                )}
              </div>

              <button className="w-full py-3 bg-gradient-to-r from-lime-500 to-lime-400 text-black font-semibold rounded-lg hover:scale-105 transition-all duration-300">
                View Chef Profile
              </button>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default FeaturedChefs;