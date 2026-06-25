import Container from '../../components/Shared/Container';
import { Link } from 'react-router';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FaArrowRight, FaDownload, FaUserPlus, FaUtensils, FaCheck } from 'react-icons/fa';

const CallToAction = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Decorative localized space backdrop accents */}
      <div className="absolute w-[500px] h-[500px] bg-lime-500/5 blur-[130px] rounded-full -top-40 left-[-100px] pointer-events-none" />
      <div className="absolute w-[500px] h-[500px] bg-orange-500/5 blur-[130px] rounded-full bottom-[-100px] right-[-100px] pointer-events-none" />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
          
          {/* LEFT COLUMN: BRAND PROPOSITION */}
          <motion.div 
            className="lg:col-span-5 space-y-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
                Ready to Experience <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-400">
                  Culinary Excellence?
                </span>
              </h2>

              <p className="text-slate-400 text-sm md:text-base leading-relaxed font-medium">
                Join our growing community at LocalChefBazar. Whether you are craving an authentic, artisan-made recipe or looking to scale your own local food kitchen, we bridge the gap securely.
              </p>
            </div>

            {/* Checkmark Value List */}
            <motion.div 
              className="space-y-3.5"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                { label: "Fresh, custom-prepared neighborhood meals", color: "text-lime-400 bg-lime-500/10 border-lime-500/20" },
                { label: "Streamlined 30-45 minute safe transit windows", color: "text-orange-400 bg-orange-500/10 border-orange-500/20" },
                { label: "Secure encrypted transaction infrastructure", color: "text-purple-400 bg-purple-500/10 border-purple-500/20" }
              ].map((item, idx) => (
                <motion.div key={idx} variants={itemVariants} className="flex items-center gap-3.5 text-sm font-semibold text-slate-200">
                  <div className={`w-6 h-6 rounded-lg border flex items-center justify-center text-xs ${item.color} flex-shrink-0`}>
                    <FaCheck />
                  </div>
                  <span>{item.label}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Core Global Actions */}
            <div className="pt-2 flex flex-col sm:flex-row gap-4">
              <Link to="/signup" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-8 py-4 bg-lime-400 hover:bg-lime-300 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-lg shadow-lime-500/10 flex items-center justify-center gap-2 active:scale-[0.98]">
                  <span>Get Started Now</span>
                  <FaArrowRight className="text-xs" />
                </button>
              </Link>

              <Link to="/meals" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-200 font-bold text-sm rounded-xl transition-all flex items-center justify-center active:scale-[0.98]">
                  Browse Open Menus
                </button>
              </Link>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: STRUCTURAL ACTOR INTERACTIVE CARDS */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Customer Access Card */}
              <motion.div 
                className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-850 relative group transition-all duration-300 hover:bg-slate-900 hover:border-lime-500/30"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-11 h-11 bg-gradient-to-br from-lime-400 to-emerald-500 rounded-xl flex items-center justify-center text-slate-950 text-base shadow-md">
                    <FaUtensils />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white tracking-tight group-hover:text-lime-400 transition-colors">
                      For Food Lovers
                    </h3>
                    <p className="text-slate-500 text-xs font-medium">Discover amazing dishes</p>
                  </div>
                </div>

                <p className="text-slate-400 text-xs md:text-sm leading-relaxed font-medium mb-6 min-h-[60px]">
                  Explore authentic family recipes, order safely from checked local kitchens, and support home cooks nearby.
                </p>

                <Link to="/signup">
                  <button className="w-full py-3 bg-slate-950 hover:bg-lime-400 border border-slate-800 hover:border-lime-400 text-slate-300 hover:text-slate-950 font-bold text-xs rounded-xl transition-all duration-300 active:scale-[0.98]">
                    Start Ordering
                  </button>
                </Link>
              </motion.div>

              {/* Chef Access Card */}
              <motion.div 
                className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-850 relative group transition-all duration-300 hover:bg-slate-900 hover:border-orange-500/30"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-11 h-11 bg-gradient-to-br from-orange-400 to-amber-500 rounded-xl flex items-center justify-center text-slate-950 text-base shadow-md">
                    <FaUserPlus />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white tracking-tight group-hover:text-orange-400 transition-colors">
                      For Independent Chefs
                    </h3>
                    <p className="text-slate-500 text-xs font-medium">Monetize culinary skills</p>
                  </div>
                </div>

                <p className="text-slate-400 text-xs md:text-sm leading-relaxed font-medium mb-6 min-h-[60px]">
                  Transform home baking or meal prep into a scalable startup. Control schedules, prices, and seasonal menu sets.
                </p>

                <Link to="/signup">
                  <button className="w-full py-3 bg-slate-950 hover:bg-orange-400 border border-slate-800 hover:border-orange-400 text-slate-300 hover:text-slate-950 font-bold text-xs rounded-xl transition-all duration-300 active:scale-[0.98]">
                    Become a Chef
                  </button>
                </Link>
              </motion.div>

            </div>

            {/* FULL WIDTH DOWN-LEVEL BADGE: APP DOWNLOAD LINK */}
            <motion.div 
              className="bg-slate-900/40 border border-slate-850 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-center gap-4 text-center sm:text-left">
                <div className="size-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 text-base flex-shrink-0 mx-auto sm:mx-0">
                  <FaDownload />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white tracking-tight">Our Mobile App is Coming Soon</h4>
                  <p className="text-slate-500 text-xs font-medium">Real-time localized kitchen discovery on iOS & Android</p>
                </div>
              </div>
              <div className="flex gap-2.5 w-full sm:w-auto">
                <button disabled className="flex-1 sm:flex-none px-4 py-2 bg-slate-950 border border-slate-850 text-slate-600 text-xs font-bold rounded-lg cursor-not-allowed selection:bg-transparent select-none">
                  App Store
                </button>
                <button disabled className="flex-1 sm:flex-none px-4 py-2 bg-slate-950 border border-slate-850 text-slate-600 text-xs font-bold rounded-lg cursor-not-allowed selection:bg-transparent select-none">
                  Google Play
                </button>
              </div>
            </motion.div>

          </div>

        </div>
      </Container>
    </section>
  );
};

export default CallToAction;