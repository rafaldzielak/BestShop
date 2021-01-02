import React from "react";
import { Col, Form, FormControl, Button } from "react-bootstrap";

const SearchComponent = ({ keyword, setKeyword, searchHandler, placeholder }) => {
  return (
    <Form inline onSubmit={searchHandler} className='my-2 justify-content-center'>
      <Col xs={9} sm={10} xl={11} style={{ margin: "0", padding: "0" }}>
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
      <Col xs={3} sm={2} xl={1}>
        <Button type='submit' variant='primary' size='lg'>
          Search
        </Button>
      </Col>
    </Form>
  );
};

export default SearchComponent;
