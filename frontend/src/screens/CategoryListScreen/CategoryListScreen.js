import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import { listCategories } from "../../actions/categoryActions";
import { Col, Row, Table} from "react-bootstrap";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message/Message";
import Paginate from "../../components/Paginate/Paginate";
import {listProducts} from "../../actions/productActions";

const CategoryListScreen = ({ history, match}) => {

  const dispatch = useDispatch();

  const categoryList = useSelector(state => state.categoryList);
  const { loading, error, categories, page, pages } = categoryList;


  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo.isAdmin) {
      history.push('/');
    }
    dispatch(listProducts());
    dispatch(listCategories());
  }, [dispatch, history, userInfo]);

  return (
    <React.Fragment>
      <Row className={'align-items-center '}>
        <Col >
          <h1>Categorii</h1>
        </Col>
        <Col className={'text-right justify-content-end d-flex'}>
          <Link to={'/categories/create'} className={'my-4'}>
            <i className={'fas fa-plus'} /> Categorie noua
          </Link>
        </Col>
      </Row>
      {/*{loadingDelete && <Loader />}*/}
      {/*{errorDelete && <Message variant={'danger'} >{ errorDelete }</Message> }*/}
      {/*{loadingCreate && <Loader />}*/}
      {/*{errorCreate && <Message variant={'danger'} >{ errorCreate }</Message> }*/}
      { loading ? <Loader /> : error ? <Message variant={'danger'} >{ error }</Message> : (
        <React.Fragment>
          <Table striped bordered hover className={'table-sm'}>
            <thead>
            <tr>
              <th>Categorie</th>
              <th>Produse</th>
            </tr>
            </thead>
            <tbody>
            {
              categories.map((category) => (
                <tr key={category._id}>
                  <td>{category.name}</td>
                  <td>{category.products}</td>
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

export default CategoryListScreen;
