// components/HeroSection.jsx
import React from "react";
import { Button } from "@/components/ui/button";

const HeroSection = ({ title, subtitle, ctaText, image, onClick }) => {
  return (
    <div className="relative h-96 w-full rounded-md overflow-hidden shadow-md border">
      <img src={image} alt="Hero" className="h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
      <div className="absolute top-10 left-8 text-white animate-fade-in">
        <h2 className="text-4xl font-extrabold">{title}</h2>
        <p className="text-lg mt-2 font-medium">{subtitle}</p>
        <Button
          onClick={onClick}
          className="mt-4 bg-teal-500 hover:bg-teal-600 text-white font-semibold px-6 py-2 rounded-lg transition"
        >
          {ctaText}
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
