import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Row, Col, Form, Button, ListGroup, Image } from "react-bootstrap";
import { updateProfileAction } from "../actions/userActions";
import { getUserOrdersAction } from "../actions/orderActions";

const ProfileScreen = ({ history }) => {
  // const name = useState()
  const dispatch = useDispatch();
  const loginUser = useSelector((state) => state.loginUser);
  const { loggedUser, loading, error } = loginUser;

  const updateProfile = useSelector((state) => state.updateProfile);
  const { loading: updateLoading, success, error: updateError } = updateProfile;

  const userOrdersGet = useSelector((state) => state.userOrdersGet);
  const { ordersDetails, loading: loadingOrders, error: orderError } = userOrdersGet;

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordError, setPasswordError] = useState("");
  // const { name, email } = loggedUser;

  useEffect(() => {
    if (!loggedUser) history.push("/login?redirect=dupa");
    else setName(loggedUser.name);
  }, [loggedUser, history]);

  useEffect(() => {
    dispatch(getUserOrdersAction());
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) setPasswordError("Passwords do not match");
    else dispatch(updateProfileAction(name, password));
  };

  const showProfile = (
    <>
      <h1 className='text-center'>Edit Profile</h1>
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
    </>
  );

  return (
    <>
      {(loading || updateLoading) && <Loader />}
      {(error || updateError || passwordError) && <Message>{error || updateError || passwordError}</Message>}
      {success && <Message variant='success'>Profile Updated!</Message>}

      {loggedUser && (
        <Row className='py-5 px-4'>
          <Col lg='5' md='12' className='border-right pr-5 mx-4'>
            {showProfile}
          </Col>
          <Col className='mx-4'>
            <h1 className='text-center'>Your Orders</h1>
            <hr />
            {loadingOrders && <Loader marginTop='5' />}
            {ordersDetails.length > 0 && (
              <ListGroup variant='flush'>
                {ordersDetails.map((order) => (
                  <Link to={`/order/${order._id}`}>
                    <ListGroup.Item className='mb-0  pb-2 orange-border-hover'>
                      <Row style={{ height: "12rem" }}>
                        <Col md='6' className='text-left my-0'>
                          <i class='fas fa-fingerprint'> </i> ID: <b>{order._id}</b>
                        </Col>
                        <Col md='6' className='my-0'>
                          <i class='far fa-clock'></i> Date:{" "}
                          <b>{order.createdAt.substring(0, 19).replace("T", " ")}</b>
                        </Col>
                        <Col md='6' className='text-left my-0'>
                          <i class='fas fa-money-bill-wave'></i> Value: <b>{order.totalPrice} PLN</b>
                        </Col>
                        <Col md='6' className='text-left my-0'>
                          <i class='fas fa-spinner'></i> Status:{" "}
                          {order.isPaid ? <b>Paid</b> : <b> Not Paid</b>}
                        </Col>
                        <Row style={{ height: "8rem" }} className=' mx-4 py-0  d-flex align-items-center'>
                          {order.orderItems.map(
                            (orderItem, index) =>
                              index <= 5 && (
                                <Col xs='2' className='py-0 m-0 px-1'>
                                  <Image className='mb-3' fluid src={orderItem.image}></Image>
                                </Col>
                              )
                          )}
                        </Row>
                      </Row>
                    </ListGroup.Item>
                  </Link>
                ))}
              </ListGroup>
            )}
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProfileScreen;
