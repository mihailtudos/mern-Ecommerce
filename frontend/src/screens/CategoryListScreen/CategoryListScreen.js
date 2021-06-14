import React, { useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { listCategories } from "../../actions/categoryActions";
import MetaComponent from "../../components/MetaComponent/MetaComponent";
import {Button, Col, Row, Table} from "react-bootstrap";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message/Message";
import Paginate from "../../components/Paginate/Paginate";

const CategoryListScreen = ({ history, match}) => {
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const categoryList = useSelector(state => state.categoryList);
  const { loading, error, categories, page, pages } = categoryList;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo.isAdmin) {
      history.push('/');
    }
    dispatch(listCategories());
  }, [dispatch, history, userInfo]);

  const createCategoryHandler = () => {

  }

  return (
    <React.Fragment>
      <Row className={'align-items-center '}>
        <Col >
          <h1>Categories</h1>
        </Col>
        <Col className={'text-right justify-content-end d-flex'}>
          <Button className={'my-4'} onClick={createCategoryHandler} >
            <i className={'fas fa-plus'} /> Create category
          </Button>
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
              <th>ID</th>
              <th>Category</th>
            </tr>
            </thead>
            <tbody>
            {
              categories.map((category) => (
                <tr key={category._id}>
                  <td>{category._id}</td>
                  <td>{category.name}</td>
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
