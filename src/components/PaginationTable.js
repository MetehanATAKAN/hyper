import React, { useEffect, useState, useMemo } from "react";
import { Form, Pagination } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const PaginationTable = ({
  total ,
  itemsPerPage = 1,
  setItemsPerPage,
  currentPage = 1,
  onPageChange
}) => {

  const { t } = useTranslation();
  const [totalPages, setTotalPages] = useState(0);


  useEffect(() => {
    if (total > 0 && itemsPerPage > 0)
      setTotalPages(Math.ceil(total / itemsPerPage));
  }, [total, itemsPerPage]);

  const paginationItems = useMemo(() => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => onPageChange(i)}
        >
          {i}
        </Pagination.Item>
      );
    }

    return pages;
  }, [totalPages, currentPage, onPageChange]);

  const rowsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
  }

  if (totalPages === 0) return null;

  return (
    <>
    <div className='d-flex justify-content-between pagination-table'>
      <div className="d-flex align-items-center">
        <span className="me-1"> {t('Rows per page')}  </span>
        <div>
          <Form.Select onChange={(e) =>rowsPerPageChange(e)} >
            <option value={50} >50</option>
            <option value={75} >75</option>
            <option value={100} >100</option>
          </Form.Select>
        </div>
      </div>

      <div> {t('page')} {`${currentPage}`} {t('of')} {`${totalPages}`} </div>

      <div>
    <Pagination className="justify-content-end">
      <Pagination.Prev
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />
      {paginationItems}
      <Pagination.Next
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    </Pagination>
    </div>
    </div>
    </>
  );
};

export default PaginationTable;
