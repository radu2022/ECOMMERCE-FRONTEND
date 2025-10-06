import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../redux/cartSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    e.preventDefault();

    const alreadyInCart = cart.products.some((item) => item.id === product.id);

    if (alreadyInCart) {
      toast.info("🛒 Product is already in your cart!");
    } else {
      dispatch(addToCart(product));
      toast.success("Product added successfully!");
    }
  };

  return (
    <div className="bg-white p-4 shadow rounded relative border border-teal-50 hover:border-teal-200 transform transition-transform duration-300 hover:scale-105 text-teal-800">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-contain mb-4"
      />
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-700">$ {product.price}</p>

      {/* ⭐ Interactive Rating */}
      <div className="flex items-center mt-2">
        {[...Array(5)].map((_, index) => {
          const starValue = index + 1;
          return (
            <button
              key={starValue}
              type="button"
              onClick={() => setRating(starValue)}
              onMouseEnter={() => setHover(starValue)}
              onMouseLeave={() => setHover(null)}
              className="focus:outline-none"
            >
              <FaStar
                className={`text-sm transition-colors ${
                  starValue <= (hover || rating)
                    ? "text-yellow-500"
                    : "text-gray-300"
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* 🛒 Add to Cart Button */}
      <div
        className="absolute bottom-4 right-4 flex items-center justify-center w-6 h-6 bg-red-600 shadow-md group text-white text-sm rounded-full hover:w-32 hover:bg-teal-700 transition-all duration-200 cursor-pointer"
        onClick={(e) => handleAddToCart(e, product)}
      >
        <span className="group-hover:hidden text-2xl items-center mb-1.5 cursor-pointer text-white font-bold">
          +
        </span>
        <span className="hidden group-hover:block cursor-pointer shadow-md h-6">
          Add to cart
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
