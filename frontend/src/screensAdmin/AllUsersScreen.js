import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersAction } from "../actions/userActions";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";

const AllUsersScreen = () => {
  // let user = new URLSearchParams(window.location.search).get("user") || "";

  const [user, setUser] = useState(new URLSearchParams(window.location.search).get("user") || "");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsersAction());
  }, [dispatch]);
  const getAllUsers = useSelector((state) => state.getAllUsers);
  const { loading, error, users } = getAllUsers;

  const successTick = <i style={{ fontSize: "1.2rem" }} className='text-success fas fa-check-circle'></i>;
  const failureCross = <i style={{ fontSize: "1.2rem" }} className='text-danger fas fa-times-circle'></i>;
  return (
    <>
      <h3 className='text-center'>All Users</h3>
      {loading && <Loader marginTop={8} />}
      {error && <Message>{error}</Message>}
      {users && (
        <Table responsive striped hover size='sm' className='text-center'>
          <thead>
            <tr>
              <th>ID</th>
              <th>User Registration:</th>
              <th>Email</th>
              <th style={{ width: "50px" }}>Admin</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  <Link to={`/admin/orders?user=${user._id}`}>{user._id}</Link>
                </td>
                <td>{user.createdAt.slice(0, 19).replace("T", " ")}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? successTick : failureCross}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default AllUsersScreen;
