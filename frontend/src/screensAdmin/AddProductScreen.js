import React, { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Form, Button, Image } from "react-bootstrap";
import { createProductAction } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Link } from "react-router-dom";

const AddProductScreen = ({ history }) => {
  const [validated, setValidated] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);

  const dispatch = useDispatch();

  const createProductState = useSelector((state) => state.createProduct);
  const { product, loading, error } = createProductState;

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);
    const product = { name, description, countInStock, image, brand, category, price };
    dispatch(createProductAction(product));
  };

  const imagePlaceholder = "https://lunawood.com/wp-content/uploads/2018/02/placeholder-image.png";

  return (
    <>
      {error && <Message>error</Message>}
      {loading && <Loader small />}
      {product && (
        <Link to={`/product/${product._id}`}>
          <Message variant='success'>Product created! ID: {product._id}</Message>
        </Link>
      )}
      <h2 className='text-center my-4'>Add Product</h2>
      <Row className='py-5 px-4'>
        <Col sm='5' className='py-5 border-right'>
          <Image rounded style={{ maxHeight: "600px" }} fluid src={image || imagePlaceholder}></Image>
          {/* style={{ width: "100%", height: "300px" }} */}
          <Form.Group sm='12' className='py-4 px-0 mx-0 align-self-end'>
            <Form.Control
              type='text'
              placeholder='Image'
              required
              size='lg'
              onChange={(e) => setImage(e.target.value)}
              value={image}
            />
          </Form.Group>
        </Col>
        <Col lg={7} xl={7} sm={7} className='text-center'>
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            id='ship-form'
            style={{ fontSize: "1rem" }}>
            <Form.Row className='py-3'>
              <Form.Group as={Col} md='8' className='py-4'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  required
                  type='text'
                  placeholder='Name'
                  size='lg'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group as={Col} lg='2' sm='2' className='py-4'>
                <Form.Label>In Stock</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='In Stock'
                  required
                  size='lg'
                  onChange={(e) => setCountInStock(e.target.value)}
                  value={countInStock}
                />
              </Form.Group>
              <Form.Group as={Col} md='2' className='py-4'>
                <Form.Label>Price (PLN)</Form.Label>
                <Form.Control
                  required
                  type='number'
                  placeholder='Price (PLN)'
                  size='lg'
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                />
              </Form.Group>
              <Form.Group as={Col} md='8' className='py-4'>
                <Form.Label>Category</Form.Label>
                <Form.Control
                  required
                  placeholder='Category'
                  size='lg'
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                />
              </Form.Group>

              <Form.Group as={Col} lg='4' md='3' className='py-4'>
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Brand'
                  required
                  size='lg'
                  onChange={(e) => setBrand(e.target.value)}
                  value={brand}
                />
              </Form.Group>
              <Form.Group as={Col} md='12' className='py-4'>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  style={{ height: "200px" }}
                  required
                  as='textarea'
                  placeholder='Description'
                  size='lg'
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                />
              </Form.Group>
            </Form.Row>
            <Button type='submit' form='ship-form' block size='lg' className='m-0 pt-3 px-0'>
              <h4>Submit Product</h4>
            </Button>
          </Form>
        </Col>
        <hr />
      </Row>
    </>
  );
};

export default AddProductScreen;
