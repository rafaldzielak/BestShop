import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { Card, DropdownButton, Row, Col, Dropdown } from "react-bootstrap";
import { Link, useHistory, useParams, useLocation } from "react-router-dom";
import Rating from "../components/Rating";
import { getProducts } from "../actions/productActions";
import SearchComponent from "../components/SearchComponent";
import CategoryComponent from "../components/CategoryComponent";
import CurrentPathComponent from "../components/CurrentPathComponent";
import Pagination from "../components/Paginate";

const ProductGridScreen = () => {
  const { keyword: key } = useParams();
  const { category } = useParams();

  const history = useHistory();
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState(key || "");
  const [page, setPage] = useState(1);

  const [sort, setSort] = useState("");

  const listProducts = useSelector((state) => state.listProducts);
  const { loading, products, pagination } = listProducts;

  const [sortedProducts, setSortedProducts] = useState(products);
  const [colSize, setColSize] = useState(3);

  useEffect(() => {
    dispatch(
      getProducts({
        keyword: key || "",
        sort,
        category,
        page,
      })
    );
  }, [dispatch, sort, key, category, page]);

  useEffect(() => {
    setSortedProducts(products);
  }, [products]);

  const toggleGrid = () => {
    if (colSize === 3) setColSize(4);
    else setColSize(3);
  };

  const searchHandler = (e) => {
    e.preventDefault();
    dispatch(getProducts({ keyword, sort }));
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
    <Row className='mx-0 px-0'>
      {products &&
        sortedProducts.map((product) => (
          <Col
            className='mx-0 px-2'
            key={product._id}
            sm={colSize + 3}
            md={colSize + 3}
            lg={colSize + 1}
            xl={colSize}>
            <Link to={`/product/${product._id}`}>
              <Card className='my-2 py-2 rounded bg-light border-hover'>
                <Card.Img
                  className='px-1 py-1'
                  src={product.image}
                  variant='top'
                  style={{ height: "250px", objectFit: "scale-down" }}
                />
                <Card.Body>
                  <Card.Title as='div' className='py-0  text-center'>
                    <strong className='two-lines' style={{ fontSize: "1rem" }}>
                      {product.name}
                    </strong>
                  </Card.Title>
                  <Card.Text as='div' className='py-0  text-center'>
                    <Rating
                      rating={product.rating}
                      numReviews={`${product.numReviews} ${product.numReviews === 1 ? "review" : "reviews"}`}
                    />
                  </Card.Text>
                  <Card.Text as='h4' className='py-1  text-center'>
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
      <Row>
        <Col>
          <CurrentPathComponent />
        </Col>
      </Row>
      <Row>
        <Col lg={2} md={3} className='pr-0'>
          <CategoryComponent startCategory={category} keyword={keyword} />
        </Col>
        <Col lg={10} md={9}>
          {loading ? <Loader marginTop={10} animation='border' variant='warning' /> : showProducts()}
        </Col>
      </Row>
      {!loading && <Pagination setPage={setPage} pagination={pagination} />}
    </>
  );
};

export default ProductGridScreen;
