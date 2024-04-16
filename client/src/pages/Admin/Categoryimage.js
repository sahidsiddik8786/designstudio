import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import toast from "react-hot-toast";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import { Select, message } from "antd";
import { useNavigate } from "react-router-dom";
import { CButton, CForm, CFormInput } from "@coreui/react";
import StaffHeader from "../Staff/StaffHeader";

const { Option } = Select;

const CreateDesign = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [validated, setValidated] = useState(false);

  const getAllCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/categorydesign/get-categorydesign"
      );
      const { success, categorydesign } = response.data;
      if (success) {
        setCategories(categorydesign);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      message.error("Error while getting categories.");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleCategoryChange = (value) => {
    setCategory(value);
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleCreateDesign = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      try {
        const formData = new FormData();
        formData.append("photo", photo);
        formData.append("name", name);
        formData.append("category", category);

        const response = await axios.post(
          "http://localhost:8080/api/v1/image/create-designimg",
          formData
        );

        const { success, message: responseMessage } = response.data;
        if (success) {
          toast.success(responseMessage);
          setPhoto("");
          setName("");
          setCategory("");
          setValidated(false);

         //navigate("/Dashboard/AdminDashboard");
        } else {
          toast.error(responseMessage);
        }
      } catch (error) {
        console.error("Error creating design:", error);
        toast.error("Something went wrong can't create ");
      }
    }
    setValidated(true);
  };

  return (
      <>
        <StaffHeader/>
        <div className="design-form">
          <div>
            <div className="row">
            <div className="col-md-2 pl-0">
            <AdminMenu />
          </div>
              <div className="col-md-9">
                <h1>Category Image Upload</h1>
                <div className="m-1 w-75">
                  <CForm
                    className="mb-3"
                    noValidate
                    validated={validated}
                    onSubmit={handleCreateDesign}
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
                      {categories.map((cat) => (
                        <Option key={cat._id} value={cat._id}>
                          {cat.name}
                        </Option>
                      ))}
                    </Select>

                    <div className="mb-3">
                      <label className="btn btn-outline-success col-md-12">
                        {photo ? photo.name : "Upload Photo"}
                        <input
                          type="file"
                          name="photo"
                          accept="image/*"
                          onChange={handlePhotoChange}
                          hidden
                          required
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

                    <CButton color="danger" type="submit">
                      Create Design
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

export default CreateDesign;
