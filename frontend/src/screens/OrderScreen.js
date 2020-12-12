import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderAction } from "../actions/orderActions";
import { Row, Col, ListGroup, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

const OrderScreen = ({ match }) => {
  const dispatch = useDispatch();
  const orderGet = useSelector((state) => state.orderGet);
  const { orderDetails, loading } = orderGet;

  useEffect(() => {
    dispatch(getOrderAction(match.params.id));
  }, [dispatch]);
  return (
    <>
      <Row className='my-3'>
        <Col md={8} className='text-center border-right'>
          <h2>Order</h2>
          {loading && <Loader />}
          <ListGroup variant='flush'>
            {orderDetails &&
              orderDetails.orderItems.map((orderItem) => (
                <ListGroup.Item key={orderItem._id}>
                  <Row className='d-flex align-items-center'>
                    <Col lg={3} xs={3} className='py-0 pr-4 d-flex justify-content-center'>
                      <Link to={`/product/${orderItem._id}`}>
                        <Image
                          fluid
                          rounded
                          src={orderItem.image}
                          style={{ height: "10rem", objectFit: "scale-down" }}></Image>
                      </Link>
                    </Col>
                    <Col lg={5} xs={8} className='pl-0 pr-0 text-left' style={{ fontSize: "1.1rem" }}>
                      <Link className='py-4' to={`/product/${orderItem._id}`}>
                        {orderItem.name}
                      </Link>
                    </Col>
                    <Col lg={4} xs={{ span: 6, order: 5 }} className='pr-0 text-right'>
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
          <h2>Payment</h2>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
