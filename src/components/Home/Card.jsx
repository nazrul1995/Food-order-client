/* eslint-disable no-unused-vars */
import { Link } from "react-router";
import { TbStarFilled, TbHeart, TbHeartFilled, TbMapPin } from "react-icons/tb";
import { motion } from "framer-motion";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";

const Card = ({ meal }) => {
  const { user } = useAuth();
  const [favorited, setFavorited] = useState(false);

  const {
    _id,
    foodName = "Untitled Meal",
    chefName = "Anonymous Chef",
    foodImage,
    price = 0,
    averageRating = 0,
    deliveryArea = [],
  } = meal || {};

  const numericRating = Number(averageRating) || 0;
  const fullStars = Math.floor(numericRating);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group bg-slate-900/40 backdrop-blur-sm border border-slate-800/80 rounded-2xl overflow-hidden transition-all duration-300 hover:border-slate-700 hover:bg-slate-900 shadow-xl"
    >
      {/* Visual Header / Image Container */}
      <div className="relative h-52 overflow-hidden bg-slate-950">
        <img
          src={foodImage || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=60"}
          alt={foodName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Ambient Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90" />

        {/* Flat Compact Price Badge */}
        <div className="absolute bottom-4 left-4 bg-lime-400 text-slate-950 font-black px-3.5 py-1 rounded-xl text-xs tracking-tight shadow-md">
          ${Number(price).toFixed(2)}
        </div>

        {/* Wishlist Interactive Toggle */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setFavorited(!favorited);
          }}
          className="absolute top-4 right-4 p-2 bg-slate-950/60 hover:bg-slate-950 border border-slate-800/40 rounded-xl text-white backdrop-blur-md transition-all duration-200 active:scale-90"
        >
          {favorited ? (
            <TbHeartFilled className="text-rose-500 text-lg" />
          ) : (
            <TbHeart className="text-lg text-slate-300 hover:text-white" />
          )}
        </button>
      </div>

      {/* Structured Copy Details */}
      <div className="p-5 space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-white tracking-tight truncate group-hover:text-lime-400 transition-colors">
            {foodName}
          </h3>
          <p className="text-slate-400 text-xs font-medium">
            Prepared by <span className="text-slate-200 font-semibold">{chefName}</span>
          </p>
        </div>

        {/* Metadata Stack: Ratings & Logistics */}
        <div className="space-y-2.5 pt-1 border-t border-slate-900">
          {/* Star System */}
          <div className="flex items-center gap-1">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <TbStarFilled
                  key={i}
                  className={`text-sm ${
                    i < fullStars ? "text-amber-400" : "text-slate-800"
                  }`}
                />
              ))}
            </div>
            <span className="text-slate-400 text-xs font-bold ml-1.5 pt-0.5">
              {numericRating.toFixed(1)}
            </span>
          </div>

          {/* Delivery Zone Matrix */}
          {deliveryArea.length > 0 ? (
            <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
              <TbMapPin className="text-orange-400 text-sm flex-shrink-0" />
              <span className="truncate tracking-wide">{deliveryArea.join(", ")}</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
              <TbMapPin className="text-slate-700 text-sm flex-shrink-0" />
              <span className="tracking-wide">Pickup option available</span>
            </div>
          )}
        </div>

        {/* Primary Route Link Button */}
        <Link to={`/meals/${_id}`} className="block pt-1">
          <button className="w-full py-3 bg-slate-950 hover:bg-lime-400 border border-slate-800 hover:border-lime-400 text-slate-300 hover:text-slate-950 font-bold text-xs rounded-xl tracking-wide transition-all duration-300 active:scale-[0.98]">
            View Recipe Details
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default Card;