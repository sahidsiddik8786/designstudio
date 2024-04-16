import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Select, message } from "antd";
import { useNavigate } from "react-router-dom";
import { CButton, CForm, CFormInput } from "@coreui/react";
import StaffHeader from "./StaffHeader";
import Sidebar from "./Sidebar";
import { AuthProvider } from "../../context/auth";
import { useAuth } from "../../context/auth";

const { Option } = Select;

const CreateDesignbystaff = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle);
  };

  const handleLogout = () => {
    // Clear token from local storage
    localStorage.removeItem('token');
    // Set user as not authenticated
    setAuth(null);
};

const [auth, setAuth, loading] = useAuth();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [layout, setLayout] = useState("");
  const [roomDimension, setRoomDimension] = useState("");
  const [photo, setPhoto] = useState("");
  const [validated, setValidated] = useState(false);

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/categorydesign/get-categorydesign"
      );
      if (data.success) {
        setCategories(data.categorydesign);
      }
    } catch (error) {
      console.log(error);
      message.error("Error while getting categories.");
    }
  };

  const getSubcategories = async (categoryId) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/categorydesign/${categoryId}/subcategories`
      );
  
      if (data?.success) {
        // Assuming the subcategories are provided as an array in the response
        setSubcategories(data?.subcategories);
      } else {
        console.log("Error: No subcategories found or success flag is missing");
        setSubcategories([]); // Clear subcategories if the API call was unsuccessful
      }
    } catch (error) {
      console.log(error);
      message.error("Error while getting subcategories.");
      setSubcategories([]); // Clear subcategories if there's an exception
    }
  };
  
  useEffect(() => {
    getAllCategory();
  }, []);

  const handleCategoryChange = (value) => {
    setCategory(value);
    setSubcategory("");  // Reset subcategory when category changes
    getSubcategories(value);
  };


 
  const handleCreate = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      try {
        const designData = new FormData();
        designData.append("name", name);
        designData.append("description", description);
        designData.append("price",price);
        designData.append("photo", photo);
        designData.append("layout", layout);
        designData.append("roomDimension", roomDimension);
        designData.append("category", category);
        designData.append("subcategory", subcategory);


        const { data } = await axios.post(
          "http://localhost:8080/api/v1/design/create-design",
          designData
        );

        if (data?.success) {
          toast.success("Design Created Successfully");
          navigate("/staff-dashboard");
        } else {
          toast.success("Design not Created");
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    }

    setValidated(true);
  };

  const pageContainerStyle = {
    
    minHeight: '93vh',
    backgroundColor: '#f0f2f5', // Set your desired background color here
  };
  
  const sidebarStyle = {
    width: '260px', // Adjust width as needed
    height: '100vh',
    position: 'fixed',
    left: 0,
    top: 0,
    bottom: 0,
    overflowY: 'auto', // In case of many menu items
    background: '#333',
    zIndex: 1, // Example background color
  };

  const contentContainerStyle = {
    marginLeft: '50px', // Same as sidebar width
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  };

  const formContainerStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '600px', // Adjust the width as needed
 
  };

  return (

    <div >
      <AuthProvider>
    <StaffHeader OpenSidebar={OpenSidebar} handleLogout={handleLogout} />
    <div style={sidebarStyle}>
    <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      </div>
      <div style={pageContainerStyle} >
      <div style={contentContainerStyle} >
        <div style={formContainerStyle}>
        <CForm
          className="mb-3"
          noValidate
          validated={validated}
          onSubmit={handleCreate}
        >
          <h1 style={{ textAlign: 'center', color: 'black', marginBottom: '20px' }}>
            Design Upload
          </h1>
                    <Select
                      bordered={false}
                      placeholder="Select a category"
                      size="large"
                      showSearch
                      className="form-select mb-3"
                      onChange={handleCategoryChange}
                      value={category}
                    >
                      {categories?.map((c) => (
                        <Option key={c._id} value={c._id}>
                          {c.name}
                        </Option>
                      ))}
                    </Select>
                    <Select
                      bordered={false}
                      placeholder="Select a subcategory"
                      size="large"
                      showSearch
                      className="form-select mb-3"
                      onChange={(value) => setSubcategory(value)}
                      value={subcategory}
                    >
                      {subcategories?.map((s) => (
                        <Option key={s._id} value={s._id}>
                          {s.name}
                        </Option>
                      ))}
                    </Select>
                

                    <div className="mb-3">
                      <label className="btn btn-outline-secondary col-md-12">
                        {photo ? photo.name : "Upload Photo"}
                        <input
                          type="file"
                          name="photo"
                          accept="image/*"
                          onChange={(e) => setPhoto(e.target.files[0])}
                          hidden
                        />
                      </label>
                    </div>
                    <div className="mb-3">
                      {photo && (
                        <div className="text-center">
                          <img
                            src={URL.createObjectURL(photo)}
                            alt="product_photo"
                            height={"200px"}
                            className="img img-responsive"
                          />
                        </div>
                      )}
                    </div>

                    <CFormInput
                      type="text"
                      value={name}
                      placeholder="Write a name"
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    <CFormInput
                      as="textarea"
                      rows="3"
                      value={description}
                      placeholder="Write a description"
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                    <CFormInput
                      type="number"
                      value={price}
                      placeholder="Write a price per squarefeet"
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                    <CFormInput
                      type="text"
                      value={layout}
                      placeholder="Write a layout"
                      onChange={(e) => setLayout(e.target.value)}
                      required
                    />
                    <CFormInput
                      type="text"
                      value={roomDimension}
                      placeholder="Write room dimension"
                      onChange={(e) => setRoomDimension(e.target.value)}
                      required
                    />
                    <CButton color="success" type="submit">
                      Create Design
                    </CButton>
                  </CForm>
                </div>
            </div>
            </div>
            </AuthProvider>
          </div>  
  );
};

export default CreateDesignbystaff;

