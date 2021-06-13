import React, {useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";
import {createProduct, deleteProduct, listProducts} from "../../actions/productActions";
import {PRODUCT_CREATE_RESET} from "../../constants/productConstants";
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

  const createProductHandler = () => {
    dispatch(createProduct());
  }


  return (
    <React.Fragment>
      <Row className={'align-items-center '}>
        <Col >
          <h1>Products</h1>
        </Col>
        <Col className={'text-right justify-content-end d-flex'}>
          <Button className={'my-4'} onClick={createProductHandler} >
            <i className={'fas fa-plus'} /> Create Product
          </Button>
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
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
            </tr>
            </thead>
            <tbody>
            {
              products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>
                    ${ product.price }
                  </td>
                  <td>
                    { product.category }
                  </td>
                  <td>
                    { product.brand }
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
