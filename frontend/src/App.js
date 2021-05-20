import React from "react";
import { Container } from 'react-bootstrap';
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import products from './products';

const App = () => {
  return (
    <React.Fragment>
      <Header />
        <main className='py-3'>
          <Container>
            <HomeScreen products={products}/>
          </Container>
        </main>
      <Footer />
    </React.Fragment>
  );
}

export default App;
