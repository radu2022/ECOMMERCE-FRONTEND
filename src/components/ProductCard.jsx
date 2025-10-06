import { Star } from "lucide-react";
import React from "react";
import { FaStar } from "react-icons/fa";
import { addToCart } from "../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";



const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const handleaddToCart = (e, product) => {
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
    <div className="bg-white p-4 shadow rounded relative border border-teal-50 transform transition-transform duration-300 hover:scale-105 text-teal-800">
      {/* 2. Access properties from the 'product' object, fixing the typo */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-contain mb-4"
      />
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-700">$ {product.price}</p>
      <div className="flex items-center mt-2">
        <FaStar className="text-yellow-500" />
        <FaStar className="text-yellow-500" />
        <FaStar className="text-yellow-500" />
        <FaStar className="text-yellow-500" />
      </div>
      <div
        className="absolute bottom-4 right-4 flex items-center justify-center w-6 h-6 bg-red-600 shadow-md group text-white text-sm rounded-full hover:w-32 hover:bg-teal-700 transition-all duration-100 cursor-pointer"
        onClick={(e) => handleaddToCart(e, product)}
      >
        <span className="group-hover:hidden text-2xl items-center mb-1.5 cursor-pointer text-white font-bold">
          +
        </span>
        <span className="hidden group-hover:block cursor-pointer shadow-md">
          Add to cart
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
