import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import Container from '../../components/Shared/Container';
import { FaQuoteLeft, FaStar, FaUtensils } from 'react-icons/fa';

const Testimonials = () => {
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ['featured-reviews'],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/reviews/featured`);
      return res.data.slice(0, 6);
    },
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Structural ambient back lighting element maps */}
      <div className="absolute w-[500px] h-[500px] bg-lime-500/5 blur-[130px] rounded-full top-12 left-1/4 pointer-events-none" />
      <div className="absolute w-[500px] h-[500px] bg-emerald-500/5 blur-[130px] rounded-full bottom-0 right-1/4 pointer-events-none" />

      <Container>
        {/* Section Heading Design */}
        <div className="text-center mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-1.5 rounded-full">
            <FaQuoteLeft className="text-lime-400 text-xs" />
            <span className="text-lime-400 font-bold text-xs tracking-wide uppercase">Customer Stories</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white">
            What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-400">Community Says</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Real experiences from food lovers who have discovered their favorite artisanal meals 
            through our marketplace. Every order tells a unique story.
          </p>
        </div>

        {/* LOADING STATE - Skeleton Pulse Layout Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, idx) => (
              <div 
                key={idx} 
                className="w-full h-[260px] rounded-2xl bg-slate-900 border border-slate-850 p-6 space-y-5 animate-pulse"
              >
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-full bg-slate-800" />
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-slate-800 rounded w-1/3" />
                    <div className="h-3 bg-slate-800 rounded w-1/2" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-slate-800 rounded w-full" />
                  <div className="h-3 bg-slate-800 rounded w-5/6" />
                </div>
                <div className="h-4 bg-slate-800 rounded w-1/3" />
              </div>
            ))}
          </div>
        ) : (
          /* POPULATED REVIEWS LAYOUT CONTAINER */
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {reviews.map((review, index) => (
              <motion.div
                key={review._id || index}
                variants={itemVariants}
                className="bg-slate-900 border border-slate-850 rounded-2xl p-6 shadow-xl flex flex-col justify-between relative group hover:border-slate-700 transition-all duration-300"
              >
                {/* Visual Watermark Quote Icon Decoration */}
                <div className="absolute top-6 right-6 text-slate-800/40 group-hover:text-lime-500/10 transition-colors duration-300 pointer-events-none">
                  <FaQuoteLeft className="text-3xl" />
                </div>

                <div>
                  {/* User Account Info block positioned up top for reliability */}
                  <div className="flex items-center gap-3.5 mb-5 relative z-10">
                    <div className="size-11 rounded-full overflow-hidden flex-shrink-0 relative ring-2 ring-slate-850 group-hover:ring-lime-500/30 transition-all duration-300">
                      {review.reviewerImage ? (
                        <img
                          src={review.reviewerImage}
                          alt={review.reviewerName}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div 
                        className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 text-lime-400 font-bold text-sm"
                        style={{ display: review.reviewerImage ? 'none' : 'flex' }}
                      >
                        {review.reviewerName?.charAt(0) || 'U'}
                      </div>
                    </div>
                    
                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm font-bold text-white truncate tracking-tight">
                        {review.reviewerName || 'Anonymous User'}
                      </h4>
                      <p className="text-slate-500 text-[11px] font-medium tracking-wide uppercase mt-0.5">
                        Verified Consumer
                      </p>
                    </div>
                  </div>

                  {/* Rating Stars Layer */}
                  <div className="flex items-center gap-1.5 mb-4 relative z-10">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={`text-xs ${
                            i < (review.rating || 5) ? 'text-amber-400' : 'text-slate-700'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-slate-500 text-xs font-semibold">
                      {(review.rating || 5).toFixed(1)}
                    </span>
                  </div>

                  {/* Main Testimonial Copy Block */}
                  <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6 font-medium">
                    "{review.comment}"
                  </p>
                </div>

                {/* Footnote Core Metadata Block */}
                <div className="space-y-3 pt-4 border-t border-slate-800/60 relative z-10">
                  {review.mealName && (
                    <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                      <FaUtensils className="text-slate-600 text-[10px]" />
                      <span className="truncate">Ordered: <span className="text-slate-300 font-semibold">{review.mealName}</span></span>
                    </div>
                  )}
                  <div className="text-[11px] text-slate-500 font-semibold text-right">
                    {review.date ? new Date(review.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : 'Recent Order'}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Optimised Glassmorphic Response Prompt Block */}
        <div className="mt-16 max-w-3xl mx-auto relative z-10">
          <div className="bg-slate-900/40 backdrop-blur-sm rounded-2xl p-8 border border-slate-850 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left space-y-1">
              <h3 className="text-xl font-bold text-white tracking-tight">
                Join the Conversation
              </h3>
              <p className="text-slate-400 text-xs md:text-sm font-medium">
                Share your food adventures and help neighbors discover exceptional culinary talent.
              </p>
            </div>
            <button className="whitespace-nowrap px-6 py-3 bg-slate-950 border border-slate-800 hover:border-lime-500 text-slate-300 hover:text-slate-950 hover:bg-lime-400 font-bold text-xs rounded-xl transition-all duration-300 active:scale-[0.98]">
              Write a Review
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;