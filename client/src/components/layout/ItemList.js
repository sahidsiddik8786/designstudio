// ItemList.jsx

import React from "react";
import { Paper, Typography } from "@mui/material";

const ItemList = ({ items }) => (
  <div className="item-list">
    {items.map((item) => (
      <Paper key={item.id} elevation={1} className="item">
        <Typography>{item.title}</Typography>
      </Paper>
    ))}
  </div>
);

export default ItemList;
