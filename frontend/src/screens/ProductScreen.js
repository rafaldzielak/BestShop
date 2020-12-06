import React, { useEffect, useState } from "react";
import { Row, Col, Image, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../actions/productActions";
import Loader from "../components/Loader";
const ProductScreen = ({ match }) => {
  const [addToCartCounter, setAddToCartCounter] = useState(1);

  const productId = match.params.id;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProduct(productId));
  }, [dispatch, productId]);

  const listProduct = useSelector((state) => state.listProduct);
  const { error, loading, product } = listProduct;

  const increaseCount = () => {
    if (addToCartCounter < product.countInStock) setAddToCartCounter((prev) => prev + 1);
  };
  const decreaseCount = () => {
    if (addToCartCounter > 1) setAddToCartCounter((prev) => prev - 1);
  };
  return (
    <>
      {loading && <Loader marginTop={10} />}
      {error && <div>{error}</div>}
      {product && (
        <>
          <Row className='px-3 py-2 justify-content-center'>
            <h1>{product.name}</h1>
          </Row>
          <Row>
            <Col xs={6}>
              <Image src={product.image} fluid rounded />
            </Col>
            <Col sm={6}>
              <Card style={{ height: "100%" }}>
                <Card.Body className='flex-spread'>
                  <Card.Text>
                    <p className='px-3 desc'>{product.description}</p>
                  </Card.Text>

                  <Row className='align-items-end '>
                    <Col sm={6}>
                      <Row className='ml-1'>
                        <Col sm={4} className='px-2'>
                          <Button
                            onClick={decreaseCount}
                            variant='primary'
                            className='orange'
                            block
                            style={{ height: "4rem", fontSize: "3rem" }}>
                            -
                          </Button>
                        </Col>
                        <Col sm={4} className='px-2'>
                          <h1 className='item-counter ml-auto'>{addToCartCounter}</h1>
                        </Col>
                        <Col sm={4} className='px-2'>
                          <Button
                            className='orange'
                            onClick={increaseCount}
                            variant='primary'
                            block
                            style={{ height: "4rem", fontSize: "3rem" }}>
                            +
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                    <Col sm={6} className='px-4 orange'>
                      <Button variant='primary' block style={{ height: "4rem", fontSize: "1.3rem" }}>
                        Add To Cart
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
