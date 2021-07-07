import React, { useEffect, useState }  from 'react';
import { Link } from 'react-router-dom';
import { PayPalButton } from 'react-paypal-button-v2'
import {Col, Row, ListGroup, Image, Card, ListGroupItem, Button} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";
import {deliverOrder, getOrderDetails, payOrder} from "../../actions/orderActions";
import axios from "axios";
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET} from "../../constants/orderConstants";

const OrderScreen = ({ match, history }) => {

  const [sdkReady, setSdkReady] = useState(false);
  const orderId = match.params.id
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, error, loading } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  if (!loading) {
    const addDecimal = (num) => {
      return ((Math.round(num*100) / 100).toFixed(2));
    }

    order.itemsPrice = addDecimal(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/');
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get(`/api/config/paypal`);
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      }
      document.body.appendChild(script);
    }

    if (!order || order._id !== orderId || successPay || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_DELIVER_RESET })
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
    }
  }, [ order, dispatch, successPay, orderId, successDeliver, history, userInfo ]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  }

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  }

  return loading ? <Loader /> : error ? <Message variant={'danger'} >{ error }</Message> :
    <React.Fragment>
      <h1>Comanda: {order._id}</h1>
      <Row>
        <Col md={8} className={'mb-5'}>
          <ListGroup variant={'flush'}>
            <ListGroup.Item>
              <h2>Detalii</h2>
              <p>
                <strong>Nume:</strong> {order.user.name}
              </p>
              <p>
                <strong>Email:</strong><a href={`mailto:${order.user.email}`}> {order.user.email} </a>
              </p>
              <p>
                <strong>Tel:</strong><a href={`tel:${order.user.phone}`}> {order.user.phone} </a>
              </p>
              <p>
                <strong>Adresa: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.postCode}, { ' ' } {order.shippingAddress.country}
              </p>

              {order.isDelivered ? <Message variant={'success'}>Delivered on {order.deliveredAt.substring(0, 10)}</Message> : <Message variant={'danger'}>Urmeaza a fi livrata</Message> }
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Metoda de plata</h2>
              <p>
                <strong>Metoda: </strong>
                {order.paymentMethod.toLowerCase()}
              </p>
              {order.isPaid ? <Message variant={'success'}>Paid on {order.paidAt.substring(0, 10)}</Message> : <Message variant={'danger'}>Nu a fost achitata</Message> }
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Produse comandate</h2>
              {order.length === 0 ? <Message>Order is empty </Message> : (
                <ListGroup variant={'flush'}>
                  {order.orderItems.map((item, index) => (
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
                          {item.qty} x {item.price && `${item.price.toLocaleString()} RON`} = {(item.qty * item.price) && (item.qty * item.price).toLocaleString() } RON
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
                <h2>A se achita</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Produse</Col>
                  <Col>{ order.itemsPrice && (order.itemsPrice).toLocaleString() } RON</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Livrare</Col>
                  <Col>{ order.shoppingPrice && (order.shoppingPrice).toLocaleString() } RON</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Taxe</Col>
                  <Col>{ order.taxPrice && (order.taxPrice).toLocaleString() } RON</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>{ order.totalPrice && (order.totalPrice).toLocaleString() } RON</Col>
                </Row>
              </ListGroup.Item>
              {order.paymentMethod !== "Cash" ? !order.isPaid ? (
                <ListGroupItem>
                  {loadingPay && <Loader />}
                  {!sdkReady ? <Loader /> : (<PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler}/>) }
                </ListGroupItem>
              ) : null : null}
              {loadingDeliver && <Loader />}
              {
                userInfo
                && userInfo.isAdmin
                && order.isPaid
                && !order.isDelivered
                && (
                  <ListGroup.Item>
                    <Button type={'button'} className={'btn btn-block'} onClick={ deliverHandler }>Mark delivered</Button>
                  </ListGroup.Item>
                )
              }
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
};

export default OrderScreen;
