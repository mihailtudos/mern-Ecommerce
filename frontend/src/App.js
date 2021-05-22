import React from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import ProductScreen from "./screens/ProductScreen/ProductScreen";
import CartScreen from "./screens/CartScreen/CartScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";

const App = () => {
  return (
    <Router>
      <Header />
        <main className='py-3'>
          <Container>
            <Route path='/login' component={ LoginScreen } />
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
