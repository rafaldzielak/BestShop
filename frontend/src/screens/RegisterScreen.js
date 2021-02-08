import React, { useEffect, useState } from "react";
import { registerAction } from "../actions/userActions";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";

const RegisterScreen = ({ history }) => {
  let redirect = new URLSearchParams(window.location.search).get("redirect") || "";
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const loginUser = useSelector((state) => state.loginUser);
  const { loggedUser } = loginUser;
  const registerUser = useSelector((state) => state.registerUser);
  const { loading, error } = registerUser;

  useEffect(() => {
    if (loggedUser) history.push(redirect ? `/${redirect}` : "/");
  }, [loggedUser, history, redirect]);

  const formSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) setPasswordError("Passwords do not match");
    else dispatch(registerAction(name, email, password));
  };

  return (
    <div className='d-flex justify-content-center '>
      <Form
        style={{ maxWidth: "400px", width: "100%", paddingTop: "2rem", fontSize: "1rem" }}
        onSubmit={formSubmit}>
        <h2 className='text-center'>Register</h2>
        {loading && <Loader />}
        {error && <Message>{error}</Message>}
        {passwordError && <Message>{passwordError}</Message>}
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
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <Button size='lg' block variant='primary' type='submit'>
          Create Account
        </Button>
        <br />
        Have an account?{" "}
        <Link className='text-info' to={`/login${redirect && `?redirect=${redirect}`}`}>
          Login
        </Link>
      </Form>

      {/* <LinkContainer to='/register'>Already have an acoount?</LinkContainer> */}
    </div>
  );
};

export default RegisterScreen;
