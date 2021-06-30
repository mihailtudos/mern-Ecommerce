import React,{ useState, useEffect } from 'react';
import { Link }  from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";
import { register } from "../../actions/userActions";
import FormContainer from "../../components/FormContainer/FormContainer";

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const redirect = location.search ? location.search.split('=')[1] : '/';

  const dispatch = useDispatch();
  const userRegister = useSelector(state =>  state.userRegister);
  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [userInfo, history, redirect]);


  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      console.log(name, email, phone, password)
      dispatch(register(name, email, phone, password));
    }
  }

  return (
    <FormContainer>
      <h1>Count nou</h1>
      { message && <Message variant={'danger'}>{ message }</Message>}
      { error && <Message variant={'danger'}>{ error }</Message>}
      { loading && <Loader />}

      <Form onSubmit={ submitHandler }>

        <Form.Group
          controlId={'name'}
          className={'my-3'}>
          <Form.Label>Nume</Form.Label>
          <Form.Control
            type={'text'}
            value={name}
            onChange={(e) => setName(e.target.value)} />
        </Form.Group>

        <Form.Group
          controlId={'name'}
          className={'my-3'}>
          <Form.Label>Telefon</Form.Label>
          <Form.Control
            type={'text'}
            value={phone}
            onChange={(e) => setPhone(e.target.value)} />
        </Form.Group>

        <Form.Group
          controlId={'email'}
          className={'my-3'}>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type={'email'}
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group
          controlId={'password'}
          className={'my-3'}>
          <Form.Label>Parola</Form.Label>
          <Form.Control
            type={'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>

        <Form.Group
          controlId={'confirmPassword'}
          className={'my-3'}>
          <Form.Label>Confirma parola</Form.Label>
          <Form.Control
            type={'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} />
        </Form.Group>

        <Button
          variant={'primary'}
          type={'submit'}>
          Creaza
        </Button>
      </Form>
      <Row className={'py-4'}>
        <Col>
          Ai un cont deja?
          <Link className={'p-2 text-decoration-underline'} to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
