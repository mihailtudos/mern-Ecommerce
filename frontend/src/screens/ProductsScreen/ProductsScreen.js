import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message/Message";
import {Col, Form, Row} from "react-bootstrap";
import Product from "../../components/Product/Product";
import Paginate from "../../components/Paginate/Paginate";
import {useDispatch, useSelector} from "react-redux";
import {filterProductsByTitle, listProducts} from "../../actions/productActions";

const ProductsScreen = ({ match }) => {

  const dispatch = useDispatch();
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;
  const [category, setCategory] = useState('');

  const productList = useSelector(state => state.productList);
  const { loading, error, products, page, pages, filteredProducts } = productList;

  useEffect(() => {
    window.scroll(0,0);
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber])

  function removeDuplicates(myArr, prop) {
    let arr = myArr.filter((obj, pos, arr) => {
      return arr.map( mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
    return arr;
  }

  const searchHandler = (e) => {
    let arr = [];
    if (filteredProducts.length === 0 && e.target.value === '') {
      arr = products;
    } else {
      arr = filteredProducts;
    }
    dispatch(filterProductsByTitle(products, e.target.value))
  }

  return (

    <div>
      <section className={'products__section'}>
        {
          loading ? <Loader /> : error ? <Message variant={'danger'}>{error}</Message> :
            <React.Fragment>
              {
                keyword && <Link to={'/'} className={'btn btn-light'}>Go back</Link>
              }
              <Row className={'products__container my-3'}>
                {!keyword && <div className={'products__filter--container'}>
                  <h1 className={'mt-3'}>Produsele noastre</h1>
                  <div className={'filter'}>
                    <i className="fas fa-search"/>
                    <input type="text"
                           placeholder={'cauta...'}
                           onChange={(e) => searchHandler(e)}/>
                    <select className="products__selector"
                            aria-label="Default select example"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}>
                      <option value={'all'}>categorie</option>
                      {
                        removeDuplicates(products.map(product => product.category), 'name').map((x) => (
                          <option key={x._id} value={x._id}>{x.name}</option>
                        ))
                      }
                    </select>
                  </div>
                </div> }
                {
                  filteredProducts.map((product) =>
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
}

export default ProductsScreen;
