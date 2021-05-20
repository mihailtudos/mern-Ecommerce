import React from 'react'
import { Col, Row } from 'react-bootstrap';
import Product from '../../components/Product/Product';

const HomeScreen = (props) => {
  const { products } = props;
  return (
    <React.Fragment>
      <h1>Latest Products</h1>
      <Row>
        {
          products.map((product) => 
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product}/>
            </Col>
          )
        }
      </Row>
    </React.Fragment>
  )
}

export default HomeScreen
