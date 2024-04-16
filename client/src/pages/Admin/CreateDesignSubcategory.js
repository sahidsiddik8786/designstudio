import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Select, Input, Button, message, Modal, Table } from 'antd';
import Layout from '../../components/layout/Layout';
import AdminMenu from '../../components/layout/AdminMenu';
import SubcategoryForm from '../../components/Form/SubcategoryForm';
import StaffHeader from "../Staff/StaffHeader";

const { Option } = Select;

const CreatesubCategoryDesign = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subcategoryName, setSubcategoryName] = useState('');
  const [subcategories, setSubcategories] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [updatedSubcategoryName, setUpdatedSubcategoryName] = useState('');
  const [validated, setValidated] = useState(false);

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get('http://localhost:8080/api/v1/categorydesign/get-categorydesign');
      if (data.success) {
        setCategories(data.categorydesign);
      }
    } catch (error) {
      console.log(error);
      message.error('Error while getting categories.');
    }
  };

  const getAllSubcategories = async (categoryId) => {
    try {
      const { data } = await axios.get(`http://localhost:8080/api/v1/categorydesign/${categoryId}/subcategorydesign`);
      if (data.success) {
        setSubcategories(data.subcategories);
      }
    } catch (error) {
      console.log(error);
      message.error('Error while getting subcategories.');
    }
  };

  const handleAddSubcategory = async () => {
    try {
      if (!selectedCategory || !subcategoryName.trim()) {
        message.error('Please select a category and enter a subcategory name.');
        return;
      }
  
      const { data } = await axios.post(`http://localhost:8080/api/v1/categorydesign/${selectedCategory}/subcategorydesign`, {
        name: subcategoryName,
        parentCategorydesignId: selectedCategory, // Update the field name here
      });
  
      if (data.success) {
        message.success(`Subcategory "${subcategoryName}" added successfully.`);
        setSubcategoryName('');
        setVisible(false);
        getAllSubcategories(selectedCategory);
      } else {
        message.error(data.message);
      }
    } catch (error) {
      console.log(error);
      message.error('Something went wrong while adding subcategory.');
    }
  };
  
  const handleEditSubcategory = async (subcategoryId) => {
    const subcategory = subcategories.find((sub) => sub._id === subcategoryId);
    if (subcategory) {
      setSelectedSubcategory(subcategory);
      setUpdatedSubcategoryName(subcategory.name);
      setVisible(true);
    }
  };

  const handleUpdateSubcategory = async () => {
    try {
      if (!selectedSubcategory || !updatedSubcategoryName.trim()) {
        message.error('Please select a subcategory and enter a valid name.');
        return;
      }

      const { data } = await axios.put(`http://localhost:8080/api/v1/categorydesign/update-subcategory/${selectedSubcategory._id}`, {
        name: updatedSubcategoryName,
      });

      if (data.success) {
        message.success(`Subcategory "${updatedSubcategoryName}" updated successfully.`);
        setVisible(false);
        // Fetch subcategories after updating
        await getAllSubcategories(selectedCategory);
      } else {
        message.error(data.message);
      }
    } catch (error) {
      console.log(error);
      message.error('Something went wrong while updating subcategory.');
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  useEffect(() => {
    console.log("Selected Category:", selectedCategory);
    if (selectedCategory) {
      getAllSubcategories(selectedCategory)
        .then(data => console.log("Data:", data))  // Add this line to check the returned data
        .catch(error => console.error("Error fetching subcategories:", error));  // Add this line to catch any errors
    }
  }, [selectedCategory]);
  

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <>
          <Button type="link" onClick={() => handleEditSubcategory(record._id)}>
            Edit
          </Button>
        </>
      ),
    },
  ];

  return (
    
    <>
      <StaffHeader/>
      <div className="">
        <div className="row">
          <div className="col-md-2 pl-0">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Subcategories</h1>
            <div className="p-3 w-50">
              <Select
                placeholder="Select a category"
                style={{ width: 200, marginBottom: 16 }}
                onChange={(value) => setSelectedCategory(value)}
              >
                {categories.map((category) => (
                  <Option key={category._id} value={category._id}>
                    {category.name}
                  </Option>
                ))}
              </Select>
              {selectedCategory && (
                <>
                  <Input
                    placeholder="Enter subcategory name"
                    value={subcategoryName}
                    onChange={(e) => setSubcategoryName(e.target.value)}
                    style={{ marginRight: 16, marginBottom: 16, width: 200 }}
                  />
                  <Button type="primary" onClick={handleAddSubcategory}>
                    Add Subcategory
                  </Button>
                </>
              )}
            </div>
            <div className="w-75">
              <h2>Subcategories</h2>
              <Table dataSource={subcategories} columns={columns} rowKey="_id" />
            </div>
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              visible={visible}
            >
              <SubcategoryForm
                value={updatedSubcategoryName}
                setValue={setUpdatedSubcategoryName}
                handleSubmit={handleUpdateSubcategory}
                validated={validated}
              />
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatesubCategoryDesign;
