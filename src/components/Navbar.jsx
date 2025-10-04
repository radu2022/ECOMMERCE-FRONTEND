import React from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ShoppingCart, UserRound } from "lucide-react";
import { useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  const products = useSelector(state => state.cart.products)
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 md:px-16 lg:px-24 py-4 flex justify-between items-center">
        <div className="text-lg font-bold">
          <Link to="/">e-SHOP</Link>
        </div>
        <div className="relative flex-1 mx-4">
          <form>
            <Input
              type="search"
              placeholder="Search for products..."
              className="w-full border py-2 px-4"
            />
            <Search className="absolute top-2 right-2 size-5" />
          </form>
        </div>
        <div className="flex space-x-4 items-center">
          <Link className="relative" to="/cart">
            {/* Cart notification */}
            <FaShoppingCart className="text-lg"/>
            {products.length > 0 && 
            <span className="absolute bottom-2.5 text-xs w-4 left-2.5 bg-red-600 rounded-full flex justify-center items-center text-white">{products.length}</span>}
          </Link>
          <Button className="hidden md:block">Login | Register</Button>
          <Button className="block md:hidden">
            <UserRound />
          </Button>
        </div>
      </div>

      {/* Pages */}

      <div className="flex items-center justify-center space-x-10 py-4 text-sm font-bold">
        <Link to="/" className="hover:underline cursor-pointer">
          HOME
        </Link>
        <Link to="/shop" className="hover:underline cursor-pointer">
          SHOP
        </Link>
        <Link to="/" className="hover:underline cursor-pointer">
          CONTACT
        </Link>
        <Link to="/" className="hover:underline cursor-pointer">
          ABOUT
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
