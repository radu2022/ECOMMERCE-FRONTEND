import React, { useEffect } from "react";
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
import Shop from "./Shop";

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(setProducts(mockData));
  }, []);

  const navigate = useNavigate();
  <Button onClick={() => navigate("/shop")}>Continue Shopping</Button>;
const FloatingCartIcon = () => {
    // Get cart products from mock state
    const cartProducts = useSelector(state => state.cart.products);
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
  return (
    <div>
      <div className=" mt-2 px-4 md:px-16 lg:px-24">
        <div className="container mx-auto py-4 flex flex-col md:flex-row space-x-2">
          <Card className="bg-transparent text-black shadow-md w-full md:w-3/12 mt-0 p-0 rounded-md">
            <div className="flex flex-col">
              <CardTitle className="text-xs font-bold px-4 py-2 m-0 border rounded-l">
                SHOP BY CATEGORIES
              </CardTitle>
              <CardContent className="p-3 m-0 pl-8">
                <ul className="space-y-4">
                  {Categories.map((category) => (
                    <li
                      key={category}
                      className="flex items-center text-sm font-medium"
                    >
                      <div className="w-2 h-2 mr-2 rounded-full bg-black"></div>
                      {category}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </div>
          </Card>

          <div className="w-full md:w-9/12 mt-2 md:mt-0 h-96 relative shadow-md border rounded-md">
            <img
              src={HeroImage}
              alt=""
              className="h-full w-full border rounded-md"
            />
            <div className="absolute top-10 left-8">
              <p className="text-white mb-4">e Shop</p>
              <h2 className="text-3xl font-bold text-white top-20">
                WELCOME TO E-SHOP
              </h2>
              <p className="text-xl mt-2.5 font-bold text-white">
                MILLIONS+ PRODUCTS
              </p>

              <Button>SHOP NOW</Button>
            </div>
          </div>
        </div>
        <InfoSection />
        <CategorySection />

        <div className="container mx-auto py-12">
          <h2 className="text-2xl font-bold mb-6 text-center">TOP Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:cols-5 gap-6 ">
            {/* Use ?. to safely access the nested property */}
            {products?.products?.slice(0, 4).map((product, index) => (
              <ProductCard key={product.id || index} product={product} />
            ))}
          </div>
        </div>
      </div>
      <Link to="/shop">
      </Link>
    </div>
  );
};

export default Home;
