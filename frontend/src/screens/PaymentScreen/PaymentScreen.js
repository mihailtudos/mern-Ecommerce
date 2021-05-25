import React,{ useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../../components/FormContainer/FormContainer";
import { savePaymentMethod } from "../../actions/cartActions";
import CheckOutSteps from "../../components/CheckOutSteps/CheckOutSteps";


const PaymentScreen = ({ history }) => {
  const cart = useSelector(state => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push('/placeorder')
  }

  const [paymentMethod , setPaymentMethod] = useState(cart.paymentMethod || '');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeorder');
  }

  return (
    <FormContainer>
      <CheckOutSteps step1 step2 step3 />
      <h1>Payment</h1>
      <Form
        onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as={'legend'}>Select method</Form.Label>
          <Col>
            <Form.Check
              className={'py-2'}
              type={'radio'}
              label={'PayPal or Credit Card'}
              id={'PayPal'}
              name={'paymentMethod'}
              value={'PayPal'}
              checked={paymentMethod === 'PayPal'}
              onChange={(e) => setPaymentMethod(e.target.value)} />
            <Form.Check
              className={'py-2'}
              type={'radio'}
              label={'Cash'}
              value={'Cash'}
              checked={paymentMethod === 'Cash'}
              id={'Cash'}
              name={'paymentMethod'}
              onChange={(e) => setPaymentMethod(e.target.value)} />
          </Col>
        </Form.Group>
        <Button
          type={'submit'}
          variant={'primary'}>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
