import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Chip, Typography } from "@mui/material";

const FoodDetails = ({ open, handleClose, foodID }) => {
  const [details, setDetails] = useState({});
  const [formattedIngredients, setFormattedIngredients] = useState("");

  useEffect(() => {
    async function getFoodDetails() {
      await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodID}`
      )
        .then((response) => response.json())
        .then((foodDetails) => {
          setDetails(foodDetails.meals[0]);
        })
        .catch((error) => {
          console.log("Error", error);
        });
    }
    if (foodID) {
      getFoodDetails();
    }
  }, [foodID]);

  useEffect(() => {
    if (details.strMeal) {
      let ingredients = "";
      for (let index = 1; index < 21; index++) {
        if (details[`strIngredient${index}`]) {
          ingredients += `${index == 1 ? "" : ", "} ${details[`strMeasure${index}`]} of ${
            details[`strIngredient${index}`]
          }`;
        }
      }
      ingredients+="."
      setFormattedIngredients(ingredients);
    }
  }, [details?.strMeal]);

  return (
    <Dialog
      fullWidth={true}
      maxWidth={"xl"}
      open={open}
      onClose={handleClose}
      scroll={"paper"}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title" fontWeight={"bold"} fontSize={32}>
        {details.strMeal}
      </DialogTitle>
      <DialogContent dividers={true}>
        <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            marginBottom={"1rem"}
          >
            <img
              style={{ height: 200, borderRadius: "50%" }}
              alt="FoodImg"
              src={details.strMealThumb}
            />
            <Box marginX={"1rem"} width={"70%"}>
              <Typography gutterBottom variant="h5" component="div">
                Ingredients
              </Typography>
              <Typography gutterBottom variant="body1" component="div">
                {formattedIngredients}
              </Typography>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                display={"flex"}
                justifyContent={"space-between"}
              >
                <p>
                  Area: <Chip label={details.strArea} />{" "}
                </p>
                {details.strTags && (
                  <p>
                    Tags:{" "}
                    {details.strTags?.split(",").map((label) => (
                      <Chip label={label} />
                    ))}
                  </p>
                )}
              </Typography>
            </Box>
          </Box>
          <Typography gutterBottom variant="body1" component="div">
            {details.strInstructions}
          </Typography>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default FoodDetails;
