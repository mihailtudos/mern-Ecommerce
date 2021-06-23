import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {createCategory, listCategories} from "../../actions/categoryActions";
import axios from "axios";
import { Link } from 'react-router-dom';
import FormContainer from "../../components/FormContainer/FormContainer";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message/Message";
import {Button, Form} from "react-bootstrap";
import {CATEGORY_CREATE_RESET} from "../../constants/categoriesConstants";

const CreateCategoryScreen = ({ history }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [filled, setFilled] = useState('pending');

  const categoryCreate = useSelector(state => state.categoryCreate);
  const { category, loading, error } = categoryCreate;

  useEffect(() => {

    if (category) {
      dispatch({type: CATEGORY_CREATE_RESET});
      history.push('/admin/categories');
    }
    dispatch(listCategories());
  }, [dispatch, history, category]);

  useEffect(() => {

  }, [filled]);


  const submitHandler = (e) => {
    e.preventDefault();
    if (name.length > 5) {
      setFilled('filled');
      dispatch(createCategory({
        name
      }));
    } else {
      setFilled('error')
    }
  };

  return (
    <React.Fragment>
      <Link to={'/admin/categories'} className={'btn btn-light my-4'} >Inapoi</Link>
      <FormContainer>
        <h1>Categorie nou</h1>
        {loading ? <Loader/> : error ? <Message variant={'danger'}>{error}</Message> :
          <Form onSubmit={submitHandler}>
            <Form.Group
              controlId={'name'}
              className={'my-4'}>
              <Form.Label>Nume categorie<span className={'text-danger'}>*</span></Form.Label>
              <Form.Control
                type={'text'}

                value={name}
                onChange={(e) => setName(e.target.value)}/>
            </Form.Group>

            {
              filled === 'error' ? <p className={'text-danger'}>Cimpurile marcate cu * sunt obligatorii</p> : ''
            }
            {
              error && <p className={'text-danger'}>{error}</p>
            }
            <Button
              className={'my-4'}
              variant={'primary'}
              type={'submit'}>
              Creeaza
            </Button>
          </Form>
        }
      </FormContainer>
    </React.Fragment>
  );
};

export default CreateCategoryScreen;
