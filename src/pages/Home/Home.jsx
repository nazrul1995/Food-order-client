import Hero from "./Hero";
import Categories from "./Categories";
import TodayMeals from "./TodayMeals";
import FeaturedChefs from "./FeaturedChefs";
import PopularMeals from "./PopularMeals";
import HowItWorks from "./HowItWorks";
import Statistics from "./Statistics";
import Testimonials from "./Testimonials";
import CallToAction from "./CallToAction";

const Home = () => {
  return (
    <div className="text-white">

      {/* Hero Section */}
      <section className="bg-slate-900">
        <Hero />
      </section>

      {/* Categories Section */}
      <section className="bg-slate-800">
        <Categories />
      </section>

      {/* Today's Special Meals Section */}
      <section className="bg-slate-900">
        <TodayMeals />
      </section>

      {/* Featured Chefs Section */}
      <section className="bg-slate-800">
        <FeaturedChefs />
      </section>

      {/* Popular Meals Section */}
      <section className="bg-slate-900">
        <PopularMeals />
      </section>

      {/* How It Works Section */}
      <section className="bg-slate-800">
        <HowItWorks />
      </section>

      {/* Statistics Section */}
      <section className="bg-slate-900">
        <Statistics />
      </section>

      {/* Testimonials Section */}
      <section className="bg-slate-800">
        <Testimonials />
      </section>

      {/* Call to Action Section */}
      <section className="bg-slate-900">
        <CallToAction />
      </section>

    </div>
  );
};

export default Home;