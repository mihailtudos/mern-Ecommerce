import React from 'react';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import {Badge, Container, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import {logout} from "../../actions/userActions";
import SearchBox from "../SearchBox/SearchBox";
import Contacts from "../Contacts/Contacts";

const Header = () => {
  const dispatch = useDispatch();

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  const cartTotalQty = cartItems.reduce((acc, item) => acc += item.qty, 0);

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  }
  return (
    <header>
      <Navbar bg="light" variant='light' expand="lg" collapseOnSelect>
        <Container fluid>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <img className={'logo'} src="/images/nirmoto.png" alt="Nirmoto logo"/>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to={`/products`}>
                <Nav.Link> Produse</Nav.Link>
              </LinkContainer>
              <LinkContainer to={`/cart`}>
                <Nav.Link>
                  <i className='fas fa-shopping-cart' />
                  {
                    cartTotalQty ? <Badge pill variant="dark" className={'text-light bg-dark'}>
                      {cartTotalQty}
                    </Badge> : ''
                  }
                </Nav.Link>
              </LinkContainer>
              {  userInfo ? (
                <NavDropdown id={'username'} title={userInfo.name}>
                  <LinkContainer to={'/profile'}>
                    <NavDropdown.Item> Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}> Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link><i className='fas fa-user' /> Sign in</Nav.Link>
                </LinkContainer>
              ) }
              {
                userInfo ? userInfo.isAdmin && (
                  <NavDropdown id={'adminMenu'} title={'Dash'}>
                    <LinkContainer to={'/admin/userlist'}>
                      <NavDropdown.Item> Users</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to={'/admin/productlist'}>
                      <NavDropdown.Item> Products</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to={'/admin/orders'}>
                      <NavDropdown.Item> Orders</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to={'/admin/categories'}>
                      <NavDropdown.Item> Categories</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                ) : ''
              }
              <Route render={({ history }) => <SearchBox history={history} />} />
              </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Contacts />
    </header>
  )
}

export default Header;
