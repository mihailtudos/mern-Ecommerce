import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message/Message";
import {Col, Row} from "react-bootstrap";
import Product from "../../components/Product/Product";
import Paginate from "../../components/Paginate/Paginate";
import {useDispatch, useSelector} from "react-redux";
import {listProducts} from "../../actions/productActions";
import Filter from "../../components/Filter/Filter";

const ProductsScreen = ({ match }) => {

  const dispatch = useDispatch();
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  const productList = useSelector(state => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    window.scroll(0,0);
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber])

  return (
    <div>
      <section className={'products__section'}>
        {
          loading ? <Loader /> : error ? <Message variant={'danger'}>{error}</Message> :
            <React.Fragment>
              {
                keyword && <Link to={'/'} className={'btn btn-light'}>Go back</Link>
              }
              <Row className={'products__container'}>
                {!keyword && <div className={'products__filter--container'}>
                  <h1 className={'mt-3'}>Produsele noastre</h1>
                  <Filter />
                </div> }
                {
                  products.map((product) =>
                    <Col key={product._id} sm={12} md={6} lg={6} xl={3} className={'my-3'}>
                      <Product product={product}/>
                    </Col>
                  )
                }

              </Row>
              <Paginate page={page} pages={pages} kayword={keyword ? keyword : '' }/>
            </React.Fragment>
        }
      </section>
    </div>
  );
};

export default ProductsScreen;
