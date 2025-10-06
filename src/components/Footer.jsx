import React from "react";
import { Facebook, Github, LinkedinIcon, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-12 px-6 md:px-16 lg:px-24">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand Info */}
        <div>
          <h3 className="text-2xl font-bold text-teal-400">e-Shop</h3>
          <p className="mt-4 text-sm leading-relaxed text-gray-300">
            At <span className="text-white font-semibold">e-Shop</span>, we’re
            committed to bringing you the best products at unbeatable prices,
            delivered right to your door. Thank you for supporting small
            business and shopping with purpose.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xl font-semibold text-teal-300">Quick Links</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-teal-400 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/shop" className="hover:text-teal-400 transition">
                Shop
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-teal-400 transition">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-teal-400 transition">
                About
              </Link>
            </li>
          </ul>
        </div>

        {/* Social + Newsletter */}
        <div>
          <h4 className="text-xl font-semibold text-teal-300">Follow Us</h4>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:scale-110 transition text-blue-500">
              <Facebook size={20} />
            </a>
            <a href="#" className="hover:scale-110 transition text-sky-400">
              <Twitter size={20} />
            </a>
            <a href="#" className="hover:scale-110 transition text-purple-500">
              <Github size={20} />
            </a>
            <a href="#" className="hover:scale-110 transition text-sky-700">
              <LinkedinIcon size={20} />
            </a>
          </div>

          <form className="mt-8 flex">
            <input
              type="email"
              placeholder="Your email"
              className="w-full p-2 rounded-l-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <Button className="px-4 py-2 h-10 rounded-r-lg rounded-l-none bg-teal-500 hover:bg-teal-400 text-white font-semibold">
              Subscribe
            </Button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-12 border-t border-gray-700 pt-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>
            &copy; 2025 <span className="text-white font-medium">e-Shop</span>.
            All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-teal-400 transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-teal-400 transition">
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
