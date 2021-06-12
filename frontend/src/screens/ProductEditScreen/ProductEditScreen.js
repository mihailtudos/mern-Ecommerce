import React,{ useState, useEffect } from 'react';
import { Link }  from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";
import FormContainer from "../../components/FormContainer/FormContainer";
import {listProductDetails, updateProduct} from "../../actions/productActions";
import {PRODUCT_UPDATE_RESET} from "../../constants/productConstants";
import axios from "axios";

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;


  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate)
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({type: PRODUCT_UPDATE_RESET});
      history.push('/admin/productlist');
    } else {
      if ( !product.name) {
        dispatch(listProductDetails(productId))
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [ dispatch, history, product, productId, successUpdate ])

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateProduct({
      _id: productId,
      name,
      price,
      image,
      brand,
      category,
      description,
      countInStock
    }))
  };

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
      console.log(error);
      setUploading(false);
    }
  }

  return (
    <React.Fragment>
      <Link to={'/admin/productlist'} className={'btn btn-light my-4'} >Go Back</Link>
      <FormContainer>
        <h1>Edit product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant={'danger'}>{errorUpdate}</Message>}
        {loading ? <Loader/> : error ? <Message variant={'danger'}>{error}</Message> :
          <Form onSubmit={submitHandler}>
            <Form.Group
              controlId={'name'}
              className={'my-4'}>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type={'text'}
                value={name}
                placeholder={'Enter your name'}
                onChange={(e) => setName(e.target.value)}/>
            </Form.Group>

            <Form.Group
              controlId={'price'}
              className={'my-4'}>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type={'number'}
                value={price}
                placeholder={'Price'}
                onChange={(e) => setPrice(e.target.value)}/>
            </Form.Group>

            <Form.Group
              controlId={'image'}
              className={'my-4'}>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type={'text'}
                value={image}
                placeholder={'Enter image URL'}
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
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type={'text'}
                value={brand}
                placeholder={'Enter brand'}
                onChange={(e) => setBrand(e.target.value)}/>
            </Form.Group>

            <Form.Group
              controlId={'countInStock'}
              className={'my-4'}>
              <Form.Label>countInStock</Form.Label>
              <Form.Control
                type={'number'}
                value={countInStock}
                placeholder={'Set stock'}
                onChange={(e) => setCountInStock(e.target.value)}/>
            </Form.Group>

            <Form.Group
              controlId={'category'}
              className={'my-4'}>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type={'text'}
                value={category}
                placeholder={'Enter category'}
                onChange={(e) => setCategory(e.target.value)}/>
            </Form.Group>

            <Form.Group
              controlId={'description'}
              className={'my-4'}>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type={'text'}
                value={description}
                placeholder={'Enter description'}
                onChange={(e) => setDescription(e.target.value)}/>
            </Form.Group>

            <Button
              className={'my-4'}
              variant={'primary'}
              type={'submit'}>
              Update
            </Button>
          </Form>
        }
      </FormContainer>
    </React.Fragment>
  );
};

export default ProductEditScreen;
