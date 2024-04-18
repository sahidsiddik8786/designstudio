import React from "react";
import { Card, Divider } from "antd"; // Import Card and Divider components
import { useAuth } from "../../context/auth";
import UserMenu from "../../components/layout/UserMenu";
import Layout from "../../components/layout/Layout";

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Dashboard"}>
      <div>
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9  mt-5">
          <Card
              title={<h2 style={{ fontSize: "1.5em" }}>User Information</h2>}
              style={{ width: "80%", fontSize: "1.2em" }}>

              <Divider>Personal Details</Divider>
              
              <p>
                <strong>Name:</strong> {auth?.user?.firstname}{" "}
                {auth?.user?.lastname}
              </p>
              <p>
                <strong>Email:</strong> {auth?.user?.email}
              </p>

              <Divider>Address</Divider>
              <p>
                <strong>Address :</strong> {auth?.user?.address}
              </p>
              <p>
                <strong>Street:</strong> {auth?.user?.streetaddress}
              </p>
              <p>
                <strong>City:</strong> {auth?.user?.city}
              </p>
              <p>
                <strong>State:</strong> {auth?.user?.state}
              </p>
              <p>
                <strong>Postal Code:</strong> {auth?.user?.postal}
              </p>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
