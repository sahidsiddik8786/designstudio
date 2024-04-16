import React, { useState, useEffect } from "react";
import UserMenu from "../../components/layout/UserMenu";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
import jsPDF from "jspdf"; 
import images from "../../images/companylogo.png";
import "../user/order.css";
import GoBackButton from "../../components/layout/goback";
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/auth/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  const generateAndDownloadPDF = (order) => {
    const pdf = new jsPDF();
    let totalAmount = 0;

    // PDF generation logic

    pdf.save(`order_${order._id}.pdf`);
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title={"Your Orders"}>
        <GoBackButton />
      <>
        <div className="text-center mb-4">
     
        </div>
        <div className="order-container-center">
          {orders?.map((order, index) => (
            <div key={index} className="border shadow order-container">
              <div className="order-header">
                <h3>Order #{index + 1}</h3>
                <p>Status: {order?.status}</p>
                <p>Date: {moment(order?.createAt).format("MMMM Do YYYY, h:mm a")}</p>
                <p>Payment: {order?.payment.success ? "Success" : "Failed"}</p>
                <p>Products: {order?.products?.length}</p>
              </div>
              <div className="order-products">
                {order?.products?.map((product, productIndex) => (
                  <div key={productIndex} className="product-details">
                    <img
                      src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
                      alt={product.name}
                      className="product-image"
                    />
                    <div className="product-info">
                      <p>{product.name}</p>
                      <p>{product.description.substring(0, 30)}</p>
                      <p>Price: ₹{product.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="btn-primary mt-3"
                onClick={() => generateAndDownloadPDF(order)}
              >
                Download PDF
              </button>
            </div>
          ))}
        </div>
      </>
    </Layout>
  );
};

export default Orders;
