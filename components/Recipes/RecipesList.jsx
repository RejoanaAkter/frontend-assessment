"use client"; // Ensure this line is present at the very top
import HttpKit from "@/common/helpers/HttpKit";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import RecipeCard from "./RecipeCard";
import Modal from "../Modal";
import SingleRecipe from "./SingleRecipe";

const RecipesList = () => {
  const [openDetails, setOpenDetails] = useState(false);
  const [recipeId, setRecipeId] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["recipes"],
    queryFn: HttpKit.getTopRecipes,
  });

  const handleDetailsOpen = (id) => {
    setOpenDetails(true);
    setRecipeId(id);
  };

  if (isLoading) return <div>Loading recipes...</div>;
  if (error) return <div>Error loading recipes: {error.message}</div>;

  return (
    <div className="bg-gray-50 py-10">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold">Top Recipes</h1>
        <div className="relative py-16">
          <div className="container relative m-auto px-6 text-gray-500 md:px-12">
            <div className="grid gap-6 md:mx-auto md:w-8/12 lg:w-full lg:grid-cols-3">
              {data?.map((recipe) => (
                <RecipeCard
                  key={recipe?.id}
                  recipe={recipe}
                  handleDetailsOpen={handleDetailsOpen}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal*/}
      <Modal isOpen={openDetails} setIsOpen={setOpenDetails}>
        <SingleRecipe id={recipeId} setIsOpen={setOpenDetails} />
      </Modal>
    </div>
  );
};

export default RecipesList;
