import { useState } from "react";

import "./App.css";
import Filtros from "./Components/Filters";
import { Box } from "@mui/material";
import FoodList from "./Components/FoodList";

function App() {
  return (
    <Box>
      <Filtros />
      <FoodList />
    </Box>
  );
}   

export default App;
