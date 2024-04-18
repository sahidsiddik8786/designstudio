// SubcategoryList.jsx

import React from "react";
import { Paper, Typography } from "@mui/material";

const SubcategoryList = ({ subcategories, onSelectSubcategory, selectedSubcategory }) => (
  <div className="subcategory-list">
    {subcategories.map((subcategory) => (
      <Paper
        key={subcategory}
        elevation={selectedSubcategory === subcategory ? 3 : 1}
        onClick={() => onSelectSubcategory(subcategory)}
        className={`subcategory-item ${subcategory === selectedSubcategory ? "selected" : ""}`}
      >
        <Typography variant="subtitle1">{subcategory}</Typography>
      </Paper>
    ))}
  </div>
);

export default SubcategoryList;
