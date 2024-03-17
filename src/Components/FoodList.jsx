import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import FoodCard from "./FoodCard";

const FoodList = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    async function getFoods() {
      await fetch("https://www.themealdb.com/api/json/v1/1/search.php?f=a")
        .then((response) => response.json())
        .then((foods) => {
          setFoods(foods.meals);
        })
        .catch((error) => {
          console.log("Error", error);
        });
    }
    getFoods();
  }, []);
  return (
    <Box display={"flex"} justifyContent={"space-between"} width={"100%"} flexWrap={"wrap"}>
      {foods.length ? (
        <>
          {foods.map(({ strMeal, strMealThumb }) => (
            <FoodCard imgUrl={strMealThumb} name={strMeal} />
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
