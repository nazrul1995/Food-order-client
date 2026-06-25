import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import Container from '../../components/Shared/Container';
import { FaUsers, FaUtensils, FaStar, FaMapMarkerAlt, FaTruck, FaShoppingBag  } from 'react-icons/fa';
import { PiChefHatLight } from "react-icons/pi";

const Statistics = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['platform-stats'],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/stats`);
      return res.data;
    },
  });

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
      icon: <FaUsers />,
      value: displayStats.totalUsers.toLocaleString(),
      label: "Happy Customers",
      description: "Active platform food lovers",
      color: "from-lime-400 to-emerald-500",
      glow: "group-hover:border-lime-500/30"
    },
    {
      icon: <FaUtensils />,
      value: displayStats.totalMeals.toLocaleString(),
      label: "Delicious Meals",
      description: "Artisanal chef-crafted dishes",
      color: "from-orange-400 to-amber-500",
      glow: "group-hover:border-orange-500/30"
    },
    {
      icon: <FaShoppingBag />,
      value: `${displayStats.totalOrders.toLocaleString()}+`,
      label: "Orders Delivered",
      description: "Successfully prepared & delivered",
      color: "from-purple-400 to-indigo-500",
      glow: "group-hover:border-purple-500/30"
    },
    {
      icon: <PiChefHatLight/>,
      value: displayStats.totalChefs,
      label: "Expert Chefs",
      description: "Vetted independent culinary talent",
      color: "from-pink-400 to-rose-500",
      glow: "group-hover:border-rose-500/30"
    },
    {
      icon: <FaStar />,
      value: typeof displayStats.averageRating === 'number' ? displayStats.averageRating.toFixed(1) : displayStats.averageRating,
      label: "Average Rating",
      description: "Community review average score",
      color: "from-amber-400 to-yellow-500",
      glow: "group-hover:border-amber-500/30"
    },
    {
      icon: <FaMapMarkerAlt />,
      value: displayStats.citiesCovered,
      label: "Cities Covered",
      description: "Active serving operational areas",
      color: "from-sky-400 to-blue-500",
      glow: "group-hover:border-sky-500/30"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Decorative localized space backdrop accents */}
      <div className="absolute w-[500px] h-[500px] bg-emerald-500/5 blur-[130px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <Container>
        {/* Section Heading Design */}
        <div className="text-center mb-16 space-y-3">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white">
            Our Impact in <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-emerald-400 to-orange-400">Numbers</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            We are redefining home delivery ecosystems and changing how communities engage with food creators.
          </p>
        </div>

        {/* LOADING INFRASTRUCTURE - Skeleton Pulse Layout */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, idx) => (
              <div key={idx} className="h-[180px] rounded-2xl bg-slate-900 border border-slate-850 p-6 space-y-4 animate-pulse">
                <div className="size-10 rounded-xl bg-slate-800" />
                <div className="h-6 bg-slate-800 rounded w-1/3" />
                <div className="space-y-1.5">
                  <div className="h-4 bg-slate-800 rounded w-1/2" />
                  <div className="h-3 bg-slate-800 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* POPULATED METRICS GRID CONFIGURATION */
          <div className="space-y-6">
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {statItems.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  className={`bg-slate-900/50 backdrop-blur-sm border border-slate-850 rounded-2xl p-6 relative group transition-all duration-300 hover:bg-slate-900 ${stat.glow}`}
                >
                  {/* Decorative card inner corner highlights */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-transparent group-hover:border-lime-500/20 rounded-tl-2xl transition-all duration-300" />

                  <div className="flex items-start gap-4">
                    {/* Compact Icon Box */}
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-br ${stat.color} text-slate-950 text-lg font-bold shadow-lg shadow-transparent transition-all duration-300 group-hover:scale-105`}>
                      {stat.icon}
                    </div>

                    {/* Numerical and Descriptor Text Assembly */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="text-2xl md:text-3xl font-black text-white tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 transition-all duration-300">
                        {stat.value}
                      </div>
                      <div className="text-sm font-bold text-slate-200 tracking-tight">
                        {stat.label}
                      </div>
                      <p className="text-slate-500 text-xs font-medium leading-relaxed">
                        {stat.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Static Guaranteed Performance Footer Strip */}
            <motion.div 
              className="relative z-10 bg-gradient-to-r from-slate-900 via-slate-900/40 to-slate-900 border border-slate-850 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 text-sm flex-shrink-0">
                  <FaTruck />
                </div>
                <p className="text-slate-400 text-xs md:text-sm font-medium">
                  All active operations leverage our optimized route system to maintain a guaranteed <span className="text-white font-bold">30-45 min</span> fresh delivery lifecycle.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </Container>
    </section>
  );
};

export default Statistics;