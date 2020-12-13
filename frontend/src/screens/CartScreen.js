import React, { useMemo } from "react";
import { Row, Col, Image, ListGroup, Button, Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import AddToCartCounter from "../components/AddToCartCounter";
import { removeProductFromCartAction } from "../actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";

const CartScreen = () => {
  const freeShippingValue = 200;
  const cartContentState = useSelector((state) => state.cartContent);
  const { cartContent } = cartContentState;

  const totalItems = useMemo(() => cartContent.reduce((prev, curr) => prev + curr.count, 0), [cartContent]);
  const totalPrice = useMemo(() => cartContent.reduce((prev, curr) => prev + curr.price * curr.count, 0), [
    cartContent,
  ]);
  const shippingPrice = useMemo(() => (totalPrice > freeShippingValue ? 0 : 9.99), [totalPrice]);

  const dispatch = useDispatch();

  const removeFromCartHandler = (product) => dispatch(removeProductFromCartAction(product));

  return (
    <>
      <hr />
      <Row>
        {cartContent.length > 0 ? (
          <>
            <Col lg={9} className='px-0'>
              <ListGroup variant='flush'>
                {cartContent.map((product) => (
                  <ListGroup.Item key={product._id}>
                    <Row className='d-flex align-items-center'>
                      <Col
                        lg={{ span: 3, order: 1 }}
                        xs={{ span: 3, order: 1 }}
                        className='py-0 pr-4 d-flex justify-content-center'>
                        <Link to={`/product/${product._id}`}>
                          <Image
                            fluid
                            rounded
                            src={product.image}
                            style={{ height: "10rem", objectFit: "scale-down" }}></Image>
                        </Link>
                      </Col>
                      <Col
                        lg={{ span: 4, order: 2 }}
                        xs={{ span: 8, order: 2 }}
                        className='pl-0 pr-0'
                        style={{ fontSize: "1.1rem" }}>
                        <Link to={`/product/${product._id}`}>{product.name}</Link>
                      </Col>
                      <Col lg={{ span: 2, order: 3 }} xs={{ span: 6, order: 4 }} className='pl-0 pr-4'>
                        <AddToCartCounter product={product} updateOnClick={true} />
                      </Col>
                      <Col lg={{ span: 2, order: 4 }} xs={{ span: 6, order: 5 }} className='px-1'>
                        <h5 style={{ fontSize: "1.1rem" }}>
                          {((product.price * product.count * 100) / 100).toFixed(2)} PLN
                        </h5>
                      </Col>
                      <Col
                        lg={{ span: 1, order: 5 }}
                        xs={{ span: 1, order: 3 }}
                        className='px-0 '
                        onClick={(e) => removeFromCartHandler(product)}>
                        <OverlayTrigger
                          key='top'
                          placement='top'
                          overlay={
                            <Tooltip id={`tooltip-top`} className='my-1 orange-border'>
                              <p className='m-2 '>Remove Item From Cart</p>
                            </Tooltip>
                          }>
                          {/* <Button variant='secondary'>Tooltip on top</Button> */}
                          <i className='fas fa-times orange-border-hover'></i>
                        </OverlayTrigger>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <hr />
              <h3 style={{ textAlign: "center" }}>
                {totalPrice > 200
                  ? "You Qualify For Free Shipping!"
                  : `You miss ${(freeShippingValue - totalPrice).toFixed(2)} PLN To Get Free Shipping`}
              </h3>
            </Col>
            <Col lg={3} md={12} className='px-3'>
              <Card style={{}} className='py-3'>
                <Card.Body>
                  <Card.Title className='text-center'>
                    <h3>Summary</h3>
                  </Card.Title>
                  <hr />
                  <Card.Text>
                    <span>Items: {totalItems}</span>
                  </Card.Text>
                  <Card.Text>
                    <span>Price: {totalPrice.toFixed(2)} PLN </span>
                  </Card.Text>
                  <Card.Text>
                    <span>Shipping: {shippingPrice.toFixed(2)} PLN </span>
                  </Card.Text>
                  <hr />
                  <Card.Text>
                    <span>Total Price: {(totalPrice + shippingPrice).toFixed(2)} PLN</span>
                  </Card.Text>
                  <Link to='/checkout'>
                    <Button block variant='primary' size='lg' className='mt-5 py-3 proceed'>
                      Proceed To Checkout
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          </>
        ) : (
          <h2 className='text-align-center my-5 mx-auto'>
            <p className='my-5'>
              Items added to cart will appear here,{" "}
              <Link className='text-dark' to='/'>
                Go Shopping
              </Link>
            </p>
          </h2>
        )}
      </Row>
    </>
  );
};

export default CartScreen;
