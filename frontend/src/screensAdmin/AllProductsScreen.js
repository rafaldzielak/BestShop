import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, removeProductAction, updateProductAction } from "../actions/productActions";
import { Table, Image } from "react-bootstrap";
import ToggleButton from "react-toggle-button";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import SearchComponent from "../components/SearchComponent";
import { useHistory } from "react-router-dom";

const AllProductsScreen = () => {
  const [keyword, setKeyword] = useState("");
  const loginUser = useSelector((state) => state.loginUser);
  const { loggedUser } = loginUser;
  const history = useHistory();
  const dispatch = useDispatch();

  const listProducts = useSelector((state) => state.listProducts);
  const { loading, error, products } = listProducts;

  const createProduct = useSelector((state) => state.createProduct);
  const { product: updatedProduct } = createProduct;

  const successTick = <i style={{ fontSize: "1.2rem" }} className='text-success fas fa-check-circle'></i>;
  const failureCross = <i style={{ fontSize: "1.2rem" }} className='text-danger fas fa-times-circle'></i>;
  const failureCrossEmpty = <i style={{ fontSize: "1.2rem" }} className='fas fa-times'></i>;
  const trashIcon = <i style={{ fontSize: "1.2rem", cursor: "pointer" }} className='fas fa-trash'></i>;
  const editIcon = (
    <i className='far fa-edit text-warning' style={{ fontSize: "1.2rem", cursor: "pointer" }}></i>
  );

  useEffect(() => {
    if (!loggedUser || !loggedUser.isAdmin) history.push("/login");
    else dispatch(getProducts("", "", true));
  }, [dispatch]);

  useEffect(() => {
    if (updatedProduct) dispatch(getProducts(keyword, "", true));
  }, [updatedProduct]);

  const searchHandler = (e) => {
    e.preventDefault();
    dispatch(getProducts(keyword, "", true));
  };

  const deleteHandler = (product) => {
    console.log("dispatch(updateProductAction(product._id, { hidden: !product.hidden }));");
    dispatch(updateProductAction(product._id, { hidden: !product.hidden }));
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
      <h3 className='text-center'>All Products</h3>

      {loading && <Loader marginTop={8} />}
      {products && products.length > 0 && (
        <Table responsive striped hover size='sm' className='text-center'>
          <thead>
            <tr style={{ fontSize: "1rem" }}>
              <th className='text-left'>Name</th>
              <th>Price</th>
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
                <td>
                  <b>{product.price}</b> PLN
                </td>
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
    </>
  );
};

export default AllProductsScreen;
