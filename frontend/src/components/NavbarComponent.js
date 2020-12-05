import React from "react";
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const NavbarComponent = () => {
  return (
    <Navbar expand='lg' bg='dark' variant='dark'>
      <LinkContainer to='/'>
        <Navbar.Brand>BestShop!</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav '>
        <Form inline className='ml-auto'>
          <FormControl type='text' placeholder='Search For Products' className='mr-sm-2 center' />
          <Button variant='light'>Search</Button>
        </Form>
        <Nav className='ml-auto'>
          <Nav.Link href='#home'>Home</Nav.Link>
          <Nav.Link href='#link'>Link</Nav.Link>
          <NavDropdown title='Dropdown' id='basic-nav-dropdown'>
            <NavDropdown.Item href='#action/3.1'>Action</NavDropdown.Item>
            <NavDropdown.Item href='#action/3.2'>Another action</NavDropdown.Item>
            <NavDropdown.Item href='#action/3.3'>Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href='#action/3.4'>Separated link</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
