// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router";

const Hero = () => {
  return (
    <section className="relative bg-slate-950 text-white min-h-screen flex items-center overflow-hidden">

      {/* Background glow */}
      <div className="absolute w-[500px] h-[500px] bg-lime-500/20 blur-[120px] rounded-full -top-40 -left-40"></div>
      <div className="absolute w-[400px] h-[400px] bg-orange-500/20 blur-[120px] rounded-full bottom-0 right-0"></div>

      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center relative z-10">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-lime-400 font-semibold mb-3">
            🍽️ Healthy Food Delivery
          </p>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Fresh Meals <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-orange-400">
              Delivered To You
            </span>
          </h1>

          <p className="mt-6 text-gray-400 text-lg max-w-lg">
            Enjoy delicious chef-crafted meals made from fresh ingredients and
            delivered straight to your home. Healthy, fast, and affordable.
          </p>

          {/* CTA BUTTONS */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/meals"
              className="px-7 py-3 bg-lime-500 text-black font-semibold rounded-full hover:bg-lime-400 transition shadow-lg"
            >
              Browse Meals
            </Link>

            <Link
              to="/signup"
              className="px-7 py-3 border border-gray-600 rounded-full hover:border-lime-400 hover:text-lime-400 transition"
            >
              Create Account
            </Link>
          </div>

          {/* STATS */}
          <div className="flex gap-10 mt-10 text-center">
            <div>
              <h3 className="text-3xl font-bold text-lime-400">500+</h3>
              <p className="text-gray-400 text-sm">Meals</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-orange-400">120+</h3>
              <p className="text-gray-400 text-sm">Chefs</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-lime-400">5K+</h3>
              <p className="text-gray-400 text-sm">Customers</p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="relative flex justify-center"
        >
          <img
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
            alt="Healthy Food"
            className="rounded-3xl shadow-2xl w-[420px] object-cover"
          />

          {/* Floating Card */}
          <div className="absolute -bottom-8 -left-10 bg-slate-900 border border-slate-700 rounded-xl p-4 shadow-xl">
            <p className="text-sm text-gray-400">Today's Special</p>
            <h4 className="text-lg font-semibold text-lime-400">
              Avocado Salad
            </h4>
            <p className="text-gray-300 text-sm">$12.99</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;