import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Checkbox,
  Radio,
  Button,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import SearchInput from "../components/Form/SearchInput";
import "./pages.css";
import NavigationMenu from "../components/layout/NavigationMenu";
import { Checkbox as AntCheckbox, Radio as AntRadio } from "antd";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";
import anime from "../../src/assets/anime.jpg";
import { useAuth } from "../context/auth";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true); // Always show sidebar
  const [wishlist, setWishlist] = useState([]);
  const [isInWishlist, setIsInWishlist] = useState([]);
  const [auth] = useAuth();

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);

    const isInWishlistArray = products.map((product) =>
      wishlist.some((item) => item._id === product._id)
    );
    setIsInWishlist(isInWishlistArray);
  }, [wishlist, products]);

  const handleToggleWishlist = (productId) => {
    const productIndex = products.findIndex(
      (product) => product._id === productId
    );
    const updatedWishlist = [...wishlist];

    if (productIndex !== -1) {
      const product = products[productIndex];

      const isProductInWishlist = updatedWishlist.some(
        (item) => item._id === productId
      );

      if (!isProductInWishlist) {
        updatedWishlist.push(product);
      } else {
        updatedWishlist.splice(productIndex, 1);
      }

      setWishlist(updatedWishlist);

      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/get-category"
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/product/product-count"
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/product/product-filters",
        {
          checked,
          radio,
        }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
       <div className="image-overlay">
        {auth.user ? (
          <a
            href="http://localhost:8501/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={anime} alt="Overlay Image" />
          </a>
        ) : (
          <img src={anime} alt="Overlay Image" />
        )}
      </div>

      <Button
        variant="outlined"
        color="primary"
        onClick={toggleSidebar}
        className="mt-3"
      >
        {sidebarOpen ? "Hide Filters" : "Show Filters"}
      </Button>
      <div className="container-fluid row mt-3">
        {/* Sidebar */}
        <div className={`col-md-2 ${sidebarOpen ? "" : " d-none"}`}>
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <AntCheckbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </AntCheckbox>
            ))}
          </div>
          {/* Price filter */}
          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
            <AntRadio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <AntRadio value={p.array}>{p.name}</AntRadio>
                </div>
              ))}
            </AntRadio.Group>
          </div>
          <div className="d-flex flex-column">
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </Button>
          </div>
        </div>

        <div className="col-md-9 offset-1">
          {/* <h1 className="text-center mb-4">SHOP</h1>*/}
          <Grid container spacing={3}>
            {products?.map((p, index) => (
              <Grid item key={p._id} xs={12} sm={6} md={4}>
                <Card className="mb-4" sx={{ width: "80%" }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                    alt={p.name}
                  />
                  <CardContent>
                    <Typography variant="h6" component="div" className="mb-2">
                      {p.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      className="mb-2"
                    >
                      {p.description.substring(0, 50)}...
                    </Typography>
                    <Typography variant="h6" color="primary" className="mb-2">
                      ₹{p.price}
                    </Typography>

                    <FavoriteIcon
                      color={isInWishlist[index] ? "error" : "inherit"}
                      onClick={() => handleToggleWishlist(p._id)}
                      style={{ cursor: "pointer" }}
                    />

                    <Button
                      variant="outlined"
                      color="primary"
                      fullWidth
                      className="mb-2"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      View Details
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item Added to cart");
                        navigate("/cart");
                      }}
                    >
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <Button
                variant="contained"
                color="warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Load More"}
              </Button>
            )}
          </div>
          <Button
            component={Link}
            to="/wishlist"
            variant="contained"
            color="primary"
            className="mt-3"
          >
            View Wishlist
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
