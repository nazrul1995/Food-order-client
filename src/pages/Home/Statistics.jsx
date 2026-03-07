import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Container from '../../components/Shared/Container';
import { FaUsers, FaUtensils, FaStar, FaMapMarkerAlt } from 'react-icons/fa';

const Statistics = () => {
  const { data: stats } = useQuery({
    queryKey: ['platform-stats'],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/stats`);
      return res.data;
    },
  });

  // Default stats if API doesn't provide them
  const defaultStats = {
    totalUsers: 1250,
    totalMeals: 340,
    totalChefs: 45,
    totalOrders: 2850,
    averageRating: 4.8,
    citiesCovered: 8
  };

  const displayStats = stats || defaultStats;

  const statItems = [
    {
      icon: <FaUsers className="text-3xl text-lime-400" />,
      value: displayStats.totalUsers.toLocaleString(),
      label: "Happy Customers",
      description: "Satisfied food lovers"
    },
    {
      icon: <FaUtensils className="text-3xl text-orange-400" />,
      value: displayStats.totalMeals.toLocaleString(),
      label: "Delicious Meals",
      description: "Chef-crafted dishes"
    },
    {
      icon: <FaStar className="text-3xl text-yellow-400" />,
      value: displayStats.averageRating,
      label: "Average Rating",
      description: "Customer satisfaction"
    },
    {
      icon: <FaMapMarkerAlt className="text-3xl text-purple-400" />,
      value: displayStats.citiesCovered,
      label: "Cities Covered",
      description: "Delivery areas"
    }
  ];

  return (
    <div className="bg-slate-900 py-16">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Our Impact in Numbers</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            We're growing rapidly and making a real difference in how people experience food delivery.
            Here's what our community has achieved together.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {statItems.map((stat, index) => (
            <div
              key={index}
              className="bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-700/50 hover:border-lime-400/30 transition-all duration-300 text-center group"
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
              </div>

              <div className="text-3xl font-bold text-white mb-2 group-hover:text-lime-400 transition-colors">
                {stat.value}
              </div>

              <div className="text-lg font-semibold text-gray-300 mb-1">
                {stat.label}
              </div>

              <div className="text-sm text-gray-500">
                {stat.description}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Stats Row */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-lime-500/20 rounded-2xl p-6 border border-lime-400/30 text-center">
            <div className="text-2xl font-bold text-lime-400 mb-2">
              {displayStats.totalOrders.toLocaleString()}+
            </div>
            <div className="text-white font-medium">Orders Delivered</div>
            <div className="text-gray-400 text-sm">Successfully completed</div>
          </div>

          <div className="bg-purple-500/20 rounded-2xl p-6 border border-purple-400/30 text-center">
            <div className="text-2xl font-bold text-purple-400 mb-2">
              {displayStats.totalChefs}+
            </div>
            <div className="text-white font-medium">Expert Chefs</div>
            <div className="text-gray-400 text-sm">Verified professionals</div>
          </div>

          <div className="bg-blue-500/20 rounded-2xl p-6 border border-blue-400/30 text-center">
            <div className="text-2xl font-bold text-blue-400 mb-2">
              30-45 min
            </div>
            <div className="text-white font-medium">Average Delivery</div>
            <div className="text-gray-400 text-sm">Hot & fresh guarantee</div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Statistics;