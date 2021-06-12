import React, { useEffect }  from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Row, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CheckOutSteps from "../../components/CheckOutSteps/CheckOutSteps";
import Message from "../../components/Message/Message";
import {createOrder} from "../../actions/orderActions";


const PlaceOrdersScreen = ({ history }) => {
  const cart = useSelector(state => state.cart);

  const dispatch = useDispatch();
  const orderCreate = useSelector((state) => state.orderCreate);
  const { error, order, success } = orderCreate;

  const addDecimals = (number) => {
    return (Math.round(number * 100)/100).toFixed(2);
  }

  //calculate prices
  cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.qty * item.price, 0 ));
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 10);
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = Number(Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice));

  useEffect(() => {
    if (success){
      history.push(`/order/${order.createdOrder._id}`)
    }
  }, [history, success, order]);

  const placeOrderHandler = () => {
    dispatch(createOrder({
      orderItems: cart.cartItems,
      itemsPrice: cart.itemsPrice,
      shippingAddress: cart.shippingAddress,
      paymentMethod: cart.paymentMethod,
      shippingPrice: cart.shippingPrice,
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalPrice
    }));
  }

  return (
    <React.Fragment>
     <CheckOutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant={'flush'}>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city} {cart.shippingAddress.postCode}, { ' ' } {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment method</h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.length === 0 ? <Message>Your cart is empty </Message> : (
                <ListGroup variant={'flush'}>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x {item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ) )}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant={'flush'}>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${ cart.itemsPrice }</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${ cart.shippingPrice }</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${ cart.taxPrice }</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${ cart.totalPrice }</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                { error && <Message variant={'danger'}>{error}</Message> }
              </ListGroup.Item>
              <ListGroup.Item>
                <Button className={'btn-block'} disabled={cart.cartItems === 0} onClick={placeOrderHandler}>Place Order</Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default PlaceOrdersScreen;
