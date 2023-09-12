'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import { useEffect, useState } from 'react';
import { ListingResponse } from '../interface';
import Listing from './Listing';
import ListingPagination from './ListingPagination';
import styles from './styles/ListingContainer.module.css';

async function getListing(page = 1): Promise<ListingResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/listing?page=${page}`,
    {
      next: { revalidate: 1000 },
    },
  );
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
    <Container>
      <Box className={styles['listing-container']}>
        {listing === null ? (
          <Box className={styles['loading-bar']}>
            {/* TODO: Extract to be a loading component */}
            <LinearProgress color="inherit" />
          </Box>
        ) : (
          <>
            <Box className={styles['listing-list']}>
              {listing.items.map(item => (
                <Listing key={item.id} item={item} />
              ))}
            </Box>
            <Box className={styles['listing-pagination']}>
              <ListingPagination
                totalItem={listing.meta.totalItems}
                setPage={setPage}
              />
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
}
