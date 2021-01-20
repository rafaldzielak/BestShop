import React, { useMemo, useEffect } from "react";
import { Row, Col, Image, ListGroup, Button, Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import AddToCartCounter from "../components/AddToCartCounter";
import OrderProgress from "../components/OrderProgress";
import { removeProductFromCartAction, updateCartItemsAction } from "../actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CartScreen = () => {
  const freeShippingValue = 200;
  const cartContentState = useSelector((state) => state.cartContent);
  const { cartContent } = cartContentState;

  const dispatch = useDispatch();

  const loginUser = useSelector((loginUser) => loginUser.loginUser);
  const { loggedUser } = loginUser;

  const totalItems = useMemo(() => cartContent.reduce((prev, curr) => prev + curr.count, 0), [cartContent]);
  const totalPrice = useMemo(() => cartContent.reduce((prev, curr) => prev + curr.price * curr.count, 0), [
    cartContent,
  ]);
  const shippingPrice = useMemo(() => (totalPrice > freeShippingValue ? 0 : 9.99), [totalPrice]);

  useEffect(() => {
    dispatch(updateCartItemsAction());
  }, [dispatch]);

  const removeFromCartHandler = (product) => dispatch(removeProductFromCartAction(product));

  const showSummary = () => (
    <Col lg={3} md={12} className='px-3'>
      <Card style={{}} className='py-1'>
        <Card.Body>
          <Card.Title className='text-center'>
            <h3>Summary</h3>
          </Card.Title>
          <hr />
          <Card.Text className='flex-spread'>
            <span>Items: </span>
            <span>{totalItems}</span>
          </Card.Text>
          <Card.Text className='flex-spread'>
            <span>Price:</span>
            <span>{totalPrice.toFixed(2)} zł </span>
          </Card.Text>
          <Card.Text className='flex-spread'>
            <span>Shipping: </span>
            <span>{shippingPrice.toFixed(2)} zł </span>
          </Card.Text>
          <hr />
          <Card.Text className='flex-spread'>
            <span>Total Price:</span>
            <span>
              <b>{(totalPrice + shippingPrice).toFixed(2)} zł</b>
            </span>
          </Card.Text>
          <Link to='/checkout'>
            {!loggedUser && (
              <Link to='/login'>
                <Button block variant='primary' size='lg' className='mt-4 py-3 proceed'>
                  Log In To Proceed
                </Button>
              </Link>
            )}
            <Button disabled={!loggedUser} block variant='primary' size='lg' className='mt-4 py-3 proceed'>
              Proceed To Checkout
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );

  const showCartItems = () => (
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
                  {product.countInStock > 0 ? (
                    <AddToCartCounter product={product} updateOnClick={true} />
                  ) : (
                    <h5 className='text-center'>Out of Stock</h5>
                  )}
                </Col>
                <Col lg={{ span: 2, order: 4 }} xs={{ span: 6, order: 5 }} className='px-1'>
                  <h5 style={{ fontSize: "1.1rem" }}>
                    {((product.price * product.count * 100) / 100).toFixed(2)} zł
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
                        <p className='m-2' style={{ fontSize: "1rem" }}>
                          Remove Item From Cart
                        </p>
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
            : `You miss ${(freeShippingValue - totalPrice).toFixed(2)} zł To Get Free Shipping`}
        </h3>
      </Col>
      {showSummary()}
    </>
  );

  return (
    <>
      <OrderProgress cart />
      <hr />
      <Row>
        {cartContent.length > 0 ? (
          showCartItems()
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
