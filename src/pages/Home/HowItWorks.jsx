import Container from '../../components/Shared/Container';
import { FaSearch, FaShoppingCart, FaTruck, FaUtensils } from 'react-icons/fa';

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaSearch />,
      title: "Browse & Choose",
      description: "Explore our diverse menu of chef-crafted meals. Filter by cuisine, dietary preferences, or chef specialties.",
      color: "from-lime-400 to-lime-600",
    },
    {
      icon: <FaShoppingCart />,
      title: "Place Your Order",
      description: "Add meals to your cart, customize portions if needed, and proceed to secure checkout with multiple payment options.",
      color: "from-orange-400 to-orange-600",
    },
    {
      icon: <FaUtensils />,
      title: "Chef Prepares",
      description: "Your selected chef receives the order and begins preparing your meal with fresh, high-quality ingredients.",
      color: "from-purple-400 to-purple-600",
    },
    {
      icon: <FaTruck />,
      title: "Hot Delivery",
      description: "Your meal is delivered hot and fresh to your doorstep within 30-45 minutes by our reliable delivery team.",
      color: "from-blue-400 to-blue-600",
    }
  ];

  return (
    <Container>
      <div className="py-20">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Ordering delicious, chef-prepared meals has never been easier.
            Follow these simple steps to enjoy restaurant-quality food at home.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="relative bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-700/50 flex flex-col items-center text-center h-full"
            >
              {/* Step Number */}
              <div className="absolute -top-5 -left-5 w-12 h-12 rounded-full bg-gradient-to-br from-white/70 to-gray-300/70 text-black font-bold flex items-center justify-center text-lg shadow-lg">
                {idx + 1}
              </div>

              {/* Icon */}
              <div
                className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 text-white text-4xl shadow-lg bg-gradient-to-br ${step.color}`}
              >
                {step.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{step.title}</h3>

              {/* Description */}
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                {step.description}
              </p>

              {/* Connection line for lg screens */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 right-[-40px] w-16 h-1 bg-lime-400 rounded-full"></div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-lime-500 to-lime-400 rounded-3xl p-12 max-w-2xl mx-auto shadow-xl">
            <h3 className="text-3xl md:text-4xl font-extrabold text-black mb-4">
              Ready to Try Something New?
            </h3>
            <p className="text-black/80 mb-6">
              Join thousands of food lovers who have discovered their new favorite meals through our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="px-10 py-4 bg-black text-lime-400 font-bold rounded-full hover:bg-black/90 transition-colors">
                Start Ordering Now
              </button>
              <button className="px-10 py-4 border-2 border-black text-black font-semibold rounded-full hover:bg-black hover:text-lime-400 transition-colors">
                Become a Chef
              </button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default HowItWorks;