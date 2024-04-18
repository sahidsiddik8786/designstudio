import axios from 'axios';

export const fetchCategories = () => async (dispatch) => {
  try {
    dispatch({ type: 'FETCH_CATEGORIES_REQUEST' });
    const response = await axios.get('https://enigma-designs.onrender.com/api/v1/category/get-category');
    dispatch({ type: 'FETCH_CATEGORIES_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_CATEGORIES_FAILURE', payload: error.message });
  }
};