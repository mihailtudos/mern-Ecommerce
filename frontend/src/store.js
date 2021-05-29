import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productDetailsReducer, productListReducer } from "./reducers/productReducer";
import { cartReducers } from "./reducers/cartReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer
} from "./reducers/userReducers";
import {orderCreateReducers, orderDetailsReducer, orderPayReducer} from "./reducers/orderReducers";

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducers,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderCreate: orderCreateReducers,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer
});



const cartItemsFromStorage = localStorage.getItem('cartItems') ?
  JSON.parse(localStorage.getItem('cartItems')) :
  [];

const userInfoFromStorage = localStorage.getItem('userInfo') ?
  JSON.parse(localStorage.getItem('userInfo')) :
  null;

const shippingAddressInfoFromStorage = localStorage.getItem('shippingAddress') ?
  JSON.parse(localStorage.getItem('shippingAddress')) :
  {};

const paymentMethodFromStorage = localStorage.getItem('paymentMethod') ?
  JSON.parse(localStorage.getItem('paymentMethod')) :
  {};


const initialState = {
  cart: { cartItems: cartItemsFromStorage, shippingAddress: shippingAddressInfoFromStorage, paymentMethod: paymentMethodFromStorage},
  userLogin: { userInfo: userInfoFromStorage }
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;