import React, { useEffect, useState } from "react";
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";
import { logoutAction } from "../actions/userActions";
import { useDispatch } from "react-redux";
import { getProducts } from "../actions/productActions";
import { useHistory } from "react-router-dom";

const NavbarComponent = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const loginUser = useSelector((state) => state.loginUser);
  const { loggedUser } = loginUser;
  useEffect(() => {}, [loginUser]);
  const [keyword, setKeyword] = useState("");

  const logoutHandler = () => {
    dispatch(logoutAction());
  };

  const searchHandler = (e) => {
    e.preventDefault();
    dispatch(getProducts(keyword));
    history.push(`/search/${keyword}`);
    console.log("search");
  };

  return (
    <Navbar expand='lg' bg='primary' variant='dark'>
      <LinkContainer to='/'>
        <Navbar.Brand>BestShop!</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav '>
        <Form inline onSubmit={searchHandler} className='ml-auto'>
          <FormControl
            type='text'
            placeholder='Search For Products'
            required
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className='mr-sm-2 center'
          />
          <Button type='submit' variant='primary'>
            Search
          </Button>
        </Form>
        <Nav className='ml-auto'>
          <LinkContainer to='/cart'>
            <Nav.Link className='hover-orange'>
              <i className='fas fa-shopping-cart'></i> Cart
            </Nav.Link>
          </LinkContainer>
          {loggedUser ? (
            <>
              <NavDropdown
                className='hover-orange pl-4'
                title={loggedUser.name}
                id='basic-nav-dropdown'
                variant='primary'>
                <NavDropdown.Divider className='my-0' />
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>
                    <i className='fas fa-user-alt'></i> Profile & Orders
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
