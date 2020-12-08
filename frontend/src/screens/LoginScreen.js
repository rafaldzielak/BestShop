import React, { useEffect, useState } from "react";
import { loginAction } from "../actions/userActions";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";

const LoginScreen = ({ history }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = useSelector((state) => state.loginUser);
  const { loggedUser, loading, error } = loginUser;

  useEffect(() => {
    if (loggedUser) history.push("/");
  }, [loggedUser, history]);

  const formSubmit = (e) => {
    e.preventDefault();
    dispatch(loginAction(email, password));
  };

  return (
    <FormContainer>
      <Form onSubmit={formSubmit}>
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
          <Form.Group controlId='rememberMe'>
            <Form.Check type='checkbox' label='Remember Me' />
          </Form.Group>
          <Button block variant='primary' size='lg' type='submit'>
            Log In
          </Button>
          <br />
          Not registered? <Link to='/register'>Register</Link>
        </Form.Check>
      </Form>
    </FormContainer>
  );
};

export default LoginScreen;
