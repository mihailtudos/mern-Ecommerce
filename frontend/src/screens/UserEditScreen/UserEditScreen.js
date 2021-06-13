import React,{ useState, useEffect } from 'react';
import { Link }  from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";
import { getUserDetails, updateUser } from "../../actions/userActions";
import FormContainer from "../../components/FormContainer/FormContainer";
import { USER_DETAILS_RESET, USER_UPDATE_RESET } from "../../constants/userConstants";

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate)
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      dispatch({ type: USER_DETAILS_RESET });
      history.push('/admin/userlist');
    } else {
      if ( !user.name ) {
        dispatch(getUserDetails(userId))
      } else {
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
      }
    }
  }, [dispatch, history, userId, user, successUpdate ])

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({
      _id: user._id,
      name,
      email,
      isAdmin
    }))
  }

  return (
    <React.Fragment>
      <Link to={'/admin/userlist'} className={'btn btn-light my-4'} >Go Back</Link>
      <FormContainer>
        <h1>Edit user</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant={'danger'}>{errorUpdate}</Message>}
        {loading ? <Loader/> : error ? <Message variant={'danger'}>{error}</Message> :
          <Form onSubmit={submitHandler}>
            <Form.Group
              controlId={'name'}
              className={'my-4'}>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type={'text'}
                value={name}
                placeholder={'Enter your name'}
                onChange={(e) => setName(e.target.value)}/>
            </Form.Group>

            <Form.Group
              controlId={'email'}
              className={'my-4'}>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type={'email'}
                value={email}
                placeholder={'Enter email'}
                onChange={(e) => setEmail(e.target.value)}/>
            </Form.Group>

            <Form.Group
              controlId={'isAdmin'}
              className={'my-5'}>
              <Form.Check
                type={'checkbox'}
                checked={isAdmin}
                label={'Is admin'}
                onChange={(e) => setIsAdmin(e.target.checked)}/>
            </Form.Group>

            <Button
              className={'my-4'}
              variant={'primary'}
              type={'submit'}>
              Update
            </Button>
          </Form>
        }
      </FormContainer>
    </React.Fragment>
  );
};

export default UserEditScreen;
