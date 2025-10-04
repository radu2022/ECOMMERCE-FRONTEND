import React, { useEffect } from "react";
import { Categories, mockData } from "../assets/mockData";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardContent } from "@/components/ui/Card";
import HeroImage from "../assets/Images/hero-img.png";
import InfoSection from "../components/InfoSection";
import CategorySection from "../components/CategorySection";
import { setProducts } from "../redux/productSlice";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import Shop from "./Shop";

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(setProducts(mockData));
  }, []);

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

              <Button className="bg-red-600 text-white px-4 py-2 hover:bg-white hover:text-black rounded-lg shadow-md mt-4 transform transition-transform duration-300 hover:scale-105 cursor-pointer">
                SHOP NOW
              </Button>
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
      <Shop />
    </div>
  );
};

export default Home;
