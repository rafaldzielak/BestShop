import React, { useEffect } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
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
        <Nav className='ml-auto'>
          {loggedUser && loggedUser.isAdmin && (
            <NavDropdown
              className='hover-orange pr-4'
              title='Admin Settings'
              id='basic-nav-dropdown'
              variant='primary'>
              <NavDropdown.Divider className='my-0' />
              <LinkContainer to='/admin/products'>
                <NavDropdown.Item>
                  <i className='fas fa-list'></i> Products
                </NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/admin/orders'>
                <NavDropdown.Item>
                  <i className='fas fa-book-open'></i> Orders
                </NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider className='my-0' />
              <LinkContainer to='/admin/users'>
                <NavDropdown.Item>
                  <i className='fas fa-users'></i> Users
                </NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider className='my-0' />
              <NavDropdown.Item onClick={logoutHandler}>
                <i className='fas fa-sign-out-alt'></i> Logout
              </NavDropdown.Item>
            </NavDropdown>
          )}

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
                {/* <NavDropdown.Divider className='my-0' />
                <LinkContainer to='/settings'>
                  <NavDropdown.Item>
                    <i className='fas fa-cog'></i> Settings
                  </NavDropdown.Item>
                </LinkContainer> */}
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
