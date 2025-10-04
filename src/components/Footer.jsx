import React from "react";
import { Facebook, Github, LinkedinIcon, Twitter, Underline } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";


const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 px-4 md:px-16 lg:px-24">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-semibold">e-Shop</h3>
          <p className="mt-4">
            At e-Shop, we're committed to bringing you the best products at
            unbeatable prices, delivered right to your door. Thank you for
            choosing to shop small and support our mission to make quality
            accessible to everyone. Happy shopping!
          </p>
        </div>
        <div className="flex flex-col md:items-left">
          <h4 className="text-lg font-semibold">Quick Links</h4>
          <ul className="mt-4 space-y-2">
            <li>
              <Link to="/" className="hover:underline cursor-pointer">
                Home
              </Link>
            </li>
            <li>
              <Link to="/shop" className="hover:underline cursor-pointer">
                Shop
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline cursor-pointer">
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:underline  color-blue-200 cursor-pointer"
              >
                About
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold">Follow us</h4>
          <div className="flex space-x-4 mt-4">
            <a
              href=""
              className="hover:text-white cursor-pointer text-blue-500"
            >
              <Facebook />
            </a>
            <a href="" className="hover:text-white text-sky-400 cursor-pointer">
              <Twitter />
            </a>
            <a
              href=""
              className="hover:text-white  text-purple-500 cursor-pointer"
            >
              <Github />
            </a>
            <a href="" className="hover:text-white text-sky-700 cursor-pointer">
              <LinkedinIcon />
            </a>
          </div>
          <form className="flex items-center justify-center mt-8">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 rounded-l-lg bg-gray-800 border border-gray-600"
            />
            <Button className="bg-red-600 text-white px-4 py-2 rounded-r-lg rounded-l-none hover:bg-white-300 cursor-pointer hover:text-black">
              Subscribe
            </Button>
          </form>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-700 pt-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <p>&copy; 2025 e-Shop All rights reserved. </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="" className="hover:underline cursor-pointer">
              Privacy Policy
            </a>
            <a href="" className="hover:underline cursor-pointer">
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
