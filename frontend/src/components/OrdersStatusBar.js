import React from "react";
import { Row, Col, ProgressBar } from "react-bootstrap";

const OrdersStatusBar = ({ order, size }) => {
  const baseColSize = size === "small" ? 6 : 12;
  const lgColSize = size === "small" ? 5 : 12;
  const mdColSize = size === "small" ? 4 : 12;
  return (
    <Row className='mr-0'>
      {size === "small" && (
        <Col xl={6} lg={7} md={8} xs={6} className='mx-0'>
          <i className='orange-font fas fa-spinner'></i>{" "}
          {order.isDelivered ? (
            <b className='text-success'>Delivered</b>
          ) : order.isDispatched ? (
            <b className='text-info'>Sent Out</b>
          ) : order.isPaid ? (
            <b>Paid</b>
          ) : (
            <b className='text-danger'> Not Paid</b>
          )}
        </Col>
      )}

      <Col
        xl={baseColSize}
        lg={lgColSize}
        md={mdColSize}
        xs={baseColSize}
        className={`mx-0 pt-1 px-${size === "small" ? 0 : 5}`}>
        <ProgressBar
          style={{ maxHeight: size === "small" ? `0.75rem` : "2rem" }}
          now={order.isDelivered ? 100 : order.isDispatched ? 75 : order.isPaid ? 50 : 25}
          variant={
            order.isDelivered ? "success" : order.isDispatched ? "info" : order.isPaid ? "primary" : "danger"
          }></ProgressBar>
      </Col>
    </Row>
  );
};

export default OrdersStatusBar;
