import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import StaffHeader from "../Staff/StaffHeader";

const Designs = () => {
  const [designs, setDesigns] = useState([]);

  //get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/design/get-design");
      setDesigns(data.designs);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <StaffHeader/>
      <div className="row">
      <div className="col-md-2 pl-0">
            <AdminMenu />
          </div>
        <div className="col-md-9">
          <h1 className="text-center">Designs</h1>
          <div className="d-flex flex-wrap">
            {designs?.map((p) => (
              <Link key={p._id} to={`/dashboard/admin/design/${p.slug}`} className="product-link">
                <div className="card m-3" style={{ width: "23rem" }}>
                  <img
                    src={`http://localhost:8080/api/v1/design/design-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    style={{ width: "100%", height: "auto" }}
                  />
                  <div className="card-body">
                    <h6 className="card-title">{p.name}</h6>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Designs;
