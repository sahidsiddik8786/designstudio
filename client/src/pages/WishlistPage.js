// WishlistPage.js
import React, { useState, useEffect } from "react";
import { useCart } from "../context/cart";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import toast from "react-hot-toast";

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    localStorage.setItem("cart", JSON.stringify([...cart, product]));
    toast.success("Item Added to Cart");
    navigate("/cart");
  };

  useEffect(() => {
    // Load wishlist from local storage on component mount
    const storedWishlist =
      JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  }, []);

  return (
    <Layout title={"Wishlist"}>
      <div className="container-fluid row mt-3">
        <div className="col-md-12">
          <h1 className="text-center mb-4">Wishlist</h1>
          <Grid container spacing={3}>
            {wishlist.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product._id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={`http://localhost:8080/api/v1/product/product-photo/${
                      product._id || ""
                    }`}
                    alt={product.name}
                  />
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.description}
                    </Typography>
                    <Typography variant="h6" color="primary" className="mb-2">
                      ₹{product.price}
                    </Typography>

                    <FavoriteIcon color="error" />

                    <Button
                      variant="outlined"
                      color="primary"
                      fullWidth
                      style={{ marginTop: "10px" }}
                    >
                      View Details
                    </Button>

                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={() => handleAddToCart(product)}
                      style={{ marginTop: "10px" }}
                    >
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </Layout>
  );
};

export default WishlistPage;
