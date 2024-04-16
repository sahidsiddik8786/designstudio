import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./dashboard.css";

const SiteDetails = () => {
  const [siteDetails, setSiteDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSiteDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/site/all-sites"
        );
        const siteDetailsData = response.data;

        // Fetch suggested images for each site
        for (let site of siteDetailsData) {
          try {
            const res = await axios.get(
              `http://localhost:8080/api/get-suggestionimages/${site._id}`
            );
            site.suggestedImages = res.data; // Add suggested images to site object
          } catch (err) {
            console.error("Error fetching suggested images:", err);
            // Handle error as needed
          }
        }

        setSiteDetails(siteDetailsData);
        setError("");
      } catch (error) {
        console.error("Error fetching site details:", error);
        setError("An error occurred while fetching site details");
      } finally {
        setLoading(false);
      }
    };

    fetchSiteDetails();
  }, []);

  // Function to handle booking action
  const bookDesign = (siteId, imageId) => {
    // Implement booking logic here
    console.log("Booking design for site", siteId, "with image", imageId);
  };

  // Settings for the image sliders
  const siteImageSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const suggestedImageSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Layout title={"Profile"}>
      <div className="row">
        <div className="col-md-3">
          <UserMenu />
        </div>
        <div className="site-details-container mt-3">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <>
              {siteDetails.length === 0 ? (
                <p>No site details found.</p>
              ) : (
                <ul className="site-list">
                  {siteDetails.map((site) => (
                    <li key={site._id} className="site-item">
                      <div className="before-after-container">
                        <div className="before-details">
                          <center>
                            <h2>BEFORE</h2>
                          </center>
                          <h3 className="image-container">
                            Details: {site.description}
                          </h3>
                          <div className="image-slider-container">
                            <Slider
                              {...siteImageSliderSettings}
                              className="image-slider"
                            >
                              {site.images.map((image) => (
                                <div key={image._id} className="image-slide">
                                  <img
                                    src={image.data}
                                    alt={image.description}
                                    className="site-image"
                                  />
                                </div>
                              ))}
                            </Slider>
                          </div>
                        </div>
                        {site.suggestedImages &&
                          site.suggestedImages.length > 0 && (
                            <div className="after-details">
                              <center>
                                <h2>AFTER</h2>
                              </center>
                              <h4>Select the images based on our ideas </h4>
                              <div className="suggested-images-grid">
                                {site.suggestedImages.map((image, index) => (
                                  <div
                                    key={index}
                                    className="suggested-image-item"
                                  >
                                    <img
                                      src={`data:${image.contentType};base64,${image.data}`}
                                      alt="Suggested Image"
                                      className="suggested-image"
                                    />
                                    <button
                                      className="book-design-button"
                                      onClick={() => bookDesign(site._id, image._id)}
                                    >
                                      Book Design
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SiteDetails;
