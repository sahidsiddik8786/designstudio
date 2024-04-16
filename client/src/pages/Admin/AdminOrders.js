import React, { useState, useEffect } from "react";
import axios from "axios";

import { useAuth } from "../../context/auth";
import moment from "moment";

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancel",
  ]);
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/auth/all-orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(`http://localhost:8080/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="row">
        
        <div className="col-xs-12 col-md-9">
          <table className="table">
            <thead>
            <tr>
                  <th colSpan="8" style={{ textAlign: "center" }}>
                  Order List
                  </th>
                </tr>
              <tr>
                <th scope="col">Order</th>
                <th scope="col">Status</th>
                <th scope="col">Buyer</th>
                <th scope="col">Date</th>
                <th scope="col">Payment</th>
                <th scope="col">Quantity</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id}>
                  <td>{index + 1}</td>
                  <td>{order.status}</td>
                  <td>{order.buyer.name}</td>
                  <td>{moment(order.createAt).format("YYYY-MM-DD")}</td>
                  <td>{order.payment.success ? "Success" : "Failed"}</td>
                  <td>{order.products.length}</td>
                  <td>
                    <select
                      className="form-select"
                      onChange={(e) => handleChange(order._id, e.target.value)}
                      defaultValue={order.status}
                    >
                      {status.map((s, i) => (
                        <option key={i} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminOrders;
