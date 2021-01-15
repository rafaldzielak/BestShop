import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const OrderProgress = ({ ship }) => {
  const arrowRight = <i className={`d-none d-sm-block grey-font fas fa-long-arrow-alt-right fa-3x`}></i>;
  return (
    <>
      <nav className='d-flex justify-content-center'>
        <Row style={{ maxWidth: "500px" }} className='mt-4 mb-0'>
          <Col className='text-center mx-0 px-0' style={{ width: "100px" }}>
            <Link to='/cart'>
              <i className='orange-font fas fa-shopping-cart fa-3x'></i>
            </Link>
          </Col>
          {arrowRight}
          <Col className='text-center  mx-0 px-0' style={{ width: "100px" }}>
            <i className={`${ship ? "orange" : "grey"}-font fas fa-shipping-fast fa-3x`}></i>
          </Col>
          {arrowRight}
          <Col className='text-center  mx-0 px-0' style={{ width: "100px" }}>
            <i className='grey-font fas fa-check-circle fa-3x'></i>
          </Col>
        </Row>
      </nav>
    </>
  );
};

export default OrderProgress;
