import React, { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Form, Button, Image } from "react-bootstrap";
import { placeOrderAction, placeOrderReset } from "../actions/orderActions";
import Loader from "../components/Loader";

const PayAndShipScreen = ({ history }) => {
  const [validated, setValidated] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");

  const dispatch = useDispatch();

  const freeShippingValue = 200;
  const cartContentState = useSelector((state) => state.cartContent);
  const { cartContent } = cartContentState;

  const orderCreateState = useSelector((state) => state.orderCreate);
  const { id, loading } = orderCreateState;

  useEffect(() => {
    if (id) {
      dispatch(placeOrderReset());
      history.push(`/order/${id}`);
    }
  }, [id, history, dispatch]);

  const itemsPrice = useMemo(
    () => cartContent.reduce((prev, curr) => prev + curr.price * curr.count, 0).toFixed(2),
    [cartContent]
  );
  const shippingPrice = useMemo(() => (itemsPrice > freeShippingValue ? 0 : 9.99), [itemsPrice]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);
    const name = `${firstName} ${lastName}`;
    const shippingAddress = { address, city, postalCode: zipCode, name };
    dispatch(
      placeOrderAction({
        name,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        totalPrice: (parseFloat(itemsPrice) + parseFloat(shippingPrice)).toFixed(2),
        orderItems: cartContent,
        shippingPrice,
      })
    );
  };

  return (
    <>
      {loading ? (
        <Loader marginTop={5} />
      ) : (
        <Row className='py-5 px-4'>
          <Col lg={7} xl={8} sm={12} className='border-right text-center'>
            <h2 className='mb-5'>Enter Your Address</h2>

            <Form
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
              id='ship-form'
              style={{ fontSize: "1rem" }}>
              <Form.Row className='py-3'>
                <Form.Group as={Col} md='6' className='py-4'>
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    required
                    type='text'
                    placeholder='First name'
                    size='lg'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group as={Col} md='6' className='py-4'>
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    required
                    type='text'
                    placeholder='Last name'
                    size='lg'
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                  />
                </Form.Group>
                <Form.Group as={Col} lg='6' sm='12' className='py-4'>
                  <Form.Label>Street Name and Number</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Street Name'
                    required
                    size='lg'
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                  />
                  <Form.Control.Feedback type='invalid'>Please provide a valid city.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} lg='4' md='8' className='py-4'>
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='City'
                    required
                    size='lg'
                    onChange={(e) => setCity(e.target.value)}
                    value={city}
                  />
                  <Form.Control.Feedback type='invalid'>Please provide a valid city.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} lg='2' md='4' className='py-4'>
                  <Form.Label>Zip</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Zip'
                    required
                    size='lg'
                    onChange={(e) => setZipCode(e.target.value)}
                    value={zipCode}
                  />
                  <Form.Control.Feedback type='invalid'>Please provide a valid zip.</Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
              <Form.Group>
                <Form.Check
                  required
                  label='Agree to terms and conditions'
                  feedback='You must agree before submitting.'
                />
              </Form.Group>
            </Form>
          </Col>
          <hr />
          <Col xl={4} lg={5} sm={12} className='text-center'>
            <h2 className='mb-5'>Payment Method</h2>
            <Row
              className={`payment-method m-4 ${paymentMethod === "PayPal" && "active"}`}
              onClick={(e) => setPaymentMethod("PayPal")}>
              <Col className='my-auto'>
                <Image
                  style={{ maxHeight: "45px" }}
                  src='https://logodownload.org/wp-content/uploads/2014/10/paypal-logo-2-1.png'
                  fluid
                />
              </Col>
            </Row>
            <Row
              className={`payment-method m-4 ${paymentMethod === "Stripe" && "active"}`}
              onClick={(e) => setPaymentMethod("Stripe")}>
              <Col className='my-auto'>
                <Image
                  style={{ maxHeight: "60px" }}
                  src='https://www.przelewy24.pl/themes/base/assets/images/przelewy24_logo.svg'
                  fluid
                />
              </Col>
            </Row>
            <Button type='submit' form='ship-form' block size='lg' className='m-4 pt-3 px-5'>
              <h4>Submit Order</h4>
            </Button>
          </Col>
        </Row>
      )}
    </>
  );
};

export default PayAndShipScreen;
