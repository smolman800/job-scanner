import Link from 'next/link';
import styles from './styles/ListingPagination.module.css';

export default function ListingPagination({
  currentPage,
  totalPages,
  pageRangeDisplayed = 5,
  marginPagesDisplayed = 2,
  hrefBuilder = (pageNumber: number) => `/listing/${pageNumber}`,
}: {
  currentPage: number;
  totalPages: number;
  pageRangeDisplayed?: number;
  marginPagesDisplayed?: number;
  hrefBuilder?: (pageNumber: number) => string;
}) {
  const getPageArray = () => {
    const range = [];

    for (let i = 1; i <= totalPages; i++) {
      if (
        i <= marginPagesDisplayed ||
        i > totalPages - marginPagesDisplayed ||
        (i >= currentPage - pageRangeDisplayed / 2 &&
          i <= currentPage + pageRangeDisplayed / 2)
      ) {
        range.push(i);
      }
    }

    const finalRange = [];
    for (let i = 0; i < range.length; i++) {
      if (i > 0 && range[i] - range[i - 1] > 1) {
        finalRange.push(null);
      }
      finalRange.push(range[i]);
    }

    return finalRange;
  };

  return (
    <div className={styles.pagination}>
      {currentPage > 1 && <Link href={hrefBuilder(currentPage - 1)}>Prev</Link>}

      {getPageArray().map((pageNumber, index) => {
        if (pageNumber === null) return <span key={index}>...</span>;

        return (
          <Link key={pageNumber} href={hrefBuilder(pageNumber)}>
            {pageNumber}
          </Link>
        );
      })}

      {currentPage < totalPages && (
        <Link href={hrefBuilder(currentPage + 1)}>Next</Link>
      )}
    </div>
  );
}
