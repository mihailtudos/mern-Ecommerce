import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import products from './products';
import ProductScreen from "./screens/ProductScreen/ProductScreen";

const App = () => {
  return (
    <Router>
      <Header />
        <main className='py-3'>
          <Container>
            <Route path='/' exact> 
              <HomeScreen products={products}/> 
            </Route>
            <Route path='/product/:pid' component={ ProductScreen } /> 
          </Container>
        </main>
      <Footer />
    </Router>
  );
}

export default App;
