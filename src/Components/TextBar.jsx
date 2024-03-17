import { FormControl, TextField } from "@mui/material";
import React from "react";

const TextBar = ({ value, onChange }) => {
  return (
    <FormControl sx={{ m: 1, minWidth: 400 }}>
      <TextField value={value} onChange={onChange} />
    </FormControl>
  );
};

export default TextBar;
