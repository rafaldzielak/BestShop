import React from "react";
import { Pagination } from "react-bootstrap";
const Paginate = ({ pagination, setPage }) => {
  const { page, next, prev, total, limit } = pagination;
  console.log(pagination);

  const setPagePrevious = () => {
    console.log("prev");
    if (page > 1) setPage(page - 1);
  };

  const showPages = () => (
    <>
      <Pagination.Item onClick={() => setPage(page - 1)} disabled={!prev}>
        <i class='fas fa-chevron-left'></i>
      </Pagination.Item>
      {page > 1 && <Pagination.Item onClick={() => setPage(1)}>1</Pagination.Item>}
      {page === 3 ? (
        <>
          <Pagination.Item onClick={() => setPage(2)}>2</Pagination.Item>
        </>
      ) : (
        page > 3 && (
          <>
            <Pagination.Ellipsis></Pagination.Ellipsis>
            <Pagination.Item onClick={() => setPage(prev)}>{prev}</Pagination.Item>
          </>
        )
      )}

      <Pagination.Item active>{page}</Pagination.Item>
      {next && <Pagination.Item onClick={() => setPage(next)}>{next}</Pagination.Item>}
      {total > (page + 2) * limit ? (
        <>
          <Pagination.Ellipsis></Pagination.Ellipsis>
          <Pagination.Item onClick={() => setPage(total / limit)}>{total / limit}</Pagination.Item>
        </>
      ) : (
        total > (page + 1) * limit && (
          <>
            <Pagination.Item onClick={() => setPage(page + 2)}>{page + 2}</Pagination.Item>
          </>
        )
      )}
      <Pagination.Item disabled={!next} onClick={() => setPage(page + 1)}>
        <i class='fas fa-chevron-right'></i>
      </Pagination.Item>
    </>
  );

  return (
    <Pagination className='justify-content-center ' size='lg'>
      {showPages()}
    </Pagination>
  );
};

export default Paginate;
