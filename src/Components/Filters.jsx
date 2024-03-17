import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import SimpleSelect from "./SimpleSelect";
import TextBar from "./TextBar";

const searchTypeOptions = [
  { label: "Name", value: "name" },
  { label: "Ingredient", value: "ingredient" },
  { label: "Category", value: "category" },
  { label: "Area", value: "area" },
];

const Filters = () => {
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
      setTextBar(e.target.value);
    } else if (filter === "ingredient") {
      setIngredient(e.target.value);
    }
  };

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
              value: strIngredient.replace(" ","_"),
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
    <Box>
      <SimpleSelect
        value={searchType}
        onChange={(e) => handleFilterChange(e, "searchType")}
        label={"Search Type"}
        options={searchTypeOptions}
      />
      {searchType === "name" && (
        <TextBar
          value={textBar}
          onChange={(e) => handleFilterChange(e, "textBar")}
        />
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
