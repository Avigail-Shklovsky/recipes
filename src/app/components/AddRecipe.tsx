"use client";
import "./AddRecipe.css";
import React, { useState } from "react";
import { useRecipeStore } from "../store/use-store/useRecipeStore";
import { z } from "zod";
import { createRecipe } from "../services/recipe";
import { useRouter } from "next/navigation";

// Define a schema using Zod to validate the form data
const formSchema = z.object({
  _id: z.string(),
  name: z
    .string()
    .trim()
    .min(3, "Recipe name must contain at least 3 characters")
    .max(60, "Recipe name must contain at most 60 characters")
    .min(1, "Recipe name is required"),
  category: z.string().trim().min(1, "Category is required"),
  imageUrl: z
    .string()
    .url("Invalid URL")
    .trim()
    .min(1, "Image URL is required"),
  ingredients: z
    .array(
      z
        .string()
        .trim()
        .min(2, "Ingredient must contain at least 2 characters")
        .max(20, "Ingredient must contain at most 20 characters")
        .regex(/^[A-Za-z]+$/, "Ingredient must contain only letters")
    )
    .min(1, "Ingredient is required"),
  instructions: z
    .string()
    .trim()
    .min(20, "Instructions must contain at least 20 characters")
    .max(600, "Ingredient must contain at most 600 characters")
    .min(1, "Instructions are required"),
  isFavorite: z.boolean(),
});

const AddRecipe = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<z.infer<typeof formSchema>>({
    _id: "",
    name: "",
    category: "",
    imageUrl: "",
    ingredients: [],
    instructions: "",
    isFavorite: false,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const categoryList = useRecipeStore(
    (state: { categoryList:string[] }) => state.categoryList
  );
  const [ingredient, setIngredient] = useState<string>("");

  // Handle form input changes
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add an ingredient to the ingredients list
  const addIngredientHandler = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, ingredient],
    });
    setIngredient("");
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      formSchema.parse(formData);
      setErrors({});
      console.log(formData);
      alert("Form submitted successfully!");
      createRecipe(formData);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: { [key: string]: string } = {};
        err.errors.forEach(
          (error: {
            path: { toString: () => string | number }[];
            message: string;
          }) => {
            if (error.path[0]) {
              fieldErrors[error.path[0].toString()] = error.message;
            }
          }
        );
        setErrors(fieldErrors);
      }
    }
  };

  return (
    <>
      <button
        onClick={() => {
          router.push("/");
        }}
        className="text-[#404445] font-normal mt-[30px] ml-[30px]"
      >
        ‹ Back
      </button>
      <div className="p-[50px]">
        <h1 className="text-[4vh] pb-[6vh]">Add Recipe</h1>
        <form onSubmit={handleSubmit} className="flex gap-[5vw]">
          <div className="flex flex-col gap-[5vh]">
            <span>
              <input
                type="text"
                placeholder="Recipe name"
                name="name"
                value={formData.name}
                className="input-box"
                onChange={handleChange}
              />
              {errors.name && <p className="error-message">{errors.name}</p>}
            </span>
            <span>
              <select
                name="category"
                id="category"
                defaultValue=""
                onChange={handleChange}
                className="select-box cursor-pointer"
              >
                <option value="" disabled>
                  Category
                </option>
                {categoryList &&
                  categoryList.map((c: string) => (
                    <option value={c} key={c}>
                      {c}
                    </option>
                  ))}
              </select>
              {errors.category && (
                <p className="error-message">{errors.category}</p>
              )}
            </span>
            <span>
              <input
                type="url"
                placeholder="Image URL"
                name="imageUrl"
                value={formData.imageUrl}
                className="input-box"
                onChange={handleChange}
              />
              {errors.imageUrl && (
                <p className="error-message">{errors.imageUrl}</p>
              )}
            </span>
            <div className="flex flex-row gap-[1vw]">
              <span>
                <input
                  type="text"
                  placeholder="Ingredients"
                  name="ingredient"
                  value={ingredient}
                  className="input-box"
                  onChange={(e) => setIngredient(e.target.value)}
                />
                <ul>
                  {formData.ingredients.map(
                    (
                      ingredient:
                        | boolean
                        | React.ReactElement<
                        
                            string
                          >
                        | Iterable<React.ReactNode>
                        | Promise<React.AwaitedReactNode>
                        | React.Key
                        | null
                        | undefined,
                      index
                    ) => (
                      <li key={index}>{ingredient}</li>
                    )
                  )}
                </ul>
              </span>
              <input
                type="button"
                value="+"
                onClick={addIngredientHandler}
                className="flex justify-center content-center bg-[#7864EA] text-white rounded-sm px-[6px] w-[30px] h-[30px] cursor-pointer"
              />
            </div>
          </div>
          <div className="flex flex-col gap-[4vh]">
            <span>
              <textarea
                placeholder="Instructions"
                name="instructions"
                value={formData.instructions}
                className="input-box instructions-input"
                onChange={handleChange}
              />
              {errors.instructions && (
                <p className="error-message min-w-[40vw]">
                  {errors.instructions}
                </p>
              )}
            </span>
            <input
              type="submit"
              value="Add"
              className="flex self-end bg-[#7864EA] text-white rounded-md p-[7px] w-[7vw] cursor-pointer"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default AddRecipe;
