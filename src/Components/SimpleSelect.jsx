import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const SimpleSelect = ({ label, value, onChange, options, minWidth=140 }) => {
  return (
    <FormControl sx={{ m: 1, minWidth }}>
      <InputLabel id={`select-label-${label}`}>{label}</InputLabel>
      <Select
        labelId={`select-label-${label}`}
        id={`select-${label}`}
        value={value}
        label="Search Type"
        onChange={onChange}
      >
        {options.map((option, index) => 
          <MenuItem key={`${option.value}-${index}`} value={option.value}>{option.label}</MenuItem>
        )}
      </Select>
    </FormControl>
  );
};

export default SimpleSelect;
