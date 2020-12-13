import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderAction } from "../actions/orderActions";
import { Row, Col, ListGroup, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { loadStripe } from "@stripe/stripe-js";
import OrdersStatusBar from "../components/OrdersStatusBar";
import Message from "../components/Message";

const OrderScreen = ({ match }) => {
  const dispatch = useDispatch();
  const orderGet = useSelector((state) => state.orderGet);
  const { orderDetails, loading } = orderGet;

  useEffect(() => {
    dispatch(getOrderAction(match.params.id));
  }, [dispatch]);
  const stripePromise = loadStripe(
    "pk_test_51HxskkJe6gNNlKVJ5jshf7Hj0fX3nmmmiQzLz1fu4u7e6K6SorkOEXbzSaeeUCBGdf8QEAGbuSfT6vdQwVkqtj4500j6tBFuTm"
  );
  const goToPayment = async () => {
    console.log("payment");
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      sessionId: orderDetails.stripeOrderId,
    });
    console.log(error);
  };
  return (
    <>
      <Row className='my-3'>
        <Col md={8} className='text-center border-right'>
          <h2>Order</h2>
          <hr />
          {loading && <Loader marginTop={5} />}
          <ListGroup variant='flush'>
            {orderDetails &&
              orderDetails.orderItems.map((orderItem) => (
                <ListGroup.Item key={orderItem._id}>
                  <Row className='d-flex align-items-center'>
                    <Col lg={3} xs={12} className='py-0 pr-4 d-flex justify-content-center'>
                      <Link to={`/product/${orderItem._id}`}>
                        <Image
                          fluid
                          rounded
                          src={orderItem.image}
                          style={{ height: "10rem", objectFit: "scale-down" }}></Image>
                      </Link>
                    </Col>
                    <Col lg={5} xs={7} className='pl-0 pr-0 text-left' style={{ fontSize: "1.1rem" }}>
                      <Link className='py-4' to={`/product/${orderItem._id}`}>
                        {orderItem.name}
                      </Link>
                    </Col>
                    <Col lg={4} xs={5} className='pr-0 text-right'>
                      <h5 style={{ fontSize: "1.1rem" }}>
                        {orderItem.price} * {orderItem.count} ={" "}
                        {((orderItem.price * orderItem.count * 100) / 100).toFixed(2)} PLN
                      </h5>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            <hr />
          </ListGroup>
        </Col>
        <Col md={4} className='text-center'>
          <h2>Progress</h2>
          <hr />

          {orderDetails && (
            <>
              <div className='my-4'>
                <OrdersStatusBar order={orderDetails} size='big'></OrdersStatusBar>
              </div>
              <Row style={{ fontSize: "1rem" }}>
                <Col md={12} className='text-left my-0'>
                  <i className='fas fa-fingerprint'> </i> Order ID: <b>{orderDetails._id}</b>
                </Col>
                <Col md={12} className='my-0 text-left'>
                  <i className='far fa-clock'></i> Date:{" "}
                  <b>{orderDetails.createdAt.substring(0, 19).replace("T", " ")}</b>
                </Col>
                <Col md={12} className='text-left my-0'>
                  <i className='fas fa-money-bill-wave'></i> Products Value:{" "}
                  <b>{orderDetails.totalPrice} PLN</b>
                </Col>
                <Col md={12} className='text-left my-0'>
                  <i class='fas fa-shipping-fast'></i> Shipping: <b>{orderDetails.shippingPrice} PLN</b>
                </Col>
              </Row>
              <hr />
              <h3 className='mt-3'>Payment</h3>
              <hr />
              {orderDetails.isPaid ? (
                <>
                  <Message variant='success'>Order Paid</Message>
                  <hr />
                  <h3 className='mt-5'>Shipment</h3>
                  <hr />
                  {orderDetails.isDelivered ? (
                    <Message variant='success'>Order Delivered</Message>
                  ) : orderDetails.isDispatched ? (
                    <Message variant='info'>Order Dispatched</Message>
                  ) : (
                    <Message variant='info'>In progress</Message>
                  )}
                </>
              ) : (
                <>
                  <Message>Order Not Paid</Message>
                  <Button block size='lg' onClick={goToPayment}>
                    Pay For Order
                  </Button>
                </>
              )}
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
