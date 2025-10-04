import { Star } from "lucide-react";
import React from "react";
import { FaStar } from "react-icons/fa";
import { addToCart } from "../redux/cartSlice";
import { useDispatch } from "react-redux";



const ProductCard = ({ product }) => {
  const dispatch = useDispatch()
  const handleaddToCart = (e, product) => {
    e.stopPropagation()
    e.preventDefault()
    dispatch(addToCart(product))
    alert("Product added Succesfully!")
  }

  
  return (
    <div className="bg-white p-4 shadow rounded relative border transform transition-transform duration-300 hover:scale-105">
      {/* 2. Access properties from the 'product' object, fixing the typo */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-contain mb-4"
      />
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-500">{product.price}</p>
      <div className="flex items-center mt-2">
        <FaStar className="text-yellow-500" />
        <FaStar className="text-yellow-500" />
        <FaStar className="text-yellow-500" />
        <FaStar className="text-yellow-500" />
      </div>
      <div className="absolute bottom-4 right-4 flex items-center justify-center w-8 h-8 bg-black shadow-md group text-white text-sm rounded-full hover:w-32 hover:bg-gray-900 transition-all duration-100 cursor-pointer" onClick={(e) => handleaddToCart(e, product)}>
        <span className="group-hover:hidden text-2xl items-center mb-1.5 cursor-pointer">+</span>
        <span className="hidden group-hover:block cursor-pointer shadow-md">Add to cart</span>
      </div>
    </div>
  );
};

export default ProductCard;
