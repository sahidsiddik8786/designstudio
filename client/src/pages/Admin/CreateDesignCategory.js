import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd";
import StaffHeader from "../Staff/StaffHeader";

const CreateDesignCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [descriptions, setDescriptions] = useState({}); // Use an object to store descriptions for each category
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [validated, setValidated] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !descriptions[selected?._id]?.trim()) {
      setValidated(true);
      toast.error("Name and Description are required.");
      return;
    }
  
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/categorydesign/create-categorydesign",
        {
          name,
          description: descriptions[selected?._id], // Use the description from state
        }
      );
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategory();
        // Reset the 'name' and 'description' states to clear the input fields
        setName("");
        setDescriptions({}); // Clear the description for the newly created category
        setSelected(null); // Reset selected category
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in the input form");
    }
  };
  

  // get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/categorydesign/get-categorydesign"
      );
      if (data.success) {
        setCategories(data.categorydesign);
        // Store descriptions in state for each category
        const descriptionsObj = {};
        data.categorydesign.forEach(category => {
          descriptionsObj[category._id] = category.description || ""; // Use empty string if description is null/undefined
        });
        setDescriptions(descriptionsObj);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!updatedName.trim()) {
      toast.error("Name is required.");
      return;
    }

    try {
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/categorydesign/update-categorydesign/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <StaffHeader/>
      <div>
        <div className="row">
          <div className="col-md-2 pl-0">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage categories of Design</h1>
            <div className="p-3 w-50">
              <CategoryForm
                handleSubmit={handleSubmit}
                nameValue={name}
                setName={setName}
                descriptionValue={descriptions[selected?._id] || ""} // Use the description for the selected category
                setDescription={(description) => setDescriptions(prevState => ({
                  ...prevState,
                  [selected?._id]: description // Update the description for the selected category
                }))}
                validated={validated}
              />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <tr key={c._id}>
                      <td>{c.name}</td>
                      <td>
                        <button
                           className="btn btn-danger ms-2"
                          onClick={() => {
                            setVisible(true);
                            setUpdatedName(c.name);
                            setSelected(c);
                          }}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              visible={visible}
            >
              <CategoryForm
                handleSubmit={handleUpdate}
                nameValue={updatedName}
                setName={setUpdatedName}
                descriptionValue={descriptions[selected?._id] || ""} // Use the description for the selected category
                setDescription={(description) => setDescriptions(prevState => ({
                  ...prevState,
                  [selected?._id]: description // Update the description for the selected category
                }))}
                validated={validated}
              />
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateDesignCategory;
