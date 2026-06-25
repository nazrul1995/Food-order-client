// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router";

const Hero = () => {
  // Animation variants for clean, staggered orchestration
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  return (
    <section className="relative bg-slate-950 text-white min-h-screen flex items-center overflow-hidden py-20 lg:py-0">
      
      {/* Background radial ambient glow */}
      <div className="absolute w-[600px] h-[600px] bg-lime-500/10 blur-[140px] rounded-full -top-40 -left-20 pointer-events-none" />
      <div className="absolute w-[500px] h-[500px] bg-orange-500/10 blur-[140px] rounded-full bottom-10 right-10 pointer-events-none" />
      
      {/* Soft grid overlay for premium texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60 pointer-events-none" />

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* LEFT CONTENT */}
        <motion.div
          className="lg:col-span-7 space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Tag Pill */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-lime-400 animate-pulse" />
            <span className="text-xs font-medium tracking-wide text-slate-300 uppercase">
              🍽️ Premium Food Delivery
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1]">
            Chef-Crafted Meals <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-emerald-400 to-orange-400">
              Delivered Fresh
            </span>
          </motion.h1>

          {/* Paragraph */}
          <motion.p variants={itemVariants} className="text-slate-400 text-lg max-w-xl leading-relaxed">
            Skip the prep work. Enjoy delicious, nutrition-packed meals made from 
            locally sourced ingredients, optimized for your health goals, and delivered right to your doorstep.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-2">
            <Link
              to="/meals"
              className="px-8 py-4 bg-gradient-to-r from-lime-500 to-emerald-500 text-slate-950 font-bold rounded-xl hover:opacity-95 active:scale-98 transition-all shadow-[0_0_30px_rgba(132,204,22,0.2)]"
            >
              Explore Menu
            </Link>

            <Link
              to="/signup"
              className="px-8 py-4 bg-slate-900/80 border border-slate-800 rounded-xl hover:border-slate-700 hover:bg-slate-900 text-slate-200 transition-all font-medium backdrop-blur-sm"
            >
              Get Started
            </Link>
          </motion.div>

          {/* Stats Bar */}
          <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4 max-w-md pt-6 border-t border-slate-900">
            <div>
              <h3 className="text-3xl font-extrabold text-white tracking-tight">500+</h3>
              <p className="text-slate-500 text-xs font-medium uppercase mt-1 tracking-wider">Weekly Menus</p>
            </div>
            <div>
              <h3 className="text-3xl font-extrabold text-white tracking-tight">120+</h3>
              <p className="text-slate-500 text-xs font-medium uppercase mt-1 tracking-wider">Expert Chefs</p>
            </div>
            <div>
              <h3 className="text-3xl font-extrabold text-white tracking-tight">5k+</h3>
              <p className="text-slate-500 text-xs font-medium uppercase mt-1 tracking-wider">Active Foodies</p>
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT VISUALS */}
        <motion.div
          className="lg:col-span-5 relative flex justify-center lg:justify-end"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          {/* Main Image Container */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-lime-500/20 to-orange-500/20 rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
            <img
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
              alt="Artfully plated healthy salmon bowl with fresh vegetables"
              className="relative rounded-3xl shadow-2xl w-full max-w-[400px] aspect-[4/5] object-cover border border-slate-800"
            />
          </div>

          {/* Floating Card - Glassmorphism Restyle */}
          <motion.div 
            className="absolute -bottom-6 left-4 md:-left-8 bg-slate-950/70 border border-slate-800/80 backdrop-blur-md rounded-2xl p-4 shadow-2xl flex items-center gap-4 max-w-[240px]"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="flex-1">
              <span className="text-[10px] font-bold tracking-widest uppercase text-orange-400 block mb-0.5">
                Today's Special
              </span>
              <h4 className="text-base font-bold text-white tracking-tight">
                Avocado Salad
              </h4>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-900">
                <span className="text-slate-400 text-xs">Fresh Harvest</span>
                <span className="text-sm font-bold text-lime-400">$12.99</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;