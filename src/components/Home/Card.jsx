/* eslint-disable no-unused-vars */
import { Link } from "react-router";
import { TbStarFilled, TbHeart, TbHeartFilled, TbMapPin } from "react-icons/tb";
import { motion } from "framer-motion";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";

const Card = ({ meal }) => {
  const { user } = useAuth();

  const {
    _id,
    foodName,
    chefName,
    foodImage,
    price,
    averageRating = 0,
    deliveryArea = [],
  } = meal || {};

  const [favorited, setFavorited] = useState(false);

  const numericRating = Number(averageRating) || 0;
  const fullStars = Math.floor(numericRating);

  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={foodImage}
          alt={foodName}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80"></div>

        {/* Price badge */}
        <div className="absolute bottom-4 left-4 bg-lime-400 text-black font-bold px-4 py-1 rounded-full text-sm shadow">
          ${price}
        </div>

        {/* Favorite */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setFavorited(!favorited);
          }}
          className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white backdrop-blur hover:bg-black/70 transition"
        >
          {favorited ? (
            <TbHeartFilled className="text-red-500 text-xl" />
          ) : (
            <TbHeart className="text-xl" />
          )}
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-semibold text-white truncate">
          {foodName}
        </h3>

        <p className="text-gray-400 text-sm mt-1">
          Chef <span className="text-gray-300">{chefName}</span>
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <TbStarFilled
              key={i}
              className={`text-lg ${
                i < fullStars ? "text-yellow-400" : "text-gray-600"
              }`}
            />
          ))}
          <span className="text-gray-400 text-sm ml-2">
            {numericRating.toFixed(1)}
          </span>
        </div>

        {/* Delivery Area */}
        {deliveryArea.length > 0 && (
          <div className="flex items-center gap-2 text-gray-400 text-sm mt-3">
            <TbMapPin className="text-orange-400" />
            <span className="truncate">{deliveryArea.join(", ")}</span>
          </div>
        )}

        {/* Button */}
        <Link to={`/meals/${_id}`}>
          <button className="w-full mt-5 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium hover:from-orange-400 hover:to-red-400 transition">
            View Details
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default Card;