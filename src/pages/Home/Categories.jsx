// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState } from "react";
import Container from "../../components/Shared/Container";

const Categories = () => {
  const [active, setActive] = useState("All");

  const categories = [
    { name: "All", icon: "🍽️" },
    { name: "Pizza", icon: "🍕" },
    { name: "Burger", icon: "🍔" },
    { name: "Noodles", icon: "🍜" },
    { name: "Chicken", icon: "🍗" },
    { name: "Fish", icon: "🐟" },
    { name: "Sandwich", icon: "🥪" },
    { name: "Soup", icon: "🍲" },
    { name: "Cake", icon: "🎂" },
  ];

  return (
    <section className="py-20 bg-slate-950">
      <Container>
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-14">
          Choose Your Favorite Category
        </h2>

        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-6 justify-items-center">
          {categories.map((cat, idx) => {
            const isActive = active === cat.name;

            return (
              <motion.div
                key={idx}
                whileHover={{ y: -6, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActive(cat.name)}
                className="flex flex-col items-center gap-3 cursor-pointer"
              >
                <div
                  className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl transition-all duration-300
                  ${
                    isActive
                      ? "bg-lime-500 text-black shadow-lg"
                      : "bg-slate-800 text-white hover:bg-slate-700"
                  }`}
                >
                  {cat.icon}
                </div>

                <p
                  className={`text-sm font-medium transition ${
                    isActive ? "text-lime-400" : "text-gray-400"
                  }`}
                >
                  {cat.name}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default Categories;