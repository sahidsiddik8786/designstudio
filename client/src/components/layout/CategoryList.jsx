// CategoryList.jsx

import React from "react";
import { Paper, Typography } from "@mui/material";

const CategoryList = ({ categories, onSelectCategory, onMouseEnter, onMouseLeave, selectedCategory }) => (
  <div className="category-list">
    {categories.map((category) => (
      <Paper
        key={category.id}
        elevation={selectedCategory === category ? 3 : 1}
        onMouseEnter={() => onMouseEnter(category)}
        onMouseLeave={() => onMouseLeave()}
        onClick={() => onSelectCategory(category)}
        className={`category-item ${category === selectedCategory ? "selected" : ""}`}
      >
        <Typography variant="h6">{category.title}</Typography>
      </Paper>
    ))}
  </div>
);

export default CategoryList;
