import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import Product from '../../components/Product/Product';
import { listProducts } from "../../actions/productActions";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message/Message";

const HomeScreen = ({ match }) => {
  const dispatch = useDispatch();
  const keyword = match.params.keyword;
  console.log(keyword)

  const productList = useSelector(state => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword])

  return (
    <React.Fragment>
      <h1>Latest Products</h1>
      {loading ? <Loader /> : error ? <Message variant={'danger'}>{error}</Message> :
        <Row>
          {
            products.map((product) =>
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product}/>
              </Col>
            )
          }
        </Row>
      }
    </React.Fragment>
  )
}

export default HomeScreen
