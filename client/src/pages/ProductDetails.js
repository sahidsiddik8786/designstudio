import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
} from "@mui/material";

const ProductDetails = () => {
  const [cart, setCart] = useCart();
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = () => {
    setCart([...cart, product]);
    localStorage.setItem("cart", JSON.stringify([...cart, product]));
    toast.success("Item Added to cart");
    // Redirect to the cart page after adding to the cart
    navigate("/cart");
  };

  return (
    <Layout>
      <Typography variant="h3" align="center">
        Product Details
      </Typography>

      <div className="container mt-5">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <img
              src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
              style={{ width: "100%", height: "100%" }}
              alt={product.name}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography>Name: {product.name}</Typography>
            <Typography>Description: {product.description}</Typography>
            <Typography>Price: {product.price}</Typography>
            <Typography>Category: {product?.category?.name}</Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleAddToCart}
            >
              ADD TO CART
            </Button>
          </Grid>
        </Grid>
      </div>
      <hr />
      <div style={{ textAlign: "center" }}>
        <Typography variant="h4">Similar Products</Typography>
        {relatedProducts.length < 1 && (
          <Typography align="center">No Similar Products found</Typography>
        )}
        <Grid container spacing={2} justifyContent="center">
          {relatedProducts?.map((p) => (
            <Grid item xs={12} sm={6} md={4} key={p._id}>
              <Card
                variant="outlined"
                style={{
                  height: "100%",
                  width: "65%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <img
                  src={`http://localhost:8080/api/v1/product/product-photo/${p?._id}`}
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                  alt={p.name}
                />
                <CardContent>
                  <Typography variant="h6">{p.name}</Typography>
                  <Typography>{p.description.substring(0, 30)}...</Typography>
                  <Typography>₹ {p.price}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      setCart([...cart, product]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, product])
                      );
                      toast.success("Item Added to cart");
                      navigate("/cart");
                    }}
                  >
                    ADD TO CART
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </Layout>
  );
};

export default ProductDetails;
