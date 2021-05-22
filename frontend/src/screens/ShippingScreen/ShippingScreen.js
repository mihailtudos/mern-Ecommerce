import React,{ useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../../components/FormContainer/FormContainer";
import {saveShippingAddress} from "../../actions/cartActions";
import CheckOutSteps from "../../components/CheckOutSteps/CheckOutSteps";


const ShippingScreen = ({ history }) => {
  const cart = useSelector(state => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postCode, setPostCode] = useState(shippingAddress.postCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({address, city, postCode, country}));
    history.push('/payment');
  }

  return (
    <FormContainer>
      <CheckOutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form
        onSubmit={submitHandler}>
        <Form.Group
          controlId={'address'}
          className={'my-3'}>
          <Form.Label> Address</Form.Label>
          <Form.Control
            type={'text'}
            value={address}
            placeholder={'Enter address'}
            required
            onChange={(e) => setAddress(e.target.value)} />
        </Form.Group>

        <Form.Group
          controlId={'city'}
          className={'my-3'}>
          <Form.Label> City</Form.Label>
          <Form.Control
            type={'text'}
            value={city}
            placeholder={'Enter city'}
            required
            onChange={(e) => setCity(e.target.value)} />
        </Form.Group>

        <Form.Group
          controlId={'postCode'}
          className={'my-3'}>
          <Form.Label> Post Code</Form.Label>
          <Form.Control
            type={'text'}
            value={postCode}
            placeholder={'Enter post code'}
            required
            onChange={(e) => setPostCode(e.target.value)} />
        </Form.Group>

        <Form.Group
          controlId={'country'}
          className={'my-3'}>
          <Form.Label> Country</Form.Label>
          <Form.Control
            type={'text'}
            value={country}
            placeholder={'Enter country'}
            required
            onChange={(e) => setCountry(e.target.value)} />
        </Form.Group>
      <Button type={'submit'} variant={'primary'}>
        Continue
      </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
