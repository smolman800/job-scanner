import ListingContainer from './(component)/ListingContainer';
import { ListingResponse } from './interface';

// TODO:
// Work on error.jsx
// Work on loading.jsx
// Move to using MUI for faster UI development
async function getListing(): Promise<ListingResponse> {
  // TODO: move endpoint to .env and revalidation value
  const res = await fetch('http://localhost:4000/listing', {
    next: { revalidate: 1000 },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch listing');
  }
  return res.json();
}

export default async function Home() {
  const listing = await getListing();
  return (
    <>
      <ListingContainer items={listing.items} />
    </>
  );
}
