import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllOrdersAction, updateOrderAction } from "../actions/orderActions";
import { Table, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";

const AllOrdersScreen = () => {
  const [user, setUser] = useState(new URLSearchParams(window.location.search).get("user") || "");
  const [notPaidOnly, setNotPaidOnly] = useState(false);
  const [notSentOnly, setNotSentOnly] = useState(false);
  const [notDeliveredOnly, setNotDeliveredOnly] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const orderGetAll = useSelector((state) => state.orderGetAll);
  const { loading, error, orders } = orderGetAll;
  const orderGet = useSelector((state) => state.orderGet);
  const { orderDetails } = orderGet;

  useEffect(() => {
    dispatch(getAllOrdersAction(user, notPaidOnly, notSentOnly, notDeliveredOnly));
  }, [notPaidOnly, notSentOnly, notDeliveredOnly, user, dispatch, orderDetails]);

  useEffect(() => {
    setUser(new URLSearchParams(window.location.search).get("user") || "");
  }, [window.location.search]);

  const successTick = <i style={{ fontSize: "1.2rem" }} className='text-success fas fa-check-circle'></i>;
  const failureCross = <i style={{ fontSize: "1.2rem" }} className='text-danger fas fa-times-circle'></i>;
  const trashIcon = <i style={{ fontSize: "1.2rem" }} className='fas fa-trash'></i>;

  const toggleNotPaid = () => {
    setNotPaidOnly((prev) => !prev);
    setNotSentOnly(false);
    setNotDeliveredOnly(false);
  };
  const toggleNotSent = () => {
    setNotPaidOnly(false);
    setNotSentOnly((prev) => !prev);
    setNotDeliveredOnly(false);
  };
  const toggleNotDelivered = () => {
    setNotPaidOnly(false);
    setNotSentOnly(false);
    setNotDeliveredOnly((prev) => !prev);
  };

  const deleteOrder = (id) => {
    if (window.confirm("Are you sure to delete that order?")) {
      dispatch(updateOrderAction(id, { isDeleted: true }));
    }
  };
  return (
    <>
      <Row>
        {user && (
          <Col sm={1} className='py-3'>
            <Button block onClick={() => history.push("/admin/orders")}>
              <i class='fas fa-arrow-left'></i>
            </Button>
          </Col>
        )}
        <Col sm={user ? 11 : 12}>
          <h3 className='text-center'>
            {notPaidOnly ? "Not Paid" : notSentOnly ? "Not Sent" : notDeliveredOnly ? "Not Delivered" : "All"}{" "}
            Orders
          </h3>
        </Col>
      </Row>
      <Row className='pb-3'>
        <Col sm={4}>
          <Button block variant={notPaidOnly ? "info" : "primary"} onClick={toggleNotPaid}>
            Show Not Paid Only
          </Button>
        </Col>
        <Col sm={4}>
          <Button block variant={notSentOnly ? "info" : "primary"} onClick={toggleNotSent}>
            Show Not Sent Only
          </Button>
        </Col>
        <Col sm={4}>
          <Button block variant={notDeliveredOnly ? "info" : "primary"} onClick={toggleNotDelivered}>
            Show Not Delivered Only
          </Button>
        </Col>
      </Row>
      {loading && <Loader marginTop={8} />}
      {error && <Message>{error}</Message>}
      {orders && (
        <Table responsive striped hover size='sm' className='text-center'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Order Date</th>
              <th>User</th>
              <th>Items</th>
              <th>Total Value</th>
              <th style={{ width: "50px" }}>Paid</th>
              <th style={{ width: "50px" }}>Sent</th>
              <th style={{ width: "50px" }}>Delivered</th>
              <th style={{ width: "50px" }}></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>
                  <Link to={`/order/${order._id}`}>{order._id}</Link>
                </td>
                <td>{order.createdAt.slice(0, 19).replace("T", " ")}</td>
                <td>
                  <Link to={`/admin/orders?user=${order.user._id}`}>{order.user.email}</Link>
                </td>
                <td>{order.orderItems.length}</td>
                <td>
                  <b>{order.totalPrice}</b> PLN
                </td>
                <td>{order.isPaid ? successTick : failureCross}</td>
                <td>{order.isDispatched ? successTick : failureCross}</td>
                <td>{order.isDelivered ? successTick : failureCross}</td>
                <td>
                  <span onClick={(e) => deleteOrder(order._id)}>{trashIcon}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default AllOrdersScreen;
