import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, UserRound, Menu, X } from "lucide-react";
import { useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const products = useSelector((state) => state.cart.products);
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "SHOP", path: "/shop" },
    { name: "CONTACT", path: "/contact" },
    { name: "ABOUT", path: "/about" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/300 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 md:px-16 lg:px-24 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-extrabold text-teal-600 tracking-wide">
          <Link to="/">e-SHOP</Link>
        </div>

        {/* Search */}
        <div className="hidden md:flex relative flex-1 mx-4 max-w-full">
          <form className="w-full">
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full border border-teal-500 py-2 px-4 rounded-lg focus:ring-2 focus:ring-teal-400"
            />
            <Search className="absolute top-2.5 right-3 size-5 text-teal-600" />
          </form>
        </div>

        {/* Cart + Auth + Mobile Menu Toggle */}
        <div className="flex items-center space-x-4">
          <Link to="/cart" className="relative">
            <FaShoppingCart className="text-xl text-gray-700 hover:text-teal-600 transition" />
            {products.length > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                {products.length}
              </span>
            )}
          </Link>

          <Button
            className="hidden md:inline-block bg-teal-500 hover:bg-teal-600 text-white font-semibold px-4 py-2 rounded-lg transition"
            onClick={() => navigate("/login")}
          >
            Login | Register
          </Button>
          <Button
            className="md:hidden bg-teal-500 hover:bg-teal-600 text-white p-2 rounded-full"
            onClick={() => navigate("/login")}
          >
            <UserRound />
          </Button>

          {/* Hamburger Menu */}
          <button
            className="md:hidden text-teal-600"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center justify-center space-x-8 py-3 text-sm font-semibold text-gray-700">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`hover:text-teal-600 transition ${
              location.pathname === link.path ? "text-teal-600 underline" : ""
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 text-sm font-semibold text-gray-700">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`block py-2 border-b border-gray-200 hover:text-teal-600 transition ${
                location.pathname === link.path ? "text-teal-600 underline" : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
