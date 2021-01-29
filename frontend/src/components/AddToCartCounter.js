import React, { useState } from "react";
import { Row, Col, Button, OverlayTrigger, Popover } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCartAction, addOneCartAction, removeOneCartAction } from "../actions/cartActions";
import { FaCartPlus } from "react-icons/fa";

const AddToCartCounter = ({ product, numberOfProducts = 1, updateOnClick = false }) => {
  const dispatch = useDispatch();
  const [cartCounter, setCartCounter] = useState(product.count || numberOfProducts);
  const [showToolTip, setShowToolTip] = useState(false);
  const buttonColSize = updateOnClick ? 10 : 5;

  const addToCartHandler = () => {
    showToolTipAction();
    dispatch(addToCartAction(product, cartCounter));
  };

  const increaseCount = async () => {
    if (cartCounter < product.countInStock) {
      setCartCounter((prev) => prev + 1);
      if (updateOnClick) dispatch(addOneCartAction(product));
    }
  };
  const decreaseCount = () => {
    if (cartCounter > 1) {
      setCartCounter((prev) => prev - 1);
      if (updateOnClick) dispatch(removeOneCartAction(product));
    }
  };

  const height = updateOnClick ? "2.5rem" : "3.5rem";
  const fontSize = updateOnClick ? "1.4rem" : "2rem";

  const popover = (
    <Popover id='popover-basic' className='my-2' style={{ opacity: 0.93 }}>
      <Link style={{ fontSize: "1.2rem" }} to='/cart'>
        <Popover.Content className='bg-primary py-3 px-5 text-white hover-orange'>
          Added To <i className='fas fa-shopping-cart'></i>
        </Popover.Content>
      </Link>
    </Popover>
  );

  const showToolTipAction = () => {
    setShowToolTip(true);
    setTimeout(() => {
      setShowToolTip(false);
    }, 4000);
  };

  return (
    <Row className={`align-items-end ${!updateOnClick && "mx-5"}`}>
      {product.countInStock > 0 && (
        <Col sm={buttonColSize}>
          <Row className='ml-1'>
            <Col xs={4} className='px-2'>
              <Button
                onClick={decreaseCount}
                variant='primary'
                className={`orange ${cartCounter === 1 && "disabled"}`}
                block
                style={{ height, fontSize }}>
                <b>−</b>
              </Button>
            </Col>
            <Col xs={4} className='px-2'>
              <h1 style={{ height, lineHeight: height, fontSize }} className='item-counter ml-auto'>
                {product.count || cartCounter}
              </h1>
            </Col>
            <Col xs={4} className='px-2'>
              <Button
                className={`orange ${product.countInStock <= cartCounter && "disabled"}`}
                onClick={increaseCount}
                variant='primary'
                block
                style={{ height, fontSize }}>
                +
              </Button>
            </Col>
          </Row>
        </Col>
      )}

      {!updateOnClick && product.countInStock > 0 && (
        <Col xs={12} sm={7} className='pl-4 pr-2 orange margin-small'>
          <OverlayTrigger trigger='click' placement='top' overlay={popover} show={showToolTip}>
            <Button onClick={addToCartHandler} variant='primary' block style={{ height, fontSize: "1.6rem" }}>
              <FaCartPlus /> Add To Cart
            </Button>
          </OverlayTrigger>
        </Col>
      )}
      {!updateOnClick && product.countInStock === 0 && (
        <Col sm={12} className='px-4 '>
          <Button
            disabled
            onClick={addToCartHandler}
            variant='primary'
            block
            style={{ height: "4rem", fontSize: "1.8rem" }}>
            Out of Stock
          </Button>
        </Col>
      )}
    </Row>
  );
};

export default AddToCartCounter;
