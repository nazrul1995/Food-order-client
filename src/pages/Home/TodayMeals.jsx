import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import Container from '../../components/Shared/Container';
import Card from '../../components/Home/Card';

const TodayMeals = () => {
  // Daily Meals Fetch via TanStack Query
  const { data: meals = [], isLoading } = useQuery({
    queryKey: ['daily-meals'],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/meals`);
      return res.data.slice(0, 6);
    },
  });

  // Animation variants for smooth, staggered reveals
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardItemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <section className="py-24 bg-slate-950 relative">
      <Container>
        
        {/* Section Heading Design */}
        <div className="text-center mb-16 space-y-3">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white">
            Today's <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-emerald-400 to-orange-400">Chef Specials</span>
          </h2>
          <p className="text-slate-400 max-w-md mx-auto text-sm md:text-base">
            Freshly prepared this morning. Limited servings available for premium doorstep delivery.
          </p>
        </div>

        {/* LOADING STATE - Modern Skeleton Grid Structure */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, idx) => (
              <div 
                key={idx} 
                className="w-full h-96 rounded-2xl bg-slate-900 border border-slate-850 p-4 space-y-4 animate-pulse flex flex-col justify-between"
              >
                <div className="w-full h-48 bg-slate-800 rounded-xl" />
                <div className="space-y-3 flex-1 pt-4">
                  <div className="h-5 bg-slate-800 rounded w-2/3" />
                  <div className="h-4 bg-slate-800 rounded w-1/2" />
                </div>
                <div className="h-10 bg-slate-800 rounded-xl w-full mt-auto" />
              </div>
            ))}
          </div>
        ) : (
          /* POPULATED MEALS CARDS CONTAINER */
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {meals.map((meal, index) => (
              <motion.div key={meal._id || index} variants={cardItemVariants}>
                <Card meal={meal} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* VIEW ALL MEALS NAVIGATION BUTTON */}
        {!isLoading && meals.length > 0 && (
          <div className="mt-16 text-center">
            <Link
              to="/meals"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-slate-900 hover:bg-slate-900/80 text-sm font-semibold text-slate-200 border border-slate-850 hover:border-slate-700 rounded-xl transition-all"
            >
              Browse Full Menu
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
};

export default TodayMeals;