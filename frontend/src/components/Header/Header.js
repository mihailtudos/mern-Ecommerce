import React from 'react';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import {Container, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import {logout} from "../../actions/userActions";
import SearchBox from "../SearchBox/SearchBox";

const Header = () => {
  const dispatch = useDispatch();
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
            <Navbar.Brand>Nirmoto</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to={`/produse`}>
                <Nav.Link> Produse</Nav.Link>
              </LinkContainer>
              <LinkContainer to={`/cart`}>
                <Nav.Link><i className='fas fa-shopping-cart' /> Cart</Nav.Link>
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
    </header>
  )
}

export default Header;
