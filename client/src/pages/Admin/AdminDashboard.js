import React, { useEffect, useRef } from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import { useAuth } from "../../context/auth";
import { Card, CardContent, Typography } from "@mui/material";
import Chart from "chart.js/auto";
import "./Users.css";
import Users from "./Users";
import AdminOrders from "./AdminOrders";
import StaffHeader from "../Staff/StaffHeader";
import "./admindashboard.css";

const SummaryCard = ({ color, title, value, percentage }) => {
  return (
    <div className="summary-card" style={{ borderColor: color }}>
      <div className="summary-card-inner">
        <div className="summary-card-value" style={{ color: color }}>
          {value}
        </div>
        <div className="summary-card-title">{title}</div>
        <div className="summary-card-percentage" style={{ color: color }}>
          <i className="fas fa-arrow-up"></i> {percentage}%
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const [auth] = useAuth();
  const chartRef1 = useRef(null); // Ref for the first chart
  const chartRef2 = useRef(null); // Ref for the second chart

  return (
    <>
      <StaffHeader />
      <div className="row">
        <div className="col-md-2 pl-0">
          <AdminMenu />
        </div>
        <div className="col-md-10">
          <div className="admin-content">
            <div className="summary-section">
              <SummaryCard
                color="#29B6F6"
                title="Total Sales today"
                value="2562"
                percentage="35"
              />
              <SummaryCard
                color="#AB47BC"
                title="Daily visitors"
                value="5685"
                percentage="75"
              />
              <SummaryCard
                color="#FF7043"
                title="Total Earning"
                value="$12480"
                percentage="58"
              />
              <SummaryCard
                color="#66BB6A"
                title="Pending Orders"
                value="62"
                percentage="49"
              />
            </div>

            <div className="row-md-5">
              <Users />
              <AdminOrders />
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
