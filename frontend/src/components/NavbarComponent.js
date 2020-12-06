import React, { useEffect } from "react";
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";
import { logoutAction } from "../actions/userActions";
import { useDispatch } from "react-redux";

const NavbarComponent = () => {
  const dispatch = useDispatch();
  const loginUser = useSelector((state) => state.loginUser);
  const { loggedUser } = loginUser;
  useEffect(() => {}, [loginUser]);

  const logoutHandler = () => {
    dispatch(logoutAction());
  };

  return (
    <Navbar expand='lg' bg='primary' variant='dark'>
      <LinkContainer to='/'>
        <Navbar.Brand>BestShop!</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav '>
        <Form inline className='ml-auto'>
          <FormControl type='text' placeholder='Search For Products' className='mr-sm-2 center' />
          <Button variant='primary'>Search</Button>
        </Form>
        <Nav className='ml-auto'>
          {loggedUser ? (
            <>
              <LinkContainer to='/cart'>
                <Nav.Link className='hover-orange'>
                  <i className='fas fa-shopping-cart'></i> Cart
                </Nav.Link>
              </LinkContainer>
              <NavDropdown
                className='hover-orange pl-4'
                title={loggedUser.name}
                id='basic-nav-dropdown'
                variant='primary'>
                <NavDropdown.Divider className='my-0' />
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>
                    <i className='fas fa-user-alt'></i> Profile
                  </NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider className='my-0' />
                <LinkContainer to='/settings'>
                  <NavDropdown.Item>
                    <i className='fas fa-cog'></i> Settings
                  </NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider className='my-0' />
                <NavDropdown.Item onClick={logoutHandler}>
                  <i className='fas fa-sign-out-alt'></i> Logout
                </NavDropdown.Item>
              </NavDropdown>
            </>
          ) : (
            <>
              <LinkContainer to='/login'>
                <Nav.Link href='/login'>Login</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/register'>
                <Nav.Link href='/register'>Register</Nav.Link>
              </LinkContainer>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
