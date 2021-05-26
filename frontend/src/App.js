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

const App = () => {
  return (
    <Router>
      <Header />
        <main className='py-3'>
          <Container>
            <Route path='/order/:id' component={ OrderScreen } />
            <Route path='/shipping' component={ ShippingScreen } />
            <Route path='/placeorder' component={ PlaceOrdersScreen } />
            <Route path='/payment' component={ PaymentScreen } />
            <Route path='/login' component={ LoginScreen } />
            <Route path='/register' component={ RegisterScreen } />
            <Route path='/profile' component={ ProfileScreen } />
            <Route path='/product/:pid' component={ ProductScreen } />
            <Route path='/cart/:id?' component={ CartScreen } />
            <Route path='/' exact  component={ HomeScreen }/>
          </Container>
        </main>
      <Footer />
    </Router>
  );
}

export default App;
