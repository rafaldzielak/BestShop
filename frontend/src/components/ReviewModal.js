import React, { useState } from "react";
import { Modal, Button, Form, Image, Col, Row } from "react-bootstrap";

const ReviewModal = (props) => {
  const product = props.product;
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewDetails, setReviewDetails] = useState("");
  const [rating, setRating] = useState(0);
  const [tempRating, setTempRating] = useState(0);
  const fullStar = <i style={{ fontSize: "2rem" }} className='fas fa-star'></i>;
  const emptyStar = <i style={{ fontSize: "2rem" }} className='far fa-star'></i>;

  const setUserRating = () => (
    <div className='text-center'>
      <span
        onClick={() => setRating(1)}
        onMouseEnter={() => setTempRating(1)}
        onMouseLeave={() => setTempRating(0)}>
        {tempRating ? (tempRating >= 1 ? fullStar : emptyStar) : rating >= 1 ? fullStar : emptyStar}
      </span>
      <span
        onClick={() => setRating(2)}
        onMouseLeave={() => setTempRating(0)}
        onMouseEnter={() => setTempRating(2)}>
        {tempRating ? (tempRating >= 2 ? fullStar : emptyStar) : rating >= 2 ? fullStar : emptyStar}
      </span>
      <span
        onClick={() => setRating(3)}
        onMouseLeave={() => setTempRating(0)}
        onMouseEnter={() => setTempRating(3)}>
        {tempRating ? (tempRating >= 3 ? fullStar : emptyStar) : rating >= 3 ? fullStar : emptyStar}
      </span>
      <span
        onClick={() => setRating(4)}
        onMouseLeave={() => setTempRating(0)}
        onMouseEnter={() => setTempRating(4)}>
        {tempRating ? (tempRating >= 4 ? fullStar : emptyStar) : rating >= 4 ? fullStar : emptyStar}
      </span>
      <span
        onClick={() => setRating(5)}
        onMouseLeave={() => setTempRating(0)}
        onMouseEnter={() => setTempRating(5)}>
        {tempRating ? (tempRating >= 5 ? fullStar : emptyStar) : rating >= 5 ? fullStar : emptyStar}
      </span>
    </div>
  );

  const submitReview = (e) => {
    e.preventDefault();
    //REQUEST TO ACTION
  };

  return (
    <Modal {...props} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          <Row>
            <Col sm={2}>{<Image fluid src={product.image}></Image>}</Col>
            <Col sm={10} className='my-auto'>
              {product.name}
            </Col>
          </Row>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form style={{ maxWidth: "600px" }} className='container'>
          <h5 className='text-center'>Your Rating:</h5>
          {setUserRating()}
          <br />
          <h5 className='text-center'>Review Title:</h5>
          <Form.Group controlId='exampleForm.ControlTextarea1'>
            <Form.Control
              required
              placeholder='Review Title'
              value={reviewTitle}
              onChange={(e) => setReviewTitle(e.target.value)}
            />
          </Form.Group>
          <h5 className='text-center'>Review Details:</h5>
          <Form.Group controlId='exampleForm.ControlTextarea1'>
            <Form.Control
              required
              as='textarea'
              rows={3}
              placeholder='Please Write Your Review Here'
              value={reviewDetails}
              onChange={(e) => setReviewDetails(e.target.value)}
            />
          </Form.Group>
          <Button variant='primary' block type='submit' onClick={submitReview}>
            Submit
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReviewModal;
