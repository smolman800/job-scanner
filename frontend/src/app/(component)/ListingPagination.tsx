'use client';
import ReactPaginate from 'react-paginate';
import styles from './styles/ListingPagination.module.css';

export default function ListingPagination({
  totalItem,
  setPage,
}: {
  totalItem: number;
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
      pageCount={Math.ceil(totalItem / 9)}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={handlePageClick}
      containerClassName={styles['pagination']}
      activeClassName={'active'}
    />
  );
}
