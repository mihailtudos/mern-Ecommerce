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
      dispatch(register(name, email, password));
    }
  }

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      { message && <Message variant={'danger'}>{ message }</Message>}
      { error && <Message variant={'danger'}>{ error }</Message>}
      { loading && <Loader />}

      <Form onSubmit={ submitHandler }>
        <Form.Group
          controlId={'name'}
          className={'my-3'}>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type={'text'}
            value={name}
            placeholder={'Enter your name'}
            onChange={(e) => setName(e.target.value)} />
        </Form.Group>

        <Form.Group
          controlId={'email'}
          className={'my-3'}>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type={'email'}
            value={email}
            placeholder={'Enter email'}
            onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group
          controlId={'password'}
          className={'my-3'}>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type={'password'}
            value={password}
            placeholder={'Enter password'}
            onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>

        <Form.Group
          controlId={'confirmPassword'}
          className={'my-3'}>
          <Form.Label>Confirm password</Form.Label>
          <Form.Control
            type={'password'}
            value={confirmPassword}
            placeholder={'Confirm password'}
            onChange={(e) => setConfirmPassword(e.target.value)} />
        </Form.Group>

        <Button
          variant={'primary'}
          type={'submit'}>
          Register
        </Button>
      </Form>
      <Row className={'py-4'}>
        <Col>
          Have an account?
          <Link className={'p-2'} to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
