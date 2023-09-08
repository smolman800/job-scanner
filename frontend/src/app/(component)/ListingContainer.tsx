'use client';

import styles from './styles/ListingContainer.module.css';
import Listing from './Listing';
import ListingPagination from './ListingPagination';
import { ListingResponse } from '../interface';
import { useEffect, useState } from 'react';

async function getListing(page = 1): Promise<ListingResponse> {
  // TODO: move endpoint to .env and revalidation value
  const res = await fetch(`http://localhost:4000/listing?page=${page}`, {
    next: { revalidate: 1000 },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch listing');
  }
  return res.json();
}

export default function ListingContainer() {
  const [listing, setListing] = useState<ListingResponse | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getListing(page).then(data => setListing(data));
  }, [page]);

  return (
    <>
      {listing === null ? (
        <div>Loading...</div>
      ) : (
        <div className={styles['listing-container']}>
          <div className={styles['listing-list']}>
            {listing.items.map(item => (
              <Listing key={item.id} item={item} />
            ))}
          </div>
          <div className={styles['listing-pagination']}>
            <ListingPagination
              totalItem={listing.meta.totalItems}
              setPage={setPage}
            />
          </div>
        </div>
      )}
    </>
  );
}
