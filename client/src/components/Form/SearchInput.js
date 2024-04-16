import React from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="d-flex ml-auto" role="search" onSubmit={handleSubmit}>
      <div className="input-group" style={{ borderRadius: '20px', overflow: 'hidden' }}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search..."
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
          style={{ borderTopLeftRadius: '20px', borderBottomLeftRadius: '20px' }}
        />
        <button
          className="btn"
          type="submit"
          style={{
            backgroundColor: 'red',
            color: 'white',
            borderTopRightRadius: '20px',
            borderBottomRightRadius: '20px',
            border: 'none'
          }}
        >
          <i className="fa fa-search"></i>
        </button>
      </div>
    </form>
  );
};

export default SearchInput;
