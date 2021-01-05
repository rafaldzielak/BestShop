import React from "react";

import { Spinner } from "react-bootstrap";

const Loader = ({ marginTop = 0, small }) => {
  return (
    <Spinner
      animation='border'
      role='status'
      variant='warning'
      style={{
        width: small ? "40px" : "150px",
        height: small ? "40px" : "150px",
        margin: "auto",
        display: "block",
        marginTop: `${marginTop}rem`,
      }}>
      <span className='sr-only'> Loading...</span>
    </Spinner>
  );
};

export default Loader;
