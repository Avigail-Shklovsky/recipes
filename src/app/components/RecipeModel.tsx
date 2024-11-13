import React from 'react'
import { useRecipeStore } from '../store/use-store/useRecipeStore'
import Image from "next/image";


const RecipeModel = () => {
    const currentRecipe=useRecipeStore((state)=>state.currentRecipe);

    if (!currentRecipe) {
        return <p>No recipe selected</p>;
    }

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-4">
        <div className="flex items-start">
            <Image
            className="w-32 h-32 object-cover rounded-md mr-4"
            src={currentRecipe.imageUrl}
            width={200}
            height={200}
            alt={`${currentRecipe.name} picture`}
            />
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold">{currentRecipe.name}</h2>
          <p className="text-gray-500 mb-2">{currentRecipe.category}</p>

          <ul className="list-disc list-inside">
            {currentRecipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
        <h3 className="text-lg font-semibold">הוראות הכנה:</h3>
        <p className="text-gray-700">{currentRecipe.instructions}</p>
      </div>
    </div>
  )
}

export default RecipeModel
