import React, { useState, useEffect } from 'react';

const SubcategoryList = ({ categoryId }) => {
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    // Ensure that categoryId is available before making the request
    if (!categoryId) {
      console.error('Category ID is missing.');
      return;
    }

    fetch(`https://designstudio-1.onrender.com/api/v1/category/${categoryId}/subcategories`)
      .then((response) => response.json())
      .then((data) => setSubcategories(data.subcategories))
      .catch((error) => console.error(error));
  }, [categoryId]);

  return (
    <div>
      <h2>All Subcategories for Category</h2>
      <ul>
        {subcategories.map((subcategory) => (
          <li key={subcategory._id}>{subcategory.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SubcategoryList;
