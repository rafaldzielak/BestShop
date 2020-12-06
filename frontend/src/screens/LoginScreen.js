import React, { useEffect, useState } from "react";
import { loginAction } from "../actions/userActions";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";

const LoginScreen = ({ history }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = useSelector((state) => state.loginUser);
  const { loggedUser, loading, error } = loginUser;

  useEffect(() => {
    if (loggedUser) history.push("/");
  }, [loggedUser]);

  const formSubmit = (e) => {
    console.log("SUBMIT");
    e.preventDefault();
    dispatch(loginAction(email, password));
  };

  return (
    <div className='d-flex justify-content-center '>
      {loading && <Loader />}
      <Form style={{ width: "400px", paddingTop: "2rem" }} onSubmit={formSubmit}>
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
        <Form.Group controlId='rememberMe'>
          <Form.Check type='checkbox' label='Remember Me' />
        </Form.Group>
        <Button block variant='primary' type='submit'>
          Log In
        </Button>
        <br />
        Not registered? <Link to='/register'>Register</Link>
      </Form>

      {/* <LinkContainer to='/register'>Already have an acoount?</LinkContainer> */}
    </div>
  );
};

export default LoginScreen;
