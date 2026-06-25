import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import Container from '../../components/Shared/Container';
import { FaStar, FaClock, FaCheckCircle } from 'react-icons/fa';

const FeaturedChefs = () => {
  const { data: chefs = [], isLoading } = useQuery({
    queryKey: ['featured-chefs'],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/chefs/featured`);
      return res.data.slice(0, 6); // Balanced grid (2x3 or 3x2)
    },
  });

  // Default fallback image if chef image fails or is empty
  const defaultChefImg = "https://i.ibb.co.com/5hjWLK6C/Chef2.jpg";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Structural background light accent */}
      <div className="absolute w-[500px] h-[500px] bg-orange-500/5 blur-[140px] rounded-full bottom-0 left-0 pointer-events-none" />

      <Container>
        {/* Section Heading Design */}
        <div className="text-center mb-16 space-y-3">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white">
            Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-emerald-400 to-orange-400">Master Culinary Artists</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Professional home chefs passionate about creating authentic, delicious culinary masterpieces 
            using traditional recipes and farm-fresh ingredients.
          </p>
        </div>

        {/* LOADING STATE - Skeleton Pulse Layout Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, idx) => (
              <div 
                key={idx} 
                className="w-full h-[280px] rounded-2xl bg-slate-900 border border-slate-850 p-6 space-y-5 animate-pulse"
              >
                <div className="flex items-center gap-4">
                  <div className="size-16 rounded-full bg-slate-800" />
                  <div className="space-y-2 flex-1">
                    <div className="h-5 bg-slate-800 rounded w-1/2" />
                    <div className="h-3 bg-slate-800 rounded w-2/3" />
                  </div>
                </div>
                <div className="h-px bg-slate-800 w-full" />
                <div className="flex justify-between">
                  <div className="h-4 bg-slate-800 rounded w-1/4" />
                  <div className="h-4 bg-slate-800 rounded w-1/4" />
                </div>
                <div className="h-11 bg-slate-800 rounded-xl w-full" />
              </div>
            ))}
          </div>
        ) : (
          /* POPULATED CHEFS LAYOUT CONTAINER */
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {chefs.map((chef, index) => (
              <motion.div
                key={chef._id?.$oid || chef._id || index}
                variants={itemVariants}
                className="bg-slate-900 border border-slate-850 rounded-2xl p-6 shadow-xl relative group hover:border-slate-700 hover:bg-slate-900/90 transition-all duration-300"
              >
                {/* Visual glow overlay element on card hover */}
                <div className="absolute inset-0 bg-linear-to-br from-lime-500/5 to-orange-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Card Header Profile Block */}
                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <div className="size-16 rounded-full overflow-hidden flex-shrink-0 relative ring-2 ring-slate-800 group-hover:ring-lime-500/40 transition-all duration-300">
                    <img
                      src={chef.photoUrl || defaultChefImg}
                      alt={chef.name || 'Chef'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = defaultChefImg;
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-lg font-bold text-white truncate group-hover:text-lime-400 transition-colors tracking-tight">
                        {chef.name || 'Culinary Chef'}
                      </h3>
                      {chef.verified && (
                        <FaCheckCircle className="text-lime-400 text-sm flex-shrink-0" title="Verified Expert Chef" />
                      )}
                    </div>
                    <p className="text-slate-500 text-xs truncate font-medium mt-0.5">{chef.userEmail}</p>
                  </div>
                </div>

                <div className="border-t border-slate-800/60 my-4" />

                {/* Performance Analytics Data Row */}
                <div className="flex items-center justify-between mb-6 text-sm relative z-10">
                  <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-850">
                    <FaStar className="text-amber-400 text-xs" />
                    <span className="text-slate-200 font-semibold">
                      {chef.rating > 0 ? chef.rating.toFixed(1) : 'New'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 font-medium">
                    <FaClock className="text-slate-500" />
                    <span>{chef.totalOrders || 0} Orders Served</span>
                  </div>
                </div>

                {/* Primary CTA Action Button */}
                <button className="w-full py-3 bg-slate-950 border border-slate-800 group-hover:border-lime-500 text-slate-300 group-hover:text-slate-950 group-hover:bg-lime-400 font-bold text-sm rounded-xl transition-all duration-300 relative z-10 active:scale-[0.99]">
                  View Kitchen Menu
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </Container>
    </section>
  );
};

export default FeaturedChefs;