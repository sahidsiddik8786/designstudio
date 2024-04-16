import React from 'react'
//import Layout from '../components/layout/Layout'
import { Link } from "react-router-dom";
import Footer from '../components/layout/Footer';
const PageNotFound = ({children}) => {
  return (
    <>
 <div className="pnf">
        <h1 className="pnf-title">404</h1>
        <h2 className="pnf-heading">Oops ! Page Not Found</h2>
        <Link to="/" className="pnf-btn">
          Go Back
        </Link>
      </div>
      <main style={{ minHeight: "17vh" }}>{children}</main>
      <Footer/>
    </>
     
    
    
  );
};

export default PageNotFound