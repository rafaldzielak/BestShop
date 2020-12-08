import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Row, Col, Form, Button } from "react-bootstrap";
import { updateProfileAction } from "../actions/userActions";

const ProfileScreen = ({ history }) => {
  // const name = useState()
  const dispatch = useDispatch();
  const loginUser = useSelector((state) => state.loginUser);
  const { loggedUser, loading, error } = loginUser;

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordError, setPasswordError] = useState("");
  // const { name, email } = loggedUser;

  useEffect(() => {
    if (!loggedUser) history.push("/login?redirect=dupa");
    else setName(loggedUser.name);
  }, [loggedUser, history]);

  const updateProfile = useSelector((state) => state.updateProfile);
  const { loading: updateLoading, success, error: updateError } = updateProfile;

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) setPasswordError("Passwords do not match");
    else dispatch(updateProfileAction(name, password));
  };

  return (
    <>
      {(loading || updateLoading) && <Loader />}
      {(error || updateError || passwordError) && <Message>{error || updateError || passwordError}</Message>}
      {success && <Message variant='success'>Profile Updated!</Message>}
      {loggedUser && (
        <>
          <Row className='py-5 px-4'>
            <Col className='border-right pr-5 mx-4'>
              <h1 className='text-center'>{loggedUser.name}'s Profile:</h1>
              <hr />
              <Form onSubmit={submitHandler}>
                <Form.Group readOnly controlId='email'>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control readOnly type='email' placeholder={loggedUser.email} />
                </Form.Group>
                <Form.Group controlId='name'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control type='text' value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Group>

                <Form.Group controlId='formBasicPassword'>
                  <Form.Label>Change Password</Form.Label>
                  <Form.Control
                    type='password'
                    value={password}
                    placeholder='New Password'
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId='formBasicPassword'>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type='password'
                    value={confirmPassword}
                    placeholder='Confirm New Password'
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Form.Group>
                <Button className='py-3 my-5 bigger' variant='primary' block type='submit'>
                  Submit
                </Button>
              </Form>
            </Col>
            <Col className='mx-4'>
              <h1 className='text-center'>Orders</h1>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProfileScreen;
