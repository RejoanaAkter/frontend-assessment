"use client";

import HttpKit from "@/common/helpers/HttpKit";
import SingleReceipeCard from "@/components/singleReceipeCard";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

const AllRecipes = ({ newRecipe }) => {
  const [allrecipes, setAllRecipes] = useState([]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["recipes"],
    queryFn: HttpKit.getAllRecipes, 
  });

  useEffect(() => {
    if (data) {
      setAllRecipes(data);
    }
  }, [data]);


  const handleAddToCart = (recipe) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    let cart;

    if (storedUser) {
      cart = storedUser.cart ? [...storedUser.cart, recipe] : [recipe];
      storedUser.cart = cart;
      localStorage.setItem("user", JSON.stringify(storedUser)); 
    } else {
      cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(recipe);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading recipes.</div>;

  return (
    <div className="bg-gray-50 min-h-screen flex items-center px-8">
      <div className="bg-gray-50 py-10">
        <div className="relative pt-16">
          <div className="flex">
            <h1 className="text-2xl pl-10 text-amber-700 font-semibold">
              This is the all recipes page
            </h1>
          </div>

          <div className="relative py-8">
            <div className="container relative m-auto text-gray-500 md:px-12">
              <div className="grid gap-6 md:mx-auto md:w-8/12 lg:w-full lg:grid-cols-6">
                {allrecipes?.map((recipe) => (
                  <SingleReceipeCard
                    key={recipe?.idMeal}
                    recipe={recipe}
                    newRecipeSingle={newRecipe}
                    handleAddToCart={handleAddToCart} 
                    handleDetailsOpen={newRecipe} 
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRecipes;
