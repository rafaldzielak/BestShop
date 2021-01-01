import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersAction } from "../actions/orderActions";
import { Col, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";

const AllOrdersScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllOrdersAction());
  }, []);
  const orderGetAll = useSelector((state) => state.orderGetAll);
  const { loading, error, orders } = orderGetAll;

  const successTick = <i style={{ fontSize: "1.2rem" }} className='text-success fas fa-check-circle'></i>;
  const failureCross = <i style={{ fontSize: "1.2rem" }} className='text-danger fas fa-times-circle'></i>;
  return (
    <>
      <h3 className='text-center'>All Orders</h3>
      {loading && <Loader marginTop={8} />}
      {error && <Message>{error}</Message>}
      {orders && (
        <Table responsive striped hover size='sm' className='text-center'>
          <tr>
            <th>ID</th>
            <th>Order Date</th>
            <th>User</th>
            <th>Items</th>
            <th>Total Value</th>
            <th style={{ width: "50px" }}>Paid</th>
            <th style={{ width: "50px" }}>Sent</th>
            <th style={{ width: "50px" }}>Delivered</th>
          </tr>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>
                  <Link to={`/order/${order._id}`}>{order._id}</Link>
                </td>
                <td>{order.createdAt.slice(0, 19).replace("T", " ")}</td>
                <td>{order.user}</td>
                <td>{order.orderItems.length}</td>
                <td>
                  <b>{order.totalPrice}</b> PLN
                </td>
                <td>{order.isPaid ? successTick : failureCross}</td>
                <td>{order.isDispatched ? successTick : failureCross}</td>
                <td>{order.isDelivered ? successTick : failureCross}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default AllOrdersScreen;
