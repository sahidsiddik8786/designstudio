import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./UserImagesPage.css";
import Sidebar from "./Sidebar";
import StaffHeader from "./StaffHeader";

const UserImagesPage = () => {
  const { userId } = useParams();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImages, setSelectedImages] = useState([]);
  const [suggestedImage, setSuggestedImage] = useState([]);
  const [imageDescription, setImageDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchUserImages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/site/user/${userId}/images`
        );
        setImages(response.data.map((site) => site.images).flat());
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user images: ", error);
        setLoading(false);
      }
    };

    fetchUserImages();
  }, [userId]);

  useEffect(() => {
    const fetchSuggestedImages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/get-suggestion-images/${userId}`
        );
        const imageUrls = response.data.map(img => 
          `data:${img.contentType};base64,${img.data}`
        );
        setSuggestedImage(imageUrls);
      } catch (error) {
        console.error("Error fetching suggested images: ", error);
      }
    };
  
    fetchSuggestedImages();
  }, [userId]);
  

  const handleDescriptionChange = (e) => {
    setImageDescription(e.target.value);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    // Filter out non-image files
    const validImages = files.filter((file) => file.type.startsWith("image/"));
    setSelectedImages((prevImages) => [...prevImages, ...validImages]);
    // Show error if any invalid files were selected
    if (files.length !== validImages.length) {
      setErrorMessage("Please select only image files.");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000); // Clear error message after 5 seconds
    }
  };

  const removeImage = (indexToRemove) => {
    setSelectedImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleImageUpload = async () => {
    if (selectedImages.length === 0) {
      setErrorMessage("Please select at least one image to upload.");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000); // Clear error message after 5 seconds
      return; // Exit the function if no images are selected
    }

    try {
      const formData = new FormData();
      selectedImages.forEach((image) =>
        formData.append("suggestionImages", image)
      );
      formData.append("siteId", userId);

      // Check if any selected file is not an image
      const nonImageFiles = selectedImages.filter(
        (file) => !file.type.startsWith("image/")
      );
      if (nonImageFiles.length > 0) {
        setErrorMessage("Please select only image files.");
        setTimeout(() => {
          setErrorMessage("");
        }, 5000); // Clear error message after 5 seconds
        return; // Exit the function if non-image files are selected
      }

      const response = await axios.post(
        "http://localhost:8080/api/upload-suggestion",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Upload Response:", response.data);
      setSuccessMessage("Images uploaded successfully.");
      setSuggestedImage((prevSuggestedImage) => [
        ...prevSuggestedImage,
        ...selectedImages.map((image) => URL.createObjectURL(image)),
      ]);
      setLoading(true);
      setImageDescription("");
      setSelectedImages([]);
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000); // Clear success message after 3 seconds
    } catch (error) {
      console.error("Error uploading images: ", error);
      setErrorMessage("Error uploading images. Please try again.");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000); // Clear error message after 5 seconds
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const sidebarStyle = {
    width: "290px",
    height: "100vh",
    position: "fixed",
    left: -15,
    top: 0,
    bottom: 0,
    overflowY: "auto",
    zIndex: 1,
  };

  return (
    <div className="row">
      <div style={sidebarStyle}>
        <Sidebar />
      </div>
      <StaffHeader />
      <div className="user-images-container mt-5">
        <h4>BEFORE</h4>
        <Slider {...settings}>
          {images.map((imageData, index) => (
            <div key={imageData._id || index} className="image-slide">
              <img
                src={imageData.data}
                alt={`User Image ${index}`}
                className="slider-image"
              />
              {/* <p className="image-description">Description: {imageData.description || 'No description'}</p> */}
            </div>
          ))}
        </Slider>
      </div>
      {suggestedImage && (
  <div className="suggested-image-container mt-5">
    <h4>AFTER</h4>
      <Slider {...settings}>
        {suggestedImage.map((imageUrl, index) => (
          <div key={index}>
            <img
              src={imageUrl}
              alt={`Suggested Image ${index}`}
              className="suggested-image"
            />
          </div>
        ))}
      </Slider>
  </div>
)}

      <div className="file-upload-card mt-5">
        <div className="image-upload-area">
          <div className="file-drop-area">
            <input
              className="file-input"
              type="file"
              onChange={handleFileChange}
              multiple
            />
            <span className="fake-btn">Browse</span>
            <span className="file-msg">
              Drop your files here or click to browse
            </span>
          </div>
          <div className="image-preview-container">
            {selectedImages.map((image, index) => (
              <div key={index} className="image-preview-card">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Preview ${index}`}
                  className="preview-image"
                />
                <button onClick={() => removeImage(index)}>Remove</button>
              </div>
            ))}
          </div>
          <button className="upload-btn" onClick={handleImageUpload}>
            Upload Details
          </button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserImagesPage;
