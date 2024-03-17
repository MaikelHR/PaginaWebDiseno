import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import SimpleSelect from "./SimpleSelect";
import TextBar from "./TextBar";
import { Button } from "@mui/material";

const searchTypeOptions = [
  { label: "Name", value: "name" },
  { label: "Ingredient", value: "ingredient" },
  { label: "Category", value: "category" },
  { label: "Area", value: "area" },
];

const Filters = ({
  searchType,
  category,
  categories,
  setCategories,
  area,
  areas,
  setAreas,
  ingredient,
  ingredients,
  setIngredients,
  handleFilterChange,
}) => {
  const [textValue, setTextValue] = useState("");
  useEffect(() => {
    async function getAreas() {
      await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
        .then((response) => response.json())
        .then((areas) => {
          const formattedAreas = areas.meals.map(({ strArea }) => ({
            label: strArea,
            value: strArea,
          }));
          setAreas(formattedAreas);
        })
        .catch((error) => {
          console.log("Error", error);
        });
    }
    getAreas();
  }, []);

  useEffect(() => {
    async function getCategories() {
      await fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
        .then((response) => response.json())
        .then((categories) => {
          const formattedCategories = categories.meals.map(
            ({ strCategory }) => ({
              label: strCategory,
              value: strCategory,
            })
          );
          setCategories(formattedCategories);
        })
        .catch((error) => {
          console.log("Error", error);
        });
    }
    getCategories();
  }, []);

  useEffect(() => {
    async function getIngredients() {
      await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
        .then((response) => response.json())
        .then((ingredients) => {
          const formattedIngredients = ingredients.meals.map(
            ({ strIngredient }) => ({
              label: strIngredient,
              value: strIngredient.replace(" ", "_"),
            })
          );
          setIngredients(formattedIngredients);
        })
        .catch((error) => {
          console.log("Error", error);
        });
    }
    getIngredients();
  }, []);

  return (
    <Box
      display={"flex"}
      width={"60%"}
      justifyContent={"space-between"}
      alignContent={"center"}
    >
      <SimpleSelect
        value={searchType}
        onChange={(e) => handleFilterChange(e, "searchType")}
        label={"Search Type"}
        options={searchTypeOptions}
      />
      {searchType === "name" && (
        <>
          <TextBar
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
          />
          <Button
            color="primary"
            size="medium"
            variant="contained"
            sx={{ marginY: "1rem" }}
            onClick={() => handleFilterChange(textValue, "textBar")}
          >
            Apply
          </Button>
        </>
      )}
      {searchType === "category" && (
        <SimpleSelect
          value={category}
          onChange={(e) => handleFilterChange(e, "category")}
          label={"Category"}
          options={categories}
          minWidth={200}
        />
      )}
      {searchType === "area" && (
        <SimpleSelect
          value={area}
          onChange={(e) => handleFilterChange(e, "area")}
          label={"Area"}
          options={areas}
          minWidth={200}
        />
      )}
      {searchType === "ingredient" && (
        <SimpleSelect
          value={ingredient}
          onChange={(e) => handleFilterChange(e, "ingredient")}
          label={"Ingredient"}
          options={ingredients}
          minWidth={200}
        />
      )}
    </Box>
  );
};

export default Filters;
