import React, { useState } from "react";
import FoodList from "./FoodList";
import Filters from "./Filters";
import { Box, Typography } from "@mui/material";
import FoodDetails from "./FoodDetails";

const FoodContainer = () => {
  const [searchType, setSearchType] = useState("name");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [area, setArea] = useState("");
  const [areas, setAreas] = useState([]);
  const [textBar, setTextBar] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [foodID, setFoodID] = useState("");
  const handleCloseDialog = () => {
    setOpen(false);
  };

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
      <Typography gutterBottom variant="h3" component="div">
        FoodCard Menu
      </Typography>
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
        setFoodID={setFoodID}
        setOpen={setOpen}
      />
      <FoodDetails
        handleClose={handleCloseDialog}
        open={open}
        foodID={foodID}
      />
    </Box>
  );
};

export default FoodContainer;
