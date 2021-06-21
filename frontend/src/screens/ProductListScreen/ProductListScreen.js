import React, {useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";
import { deleteProduct, listProducts } from "../../actions/productActions";
import {PRODUCT_CREATE_RESET, PRODUCT_UPDATE_RESET} from "../../constants/productConstants";
import Paginate from "../../components/Paginate/Paginate";

const ProductListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector(state => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productDelete = useSelector(state => state.productDelete);
  const { loading: loadingDelete, success: successDelete, error: errorDelete } = productDelete;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const productCreate = useSelector(state => state.productCreate);
  const { loading: loadingCreate, success: successCreate, error: errorCreate, product: createdProduct } = productCreate;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    dispatch({ type: PRODUCT_UPDATE_RESET });

    if (!userInfo.isAdmin) {
      history.push('/');
    }

    if (successCreate) {
      history.push(`/admin/product/${ createdProduct._id }/edit`)
    } else {
      dispatch(listProducts('', pageNumber));
    }
  }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct, pageNumber]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteProduct(id));
    }
  }

  return (
    <React.Fragment>
      <Row className={'align-items-center '}>
        <Col >
          <h1>Products</h1>
        </Col>
        <Col className={'text-right justify-content-end d-flex'}>
          <Link to={'/create/product'} className={'my-4 btn btn-dark'} >
            <i className={'fas fa-plus'} /> Create Product
          </Link>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant={'danger'} >{ errorDelete }</Message> }
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant={'danger'} >{ errorCreate }</Message> }
      { loading ? <Loader /> : error ? <Message variant={'danger'} >{ error }</Message> : (
        <React.Fragment>
          <Table striped bordered hover className={'table-sm'}>
            <thead>
            <tr>
              <th>Name</th>
              <th>Price (RON)</th>
              <th>Category</th>
            </tr>
            </thead>
            <tbody>
            {
              products.map((product) => (
                <tr key={product._id}>
                  <td><Link className={'text-info'} to={`/product/${product._id}`}>{product.name.substring(0,15)}...</Link></td>
                  <td>
                    { product.price && product.price.toLocaleString() }
                  </td>
                  <td>
                    { product.category.name }
                  </td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant={'light'} className={'btn-sm'} ><i className={'fas fa-edit'} /></Button>
                    </LinkContainer>
                    <Button variant={'danger'} className={'btn-sm'} onClick={() => deleteHandler(product._id)}>
                      <i className={'fas fa-trash'} />
                    </Button>
                  </td>
                </tr>
              ))
            }
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ProductListScreen;
