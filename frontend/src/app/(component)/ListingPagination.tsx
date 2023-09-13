'use client';
// TODO: uninstall ReactPaginate
import Pagination from '@mui/material/Pagination';

export default function ListingPagination({
  totalItem,
  page,
  setPage,
}: {
  totalItem: number;
  page: number;
  setPage: (page: number) => void;
}) {
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Pagination
      count={Math.ceil(totalItem / 9)}
      page={page}
      onChange={handleChange}
      color="secondary"
    />
  );
}
