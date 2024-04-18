import React, { useState  } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/auth'; // Ensure this path is correct
import "./design.css";
import toast from "react-hot-toast";
import GoBackButton from "../../components/layout/goback";
import Layout from "../../components/layout/Layout";
import { useNavigate } from "react-router-dom";

const SiteManager = () => {
  const [auth] = useAuth(); // Ensure auth context provides user ID
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!auth.user || !auth.user._id) {
      console.error('User ID is not available.');
      return; // Or handle this case appropriately
    }

    try {
      const formData = new FormData();
      formData.append('description', description);
      images.forEach((image) => formData.append('images', image)); // Append all images
      formData.append('createdBy', auth.user._id);

      await axios.post('http://localhost:8080/api/v1/site/sites', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set content type for FormData
        },
      });
      // Handle success
      console.log('Site created successfully');
      toast.success("Site created successfully")

      setDescription('');
      setImages([]);
      setPreviewImages([]);
      setErrorMessage('')
      navigate("/site-details");

    } catch (error) {
      console.error('Error creating site', error);
      setErrorMessage('Error creating site. Please try again.');
    }
  };

  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    setImages(prevImages => [...prevImages, ...selectedImages]);

    const newPreviewUrls = selectedImages.map(image =>
        URL.createObjectURL(image)
      );
      setPreviewImages(prevPreviewImages => [
        ...prevPreviewImages,
        ...newPreviewUrls,
      ]);
    
    
    // Validate file types (only allow images)
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']; // Add more if needed
    for (const file of selectedImages) {
      if (!allowedTypes.includes(file.type)) {
        setErrorMessage('Only images (JPEG, PNG, GIF) are allowed.');
    
        return;
      }
    }
    setErrorMessage(''); // Clear error message if all files are valid
  };

  // Handle drop file
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = Array.from(e.dataTransfer.files);
    handleImageChange({ target: { files } });
  };

  // Prevent default drag over behavior
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };


  return (
    <>
        <Layout>
       <GoBackButton />
    <div className="file-upload-card">
      <form onSubmit={handleSubmit}>
        <div className="file-upload-dropzone" onDrop={handleDrop} onDragOver={handleDragOver}>
          <p>Drop Your File Here Or</p>
          <input
            type="file"
            onChange={handleImageChange}
            multiple // Allow multiple file selection
            style={{ display: 'none' }} // Hide the default file input
            id="file-upload"
          />
          <label htmlFor="file-upload" className="file-upload-button">
            Browse
          </label>
          <p>Maximum File Size 4 MB</p>
        </div>
        <textarea
          placeholder="Add a description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="description-textarea"
        />
        <button type="submit" className="submit-buttonS">UPLOAD DETAILS</button>
      </form>
      {previewImages.length > 0 && (
        <div className="image-preview-container">
          {previewImages.map((previewUrl, index) => (
            <div className="image-preview-card" key={index}>
              <img src={previewUrl} alt={`Preview ${index}`} />
              <button onClick={() => removeImage(index)}>Remove</button>
            </div>
          ))}
        </div>
      )}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
    </Layout>
    </>
  );
  function removeImage(indexToRemove) {
    setImages(images.filter((_, index) => index !== indexToRemove));
    setPreviewImages(previewImages.filter((_, index) => index !== indexToRemove));
  }
};
export default SiteManager;
