import Container from '../../components/Shared/Container';
import { Link } from 'react-router';
import { FaArrowRight, FaDownload, FaUserPlus, FaUtensils } from 'react-icons/fa';

const CallToAction = () => {
  return (
    <div className="bg-slate-900 py-16">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Experience <br />
              <span className="text-lime-400">
                Culinary Excellence?
              </span>
            </h2>

            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Join our growing community of food lovers and professional chefs.
              Whether you're craving a delicious meal or want to share your culinary talents,
              Chef connects you with the best food experiences in your area.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-lime-500 rounded-full flex items-center justify-center">
                  <span className="text-black font-bold">✓</span>
                </div>
                <span className="text-gray-300">Fresh, chef-prepared meals</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-black font-bold">✓</span>
                </div>
                <span className="text-gray-300">Fast, reliable delivery</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-black font-bold">✓</span>
                </div>
                <span className="text-gray-300">Secure payment options</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup">
                <button className="px-8 py-4 bg-lime-500 text-black font-bold rounded-full hover:bg-lime-400 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2">
                  Get Started Now
                  <FaArrowRight />
                </button>
              </Link>

              <Link to="/meals">
                <button className="px-8 py-4 border-2 border-lime-400 text-lime-400 font-semibold rounded-full hover:bg-lime-400 hover:text-black transition-all duration-300">
                  Browse Meals
                </button>
              </Link>
            </div>
          </div>

          {/* Right Content - CTA Cards */}
          <div className="space-y-6">
            {/* Customer CTA Card */}
            <div className="bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-700/50 hover:border-lime-400/50 transition-all duration-300 group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-lime-500 rounded-full flex items-center justify-center">
                  <FaUtensils className="text-black text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-lime-400 transition-colors">
                    For Food Lovers
                  </h3>
                  <p className="text-gray-400 text-sm">Discover amazing meals</p>
                </div>
              </div>

              <p className="text-gray-300 mb-4">
                Explore diverse cuisines, support local chefs, and enjoy restaurant-quality
                meals from the comfort of your home.
              </p>

              <Link to="/signup">
                <button className="w-full py-3 bg-lime-500 text-black font-semibold rounded-lg hover:bg-lime-400 transition-all duration-300 transform hover:scale-105">
                  Start Ordering
                </button>
              </Link>
            </div>

            {/* Chef CTA Card */}
            <div className="bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-700/50 hover:border-orange-400/50 transition-all duration-300 group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                  <FaUserPlus className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors">
                    For Aspiring Chefs
                  </h3>
                  <p className="text-gray-400 text-sm">Share your culinary talent</p>
                </div>
              </div>

              <p className="text-gray-300 mb-4">
                Turn your passion for cooking into a rewarding career. Join our platform
                and reach customers who appreciate great food.
              </p>

              <Link to="/signup">
                <button className="w-full py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-400 transition-all duration-300 transform hover:scale-105">
                  Become a Chef
                </button>
              </Link>
            </div>

            {/* App Download Card */}
            <div className="bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-700/50 hover:border-purple-400/50 transition-all duration-300 group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                  <FaDownload className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                    Download Our App
                  </h3>
                  <p className="text-gray-400 text-sm">Coming soon to mobile</p>
                </div>
              </div>

              <p className="text-gray-300 mb-4">
                Get exclusive deals, faster ordering, and real-time delivery tracking
                with our mobile app. Available on iOS and Android.
              </p>

              <div className="flex gap-3">
                <button className="flex-1 py-3 bg-gray-700 text-gray-300 font-semibold rounded-lg hover:bg-gray-600 transition-all duration-300">
                  App Store
                </button>
                <button className="flex-1 py-3 bg-gray-700 text-gray-300 font-semibold rounded-lg hover:bg-gray-600 transition-all duration-300">
                  Google Play
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CallToAction;