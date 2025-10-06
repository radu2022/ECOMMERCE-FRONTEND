import React, { useEffect } from "react";
// Assuming you have a CartIcon component, e.g., from 'lucide-react'
// If your CartIcon is named differently or is from another library, adjust this line
import { ShoppingCart as CartIcon } from "lucide-react";
import { Categories, mockData } from "../assets/mockData";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardContent } from "@/components/ui/Card";
import HeroImage from "../assets/Images/hero-img.png";
import InfoSection from "../components/InfoSection";
import CategorySection from "../components/CategorySection";
import { setProducts } from "../redux/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import HeroSection from "../components/HeroSection";

// --- FloatingCartIcon Component ---
// Move this component *outside* of the Home function for better practice,
// or keep it inside if it only makes sense for the Home component.
const FloatingCartIcon = () => {
  // Get cart products from mock state
  // NOTE: Ensure your Redux state structure is `state.cart.products`
  const cartProducts = useSelector((state) => state.cart.products || []);
  const totalItems = cartProducts.length;

  return (
    <Link
      to="/cart"
      // Key styling for floating: fixed positioning, bottom-right placement, high z-index
      className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-teal-600 text-white shadow-2xl hover:bg-teal-700 transition transform hover:scale-110 duration-300"
      aria-label={`View shopping cart with ${totalItems} items`}
    >
      <CartIcon size={28} />
      {totalItems > 0 && (
        <span className="absolute top-0 right-0 w-6 h-6 bg-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white animate-pulse">
          {totalItems}
        </span>
      )}
    </Link>
  );
};
// ---------------------------------

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(setProducts(mockData));
  }, []);

  const navigate = useNavigate();
  // The line below was incomplete and not being rendered, I've kept it commented.
  // <Button onClick={() => navigate("/shop")}>Continue Shopping</Button>;

  return (
    <div>
      {/* RENDER THE FLOATING CART ICON HERE */}
      <FloatingCartIcon />
      {/* --------------------------------- */}

      <div className=" mt-2 px-4 md:px-16 lg:px-24">
        <div className=" container mx-auto py-2 flex flex-col md:flex-row space-x-2">
          <Card className="bg-white boder border-teal-100 shadow-lg w-full md:w-3/12 rounded-md py-0">
            <CardTitle className="text-sm font-bold px-4 py-3 bg-teal-300 rounded-t-md">
              SHOP BY CATEGORIES
            </CardTitle>
            <CardContent className="py-0">
              <ul className="space-y-3 animate-fade-in">
                {Categories.map((category) => (
                  <li
                    key={category}
                    className="flex items-center text-sm font-medium hover:text-teal-600 transition duration-300 ease-in-out"
                    // style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-2 h-2 mr-2 rounded-full bg-teal-600"></div>
                    {category}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Hero Section */}

          <div className="relative w-full md:w-9/12 mt-2 md:mt-0 h-96 shadow-md border rounded-md overflow-hidden">
            <img
              src={HeroImage}
              alt="Hero"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
            <div className="absolute top-10 left-8 text-white animate-fade-in">
              <p className="mb-2 text-sm uppercase tracking-wide text-teal-300">
                e Shop
              </p>
              <h2 className="text-4xl font-extrabold">WELCOME TO E-SHOP</h2>
              <p className="text-lg mt-2 font-medium">Millions+ Products</p>
              <Button
                onClick={() => navigate("/shop")}
                className="mt-4 bg-teal-500 hover:bg-teal-600 text-black font-bold px-6 py-2 rounded-lg transition"
              >
                Shop Now
              </Button>
            </div>
          </div>
        </div>
        <InfoSection />
        <CategorySection />

        <div className="container mx-auto py-12">
          <h2 className="text-2xl font-bold mb-6 text-center">TOP Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {products?.products?.slice(0, 5).map((product, index) => (
              <div
                key={product.id || index}
                className="hover:scale-105 transition-transform duration-300"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* The line below was a closed Link tag, removed it for clean up */}
      {/* <Link to="/shop"></Link> */}
    </div>
  );
};

export default Home;
