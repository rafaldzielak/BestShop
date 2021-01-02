import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { Card, DropdownButton, Row, Col, Dropdown, Form, FormControl, Button } from "react-bootstrap";
import { Link, useHistory, useParams } from "react-router-dom";
import Rating from "../components/Rating";
import { getProducts } from "../actions/productActions";
import SearchComponent from "../components/SearchComponent";

const ProductGridScreen = () => {
  const { keyword: key } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState(key || "");

  const [sort, setSort] = useState("");

  const listProducts = useSelector((state) => state.listProducts);
  const { loading, products } = listProducts;

  const [sortedProducts, setSortedProducts] = useState(products);
  const [colSize, setColSize] = useState(3);

  const getProds = () => {
    dispatch(getProducts(keyword, sort));
  };

  useEffect(() => {
    getProds();
  }, [dispatch, sort]);

  useEffect(() => {
    setSortedProducts(products);
  }, [products]);

  const toggleGrid = () => {
    if (colSize === 3) setColSize(4);
    else setColSize(3);
  };

  const searchHandler = (e) => {
    e.preventDefault();
    getProds();
    keyword ? history.push(`/search/${keyword}`) : history.push("/");
  };

  const showSearchAndFilter = () => (
    <Row className='flex-sort mx-0'>
      <Col lg={10} xs={9} sm={8}>
        <SearchComponent
          keyword={keyword}
          setKeyword={setKeyword}
          placeholder='Search for Products'
          searchHandler={searchHandler}></SearchComponent>
      </Col>
      <Col lg={1} sm={2} xs={0} className='d-none d-sm-block'>
        <i
          onClick={() => toggleGrid()}
          className={`fas fa-3x ${colSize === 3 ? "fa-th-large" : "fa-th"}`}></i>
      </Col>
      <Col lg={1} sm={2} xs={3}>
        <DropdownButton id='dropdown-variants-primary' variant='' title={<i className='fas fa-filter'></i>}>
          <Dropdown.Item className='border-bottom' onClick={() => setSort("price")}>
            <i className='fas fa-dollar-sign'></i> <i className='fas fa-dollar-sign'></i>{" "}
            <i className='fas fa-dollar-sign'></i>
          </Dropdown.Item>
          <Dropdown.Item style={{ fontSize: "1.6rem" }} onClick={() => setSort("rating")}>
            <i className='fas fa-star'></i> <i className='fas fa-star'></i> <i className='fas fa-star'></i>
          </Dropdown.Item>
        </DropdownButton>
      </Col>
    </Row>
  );

  const showProducts = () => (
    <Row>
      {products &&
        sortedProducts.map((product) => (
          <Col key={product._id} sm={colSize + 3} md={colSize + 1} lg={colSize}>
            <Link to={`/product/${product._id}`}>
              <Card className='my-2 py-2 rounded bg-light border-hover'>
                <Card.Img
                  src={product.image}
                  variant='top'
                  style={{ height: "250px", objectFit: "scale-down" }}
                />
                <Card.Body>
                  <Card.Title as='div' className='py-0'>
                    <strong className='two-lines'>{product.name}</strong>
                  </Card.Title>
                  <Card.Text as='div' className='py-0'>
                    <Rating
                      rating={product.rating}
                      numReviews={`${product.numReviews} ${product.numReviews === 1 ? "review" : "reviews"}`}
                    />
                  </Card.Text>
                  <Card.Text as='h4' className='py-1'>
                    {product.price} PLN
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
    </Row>
  );

  return (
    <>
      {showSearchAndFilter()}
      {loading ? <Loader marginTop={10} animation='border' variant='warning' /> : showProducts()}
    </>
  );
};

export default ProductGridScreen;
