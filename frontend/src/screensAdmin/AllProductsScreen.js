import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import SearchComponent from "../components/SearchComponent";
import { useHistory } from "react-router-dom";
import Paginate from "../components/Paginate";

const AllProductsScreen = () => {
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");

  const loginUser = useSelector((state) => state.loginUser);
  const { loggedUser } = loginUser;
  const history = useHistory();
  const dispatch = useDispatch();

  const listProducts = useSelector((state) => state.listProducts);
  const { loading, error, products, pagination } = listProducts;

  const successTick = <i style={{ fontSize: "1.2rem" }} className='text-success fas fa-check-circle'></i>;
  const failureCross = <i style={{ fontSize: "1.2rem" }} className='text-danger fas fa-times-circle'></i>;
  const editIcon = (
    <i className='far fa-edit text-warning' style={{ fontSize: "1.2rem", cursor: "pointer" }}></i>
  );

  useEffect(() => {
    if (!loggedUser || !loggedUser.isAdmin) history.push("/login");
    else dispatch(getProducts({ hidden: true, page, limit: 50 }));
  }, [dispatch, history, loggedUser, page]);

  const searchHandler = (e) => {
    e.preventDefault();
    dispatch(getProducts({ keyword, hidden: true }));
  };

  return (
    <>
      <SearchComponent
        keyword={keyword}
        setKeyword={setKeyword}
        placeholder={"Search for Products"}
        searchHandler={searchHandler}
      />
      {error && <Message>{error}</Message>}

      <div className='add-new'>
        <Link to='/admin/categories/add' className='mr-auto'>
          <Button className='pt-3'>
            <h5>
              <i className='fas fa-plus'></i> Add New Category
            </h5>
          </Button>
        </Link>
        <h3 className='m-auto'>All Products</h3>
        <Link to='/admin/products/add' className='ml-auto'>
          <Button className='pt-3'>
            <h5>
              <i className='fas fa-plus'></i> Add New Product
            </h5>
          </Button>
        </Link>
      </div>
      {loading && <Loader marginTop={8} />}
      {products && products.length > 0 && (
        <Table responsive striped hover size='sm' className='text-center'>
          <thead>
            <tr style={{ fontSize: "1rem" }}>
              <th className='text-left'>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>In Stock</th>
              <th>Rating</th>
              <th>Reviews</th>
              <th>ID</th>
              <th>Added</th>
              <th style={{ width: "60px" }}>Visible</th>
              <th style={{ width: "60px" }} className='border-left'>
                Edit
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td className='text-left'>
                  <Link to={`/product/${product._id}`}>{product.name}</Link>
                </td>
                <td className='text-right'>
                  <b>{product.price}</b> PLN
                </td>
                <td>{product.category ? product.category.name : failureCross}</td>
                <td>{product.countInStock > 0 ? <b>{product.countInStock}</b> : failureCross}</td>
                <td>{product.rating.toFixed(2)}</td>
                <td>{product.numReviews}</td>

                <td>{product._id}</td>
                <td>{product.createdAt.slice(0, 19).replace("T", " ")}</td>
                <td>{product.hidden ? failureCross : successTick}</td>
                <td className='border-left'>
                  <span onClick={() => history.push(`/admin/products/edit/${product._id}`)}> {editIcon}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <Paginate pagination={pagination} setPage={setPage}></Paginate>
    </>
  );
};

export default AllProductsScreen;
