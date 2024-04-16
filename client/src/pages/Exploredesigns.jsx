import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import Layout from "../components/layout/Layout";
import "./Exploredesigns.css";
import anime from "../../src/assets/anime.jpg"

const Designs = () => {
  const [designs, setDesigns] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/categorydesign/get-categorydesign"
        );
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const getAllDesigns = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/image/get-designimg"
      );
      setDesigns(data.designs);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    getAllDesigns();
  }, []);

  const handleCategoryClick = (categoryId) => {
    console.log("Clicked category ID:", categoryId);
    navigate(`/subcategory-designs/${categoryId}`); // Navigate to the next page with category ID
  };

  return (
    <Layout>
    
    <div className="image-overlay">
  <a
    href="http://localhost:8501/"
    target="_blank"
    rel="noopener noreferrer"

  >
    <img src={anime} alt="Overlay Image" />
  </a>
</div>


      <div className="interior-design">
        <h1>Home Interior Design</h1>
        <p>
          We bring you carefully-curated interior design ideas, to give your
          home a brand new look. Explore exclusive
          <br /> interior designs and trends that are every bit inspirational as
          they are practical. Our team of interior designers
          <br /> have put together ideas across kitchen, bedroom, living room
          and more, to help you pick a design that will best
          <br /> suit your home interior requirements.
        </p>
        <div className="d-flex flex-wrap">
          {designs?.map((design) => (
            <div key={design._id} className="category-card">
              <div
                className="card m-3"
                style={{ width: "24rem", height: "19rem" }}
                onClick={() => handleCategoryClick(design.category._id)} // Pass category ID
              >
                <img
                  src={`http://localhost:8080/api/v1/image/designimg-photo/${design._id}`}
                  className="card-img-top"
                  alt={design.name}
                  style={{ objectFit: "cover", height: "100%" }} // Ensure the image fills the card header
                />
                <div className="card-body">
                  <h5 className="card-title">{design.name}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Designs;
