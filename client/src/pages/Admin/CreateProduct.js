import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import toast from "react-hot-toast";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import StaffHeader from "../Staff/StaffHeader";
import {
  CButton,
  CCol,
  CForm,
  CFormCheck,
  CFormFeedback,
  CFormInput,
  CFormLabel,
} from "@coreui/react";
import "./Users.css";
const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);  // Added state for subcategories
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");  // Added state for subcategory
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [validated, setValidated] = useState(false);

  // get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/get-category"
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  // get subcategories based on selected category
  const getSubcategories = async (categoryId) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/category/${categoryId}/subcategories`
      );
      if (data?.success) {
        setSubcategories(data?.subcategories);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting subcategories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // handle category change
  const handleCategoryChange = (value) => {
    setCategory(value);
    setSubcategory("");  // Reset subcategory when category changes
    getSubcategories(value);
  };

  // create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      try {
        const productData = new FormData();
        productData.append("name", name);
        productData.append("description", description);
        productData.append("price", price);
        productData.append("quantity", quantity);
        productData.append("photo", photo);
        productData.append("category", category);
        productData.append("subcategory", subcategory);  // Added subcategory to the form data

        const { data } = await axios.post(
          "http://localhost:8080/api/v1/product/create-product",
          productData
        );
        
        if (data?.success) {
          toast.success("Product Created Successfully");
          navigate("/Dashboard/AdminDashboard/products");
        } else {
          toast.success("Product not  Created ");
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    }

    setValidated(true);
  };

  return (
   
    <>
      <StaffHeader/>
      <div className="product-form">
        <div className="  ">
          <div className="row">
          <div className="col-md-2 pl-0">
            <AdminMenu />
          </div>
            <div className="col-md-9">
              <h1>Products Upload</h1>
              <div className="m-1 w-75">
                <CForm
                  className="mb-3"
                  noValidate
                  validated={validated}
                  onSubmit={handleCreate}
                >

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
                    placeholder="Write a price"
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                  <CFormInput
                    type="number"
                    value={quantity}
                    placeholder="Write a quantity"
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                  />
                  <Select
                    bordered={false}
                    placeholder="Select Shipping"
                    size="large"
                    showSearch
                    className="form-select mb-3"
                    onChange={(value) => {
                      setShipping(value);
                    }}
                    required
                  >
                    <Option value="0">No</Option>
                    <Option value="1">Yes</Option>
                  </Select>
                  <CButton color="primary" type="submit">
                    Create Product
                  </CButton>
                </CForm>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
 
  );
};

export default CreateProduct;

