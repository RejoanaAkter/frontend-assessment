"use client"

import Image from "next/image";
import React from "react";

const SingleReceipeCard = ({ recipe, handleDetailsOpen, handleAddToCart }) => {
  return (
    <div
      className="group space-y-6 border border-gray-100 rounded bg-white px-2 pt-2 text-center shadow hover:cursor-pointer hover:shadow-xl transition duration-200 shadow-gray-600/10"
    >
      <Image
        className="mx-auto rounded"
        src={recipe?.strMealThumb}
        alt="Web Development"
        loading="lazy"
        width={500}
        height={500}
      />
      <h3 className="text-lg font-semibold text-gray-800">
        {recipe?.strMeal}
      </h3>
      <p>
        Obcaecati, quam? Eligendi, nulla numquam natus laborum porro at cum,
      </p>
      <div className="relative mx-auto flex items-center justify-center  group-hover:visible">
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering recipe details
            handleAddToCart(recipe); // Add to cart on button click
          }}
          className="text-primary"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default SingleReceipeCard;
