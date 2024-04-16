import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd";
import StaffHeader from "../Staff/StaffHeader";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [validated, setValidated] = useState(false);

  // handle Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setValidated(true);
      toast.error("Name is required.");
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/category/create-category",
        {
          name,
        }
      );
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategory();
        // Reset the 'name' state to clear the input field
        setName("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in the input form");
    }
  };

  // get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/get-category"
      );
      if (data.success) {
        setCategories(data.category);
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
        `http://localhost:8080/api/v1/category/update-category/${selected._id}`,
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

  // disable category
  const handleDisable = async (categoryId) => {
    try {
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/category/disable-category/${categoryId}`
      );
      if (data.success) {
        toast.success("Category is disabled");
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
        <div className="design-form">
        <div className="row">
        <div className="col-md-2 pl-0">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
            <div className="p-3 w-50">
              <CategoryForm
                handleSubmit={handleSubmit}
                nameValue={name} // Pass nameValue here
                setName={setName}
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
                          className="btn btn-primary ms-2"
                          onClick={() => {
                            setVisible(true);
                            setUpdatedName(c.name);
                            setSelected(c);
                          }}
                        >
                          Edit
                        </button>
                        {/* <button
                          className="btn btn-warning ms-2"
                          onClick={() => {
                            handleDisable(c._id);
                          }}
                        >
                          Disable
                        </button> */}
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
                nameValue={updatedName} // Pass nameValue here
                setName={setUpdatedName}
                validated={validated}
              />
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateCategory;
