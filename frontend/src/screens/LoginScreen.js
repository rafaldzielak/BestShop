import React, { useEffect, useState } from "react";
import { loginAction } from "../actions/userActions";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";

const LoginScreen = ({ history }) => {
  let redirect = new URLSearchParams(window.location.search).get("redirect") || "";
  console.log(redirect);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = useSelector((state) => state.loginUser);
  const { loggedUser, loading, error } = loginUser;

  useEffect(() => {
    if (loggedUser) history.push(redirect ? `/${redirect}` : "/");
  }, [loggedUser, history, redirect]);

  const formSubmit = (e) => {
    e.preventDefault();
    dispatch(loginAction(email, password));
  };

  return (
    <div className='d-flex justify-content-center'>
      <Form onSubmit={formSubmit} style={{ fontSize: "1rem", maxWidth: "400px", width: "100%" }}>
        <h2 className='text-center mt-4'>Sign In</h2>
        {loading && <Loader />}
        {error && <Message>{error}</Message>}
        <Form.Check className='pt-5 px-0'>
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
          <Button block className='mt-4' variant='primary' size='lg' type='submit'>
            Log In
          </Button>
          <br />
          Not registered?{" "}
          <Link className='text-info' to={`/register${redirect && `?redirect=${redirect}`}`}>
            Register
          </Link>
        </Form.Check>
      </Form>
    </div>
  );
};

export default LoginScreen;
