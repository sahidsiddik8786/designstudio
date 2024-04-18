// DesignDetailPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams , useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import "./design.css";
import GoBackButton from "../../components/layout/goback";
import { useAuth } from "../../context/auth"; 
import toast from "react-hot-toast";

const DesignDetailPage = () => {
  const [design, setDesign] = useState({});
  const { designSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [auth] = useAuth(); 
  const isAuthenticated = auth.token !== "";

  useEffect(() => {
    if (designSlug) {
      fetchDesignDetails();
    }
  }, [designSlug]);

  const fetchDesignDetails = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/design/get-design/${designSlug}`
      );
      setDesign(data?.design);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching design details", error);
      setError(error.message);
      setLoading(false);
    }
  };

  const handleConsultationClick = (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      // User is authenticated, navigate to SlotDetailsPage
      navigate("/slot-details");
    } else {
      // User is not authenticated, show toast message
      toast.error("Login is needed for booking");
      navigate("/login");
    }
  };

  if (loading) return <Layout>Loading...</Layout>;
  if (error) return <Layout>Error: {error}</Layout>;

  return (
    <Layout>
      
      <div className="design-detail-container">
        <div className="design-image">
          <img
            src={`http://localhost:8080/api/v1/design/design-photo/${design._id}`}
            alt={design.name}
          />
        </div>
        
        <div className="design-info">
        <GoBackButton />
          <h1>{design.name}</h1>
          <div className="design-features">
            {/* Icons and feature highlights here */}
          </div>
          <div className="design-details mt-2">
            <h3>Design Details</h3>
            <h5>
            <p><strong>Room Dimension:</strong> {design.roomDimension}</p> <br/>
            <p><strong>Squarefeet price :</strong>₹{design.price}</p><br/>
            <p><strong>Layout of the space:</strong> {design.layout}</p><br/>
            <p><strong>Description:</strong> {design.description}</p>
            </h5>
          </div>
          <div className="button-groups">
            <button className="button" onClick={handleConsultationClick}>
              Book Free Consultation
            </button>
          </div>
        </div>
        
      </div>
    </Layout>
  );
};

export default DesignDetailPage;