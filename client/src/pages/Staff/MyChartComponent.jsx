import React from "react";
import { Link } from "react-router-dom";
import Userstaff from "./userStaff";

function Home() {

  return (
    
 <>
 <div className="px-3" >
      <div className="row gx-3">
        <div className="col-md-6 my-2">
          <Link to="" className="text-decoration-none text-dark">
            <div
              className="p-5 bg-primary text-white shadow-sm d-flex justify-content-between align-items-center rounded"
              style={{ width: "100%", height: "200px" }}
            >
              <div>
        
                <p className="fs-5">View Client</p>
              </div>
              <i className="bi bi-cart-plus p-3 fs-1"></i>
            </div>
          </Link>
        </div>

        <div className="col-md-6 my-2">
          <div
            className="p-5 bg-success text-white shadow-sm d-flex justify-content-between align-items-center rounded"
            style={{ width: "100%", height: "200px" }}
          >
            <div>
              <h3 className="fs-3">2450</h3>
              <p className="fs-5">Sales</p>
            </div>
            <i className="bi bi-currency-dollar p-3 fs-1"></i>
          </div>
        </div>
      </div>

      <div className="row gx-3">
        <div className="col-md-6 my-2">
          <div
            className="p-5 bg-secondary text-white shadow-sm d-flex justify-content-between align-items-center rounded"
            style={{ width: "100%", height: "200px" }}
          >
            <div>
              <h3 className="fs-3">2250</h3>
              <p className="fs-5">Delivery</p>
            </div>
            <i className="bi bi-truck p-3 fs-1"></i>
          </div>
        </div>

        <div className="col-md-6 my-2">
          <div
            className="p-5 bg-info text-white shadow-sm d-flex justify-content-between align-items-center rounded"
            style={{ width: "100%", height: "200px" }}
          >
            <div>
              <h3 className="fs-3">20%</h3>
              <p className="fs-5">Increase</p>
            </div>
            <i className="bi bi-graph-up-arrow p-3 fs-1"></i>
          </div>
        </div>
       
        
      </div>
   
    </div>
    
    </>
  );
}

export default Home;
