import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Form, Button, Image, Modal } from "react-bootstrap";
import {
  createProductAction,
  updateProductAction,
  getProduct,
  updateProductResetAction,
} from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Link, useParams } from "react-router-dom";
import CategoryComponent from "../components/CategoryComponent";

const AddProductScreen = ({ history }) => {
  const [modalShow, setModalShow] = useState(false);
  const onHide = () => setModalShow(false);

  const { id } = useParams();
  const [validated, setValidated] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState({});
  const [price, setPrice] = useState(0);
  const [hidden, setHidden] = useState("");

  const dispatch = useDispatch();

  const createProductState = useSelector((state) => state.createProduct);
  const { product, loading, error } = createProductState;

  const listProduct = useSelector((state) => state.listProduct);
  const { product: productToEdit, loading: loadingProduct, error: errorProduct } = listProduct;

  useEffect(() => {
    if (id) dispatch(getProduct(id));
    return () => dispatch(updateProductResetAction());
  }, [dispatch, id]);

  useEffect(() => {
    if (id && productToEdit) {
      setName(productToEdit.name);
      setDescription(productToEdit.description);
      setCountInStock(productToEdit.countInStock);
      setImage(productToEdit.image);
      setBrand(productToEdit.brand);
      if (productToEdit.category) setCategory(productToEdit.category);
      setPrice(productToEdit.price);
      setHidden(productToEdit.hidden);
    }
  }, [productToEdit, id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);
    const product = { name, description, countInStock, image, brand, category, price, hidden };
    if (productToEdit) product._id = productToEdit._id;
    if (id) dispatch(updateProductAction(id, product));
    else dispatch(createProductAction(product));
  };

  const imagePlaceholder = "https://lunawood.com/wp-content/uploads/2018/02/placeholder-image.png";
  const showFields = () => (
    <>
      <h2 className='text-center my-4'>{id ? "Edit Product" : "Add Product"}</h2>
      <Row className='py-5 px-4'>
        <Col sm='5' className='py-5 border-right'>
          <Image rounded style={{ maxHeight: "600px" }} fluid src={image || imagePlaceholder}></Image>
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
              <Form.Group as={Col} md='7' className='py-4'>
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

              <Form.Group as={Col} md='3' className='py-4'>
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
              <Form.Group as={Col} md='7' className='py-4 '>
                <Form.Label>Category</Form.Label>
                <Form.Control
                  className='pointer'
                  required
                  placeholder='Category'
                  size='lg'
                  onChange={(e) => setCategory(e.target.value)}
                  onClick={() => setModalShow(true)}
                  value={category.name || ""}
                />
              </Form.Group>

              <Form.Group as={Col} lg='3' md='3' className='py-4'>
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

              <Form.Group className='py-4' as={Col} lg='2' md='2'>
                <Form.Label>Visible</Form.Label>
                <Form.Switch
                  onChange={() => setHidden((prev) => !prev)}
                  checked={!hidden}
                  type='switch'
                  id='custom-switch'
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

  const chooseCategoryModal = () => (
    <Modal
      onHide={onHide}
      show={modalShow}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>Choose Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CategoryComponent startCategory={category._id} setCategory={setCategory}></CategoryComponent>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Submit</Button>
      </Modal.Footer>
    </Modal>
  );

  return (
    <>
      <Row>
        {id && (
          <Col sm={1} className='pr-0'>
            <Button block size='lg' onClick={() => history.push("/admin/products")}>
              <i className='fas fa-arrow-left'></i>
            </Button>
          </Col>
        )}
        <Col sm={id ? 11 : 12}>
          {loading && <Loader small />}
          {(error || errorProduct) && <Message>{error || errorProduct}</Message>}
          {product && (
            <Link to={`/product/${product._id}`}>
              <Message variant='success'>
                Product {id ? "updated" : "created"}! ID: {product._id}
              </Message>
            </Link>
          )}
        </Col>
      </Row>
      {loadingProduct ? <Loader marginTop={8} /> : showFields()}
      {chooseCategoryModal()}
    </>
  );
};

export default AddProductScreen;
