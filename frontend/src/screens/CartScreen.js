import React, { useEffect, useState } from "react";
import { Row, Col, Image, ListGroup, Button, Card } from "react-bootstrap";
import AddToCartCounter from "../components/AddToCartCounter";
import { removeProductFromCartAction } from "../actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
const CartScreen = () => {
  const freeShippingValue = 200;
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [shippingPrice, setShippingPrice] = useState(9.99);

  const dispatch = useDispatch();

  const cartContentState = useSelector((state) => state.cartContent);
  const { cartContent } = cartContentState;

  useEffect(() => {
    setTotalPrice(cartContent.reduce((previousValue, curr) => previousValue + curr.price * curr.count, 0));
    setTotalItems(cartContent.reduce((previousValue, curr) => previousValue + curr.count, 0));
    setShippingPrice(totalPrice > freeShippingValue ? 0 : 9.99);

    console.log(totalPrice);
  }, [AddToCartCounter, cartContent]);

  const removeFromCartHandler = (product) => {
    dispatch(removeProductFromCartAction(product));
  };
  return (
    <>
      <hr />
      <Row>
        {cartContent.length > 0 ? (
          <>
            <Col md={9} className='px-0'>
              <ListGroup variant='flush'>
                {cartContent.map((product) => (
                  <ListGroup.Item>
                    <Row className='d-flex align-items-center'>
                      <Col sm={3} className='py-0 pr-4'>
                        <Link to={`/product/${product._id}`}>
                          <Image fluid rounded src={product.image}></Image>
                        </Link>
                      </Col>
                      <Col sm={3} className='pl-0 pr-0' style={{ fontSize: "1.1rem" }}>
                        <Link to={`/product/${product._id}`}>{product.name}</Link>
                      </Col>
                      <Col sm={2} className='pl-0 pr-4'>
                        <AddToCartCounter
                          product={product}
                          numberOfProducts={product.count}
                          updateOnClick={true}
                        />
                      </Col>
                      <Col sm={3} className='px-1'>
                        <h5 style={{ fontSize: "1.1rem" }}>
                          {product.price} * {product.count} ={" "}
                          {((product.price * product.count * 100) / 100).toFixed(2)} PLN
                        </h5>
                      </Col>
                      <Col sm={1} className='px-0' onClick={(e) => removeFromCartHandler(product)}>
                        <i className='fas fa-times'></i>
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
            <Col md={3} className='px-3'>
              <Card style={{}} className='py-3'>
                <Card.Body>
                  <Card.Title className='text-center'>
                    <h3>Summary</h3>
                  </Card.Title>
                  <hr />
                  <Card.Text>
                    <h5>Items: {totalItems}</h5>
                  </Card.Text>
                  <Card.Text>
                    <h5>Price: {totalPrice.toFixed(2)} PLN </h5>
                  </Card.Text>
                  <Card.Text>
                    <h5>Shipping: {shippingPrice.toFixed(2)} PLN </h5>
                  </Card.Text>
                  <hr />
                  <Card.Text>
                    <h5>Total Price: {(totalPrice + shippingPrice).toFixed(2)} PLN</h5>
                  </Card.Text>
                  <Button block variant='primary' className='mt-5 py-3 proceed'>
                    Proceed To Checkout
                  </Button>
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
