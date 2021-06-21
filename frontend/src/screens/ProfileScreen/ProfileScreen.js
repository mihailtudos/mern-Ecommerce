import React,{ useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";
import { getUserDetails, updateUserProfile } from "../../actions/userActions";
import { listMyOrders } from "../../actions/orderActions";

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector(state =>  state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector(state =>  state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector(state =>  state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListMy = useSelector(state =>  state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user.name)  {
        dispatch(getUserDetails('profile'))
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, userInfo, history, user ]);


  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      //  dispatch update profile
      dispatch(updateUserProfile({id: user._id, name, email, password}))
    }
  }

  return (
    <Row>
      <Col md={3} className={'my-5'}>
        <h2>User  Profile</h2>
        { message && <Message variant={'danger'}>{ message }</Message>}
        { error && <Message variant={'danger'}>{ error }</Message>}
        { success && <Message variant={'success'}>{ 'Profile updated' }</Message>}
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
              placeholder={'Enter password'}
              onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>

          <Form.Group
            controlId={'confirmPassword'}
            className={'my-3'}>
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              type={'password'}
              placeholder={'Confirm password'}
              onChange={(e) => setConfirmPassword(e.target.value)} />
          </Form.Group>

          <Button
            variant={'primary'}
            onClick={ submitHandler }
            type={'submit'}>
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {loadingOrders ? <Loader /> : errorOrders ? <Message variant={'danger'} >{ errorOrders}</Message> : (
         <Table striped bordered hover responsive className={'table-sm'}>
           <thead>
           <tr>
             <td>ID</td>
             <td>Date</td>
             <td>Total</td>
             <td>Paid</td>
             <td>Delivered</td>
             <td></td>
           </tr>
           </thead>
           <tbody>
           {
             orders.map((order) => (
               <tr key={order._id}>
                 <td><Link to={`/order/${order._id}`}>{order._id}</Link></td>
                 <td>{order.createdAt.substring(0, 10)}</td>
                 <td>{order.totalPrice}</td>
                 <td>{order.isPaid ? order.paidAt.substring(0, 10) : (<i className='fas fa-times' style={{color: 'red'}}/> )}</td>
                 <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : (<i className='fas fa-times' style={{color: 'red'}}/> )}</td>
                 <td>
                   <LinkContainer to={`/order/${order._id}`}>
                     <Button className={'btn-sm'} variant={'light'}>Details</Button>
                    </LinkContainer>
                 </td>
               </tr>
             ))
           }
           </tbody>
         </Table>
        )}
      </Col>
    </Row>

  );
};

export default ProfileScreen;
