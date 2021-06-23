import axios from "axios";
import {
  CATEGORY_CREATE_REQUEST, CATEGORY_CREATE_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS
} from "../constants/categoriesConstants";
import {PRODUCT_CREATE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS} from "../constants/productConstants";

export const listCategories = (keyword = '', pageNumber = '') => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_LIST_REQUEST });

    const { data } = await axios.get(`${process.env.REACT_APP_BACKEND}/api/categories?keyword=${keyword}&pageNumber=${pageNumber}`);

    dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: CATEGORY_LIST_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message })
  }
};

export const createCategory = (category) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CATEGORY_CREATE_REQUEST
    });

    const { userLogin: { userInfo } }  = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ userInfo.token }`
      }
    };

    const { data } = await axios.post(`/api/categories`, category, config);

    dispatch({
      type: CATEGORY_CREATE_SUCCESS,
      payload: data
    });

  }  catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload: error.response && error.response.data.message ?
        error.response.data.message :
        error.message
    });
  }
};