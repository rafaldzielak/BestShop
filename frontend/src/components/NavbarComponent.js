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

  const showCartIcon = (
    <LinkContainer className='ml-auto' to='/cart' style={{ paddingLeft: "2rem" }}>
      <Nav.Link className='hover-orange text-white text-center'>
        <i className='fas fa-shopping-cart'></i> Cart
      </Nav.Link>
    </LinkContainer>
  );

  return (
    <Navbar expand='lg' bg='primary' variant='dark' style={{ fontSize: "1rem" }}>
      <LinkContainer to='/'>
        <Navbar.Brand>BestShop!</Navbar.Brand>
      </LinkContainer>
      <span className='d-lg-none '>{showCartIcon}</span>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav ' style={{ width: "auto" }}>
        <Nav className='ml-auto'>
          {loggedUser && loggedUser.isAdmin && (
            <NavDropdown
              className='hover-orange pr-4 text-center'
              title='Admin Settings'
              id='basic-nav-dropdown'
              variant='primary'>
              <NavDropdown.Divider className='my-0' />
              <LinkContainer className='text-center' to='/admin/products'>
                <NavDropdown.Item>
                  <i className='fas fa-list'></i> Products
                </NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider className='my-0' />
              {/* <LinkContainer to='/admin/categories'>
                <NavDropdown.Item>
                  <i className='fas fa-layer-group'></i> Categories
                </NavDropdown.Item>
              </LinkContainer> */}

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

          {loggedUser && (
            <>
              <span className='d-none d-md-block'>{showCartIcon}</span>
              <NavDropdown
                className='hover-orange pl-4 text-center'
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
          )}
        </Nav>
      </Navbar.Collapse>
      {!loggedUser && (
        <>
          {showCartIcon}
          <LinkContainer
            to='/login'
            style={{ paddingLeft: "2rem" }}
            className='text-center text-white hover-orange'>
            <Nav.Link href='/login'>
              <i className='fas fa-sign-in-alt'></i> Sign In
            </Nav.Link>
          </LinkContainer>
          {/* <LinkContainer
                to='/register'
                style={{ paddingLeft: "2rem" }}
                className='text-center hover-orange'>
                <Nav.Link href='/register'>
                  <i style={{ fontSize: "0.9rem" }} className='fas fa-user-plus'></i> Register
                </Nav.Link>
              </LinkContainer> */}
        </>
      )}
    </Navbar>
  );
};

export default NavbarComponent;
