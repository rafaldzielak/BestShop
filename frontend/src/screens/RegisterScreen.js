import React, { useEffect, useState } from "react";
import { registerAction } from "../actions/userActions";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";

const RegisterScreen = ({ history }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const loginUser = useSelector((state) => state.loginUser);
  const { loggedUser } = loginUser;
  const registerUser = useSelector((state) => state.registerUser);
  const { loading, error } = registerUser;

  useEffect(() => {
    if (loggedUser) history.push("/");
  }, [loggedUser]);

  const formSubmit = (e) => {
    e.preventDefault();
    dispatch(registerAction(name, email, password));
  };

  return (
    <div className='d-flex justify-content-center '>
      <Form style={{ width: "400px", paddingTop: "2rem" }} onSubmit={formSubmit}>
        {loading && <Loader />}
        {error && <Message>{error}</Message>}
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='email'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='confirmpassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm Password'
            value={password}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='rememberMe'>
          <Form.Check type='checkbox' label='Remember Me' />
        </Form.Group>
        <Button block variant='primary' type='submit'>
          Log In
        </Button>
        <br />
        Have an account? <Link to='/login'>Login</Link>
      </Form>

      {/* <LinkContainer to='/register'>Already have an acoount?</LinkContainer> */}
    </div>
  );
};

export default RegisterScreen;
