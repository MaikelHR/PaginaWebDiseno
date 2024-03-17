import React, { useState } from "react";
import FoodList from "./FoodList";
import Filters from "./Filters";
import { Box } from "@mui/material";

const FoodContainer = () => {
  const [searchType, setSearchType] = useState("name");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [area, setArea] = useState("");
  const [areas, setAreas] = useState([]);
  const [textBar, setTextBar] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);

  const handleFilterChange = (e, filter) => {
    if (filter === "searchType") {
      setSearchType(e.target.value);
    } else if (filter === "category") {
      setCategory(e.target.value);
    } else if (filter === "area") {
      setArea(e.target.value);
    } else if (filter === "textBar") {
      setTextBar(e);
    } else if (filter === "ingredient") {
      setIngredient(e.target.value);
    }
  };
  
  return (
    <Box>
      <Filters
        searchType={searchType}
        category={category}
        categories={categories}
        setCategories={setCategories}
        area={area}
        areas={areas}
        setAreas={setAreas}
        ingredient={ingredient}
        ingredients={ingredients}
        setIngredients={setIngredients}
        handleFilterChange={handleFilterChange}
      />
      <FoodList
        searchType={searchType}
        category={category}
        area={area}
        textBar={textBar}
        ingredient={ingredient}
      />
    </Box>
  );
};

export default FoodContainer;
