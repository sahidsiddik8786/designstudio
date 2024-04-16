import React from "react";
import {
  CForm,
  CCol,
  CFormInput,
  CFormFeedback,
  CButton,
} from "@coreui/react";

const CategoryForm = ({ handleSubmit, nameValue, setName, descriptionValue, setDescription, validated }) => {
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  return (
    <CForm
      className="row g-3 needs-validation"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      <CCol md={12}>
        <CFormInput
          type="text"
          value={nameValue}
          onChange={handleNameChange}
          name="name"
          feedbackValid="Looks good!"
          id="validationCustom01"
          placeholder="Enter category name"
          required
          pattern="^[a-zA-Z\s]*$"
        />
        <CFormFeedback invalid>
          {nameValue.trim() === "" ? "Name is required." : "Name should not contain numbers."}
        </CFormFeedback>
      </CCol>
      <CCol md={12}>
        <textarea
          value={descriptionValue}
          onChange={handleDescriptionChange}
          name="description"
          className="form-control"
          placeholder="Enter category description"
          required
        />
        <CFormFeedback invalid>
          Description is required.
        </CFormFeedback>
      </CCol>
      <CCol md={12}>
        <CButton color="success" type="submit">
          Submit
        </CButton>
      </CCol>
    </CForm>
  );
};

export default CategoryForm;
