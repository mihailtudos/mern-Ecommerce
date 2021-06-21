import React from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import ProductScreen from "./screens/ProductScreen/ProductScreen";
import CartScreen from "./screens/CartScreen/CartScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen/PaymentScreen";
import PlaceOrdersScreen from "./screens/PlaceOrdersScreen/PlaceOrdersScreen";
import OrderScreen from "./screens/OrderScreen/OrderScreen";
import UserListScreen from "./screens/UserListScreen/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen/OrderListScreen";
import CategoryListScreen from "./screens/CategoryListScreen/CategoryListScreen";
import Terms from "./screens/Terms/Terms";
import AboutUs from "./screens/AboutUs/AboutUs";
import CreateProductScreen from "./screens/CreateProductScreen/CreateProductScreen";
import ProductsScreen from "./screens/ProductsScreen/ProductsScreen";
import Privacy from "./screens/Privacy/Privacy";

const App = () => {
  return (
    <Router>
      <Header />
        <main className='py-3'>
          <Container>
            <Route path='/terms' component={ Terms } exact />
            <Route path='/privacy' component={ Privacy } exact />
            <Route path='/about' component={ AboutUs } exact />
            <Route path='/order/:id' component={ OrderScreen } />
            <Route path='/shipping' component={ ShippingScreen } />
            <Route path='/placeorder' component={ PlaceOrdersScreen } />
            <Route path='/payment' component={ PaymentScreen } />
            <Route path='/login' component={ LoginScreen } />
            <Route path='/register' component={ RegisterScreen } />
            <Route path='/profile' component={ ProfileScreen } />
            <Route path='/create/product' component={ CreateProductScreen } exact />
            <Route path='/product/:pid' component={ ProductScreen } />
            <Route path='/products' component={ ProductsScreen } exact/>
            <Route path='/cart/:id?' component={ CartScreen } />
            <Route path='/admin/userlist' component={ UserListScreen } />
            <Route path='/admin/user/:id/edit' component={ UserEditScreen } />
            <Route path='/admin/productlist' component={ ProductListScreen } exact/>
            <Route path='/admin/productlist/:pageNumber' component={ ProductListScreen } exact />
            <Route path='/admin/product/:id/edit' component={ ProductEditScreen } />
            <Route path='/admin/orders' component={ OrderListScreen } />
            <Route path='/admin/categories' component={ CategoryListScreen } />
            <Route path='/search/:keyword' component={ ProductsScreen }/>
            <Route path='/search/:keyword/page/:pageNumber' component={ ProductsScreen } exact />
            <Route path='/products/page/:pageNumber' component={ ProductsScreen } exact />
            <Route path='/' exact component={ HomeScreen }/>
          </Container>
        </main>
      <Footer />
    </Router>
  );
}

export default App;
