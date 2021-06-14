import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Button, Col, Row} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Product from '../../components/Product/Product';
import { listProducts } from "../../actions/productActions";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message/Message";
import Paginate from "../../components/Paginate/Paginate";
import ProductCarousel from "../../components/ProductCarousel/ProductCarousel";
import MetaComponent from "../../components/MetaComponent/MetaComponent";
import TopSection from "../../components/TopSection/TopSection";
import AboutUs from "../../components/AboutUs/AboutUs";

const HomeScreen = ({ match }) => {
  const dispatch = useDispatch();
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  const productList = useSelector(state => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber])

  return (
    <React.Fragment>
      <MetaComponent />
      {!keyword && <TopSection
        mainImage={'/images/main_image1.jpg'}
        secondImage={'/images/image_main.jpg'}
        thirdImage={'/images/third_image.jpg'}/>
      }
      <section className={'products__section'}>
        {
          loading ? <Loader /> : error ? <Message variant={'danger'}>{error}</Message> :
            <React.Fragment>
              {
                keyword && <Link to={'/'} className={'btn btn-light'}>Go back</Link>
              }
              <Row className={'my-5 products__container'}>
                {!keyword && <h1>Produsele noastre</h1>}
                {
                  products.slice(0, 4).map((product) =>
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                      <Product product={product}/>
                    </Col>
                  )
                }

              </Row>
              {
                !keyword && <div className={'d-flex justify-content-end'}>
                  <Link to={'/products'} className={'btn'}>Vezi mai multe...</Link>
                </div>
              }
              <Paginate page={page} pages={pages} kayword={keyword ? keyword : '' }/>
            </React.Fragment>
        }
      </section>

      {
        !keyword && <AboutUs mainImage={'/images/about_main.jpg'}
                             secondImage={'/images/about_third.jpg'}
                             thirdImage={'/images/about_forth.jpg'}
                             fifthImage={'/images/about_fifth.jpg'}/>
      }
    </React.Fragment>
  )
}

export default HomeScreen;
