import React, { useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addToCartAction, addOneCartAction, removeOneCartAction } from "../actions/cartActions";

const AddToCartCounter = ({ product, numberOfProducts = 1, updateOnClick = false }) => {
  const dispatch = useDispatch();
  const [addToCartCounter, setAddToCartCounter] = useState(numberOfProducts);
  const buttonColSize = updateOnClick ? 12 : 5;

  const addToCartHandler = () => {
    dispatch(addToCartAction(product, addToCartCounter));
  };

  const increaseCount = async () => {
    if (addToCartCounter < product.countInStock) {
      setAddToCartCounter((prev) => prev + 1);
      if (updateOnClick) dispatch(addOneCartAction(product));
    }
  };
  const decreaseCount = () => {
    if (addToCartCounter > 1) {
      setAddToCartCounter((prev) => prev - 1);
      if (updateOnClick) dispatch(removeOneCartAction(product));
    }
  };

  const height = updateOnClick ? "2.5rem" : "4rem";
  const fontSize = updateOnClick ? "1.4rem" : "2rem";

  return (
    <Row className='align-items-end '>
      {product.countInStock > 0 && (
        <Col sm={buttonColSize}>
          <Row className='ml-1'>
            <Col sm={4} className='px-2'>
              <Button
                onClick={decreaseCount}
                variant='primary'
                className={`orange ${addToCartCounter === 1 && "disabled"}`}
                block
                style={{ height, fontSize }}>
                <b>−</b>
              </Button>
            </Col>
            <Col sm={4} className='px-2'>
              <h1 style={{ height, lineHeight: height, fontSize }} className='item-counter ml-auto'>
                {addToCartCounter}
              </h1>
            </Col>
            <Col sm={4} className='px-2'>
              <Button
                className={`orange ${product.countInStock <= addToCartCounter && "disabled"}`}
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
        <Col sm={7} className='px-4 orange'>
          <Button
            onClick={addToCartHandler}
            variant='primary'
            block
            style={{ height: "4rem", fontSize: "1.8rem" }}>
            Add To Cart
          </Button>
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
