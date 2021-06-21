import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {Row, Col, Image, ListGroup, Card, Button, Form, FormGroup, FormLabel, FormControl} from 'react-bootstrap';
import Rating from '../../components/Rating/Rating';
import {createProductReview, listProductDetails} from "../../actions/productActions";
import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";
import { PRODUCT_CREATE_REVIEW_RESET } from "../../constants/productConstants";
import MetaComponent from "../../components/MetaComponent/MetaComponent";

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [showMore, setShowMore] = useState(false);

  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo} = userLogin;

  const productDetails = useSelector(state => state.productDetails);
  const { product, loading, error } = productDetails;

  const productCreateReview = useSelector(state => state.productCreateReview);
  const { success: successReview, error: errorReview } = productCreateReview;

  const id = match.params.pid;

  useEffect(() => {
    window.scroll(0,0);
    if (successReview) {
      alert('Review submitted');
      setRating(0);
      setComment('');
      dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
    }
    dispatch(listProductDetails(id));
  }, [dispatch, match, id, successReview, showMore ]);

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

const handleDescriptionClick = () => {
    setShowMore(!showMore);
}
  return (
    <React.Fragment>
      <Link className='btn my-3 rounded' to='/'>Inapoi</Link>
      {loading ? <Loader/> : error ? <Message variant={'danger'}> {error} </Message> :
        (<React.Fragment>
            <Row>
              <MetaComponent title={product.name}/>
              <Col md={6}>
                <Image src={product.image} alt={product.name} fluid/>
              </Col>
              <Col md={6}>
                <Card>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <Row>
                        <Col>
                          Pret:
                        </Col>
                        <Col>
                          <strong>{product.price && product.price.toLocaleString()} RON</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>
                          Status:
                        </Col>
                        <Col>
                          {product.countInStock > 0 ? 'In stock' : 'Out Of Stock'}
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
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h4 className={'my-4 text-center'}>{product.name}</h4>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Rating value={product.rating || 0} text={product.numReviews || 0}/>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Pret: {product.price && product.price.toLocaleString()}RON <sub>(TVA inclus)</sub>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Description: {
                    product.description ?
                    showMore ? product.description.split("<>").map(p => <p>{p}</p>)
                      : product.description.split("<>").slice(0, 4).map(p => <p>{p}</p>) : null
                  }
                    {
                      product.description ? product.description.length > 150
                        ? <Button onClick={handleDescriptionClick}>mai mult...</Button>
                        : null : ''
                    }
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6} className={'my-4'}>
                <h2>Reviews</h2>
                {product.reviews.length === 0 && <Message>Fii primul care lasa un review</Message>}
                <ListGroup variant={"flush"}>
                  {product.reviews.map((review) => <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>)}
                  <ListGroup.Item className={'my-4'}>
                    <h2>Scrie un review</h2>
                    {errorReview && <Message variant={'danger'}>{errorReview}</Message> }
                    {userInfo ? (
                      <Form onSubmit={submitHandler}>
                        <FormGroup controlId={rating}>
                          <FormLabel>Rating</FormLabel>
                          <Form.Control
                            as={'select'}
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}>
                            <option value=''>Alege rating...</option>
                            <option value='1'>1 - Poor</option>
                            <option value='2'>2 - Fair</option>
                            <option value='3'>3 - Good</option>
                            <option value='4'>4 - Very Good</option>
                            <option value='5'>5 - Excelent</option>
                          </Form.Control>
                        </FormGroup>
                        <FormGroup controlId={comment} >
                          <FormLabel>Comentariu</FormLabel>
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
                      <Message> Va rugam sa va <Link to={'/login'}> logati </Link> pentru a lasa un review</Message>}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </React.Fragment>
      )}
    </React.Fragment>
  )
}

export default ProductScreen
