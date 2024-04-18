import React from "react";
import Layout from "../components/layout/Layout";
import "./Designs.css";
import Card from 'react-bootstrap/Card';

const Designs = () => {
  return (
    <Card style={{ width: '18rem' }} className="shadow-sm">
            <Card.Img variant="top" src="/path/to/your/image.jpg" style={{ borderRadius: '50%' }} />
       
        <div className="ad-section">
          <i className="fas fa-heart"></i>
          <img src="kitchen.jpg" alt="Kitchen Image" />
          <h2>Modern Modular Parallel Kitchen Cabinet Design With 3D Dado Tiles And Light Yellow Cabinets</h2>
          <p>Size: 12x10 feet</p>
          <button className="btn-consultation">Book Free Consultation</button>
          <button className="btn-quote">Get Quote</button>
        </div>
        </Card>
  );
};

export default Designs;


