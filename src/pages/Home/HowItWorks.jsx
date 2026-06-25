import Container from '../../components/Shared/Container';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FaSearch, FaShoppingCart, FaTruck, FaUtensils, FaArrowRight} from 'react-icons/fa';

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaSearch />,
      title: "Browse & Choose",
      description: "Explore our diverse menu of chef-crafted meals. Filter by cuisine, dietary preferences, or local specialties.",
      color: "from-lime-400 to-emerald-500",
      accentGlow: "group-hover:shadow-lime-500/20"
    },
    {
      icon: <FaShoppingCart />,
      title: "Place Your Order",
      description: "Add meals to your cart, customize portions if needed, and check out securely using multiple payment methods.",
      color: "from-orange-400 to-amber-500",
      accentGlow: "group-hover:shadow-orange-500/20"
    },
    {
      icon: <FaUtensils />,
      title: "Chef Prepares",
      description: "Your designated local chef receives the order and custom-prepares your meal using fresh, quality ingredients.",
      color: "from-purple-400 to-indigo-500",
      accentGlow: "group-hover:shadow-purple-500/20"
    },
    {
      icon: <FaTruck />,
      title: "Hot Delivery",
      description: "Your meal is dispatched and delivered hot straight to your doorstep within a tight 30-45 minute window.",
      color: "from-sky-400 to-blue-500",
      accentGlow: "group-hover:shadow-sky-500/20"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background ambient decorative light maps */}
      <div className="absolute w-[600px] h-[600px] bg-lime-500/5 blur-[150px] rounded-full -top-40 -right-40 pointer-events-none" />
      <div className="absolute w-[600px] h-[600px] bg-indigo-500/5 blur-[150px] rounded-full top-1/2 left-[-200px] pointer-events-none" />

      <Container>
        {/* Section Heading Design */}
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white">
            Your Culinary Journey in <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-emerald-400 to-sky-400">4 Simple Steps</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Getting premium, artisanal meals prepared by dedicated home chefs delivered right to you is remarkably simple.
          </p>
        </div>

        {/* Steps Flex/Grid Container */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              className="bg-slate-900/40 backdrop-blur-sm rounded-2xl p-8 border border-slate-850 flex flex-col items-center text-center h-full relative group hover:border-slate-700 hover:bg-slate-900 transition-all duration-300"
            >
              {/* Floating Linear Index Counter Badge */}
              <div className="absolute top-4 right-5 font-black text-4xl text-slate-800/60 group-hover:text-slate-700 selection:bg-transparent select-none transition-colors duration-300">
                0{idx + 1}
              </div>

              {/* Icon Container with Gradient Mask */}
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-white text-2xl shadow-md bg-gradient-to-br ${step.color} transition-all duration-300 shadow-transparent ${step.accentGlow} group-hover:scale-105 group-hover:rotate-3`}>
                {step.icon}
              </div>

              {/* Title Header */}
              <h3 className="text-lg font-bold text-white mb-3 group-hover:text-lime-400 transition-colors tracking-tight">
                {step.title}
              </h3>

              {/* Step Context Copy */}
              <p className="text-slate-400 text-xs md:text-sm leading-relaxed font-medium">
                {step.description}
              </p>

              {/* Visual Grid Track Connector Link Lines */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-[48px] right-[-24px] w-12 items-center justify-center text-slate-800 pointer-events-none z-20">
                  <FaArrowRight className="text-sm group-hover:text-slate-600 transition-colors duration-300" />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Optimized Glassmorphic Call-to-Action Layer */}
        <motion.div 
          className="mt-24 max-w-4xl mx-auto relative z-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="relative bg-slate-900/60 border border-slate-800 rounded-3xl p-8 md:p-12 overflow-hidden shadow-2xl">
            {/* Visual background element inside the box */}
            <div className="absolute inset-0 bg-gradient-to-tr from-lime-500/10 via-transparent to-sky-500/5 pointer-events-none" />
            
            <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
              <h3 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
                Ready to Experience <span className="text-lime-400">Genuine Cuisine</span>?
              </h3>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                Join thousands of food enthusiasts discovering authentic, high-quality local kitchen menus daily. Your next signature dish is just a click away.
              </p>
              
              <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="w-full sm:w-auto px-8 py-3.5 bg-lime-400 hover:bg-lime-300 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-lg shadow-lime-500/10 active:scale-[0.98]">
                  Start Ordering Now
                </button>
                <button className="w-full sm:w-auto px-8 py-3.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-300 hover:text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 active:scale-[0.98]">
                  <span>Join as an Expert Chef</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default HowItWorks;