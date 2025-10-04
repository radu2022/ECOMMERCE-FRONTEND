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
    <div className="container mx-auto grid grid-cols-1   md:grid-cols-3 sm:grid-cols-2 gap-6">
      {categories.map((category, index) => (
        <div
          key={index}
          className="relative h-64 transform transition-transform duration-300 hover:scale-105 cursor-pointer"
        >
          <img
            src={category.imageUrl}
            alt={`${category.title} category`}
            className="w-full h-full object-cover rounded-sm shadow-md"
          />
          <div className="absolute bottom-6 left-6">
            <p className="text-xl font-bold">{category.title}</p>
            {/* <p className="text-gray-600">View All</p> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategorySection;
