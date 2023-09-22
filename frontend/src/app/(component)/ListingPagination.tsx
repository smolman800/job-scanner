'use client';
import ReactPaginate from 'react-paginate';
import styles from './styles/ListingPagination.module.css';

export default function ListingPagination({
  totalPages,
  setPage,
}: {
  totalPages: number;
  setPage: (page: number) => void;
}) {
  function handlePageClick(e: { selected: number }) {
    const selectedPage = e.selected + 1;
    setPage(selectedPage);
  }

  return (
    <ReactPaginate
      previousLabel={'← Prev'}
      nextLabel={'Next →'}
      breakLabel={'...'}
      breakClassName={'break-me'}
      pageCount={totalPages}
      marginPagesDisplayed={2}
      pageRangeDisplayed={3}
      onPageChange={handlePageClick}
      containerClassName={styles['pagination']}
      activeClassName={styles['active']}
    />
  );
}
