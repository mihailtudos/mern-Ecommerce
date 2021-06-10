import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {Row, Col, Image, ListGroup, Card, Button, Form, FormGroup, FormLabel, FormControl} from 'react-bootstrap';
import Rating from '../../components/Rating/Rating';
import {createProductReview, listProductDetails} from "../../actions/productActions";
import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";
import {PRODUCT_CREATE_REVIEW_RESET, PRODUCT_DETAILS_RESET} from "../../constants/productConstants";
import MetaComponent from "../../components/MetaComponent/MetaComponent";

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo} = userLogin;

  const productDetails = useSelector(state => state.productDetails);
  const { product, loading, error } = productDetails;

  const productCreateReview = useSelector(state => state.productCreateReview);
  const { success: successReview, error: errorReview } = productCreateReview;

  const id = match.params.pid;

  useEffect(() => {
    if (product) {
      dispatch({type: PRODUCT_DETAILS_RESET})
    }
  }, []);


  useEffect(() => {
    if (successReview) {
      alert('Review submitted');
      setRating(0);
      setComment('');
      dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
    }
    dispatch(listProductDetails(id));
  }, [dispatch, match, id, successReview ]);

  const addToCartHandler = () => {
    history.push(`/cart/${id}?qty=${qty}`)
  }

  const submitHandler = (e) => {
    e.preventDefault();
     dispatch(createProductReview(id, {
       rating,
       comment
     }))
  }

  return (
    <React.Fragment>
      <Link className='btn my-3 rounded' to='/'>GO BACK</Link>
      {loading ? <Loader/> : error ? <Message variant={'danger'}> {error} </Message> :
        (<>
            <Row>
              <MetaComponent title={product.name}/>
              <Col md={6}>
                <Image src={product.image} alt={product.name} fluid/>
              </Col>
              <Col md={3}>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h3>{product.name}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Rating value={product.rating || 0} text={product.numReviews || 0}/>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Price: ${product.price}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Description: ${product.description}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={3}>
                <Card>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <Row>
                        <Col>
                          Price:
                        </Col>
                        <Col>
                          <strong>{product.price}$</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>
                          Status:
                        </Col>
                        <Col>
                          {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    {product.countInStock > 0 && (
                      <ListGroup.Item>
                        <Row>
                          <Col>Qty</Col>
                          <Col>
                            <Form.Control
                              as={'select'}
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}>
                              {
                                [...Array(product.countInStock).keys()].map((x) => (
                                  <option key={x + 1} value={x + 1}>{x + 1}</option>
                                ))
                              }
                            </Form.Control>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )}
                    <ListGroup.Item>
                      <Button
                        onClick={ addToCartHandler }
                        className='btn-block rounded'
                        type='submit'
                        disabled={product.countInStock === 0}>
                        Add to cart
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col md={6} className={'my-4'}>
                <h2>Reviews</h2>
                {product.reviews.length === 0 && <Message>No Reviews</Message>}
                <ListGroup variant={"flush"}>
                  {product.reviews.map((review) => <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>)}
                  <ListGroup.Item className={'my-4'}>
                    <h2>Write a customer review</h2>
                    {errorReview && <Message variant={'danger'}>{errorReview}</Message> }
                    {userInfo ? (
                      <Form onSubmit={submitHandler}>
                        <FormGroup controlId={rating}>
                          <FormLabel>Rating</FormLabel>
                          <Form.Control
                            as={'select'}
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}>
                            <option value=''>Select...</option>
                            <option value='1'>1 - Poor</option>
                            <option value='2'>2 - Fair</option>
                            <option value='3'>3 - Good</option>
                            <option value='4'>4 - Very Good</option>
                            <option value='5'>5 - Excelent</option>
                          </Form.Control>
                        </FormGroup>
                        <FormGroup controlId={comment} >
                          <FormLabel>Comment</FormLabel>
                          <FormControl
                            as={'textarea'}
                            row={3}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}>
                          </FormControl>
                        </FormGroup>
                        <Button
                          type={"submit"}
                          variant={"primary"}
                          className={'my-4'}>
                          Submit
                        </Button>
                      </Form>
                    ) :
                      <Message> Please <Link to={'/login'}> login </Link> to write a review</Message>}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </>
      )}
    </React.Fragment>
  )
}

export default ProductScreen
