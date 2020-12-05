import React from "react";

const Rating = ({ rating, numReviews }) => {
  const fullStar = <i className='fas fa-star'></i>;
  const halfStar = <i className='fas fa-star-half-alt'></i>;
  const emptyStar = <i className='far fa-star'></i>;
  return (
    <>
      {rating >= 0.8 ? fullStar : rating >= 0.3 ? halfStar : emptyStar}
      {rating >= 1.8 ? fullStar : rating >= 1.3 ? halfStar : emptyStar}
      {rating >= 2.8 ? fullStar : rating >= 2.3 ? halfStar : emptyStar}
      {rating >= 3.8 ? fullStar : rating >= 3.3 ? halfStar : emptyStar}
      {rating >= 4.8 ? fullStar : rating >= 4.3 ? halfStar : emptyStar} {numReviews}
    </>
  );
};

export default Rating;
