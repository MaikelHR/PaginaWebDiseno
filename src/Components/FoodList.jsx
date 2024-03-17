import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import FoodCard from "./FoodCard";

const FoodList = ({ area, category, textBar, ingredient, searchType }) => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    let finalURL = "search.php?f=a";
    if (searchType === "category" && category) {
      finalURL = `filter.php?c=${category}`;
    } else if (searchType === "area" && area) {
      finalURL = `filter.php?a=${area}`;
    } else if (searchType === "name" && textBar) {
      finalURL = `search.php?s=${textBar}`;
    } else if (searchType === "ingredient" && ingredient) {
      finalURL = `filter.php?i=${ingredient}`;
    }
  
    async function getFoods() {
      await fetch(
        `https://www.themealdb.com/api/json/v1/1/${finalURL}`
      )
        .then((response) => response.json())
        .then((foods) => {
          setFoods(foods.meals);
        })
        .catch((error) => {
          console.log("Error", error);
        });
    }
    getFoods();
  }, [area, category, textBar, ingredient, searchType]);
  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      width={"100%"}
      flexWrap={"wrap"}
    >
      {foods?.length ? (
        <>
          {foods.map(({ strMeal, strMealThumb }) => (
            <FoodCard imgUrl={strMealThumb} key={strMeal} name={strMeal} />
          ))}
        </>
      ) : (
        <Typography gutterBottom variant="h5" component="div">
          No results
        </Typography>
      )}
    </Box>
  );
};

export default FoodList;
