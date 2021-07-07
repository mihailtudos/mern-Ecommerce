import React, { useEffect }  from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Row, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CheckOutSteps from "../../components/CheckOutSteps/CheckOutSteps";
import Message from "../../components/Message/Message";
import {createOrder} from "../../actions/orderActions";
import {CART_RESET} from "../../constants/cartConstants";


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
  //TODO - add shipping tax
  cart.taxPrice = addDecimals(Number((0).toFixed(2)));
  cart.totalPrice = Number(Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice));

  useEffect(() => {
    if (success){
      localStorage.removeItem('shippingAddress');
      localStorage.removeItem('paymentMethod');
      localStorage.removeItem('cartItems');
      dispatch({type: CART_RESET});
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
              <h2>Livrare</h2>
              <p>
                <strong>Adresa: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city} {cart.shippingAddress.postCode}, { ' ' } {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Metoda de plata</h2>
              <strong>Metoda: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Produse</h2>
              {cart.length === 0 ? <Message>Cosul dmv este gol </Message> : (
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
                          {item.qty} x {item.price && item.price.toLocaleString() } RON = {item.qty * item.price && (item.qty * item.price).toLocaleString()} RON
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
                <h2>Rezumatul comenzii</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Cost produse</Col>
                  <Col>{ cart.itemsPrice && (cart.itemsPrice).toLocaleString()} RON</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Cost de livrare</Col>
                  <Col>{ cart.shippingPrice } RON</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>{ cart.taxPrice && cart.taxPrice.toLocaleString() } RON</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>{ cart.totalPrice && cart.totalPrice.toLocaleString() } RON</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                { error && <Message variant={'danger'}>{error}</Message> }
              </ListGroup.Item>
              <ListGroup.Item>
                <Button className={'btn-block'} disabled={cart.cartItems === 0} onClick={placeOrderHandler}>Plaseaza Comanda</Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default PlaceOrdersScreen;
