import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Container from '../../components/Shared/Container';
import { Link } from 'react-router';
import { FaStar, FaClock, FaFire } from 'react-icons/fa';

const PopularMeals = () => {
  const { data: meals = [], isLoading } = useQuery({
    queryKey: ['popular-meals'],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/meals/popular`);
      return res.data.slice(0, 8);
    },
  });

  if (isLoading) return <div className="text-center py-20">Loading popular meals...</div>;

  return (
    <Container>
      <div className="py-16">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <FaFire className="text-orange-400 text-2xl" />
            <span className="text-orange-400 font-semibold">Trending Now</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">Most Popular Meals</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover what everyone's ordering! These crowd favorites are loved by food enthusiasts
            across our platform for their exceptional taste and quality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {meals.map((meal, index) => (
            <div
              key={meal._id || index}
              className="group bg-slate-800 rounded-2xl overflow-hidden shadow-xl border border-slate-700/50 hover:border-orange-400/50 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={meal.foodImage || 'https://via.placeholder.com/300x200'}
                  alt={meal.foodName}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Rating Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1 bg-black/70 px-2 py-1 rounded-full text-white text-sm">
                  <FaStar className="text-yellow-400" />
                  <span>{meal.averageRating || 0}</span>
                </div>

                {/* Popular Badge */}
                <div className="absolute top-3 right-3 bg-orange-500 text-black px-2 py-1 rounded-full text-xs font-bold">
                  🔥 Popular
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-white mb-1 truncate">
                  {meal.foodName}
                </h3>
                <p className="text-gray-400 text-sm mb-2">by {meal.chefName}</p>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    <FaClock className="text-orange-400 text-sm" />
                    <span className="text-gray-400 text-sm">
                      {meal.estimatedDeliveryTime || '30'} min
                    </span>
                  </div>
                  <span className="text-lg font-bold text-lime-400">
                    ${meal.price}
                  </span>
                </div>

                <Link to={`/meals/${meal._id}`}>
                  <button className="w-full py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-lg hover:from-orange-400 hover:to-red-400 transition-all duration-300 transform hover:scale-105">
                    Order Now
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/meals">
            <button className="px-8 py-4 bg-lime-500 text-black font-bold rounded-full hover:bg-lime-400 transition-all duration-300 transform hover:scale-105 shadow-lg">
              View All Meals →
            </button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default PopularMeals;