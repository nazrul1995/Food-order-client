import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Container from '../../components/Shared/Container';
import { Link } from 'react-router';
import { FaStar, FaClock, FaFire } from 'react-icons/fa';
import { TbClock, TbStarFilled } from 'react-icons/tb';

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
         {meals?.map((meal, index) => {
  const {
    _id,
    foodName = "Untitled Recipe",
    chefName = "Local Chef",
    foodImage,
    price = 0,
    averageRating = 0,
    estimatedDeliveryTime = "30",
  } = meal || {};

  return (
    <div
      key={_id || index}
      className="group bg-slate-900/40 backdrop-blur-sm border border-slate-800/80 rounded-2xl overflow-hidden transition-all duration-300 hover:border-slate-700 hover:bg-slate-900 shadow-xl"
    >
      {/* Visual Header / Image Container */}
      <div className="relative h-48 overflow-hidden bg-slate-950">
        <img
          src={foodImage || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=60"}
          alt={foodName}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        
        {/* Ambient Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

        {/* Flat Compact Rating Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1 bg-slate-950/70 border border-slate-800/40 px-2.5 py-1 rounded-xl text-white text-xs font-bold backdrop-blur-md">
          <TbStarFilled className="text-amber-400 text-xs" />
          <span>{Number(averageRating).toFixed(1)}</span>
        </div>

        {/* Flat Compact Popularity Badge */}
        <div className="absolute top-3 right-3 bg-orange-500/10 border border-orange-500/20 text-orange-400 px-2.5 py-1 rounded-xl text-xs font-bold backdrop-blur-md tracking-tight">
          🔥 Popular
        </div>
      </div>

      {/* Structured Content Block */}
      <div className="p-5 space-y-4">
        <div className="space-y-1">
          <h3 className="text-base font-bold text-white tracking-tight truncate group-hover:text-lime-400 transition-colors">
            {foodName}
          </h3>
          <p className="text-slate-400 text-xs font-medium">
            by <span className="text-slate-200 font-semibold">{chefName}</span>
          </p>
        </div>

        {/* Logistics & Price Row */}
        <div className="flex items-center justify-between pt-1 border-t border-slate-900">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold">
            <TbClock className="text-orange-400 text-sm" />
            <span className="tracking-wide">{estimatedDeliveryTime} min transit</span>
          </div>
          <span className="text-base font-black text-lime-400 tracking-tight">
            ${Number(price).toFixed(2)}
          </span>
        </div>

        {/* Action Router Link Button */}
        <Link to={`/meals/${_id}`} className="block pt-1">
          <button className="w-full py-2.5 bg-slate-950 hover:bg-lime-400 border border-slate-800 hover:border-lime-400 text-slate-300 hover:text-slate-950 font-bold text-xs rounded-xl tracking-wide transition-all duration-300 active:scale-[0.98]">
            Order Kitchen Delivery
          </button>
        </Link>
      </div>
    </div>
  );
})}
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