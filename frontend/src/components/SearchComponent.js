import React from "react";
import { Col, Form, FormControl, Button } from "react-bootstrap";

const SearchComponent = ({ keyword, setKeyword, searchHandler, placeholder }) => {
  return (
    <Form inline onSubmit={searchHandler} className='my-2 justify-content-center'>
      <Col sm={10} xl={10} xs={7} className='m-0 p-0'>
        <FormControl
          size='lg'
          style={{ width: "100%" }}
          type='text'
          placeholder={placeholder}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className='mr-3'
        />
      </Col>
      <Col xs={3} sm={2} xl={2}>
        <Button
          block
          type='submit'
          variant='primary'
          size='lg'
          style={{ minWidth: "4rem", maxWidth: "9rem" }}>
          <i className='fas fa-search pt-1' style={{ fontSize: "1.5rem" }}></i>
        </Button>
      </Col>
    </Form>
  );
};

export default SearchComponent;
