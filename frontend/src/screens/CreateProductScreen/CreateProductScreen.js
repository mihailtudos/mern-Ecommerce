import React,{ useState, useEffect } from 'react';
import { Link }  from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";
import FormContainer from "../../components/FormContainer/FormContainer";
import {createProduct, listProductDetails, listProducts, updateProduct} from "../../actions/productActions";
import axios from "axios";
import {PRODUCT_CREATE_RESET, PRODUCT_UPDATE_RESET} from "../../constants/productConstants";
import {listCategories} from "../../actions/categoryActions";

const CreateProductScreen = ({ history }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [filled, setFilled] = useState('pending');

  const productCreate = useSelector(state => state.productCreate);
  const { error: errorProduct, product } = productCreate;

  const categoryList = useSelector(state => state.categoryList);
  const { loading, error, categories } = categoryList;

  useEffect(() => {
    if (product) {
      dispatch({type: PRODUCT_CREATE_RESET});
      history.push('/admin/productlist');
    }
    dispatch(listCategories());
  }, [dispatch, history, product]);

  useEffect(() => {

  }, [filled]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      const { data } = await axios.post('/api/upload', formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      setUploading(false);
    }
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if (name.length > 5 && price && image && brand.length > 3 && category) {
      setFilled('filled');
      dispatch(createProduct({
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock
      }));
    } else {
      setFilled('error')
    }
  };

  return (
    <React.Fragment>
      <Link to={'/admin/productlist'} className={'btn btn-dark my-4'} >Inapoi</Link>
      <FormContainer>
        <h1>Produs nou</h1>
        {loading ? <Loader/> : error ? <Message variant={'danger'}>{error}</Message> :
          <Form onSubmit={submitHandler}>
            <Form.Group
              controlId={'name'}
              className={'my-4'}>
              <Form.Label>Nume produs<span className={'text-danger'}>*</span></Form.Label>
              <Form.Control
                type={'text'}

                value={name}
                onChange={(e) => setName(e.target.value)}/>
            </Form.Group>

            <Form.Group
              controlId={'price'}
              className={'my-4'}>
              <Form.Label>Pret<span className={'text-danger'}>*</span></Form.Label>
              <Form.Control
                type={'number'}
                value={price}

                onChange={(e) => setPrice(e.target.value)}/>
            </Form.Group>

            <Form.Group
              controlId={'image'}
              className={'my-4'}>
              <Form.Label>Imagine<span className={'text-danger'}>*</span></Form.Label>
              <Form.Control
                type={'text'}
                value={image}
                placeholder={'Introdu URL sau selecteaza poza'}
                onChange={(e) => setImage(e.target.value)}/>
              <Form.File
                id={'image-file'}
                custom
                onChange={uploadFileHandler}
              />
              { uploading && <Loader />}
            </Form.Group>

            <Form.Group
              controlId={'brand'}
              className={'my-4'}>
              <Form.Label>Brand<span className={'text-danger'}>*</span></Form.Label>
              <Form.Control
                type={'text'}
                value={brand}
                onChange={(e) => setBrand(e.target.value)}/>
            </Form.Group>

            <Form.Group
              controlId={'countInStock'}
              className={'my-4'}>
              <Form.Label>In stock<span className={'text-danger'}>*</span></Form.Label>
              <Form.Control
                type={'number'}
                value={countInStock}

                onChange={(e) => setCountInStock(e.target.value)}/>
            </Form.Group>

            <Form.Group
              controlId={'category'}
              className={'my-4'}>
              <Form.Label>Categorie<span className={'text-danger'}>*</span></Form.Label>
                <Form.Control

                  as="select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)} >
                  <option>Select category</option>
                  {
                    categories.map(category => {
                      return <option key={category._id} value={category._id}>{category.name}</option>
                    }
                    )
                  }
                </Form.Control>
            </Form.Group>

            <Form.Group
              controlId={'description'}
              className={'my-4'}>
              <Form.Label>{'Descriere (foloseste <> pentru rind now)'}<span className={'text-danger'}>*</span></Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                value={description}

                onChange={(e) => setDescription(e.target.value)}/>
            </Form.Group>

            {
              filled === 'error' ? <p className={'text-danger'}>Cimpurile marcate cu * sunt obligatorii</p> : ''
            }
            {
              errorProduct && <p className={'text-danger'}>{errorProduct}</p>
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

export default CreateProductScreen;

