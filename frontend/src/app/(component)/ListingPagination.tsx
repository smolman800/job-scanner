'use client';
import ReactPaginate from 'react-paginate';
import styles from './styles/ListingPagination.module.css';

export default function ListingPagination({
  pageCount,
}: {
  pageCount: number;
}) {
  return (
    <ReactPaginate
      previousLabel={'← Previous'}
      nextLabel={'Next →'}
      breakLabel={'...'}
      breakClassName={'break-me'}
      pageCount={Math.ceil(pageCount / 9)}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={() => {}}
      containerClassName={styles['pagination']}
      activeClassName={'active'}
    />
  );
}
