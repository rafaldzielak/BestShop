import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { Card, DropdownButton, Row, Col, Dropdown, Form, FormControl, Button } from "react-bootstrap";
import { Link, useParams, useHistory } from "react-router-dom";
import Rating from "../components/Rating";
import { getProducts } from "../actions/productActions";

const ProductGridScreen = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");

  const [sort, setSort] = useState("");

  const listProducts = useSelector((state) => state.listProducts);
  const { loading, products } = listProducts;

  const [sortedProducts, setSortedProducts] = useState(products);
  const [colSize, setColSize] = useState(3);

  useEffect(() => {
    if (!keyword) dispatch(getProducts());
  }, [dispatch, keyword]);

  useEffect(() => {
    setSortedProducts(products);
  }, [products]);

  const toggleGrid = () => {
    if (colSize === 3) setColSize(4);
    else setColSize(3);
  };

  const sortByPrice = () => setSortedProducts((prev) => [...prev.sort((a, b) => a.price - b.price)]);
  const sortByRating = () => setSortedProducts((prev) => [...prev.sort((a, b) => b.rating - a.rating)]);

  const searchHandler = (e) => {
    e.preventDefault();
    dispatch(getProducts(keyword));
    history.push(`/search/${keyword}`);
    console.log("search");
  };

  return (
    <>
      <Row className='flex-sort mx-2'>
        <Col lg={10} xs={9} sm={8}>
          <Form inline onSubmit={searchHandler} className='my-2 justify-content-center'>
            <Col xs={9} sm={10} xl={11} style={{ margin: "0", padding: "0" }}>
              <FormControl
                size='lg'
                style={{ width: "100%" }}
                type='text'
                placeholder='Search For Products'
                required
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className='mr-3'
              />
            </Col>
            <Col xs={3} sm={2} xl={1}>
              <Button type='submit' variant='primary' size='lg'>
                Search
              </Button>
            </Col>
          </Form>
        </Col>
        <Col lg={1} sm={2} xs={0} className='d-none d-sm-block'>
          <i
            onClick={() => toggleGrid()}
            className={`fas fa-3x ${colSize === 3 ? "fa-th-large" : "fa-th"}`}></i>
        </Col>
        <Col lg={1} sm={2} xs={3}>
          <DropdownButton id='dropdown-variants-primary' variant='' title={<i className='fas fa-filter'></i>}>
            <Dropdown.Item className='border-bottom' onClick={sortByPrice}>
              <i className='fas fa-dollar-sign'></i> <i className='fas fa-dollar-sign'></i>{" "}
              <i className='fas fa-dollar-sign'></i>
            </Dropdown.Item>
            <Dropdown.Item style={{ fontSize: "1.6rem" }} onClick={sortByRating}>
              <i className='fas fa-star'></i> <i className='fas fa-star'></i> <i className='fas fa-star'></i>
            </Dropdown.Item>
          </DropdownButton>
        </Col>
      </Row>
      {loading ? (
        <Loader marginTop={10} animation='border' variant='warning' />
      ) : (
        <Row>
          {products &&
            sortedProducts.map((product) => (
              <Col key={product._id} sm={colSize + 3} md={colSize + 1} lg={colSize}>
                <Link to={`/product/${product._id}`}>
                  <Card className='my-2 p-2 rounded bg-light border-hover'>
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
                        <Rating rating={product.rating} numReviews={`${product.numReviews} reviews`} />
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
      )}
    </>
  );
};

export default ProductGridScreen;
