import axios from 'axios';

export const fetchCategories = () => async (dispatch) => {
  try {
    dispatch({ type: 'FETCH_CATEGORIES_REQUEST' });
    const response = await axios.get('http://localhost:8080/api/v1/category/get-category');
    dispatch({ type: 'FETCH_CATEGORIES_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_CATEGORIES_FAILURE', payload: error.message });
  }
};