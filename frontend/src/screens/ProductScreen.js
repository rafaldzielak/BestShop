import React, { useEffect } from "react";
import { Row, Col, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../actions/productActions";
import Loader from "../components/Loader";
import AddToCartCounter from "../components/AddToCartCounter";

const ProductScreen = ({ match }) => {
  const productId = match.params.id;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProduct(productId));
  }, [dispatch, productId]);

  const listProduct = useSelector((state) => state.listProduct);
  const { error, loading, product } = listProduct;

  return (
    <>
      {loading && <Loader marginTop={10} />}
      {error && <div>{error}</div>}
      {product && (
        <>
          <Row className='px-3 py-2 justify-content-center'>
            <h1>{product.name}</h1>
          </Row>
          <Row className='d-flex align-content-center'>
            <Col xs={6} className='d-flex align-content-center'>
              <Image src={product.image} fluid rounded style={{ objectFit: "scale-down" }} />
            </Col>
            <Col sm={6}>
              <Card style={{ height: "100%" }}>
                <Card.Body className='flex-spread' style={{ minHeight: "40vh" }}>
                  <Card.Text>
                    <p className='px-3 desc'>{product.description}</p>
                  </Card.Text>
                  <AddToCartCounter product={product} />
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
