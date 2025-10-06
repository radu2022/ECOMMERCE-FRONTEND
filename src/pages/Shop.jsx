import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"; // Needed for category links
import ProductCard from "../components/ProductCard";
import { Categories } from "../assets/mockData"; // Import your categories data
import { ShoppingCart as CartIcon } from "lucide-react";

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

const Shop = () => {
  const products = useSelector((state) => state.product);

  // NOTE: In a real app, you would use React state (e.g., useState)
  // to manage the currently selected category for actual filtering.
  const allProducts = products?.products || [];

  return (
    <div className="container mx-auto py-12 px-4">
      <FloatingCartIcon />
      <h2 className="text-3xl font-bold mb-8 text-center border-t pt-8">
        All Products
      </h2>

      {/* Main Layout: Sidebar (Filter) and Product Grid */}
      <div className="flex flex-col md:flex-row gap-8">
        {/*
        ## 1. Filter Sidebar (Hidden on mobile, shown on md screens and up)
        */}
        <div className="md:w-1/4 lg:w-1/5 hidden md:block">
          <div className="p-4 bg-gray-50 border rounded-lg shadow-sm sticky top-4">
            <h3 className="text-lg font-semibold mb-4 text-teal-600 border-b pb-2">
              Filter by Category
            </h3>
            <ul className="space-y-2">
              {/* "All Products" link/button */}
              <li className="text-base font-medium text-gray-800 hover:text-teal-600 transition duration-200 cursor-pointer">
                All Products ({allProducts.length})
              </li>

              {/* Category Links/Buttons */}
              {Categories.map((category, index) => (
                // NOTE: Using a simple <li> for now, but a real link or button
                // would trigger the filtering logic (e.g., changing a query param or state)
                <li
                  key={index}
                  className="text-sm font-medium text-gray-600 hover:text-teal-600 transition duration-200 cursor-pointer pl-2"
                >
                  {category}
                </li>
              ))}
            </ul>

            {/* You could add more filters here, like Price Range, Brands, etc. */}
            <div className="mt-6 border-t pt-4">
              <h3 className="text-lg font-semibold mb-2 text-teal-600">
                Price Range
              </h3>
              {/* Placeholder for a slider or input fields */}
              <div className="text-sm text-gray-500">
                [Price Filter Component Here]
              </div>
            </div>
          </div>
        </div>

        {/*
        ## 2. Product Grid
        */}
        <div className="w-full md:w-3/4 lg:w-4/5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {allProducts.map((product, index) => (
              <div
                key={product.id || index}
                className="hover:shadow-lg rounded-lg transition-shadow duration-300"
              >
                <ProductCard product={product} />
              </div>
            ))}

            {/* Fallback for no products */}
            {allProducts.length === 0 && (
              <p className="col-span-full text-center text-gray-500 py-10">
                No products found.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
