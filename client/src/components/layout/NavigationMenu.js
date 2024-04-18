import React, { useState, useEffect } from "react";
import { Select, MenuItem, List, ListItem, Button, Typography, AppBar, Toolbar } from "@mui/material";
import axios from "axios";

// Import ListItemText from @mui/material
import ListItemText from "@mui/material/ListItemText";

const Navbar = ({ categories, onSelectCategory, subcategories, onSelectSubcategory }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    onSelectCategory(category);
  };

  return (
    <AppBar position="static" style={{ backgroundColor: "" }} sticky="top">
      <Toolbar>
        {categories.map((category) => (
          <div key={category._id} style={{ marginRight: 16 }}>
            <Button color="inherit" onClick={() => handleCategoryClick(category)}>
              {category.name}
            </Button>
            {selectedCategory?._id === category._id && (
              <Select
                value=""
                onChange={(event) => onSelectSubcategory(event.target.value)}
              >
                {subcategories.map((subcategory) => (
                  <MenuItem key={subcategory._id} value={subcategory._id}>
                    {subcategory.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          </div>
        ))}
      </Toolbar>
    </AppBar>
  );
};

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    // Fetch categories on component mount
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get("http://localhost:8080/api/v1/category/get-category");
        if (data?.success) {
          setCategories(data?.category);
        }
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    // Fetch subcategories when a category is selected
    const fetchSubcategories = async () => {
      if (selectedCategory) {
        try {
          const { data } = await axios.get(
            `http://localhost:8080/api/v1/category/${selectedCategory._id}/subcategories`
          );
          if (data?.success) {
            setSubcategories(data?.subcategories);
          }
        } catch (error) {
          console.error("Error fetching subcategories", error);
        }
      }
    };

    fetchSubcategories();
  }, [selectedCategory]);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    // Reset subcategory and products when a new category is selected
    setSelectedSubcategory(null);
    setProducts([]);
  };

  const handleSelectSubcategory = (subcategoryId) => {
    setSelectedSubcategory(subcategories.find((subcategory) => subcategory._id === subcategoryId));
  };

  const handleProductSelect = (productId) => {
    const selected = products.find((product) => product._id === productId);
    setSelectedProduct(selected);
  };

  const selectStyle = {
    width: 200,
    marginRight: 10,
  };

  return (
    <div>
      <Navbar
        categories={categories}
        onSelectCategory={handleSelectCategory}
        subcategories={subcategories}
        onSelectSubcategory={handleSelectSubcategory}
      />

      {products.length > 0 && (
        <div>
          <Typography variant="h5" style={{ marginTop: 16 }}>Corresponding Products</Typography>
          <List>
            {products.map((product) => (
              <ListItem key={product._id}>
                <ListItemText primary={product.name} />
                <Button onClick={() => handleProductSelect(product._id)}>View Details</Button>
              </ListItem>
            ))}
          </List>
        </div>
      )}

      {selectedProduct && (
        <div>
          <Typography variant="h5" style={{ marginTop: 16 }}>Selected Product Details</Typography>
          <Typography>Name: {selectedProduct.name}</Typography>
          <Typography>Description: {selectedProduct.description}</Typography>
        </div>
      )}
    </div>
  );
};

export default CreateProduct;
