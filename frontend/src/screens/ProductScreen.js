import React, { useEffect } from "react";
import { Row, Col, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../actions/productActions";
import Loader from "../components/Loader";
import AddToCartCounter from "../components/AddToCartCounter";
import Rating from "../components/Rating";

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
          <Row className='px-3 py-2 justify-content-center'></Row>
          <Row className='d-flex align-content-center'>
            <Col xl={6} lg={5} sm={12} className='d-flex align-content-center'>
              <Image src={product.image} fluid rounded style={{ objectFit: "scale-down" }} />
            </Col>
            <Col xl={6} lg={7} sm={12}>
              <Card style={{ height: "100%" }}>
                <Card.Body className='flex-spread' style={{ minHeight: "40vh" }}>
                  <div>
                    <h3 className='text-center'>{product.name}</h3> <hr />
                    <h3 className='text-center'>{product.price} PLN</h3>
                    <hr />
                    <p
                      className='mx-2 px-3 py-2 desc text-justify'
                      style={{ maxHeight: "40vh", overflow: "auto" }}>
                      {product.description}
                    </p>
                  </div>
                  <AddToCartCounter product={product} />
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col sm={12} className='text-center'>
              <h2>Reviews</h2>
            </Col>
            <Col sm={12} className='text-center'>
              {console.log(product.reviews)}
              {product.reviews.map((review) => (
                <>
                  <hr style={{ marginTop: "0.5rem", marginBottom: "0.5rem", width: "90%" }} />
                  <Row className='container'>
                    <Col md={4} lg={4}>
                      <Col sm={12}>
                        <h5 style={{ fontWeight: "bold" }}>{review.name}</h5>
                      </Col>
                      <Col sm={12}>
                        <Rating rating={product.rating}></Rating>
                      </Col>
                    </Col>
                    <Col md={8} lg={8} className='my-auto'>
                      <p>{review.comment}</p>
                    </Col>
                  </Row>
                  <br />
                </>
              ))}
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
