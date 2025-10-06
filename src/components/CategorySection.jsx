import React from "react";
import ManCategory from "../assets/Images/man.png";
import WomanCategory from "../assets/Images/woman.png";
import KidCategory from "../assets/Images/kid1.png";

const categories = [
  {
    title: "Men",
    imageUrl: ManCategory,
  },
  {
    title: "Women",
    imageUrl: WomanCategory,
  },
  {
    title: "Kids",
    imageUrl: KidCategory,
  },
];

const CategorySection = () => {
  return (
    <div className="container mx-auto py-12 px-4 md:px-16 lg:px-24">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
        Shop by Category
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {categories.map((category, index) => (
          <div
            key={index}
            className="relative h-64 rounded-lg overflow-hidden shadow-lg group transform transition duration-300 hover:scale-105"
          >
            <img
              src={category.imageUrl}
              alt={`${category.title} category`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent group-hover:from-black/40 transition duration-300"></div>
            <div className="absolute bottom-6 left-6">
              <p className="text-2xl font-bold text-white group-hover:text-teal-300 transition">
                {category.title}
              </p>
              <p className="text-sm text-gray-300 group-hover:text-white transition">
                View All
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
