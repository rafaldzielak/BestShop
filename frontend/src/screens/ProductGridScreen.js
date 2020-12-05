import React, { useState } from "react";
import products from "../products";
import { Card, DropdownButton, Row, Col, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";

const ProductGridScreen = () => {
  console.log(products);
  // const sortedProducts = products;
  const [sortedProducts, setSortedProducts] = useState(products);
  const [colSize, setColSize] = useState(3);

  const toggleGrid = () => {
    if (colSize === 3) setColSize(4);
    else setColSize(3);
  };

  const sortByPrice = () => setSortedProducts((prev) => [...prev.sort((a, b) => a.price - b.price)]);
  const sortByRating = () => setSortedProducts((prev) => [...prev.sort((a, b) => b.rating - a.rating)]);

  return (
    <>
      <div className='flex-sort'>
        <i
          onClick={() => toggleGrid()}
          className={`fas fa-3x ${colSize === 3 ? "fa-th-large" : "fa-th"}`}></i>
        <DropdownButton
          id='dropdown-variants-primary'
          variant='secondary'
          title={<i className='fas fa-filter'></i>}>
          <Dropdown.Item className='border-bottom' onClick={sortByPrice}>
            <i className='fas fa-dollar-sign'></i> <i className='fas fa-dollar-sign'></i>{" "}
            <i className='fas fa-dollar-sign'></i>
          </Dropdown.Item>
          <Dropdown.Item onClick={sortByRating}>
            <i className='fas fa-star'></i>
            <i className='fas fa-star'></i>
            <i className='fas fa-star'></i>
          </Dropdown.Item>
        </DropdownButton>
      </div>

      <Row>
        {sortedProducts.map((product) => (
          <Col key={product._id} md={colSize}>
            <Card className='my-2 p-2 rounded bg-light'>
              <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image} variant='top' />
              </Link>
              <Card.Body>
                <Link to={`/product/${product._id}`}>
                  <Card.Title as='div'>
                    <strong className='two-lines'>{product.name}</strong>
                  </Card.Title>
                  <Card.Text as='div'>
                    <Rating rating={product.rating} numReviews={`${product.numReviews} reviews`} />
                  </Card.Text>
                  <Card.Text as='h3' className='py-3'>
                    {product.price} PLN
                  </Card.Text>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default ProductGridScreen;
